const getDescendants = (node, accum) => {
    accum = accum || [];
    [...node.childNodes].forEach(child => {
        accum.push(child)
        getDescendants(child, accum);
    });
    return accum
}

const addSingleSpaceSpan = (node) => {
    const whitespaceElem = document.createElement('span')
    whitespaceElem.className += ' single-space-holder';
    node.appendChild(whitespaceElem)
}

const mergeAdjacentSupplied = (node, tw) => {
    const descendants = getDescendants( node );
   // tw.currentNode = node
    let currentNode = tw.nextNode()
    while(currentNode) {
         if (descendants.includes(currentNode)) {
            // skip all descendants of the first 'supplied'
            currentNode = tw.nextNode()
        } else if (currentNode.nodeType === Node.TEXT_NODE && ! currentNode.nodeValue.trim().length) {
            // text node with just whitespace
            // So, we add another element to keep the one space,
            // and then apply CSS to it later to keep the space character
            addSingleSpaceSpan(currentNode)
            currentNode = tw.nextNode();
        } else if (currentNode.nodeType === Node.TEXT_NODE && currentNode.nodeValue.trim().length) {
            // if text node and not empty then we are done
            currentNode = null
        } else if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.nodeName !== 'supplied') {
            // found some other element other than a supplied, so there is no
            // contiguous 'supplied' and we are therefore done
            currentNode = null
        } else if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.nodeName === 'supplied') {
            // we've found a 'supplied' contiguous with the first supplied so copy
            // the children from the second supplied to the first supplied
            [...currentNode.childNodes].forEach(child => node.appendChild(child))
            currentNode = tw.nextNode();
            
        } else {
            currentNode = tw.nextNode()
        }
    }
    // reset tree walker back to original node
    tw.currentNode = node
}

const hyperlinkNode = node => {
    const ref = node.getAttribute('ref');
    if (ref) {
        const a = document.createElement('a')
        const href = document.createAttribute('href')
        href.value = ref
        a.setAttributeNode(href);
        [...node.childNodes].forEach(child => a.appendChild(child));
        node.appendChild(a)
    }
}

const makePopupable = (subNode, node, title, openPopup) => {
    node.addEventListener("click", ()=>openPopup(title, subNode.textContent))
    node.className += ' popupable'
    subNode.parentNode.removeChild(subNode)
}

const appendSpaceToNode = (node, tw) => {
    /****  IMPORTANT: textContent removes all children and sets text of this node to a concatentation of children's text */
    node.textContent = node.textContent + ' ';
}


