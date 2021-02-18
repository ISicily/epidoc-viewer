import React, {useEffect} from 'react';
import { Box } from '@material-ui/core';
import './Leiden.css';
import rules from './rules.js'
import LeidenPopup from './LeidenPopup'


const parser = new DOMParser();

const convert = (tei, openPopup) => { 
    // openPopup takes two args:  title, body

    const fixedTEI = tei.replace(/[\r\n\t]/g, "")
   // parser.preserveWhitespace=true;
    const node = parser.parseFromString(fixedTEI, "application/xml").querySelector('div[type="edition"]');
    console.log(node)
    const tw = document.createTreeWalker(node);

    // apply rules
    while (tw.nextNode()) {
        const rule = rules[tw.currentNode.nodeName]
        if (rule) rule(tw.currentNode, tw, openPopup)
    }
    return node
}



const LeidenViewer = ({tei}) => { 
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
            const leiden = convert(tei, handleOpenPopup)
            referenceToEpidocDiv.appendChild(leiden)
        }
      }, [tei]);

    return (
        <Box m={4} textAlign="left" >
            <div ref={theElem=>referenceToEpidocDiv=theElem}/>  
            <LeidenPopup title={popupTitle} body={popupBody} open={openPopup} handleClose={handleClose}  />
        </Box>
)};

export default LeidenViewer