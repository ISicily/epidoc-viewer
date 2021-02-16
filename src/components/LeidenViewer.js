import React, {useEffect} from 'react';
import { Box } from '@material-ui/core';
import './Leiden.css';
import rules from './rules.js'


const parser = new DOMParser();

const convert = tei => { 
    const fixedTEI = tei.replace(/[\r\n\t]/g, "")
   // parser.preserveWhitespace=true;
    const node = parser.parseFromString(fixedTEI, "application/xml").querySelector('div[type="edition"]');
    console.log(node)
    const tw = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);

    // apply rules
    while (tw.nextNode()) {
        const rule = rules[tw.currentNode.nodeName]
        if (rule) rule(tw.currentNode, tw)
    }
    return node
}

const LeidenViewer = ({tei}) => { 
    let referenceToEpidocDiv;

    useEffect(() => {
        if (tei) {
            referenceToEpidocDiv.childNodes.forEach(child=>referenceToEpidocDiv.removeChild(child))
            const leiden = convert(tei)
            referenceToEpidocDiv.appendChild(leiden)
        }
      }, [tei]);

    return (
        <Box m={4} textAlign="left" >
            <div ref={theElem=>referenceToEpidocDiv=theElem}/>  
        </Box>
)};

export default LeidenViewer