const rules = {
    'div': node => {
        const type = node.getAttribute('type')
        const subtype = node.getAttribute('subtype')
        const n = node.getAttribute('n')
        node.className += ' leiden-div'
        if (type === 'textpart' && subtype === 'section') {
            const title = document.createElement('span')
            title.className += ' section-heading';
            title.append(`${subtype} ${n}`)
            node.prepend(title)
        }
    },
    'ab': node => {node.className += ' leiden-transcription'},
    'ex': node => {node.prepend('('); node.append(')')},
    'space': node => {
        const extent = node.getAttribute('extent');  
        const unit = node.getAttribute('unit');  // character or line
        const isUncertain = node.getAttribute('cert') === 'low'
        const quantity = node.getAttribute('quantity'); 
        let textContent = '('
        if (unit === 'line') {
            textContent += 'vacat'
        } else {
            if (quantity || (extent === 'unknown' && isUncertain)) {
                textContent += 'vac.'
                if (quantity > 1) textContent += quantity
                if (isUncertain) textContent += '?'   
            } else if (extent === 'unknown') {
                textContent += 'vacat'
            } 
        }
        textContent += ')'
        node.textContent = textContent
    },
    'g': appendSpaceToNode,
    'name': appendSpaceToNode,
  //  'num': appendSpaceToNode,
    'placename': hyperlinkNode,
    'persname': hyperlinkNode,
    'supplied': (node, tw) => {
        // if the node is empty then do nothing, 
        // it is likely a 'supplied' that we merged into the prior 'supplied'
        if (node.textContent.trim() === '') return null
        mergeAdjacentSupplied(node, tw)
        node.prepend('[')
        node.append(']')
    },
    'unclear': node => {
            node.textContent = node.textContent.split('').map(character => character + '\u0323').join('').trim();
    },
    'hi': node => {
            if (node.getAttribute('rend') === 'ligature') {
                const oldText = node.textContent;
                node.textContent = oldText.charAt(0) + '\u0302' + oldText.substring(1);
            }
    },
    'lb': node => {
            const breakAttr = node.getAttribute('break');
            const n = node.getAttribute('n')
            const style = node.getAttribute('style')
            let textIndicator = ' '
            if (style === "text-direction:r-to-l") {
                textIndicator = '←'
            } else if (style === "text-direction:l-to-r") {
                textIndicator = '→'
            } else if (style === "text-direction:spiral-clockwise") {
                textIndicator = '↻'
            } else if (style === "text-direction:spiral-anticlockwise") {
                textIndicator = '↺'
            } else if (style === "text-direction:upwards") {
                textIndicator = '↑'
            } else if (style === "text-direction:downwards") {
                textIndicator = '↓'
            } 
            if (breakAttr === 'no') node.append('-');
            if (n !== 1) node.append(document.createElement('br'));
            const numSpan = document.createElement('span')
            numSpan.className += ' leiden-num-span'
            numSpan.append(`${n}. ${textIndicator}`)
            node.append(numSpan)
            node.className += ' leiden-numbering';
    },
    'cb': node => {
        node.append(`Col. ${node.getAttribute('n')}`)
        node.className += ' section-heading';
    },
    'choice': (node, tw, openPopup ) => {
        const reg = node.querySelector('reg')
        const corr = node.querySelector('corr')
        if (reg) {
            makePopupable(reg, node, 'reg', openPopup)
        } else if (corr) {
            makePopupable(corr, node, 'Correction', openPopup)
        }
    },
    'milestone': node => {
       // const unit = node.getAttribute('unit');
        const n = node.getAttribute('n')
        const hi = document.createElement('hi')
        hi.setAttribute('rend', 'superscript')
        node.append('|')
        hi.append(`${n}`)
        node.append(hi)
    },
    'gap': node => {
            let elementText;
            const reason = node.getAttribute('reason');  // 'lost' 'illegible' 'omitted'
            const extent = node.getAttribute('extent');  // always 'unknown' if present?  - never in combination with quantity or atLeast/atMost
            const quantity = node.getAttribute('quantity'); // not in combination with extent or atLeast/atMost
            const unit = node.getAttribute('unit');  // character or line
            const atLeast = node.getAttribute('atLeast');  // not in combination with extent or quantity
            const atMost = node.getAttribute('atMost');     // not in combination with extent or quantity
            const precision = node.getAttribute('precision');  // 'low' output: ca. 
            const precisionOutput = precision && precision === 'low' ? 'ca.' : '' 
            const isLine = unit && unit === 'line';
            if (reason === 'lost') {
                if (isLine) {
                    elementText = (extent==='unknown') ?
                        ' - - - - - ' :
                        '  [- - - - - -]  ' ; 
                } else {
                    elementText = '[';
                    if (extent === 'unknown') {
                        elementText += '- - ? - -';
                    } else if (atLeast || atMost) {
                        elementText += ` - ${atLeast}-${atMost} - `
                    } else if (quantity && quantity < 5) {
                        elementText += '. '.repeat(quantity).trim();
                    } else if (quantity && quantity >= 5) {
                        // QEUSTION:  SHOULD THE PRECISION OUTPUT BE ELSEWHERE TOO?
                        if (precision === 'low') {
                            elementText += `- - ${precisionOutput}${quantity} - - `
                        } else {
                            elementText += `. . ${quantity} . . `
                        } 
                    }
                    elementText += ']';
                }
            } else if (reason === 'illegible') {
                const beforeText = isLine ? '(Traces of ' : '. . '
                const afterText = isLine ? ' lines)' : ' . .'
                if (extent === 'unknown') {
                    elementText = isLine ?
                    `${beforeText.trim()}${afterText}` :
                    `${beforeText}?${afterText}`
                } else if (atLeast || atMost) {
                    elementText = `${beforeText}${atLeast}-${atMost}${afterText}`
                } else if (quantity && quantity < 5) {
                    elementText = '. '.repeat(quantity).trim();
                } else if (quantity && quantity >= 5) {
                    elementText = `${beforeText}${precisionOutput}${quantity}${afterText}`
                }
            } else if (reason === 'omitted') {
                elementText = '<- - ? - ->';
            }
            node.textContent = elementText;
    }
}

export default rules