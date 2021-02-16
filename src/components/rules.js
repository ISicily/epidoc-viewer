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
    'space': node => {node.textContent = `(vac.${node.getAttribute('extent')})`},
    'g': appendSpaceToNode,
    'name': appendSpaceToNode,
    'num': appendSpaceToNode,
    'placename': hyperlinkNode,
    'persname': hyperlinkNode,
    'supplied': (node, tw) => {
        // the node is empty so do nothing
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
            if (breakAttr === 'no') node.append('-');
            if (n !== 1) node.append(document.createElement('br'));
            node.append(`${n}.    `)
            node.className += ' leiden-numbering';
    },
    'cb': node => {
        node.append(`Col. ${node.getAttribute('n')}`)
        node.className += ' section-heading';
    },
    'gap': node => {
            let elementText;
            const reason = node.getAttribute('reason');
            const extent = node.getAttribute('extent');
            if (reason === 'lost') {
                elementText = '[';
                if (extent === 'unknown') {
                    elementText += '---';
                } else {
                    elementText += '.'.repeat(extent);
                }
                elementText += ']';
            } else if (reason === 'illegible') {
                elementText = '+'.repeat(extent);
            }
            node.textContent = elementText;
    }
}

export default rules