import React, {useEffect} from 'react';
import { Box } from '@material-ui/core';
import LeidenPopup from './LeidenPopup'

import convert from './convert'



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