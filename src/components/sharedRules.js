const sharedRules = (isInterpreted) => {
    return {

        'milestone': node => {
            const sup = document.createElement('sup')
            sup.textContent = `${node.getAttribute('n')}`
            node.append('|')
            node.append(sup)
        },
        'cb': node => {
            const title = document.createElement('span')
            title.className += ' section-heading';
            title.append(`Col. ${node.getAttribute('n')}`)
            node.prepend(title)
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
            if (breakAttr === 'no' && isInterpreted) node.append('-');
            if (n !== 1) node.append(document.createElement('br'));
            const numSpan = document.createElement('span')
            numSpan.className += ' leiden-num-span'
            numSpan.append(`${n}. ${textIndicator}`)
            node.append(numSpan)
        },
    }
}

export default sharedRules