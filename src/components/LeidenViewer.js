import React, {useEffect} from 'react';
import { Box } from '@material-ui/core';
import './Leiden.css';
import rules from './rules.js'
import diplomaticRules from './diplomaticRules.js'
import LeidenPopup from './LeidenPopup'


const parser = new DOMParser();

const convert = (tei, openPopup, showInterpreted) => { 
    // openPopup takes two args:  title, body

    const fixedTEI = tei.replace(/[\r\n\t]/g, "")
   // parser.preserveWhitespace=true;
    const node = parser.parseFromString(fixedTEI, "application/xml").querySelector('div[type="edition"]');
    const tw = document.createTreeWalker(node);

    // choose interpreted or diplomatic rules
    const rulesToApply = showInterpreted?rules:diplomaticRules

    while (tw.nextNode()) {
        const rule = rulesToApply[tw.currentNode.nodeName]
        if (rule) rule(tw.currentNode, tw, openPopup)
    }
  
    return node
}



const LeidenViewer = ({tei, showInterpreted}) => { 
    let referenceToEpidocDiv;
    const [openPopup, setOpenPopup] = React.useState(false);
    const [popupTitle, setPopupTitle] = React.useState();
    const [popupBody, setPopupBody] = React.useState();

    const handleOpenPopup = (title, body) => {
        setPopupTitle(title)
        setPopupBody(body)
        setOpenPopup(true);
    };

    const handleClose = () => {
        setOpenPopup(false);
      };

    useEffect(() => {
        if (tei) {
            referenceToEpidocDiv.childNodes.forEach(child=>referenceToEpidocDiv.removeChild(child))
            const leiden = convert(tei, handleOpenPopup, showInterpreted)
            referenceToEpidocDiv.appendChild(leiden)
        }
      }, [tei, showInterpreted]);

    return (
        <Box m={4} textAlign="left" >
            <div ref={theElem=>referenceToEpidocDiv=theElem}/>  
            <LeidenPopup title={popupTitle} body={popupBody} open={openPopup} handleClose={handleClose}  />
        </Box>
)};

export default LeidenViewer