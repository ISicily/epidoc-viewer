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


function underlineIfUndefined(node) {
    const evidence = node.getAttribute("evidence");
    if (evidence && evidence.toLowerCase() === 'previouseditor' && node.getAttribute('reason') === 'undefined') {
        const underlineSpan = document.createElement('span');
        underlineSpan.className = 'underline';
        [...node.childNodes].forEach(child => underlineSpan.appendChild(child));
        node.appendChild(underlineSpan);
    }
}

function addOpeningBracket(reason, node) {
    if (reason === 'lost') {
        node.prepend('[');
    } else if (reason === 'omitted') {
        node.prepend('<');
    } else if (reason === 'subaudible') {
        node.prepend('(scil. ');
    }
}

function addClosingBracket(reason, node) {
    if (reason === 'lost') {
        node.append(']');
    } else if (reason === 'omitted') {
        node.append('>');
    } else if (reason === 'subaudible') {
        node.append(')');
    }
}

/* 
    when we hit a supplied, prepend a square bracket, and then start looking for an adjacent supplied.
    As soon as we hit a text node with actual text, stop, and append a bracket to the last supplied we found.
    If we hit another supplied, then start looking for another.

    */
const mergeAdjacentSupplied = (node, tw) => {
    const isUncertain = node.getAttribute('cert') === 'low'
    const reason = node.getAttribute('reason')
    let lastVisitedSupplied = node;
    addOpeningBracket(reason, node);
    underlineIfUndefined(node)
    if (isUncertain) node.append('(?)')
    let descendants = getDescendants( node )
    let currentNode = tw.nextNode()
    while(currentNode) {
         if (descendants.includes(currentNode)) {
            // skip all descendants of 'supplied'
            currentNode = tw.nextNode()
        } else if ((currentNode.nodeType === Node.TEXT_NODE && currentNode.nodeValue.trim().length) ||
                        ( currentNode.nodeType === Node.ELEMENT_NODE 
                            && ['lb', 'ab', 'cb', 'div'].includes(currentNode.nodeName))) {
            // text node with actual text (not just whitespace) so we are done
            currentNode = null
        } else if (currentNode.nodeType === Node.ELEMENT_NODE 
            && currentNode.nodeName === 'supplied' 
            && currentNode.getAttribute('reason') !== reason) {
            // we've hit another 'supplied' but with a different reason, so we are done
            currentNode = null    
        } else if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.nodeName === 'supplied') {
            // we've found another adjacent supplied
            underlineIfUndefined(currentNode);
            lastVisitedSupplied = currentNode;
            if (currentNode.getAttribute('cert') === "low") currentNode.append('(?)')
            currentNode.setAttribute('leiden-processed', 'true')  // this is so we don't apply our rule to this 'suuplied' later
            descendants = getDescendants(currentNode) // now ignore the descendants of this 'supplied' node 
            currentNode = tw.nextNode()  
        } else {
            // skip over any other nodes, e.g, empty text nodes, other elements, etc.
            currentNode = tw.nextNode()
        }
          
    }
    // need to append the end bracket here if we've reached the end of the elements, 
        // without having hit a text node earlier
        addClosingBracket(reason, lastVisitedSupplied); 
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
    const span = document.createElement('span')
    span.className += ' popupable'
    span.addEventListener("click", ()=>openPopup(title, subNode.textContent))
    subNode.parentNode.removeChild(subNode);
    // copy the nodes children to the new span
    [...node.childNodes].forEach(child => span.appendChild(child));
    node.appendChild(span)
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
        if (type === 'textpart' && subtype === 'section') {
            const title = document.createElement('span')
            title.className += ' section-heading';
            title.append(`${subtype} ${n}`)
            node.prepend(title)
        }
    },
    'cb': node => {
        const title = document.createElement('span')
        title.className += ' section-heading';
        title.append(`Col. ${node.getAttribute('n')}`)
        node.prepend(title)
    }, 
    'ab': node => {
        const span = document.createElement('span')
        span.className += ' leiden-transcription';
        [...node.childNodes].forEach(child => span.appendChild(child));
        node.appendChild(span)
    },
    'ex': node => {node.prepend('('); node.append(')')},
    'del': (node) => {
        const rend = node.getAttribute('rend');
        if (rend ==="erasure") {
            node.prepend('⟦'); node.append('⟧')
        } 
    },
    'subst': (node, tw, openPopup ) => {
        const del = node.querySelector('del')
         if (del) {
             const rend = del.getAttribute('rend')
             if (rend === 'corrected') {
                makePopupable(del, node, 'del', openPopup)
             }
        }
    },
    'add': node => {
        const place = node.getAttribute('place');
        if (place === 'overstrike') {
            node.prepend('«')
            node.append('»')
        }
    },
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
   // 'name': appendSpaceToNode,
  //  'num': appendSpaceToNode,
    'placename': hyperlinkNode,
    'persname': hyperlinkNode,
    'supplied': (node, tw) => {
        // ignore 'supplied' that we merged into a prior 'supplied'
        if (node.getAttribute('leiden-processed') === 'true') return null
        mergeAdjacentSupplied(node, tw)
    },
    'unclear': node => {
        node.textContent = node.textContent.split('').map(character => character + '\u0323').join('').trim();
    },
    'hi': node => {
        const rend = node.getAttribute('rend');
        if ( rend === 'ligature') {
            const oldText = node.textContent;
            node.textContent = oldText.charAt(0) + '\u0302' + oldText.substring(1);
        } else if (rend==="superscript") {
            const sup = document.createElement('sup')
            sup.textContent = node.textContent
            node.textContent = ''
            node.appendChild(sup)
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
        const sup = document.createElement('sup')
        sup.textContent = `${node.getAttribute('n')}`
        node.append('|')
        node.append(sup)
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



