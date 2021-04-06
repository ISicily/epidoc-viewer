import './Leiden.css';
import rules from './rules.js'
import diplomaticRules from './diplomaticRules.js'

const parser = new DOMParser();

function normalizeText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

const convert = (tei, openPopup, showInterpreted) => { 
    // openPopup takes two args:  title, body
    let fixedTEI = tei.replace(/[\r\n\t]/g, "")
 
    if (! showInterpreted) {
        fixedTEI = normalizeText(fixedTEI)
    }

    const node = parser.parseFromString(fixedTEI, "application/xml").querySelector('div[type="edition"]');
   
   // parser.preserveWhitespace=true;
    
    const tw = document.createTreeWalker(node);

    // choose interpreted or diplomatic rules
    const rulesToApply = showInterpreted?rules:diplomaticRules

    while (tw.nextNode()) {
        if (tw.currentNode.nodeType === Node.TEXT_NODE && ! showInterpreted) {
            tw.currentNode.nodeValue = tw.currentNode.nodeValue.toUpperCase()
        }
        const rule = rulesToApply[tw.currentNode.nodeName]
        if (rule) rule(tw.currentNode, tw, openPopup)
    }
  
    return node
}

export default convert