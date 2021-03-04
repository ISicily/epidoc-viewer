import './Leiden.css';
import rules from './rules.js'
import diplomaticRules from './diplomaticRules.js'

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

export default convert