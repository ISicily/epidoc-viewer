import * as React from 'react';
import convert from 'react-from-dom';
import { Box } from '@material-ui/core';
import './Leiden.css';

//const ReactMarkdown = ({ children }) => <div>{children}</div>;


function getDescendants(node, accum) {
    accum = accum || [];
    [...node.childNodes].forEach(child => {
        accum.push(child)
        getDescendants(child, accum);
    });
    return accum
}

const mergeAdjacentSupplied = (node, tw) => {
    const descendants = getDescendants( node );
    tw.currentNode = node
    let currentNode = tw.nextNode()
    while(currentNode) {
         if (descendants.includes(currentNode)) {
            // skip all descendants of the first 'supplied'
            currentNode = tw.nextNode()
        } else if (currentNode.nodeType === Node.TEXT_NODE && ! currentNode.nodeValue.trim().length) {
            // text node with just whitespace
            // So, we add another element to keep the one space,
            // and then apply CSS to it later to keep the space character
            const whitespaceElem = document.createElement('span')
            whitespaceElem.className += ' single-space-holder';
            node.appendChild(whitespaceElem)
            currentNode = tw.nextNode();
        } else if (currentNode.nodeType === Node.TEXT_NODE && currentNode.nodeValue.trim().length) {
            // if text node and not empty then we are done
            currentNode = null
        } else if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.nodeName != 'supplied') {
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
}


const LeidenView = ({tei}) => { 
    const fixedTEI = tei.replace(/[\r\n\t]/g, "")
    const parser = new DOMParser();
   // parser.preserveWhitespace=true;
    const doc = parser.parseFromString(fixedTEI, "application/xml");
    const node = doc.querySelector('div[type="edition"] > *');

    const tw = document.createTreeWalker(node, NodeFilter.SHOW_ALL);

    const options = {
        actions: [
            {
                condition: (node) => node.nodeName.toLowerCase() === 'ab',
                pre: node => {
                    node.className += ' leiden-transcription';
                    return node;
                }
            },
            {
                condition: (node) => node.nodeName.toLowerCase() === 'ex',
                pre: (node, key) => {
                    node.prepend('(')
                    node.append(')')
                    return node
                }
            },
            {
                condition: (node) => node.nodeName.toLowerCase() === 'supplied',
                pre: (node, key) => {
                    //mergeAdjacentNodes(node, node.nextSibling)
                    mergeAdjacentSupplied(node, tw)
                    if (node.textContent.trim() === '') return null
                    node.prepend('[')
                    node.append(']')
                    return node
                }
            },
            {
                condition: (node) => node.nodeName.toLowerCase() === 'unclear',
                pre: (node, key) => {
                    node.textContent = node.textContent.split('').map(character => character + '\u0323').join('').trim();
                    return node
                }
            },
            {
                condition: (node) => node.nodeName.toLowerCase() === 'hi',
                pre: (node, key) => {
                    if (node.getAttribute('rend') === 'ligature') {
                        const oldText = node.textContent;
                        node.textContent = oldText.charAt(0) + '\u0302' + oldText.substring(1);
                    }
                    return node
                }
            },
            {   
                condition: node => node.nodeName.toLowerCase() === 'g' || node.nodeName.toLowerCase() === 'name' || node.nodeName.toLowerCase() === 'num' ,
                pre: node => {
                    /****  IMPORTANT: textContent removes all children and sets text of this node to a concatentation of children's text */
                    node.textContent = node.textContent + ' ';
                    return node
                }
            },
            {
                condition: (node) => node.nodeName.toLowerCase() === 'space',
                pre: (node, key) => {
                    node.textContent = `(vac.${node.getAttribute('extent')})`;
                    return node
                }
            },
            
            {
                condition: (node) => (node.nodeName.toLowerCase() === 'placename' ),
                pre: (node, key) => {
                    const ref = node.getAttribute('ref');
                    if (ref) {
                        const a = document.createElement('a')
                        const href = document.createAttribute('href')
                        href.value = ref
                        a.setAttributeNode(href);
                        [...node.childNodes].forEach(child => {
                            a.appendChild(child);
                        });
                        return a
                    }
                    return node
                }
            },
            {
                condition: (node) => (node.nodeName.toLowerCase() === 'persname' ),
                pre: (node, key) => {
                    const ref = node.getAttribute('ref');
                    if (ref) {
                        const a = document.createElement('a')
                        const href = document.createAttribute('href')
                        href.value = ref
                        a.setAttributeNode(href);
                        [...node.childNodes].forEach(child => {
                            a.appendChild(child);
                        });
                        return a
                    }
                    return node
                }
            },
            {
                condition: (node) => node.nodeName.toLowerCase() === 'lb',
                pre: (node) => {
                    const breakAttr = node.getAttribute('break');
                    const n = node.getAttribute('n')
                    const span = document.createElement('span')
                    const lineNumSpan = document.createElement('span')
                    const lineNumber = document.createTextNode(`${n}.    `);
                    lineNumSpan.appendChild(lineNumber)
                    const br = document.createElement('br');
                    if (breakAttr === 'no') {
                        const dashNode = document.createTextNode('-');
                        span.appendChild(dashNode)
                    } 
                    if (n > 1) span.appendChild(br)
                    span.appendChild(lineNumSpan)
                    span.className += ' leiden-numbering';
                    return span
                }
            },
            {
                condition: (node) => node.nodeName.toLowerCase() === 'gap',
                pre: (node, key) => {
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
                    return node
                }
            }
        ],
      //  type: 'application/xml',
       // selector: 'div[type="edition"] > *'
    }


    return (
        <Box m={4} textAlign="left">
            {convert(node, options)}
        </Box>
)};

export default LeidenView