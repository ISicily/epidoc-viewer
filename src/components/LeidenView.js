import * as React from 'react';
import convert from 'react-from-dom';
import { Box } from '@material-ui/core';
import './Leiden.css';

//const ReactMarkdown = ({ children }) => <div>{children}</div>;

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
                if (node.getAttribute('rend') == 'ligature') {
                    const oldText = node.textContent;
                    node.textContent = oldText.charAt(0) + '\u0302' + oldText.substring(1);
                }
                return node
            }
        },
        {
            condition: (node) => node.nodeName.toLowerCase() === 'space',
            pre: (node, key) => {
                node.textContent = `(vac.${node.getAttribute('extent')})`;
                return node
            }
        },{
            condition: (node) => node.nodeName.toLowerCase() === 'gap',
            pre: (node, key) => {
                let elementText;
                const reason = node.getAttribute('reason');
                const extent = node.getAttribute('extent');
                const unit = node.getAttribute('unit');
                if (reason == 'lost') {
                    elementText = '[';
                    if (extent == 'unknown') {
                    elementText += '---';
                    } else {
                    elementText += '.'.repeat(extent);
                    }
                    elementText += ']';
                } else if (reason == 'illegible') {
                    elementText = '+'.repeat(extent);
                }
                node.textContent = elementText;
                return node
            }
        }
    ],
    type: 'application/xml',
    selector: 'div[type="edition"] > *'
}

const LeidenView = ({tei}) => (
  <Box m={4}>
    {convert(tei, options)}
  </Box>
);

export default LeidenView