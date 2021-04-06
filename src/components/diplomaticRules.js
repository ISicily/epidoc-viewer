import sharedRules from './sharedRules.js'



const diplomaticRules = {
    'supplied': node => node.textContent = '',
    'unclear': node => node.textContent = '',
    'gap': node => node.textContent = '',
    'note': node => node.textContent = '',
    ...sharedRules(false)
}

export default diplomaticRules