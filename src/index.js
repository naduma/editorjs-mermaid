const mermaid = require('mermaid');
const { nanoid } = require('nanoid');

require('./index.css').toString();

const generateId = (prefix) => {
    return `${prefix}${nanoid(10)}`;
}

class MermaidTool {
    static config(config) {
        mermaid.initialize(config);
    }

    static get toolbox() {
        return {
            title: 'mermaid',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><path fill="#000" d="M.16.63h2.12l1.603 4.713h.02L5.42.63h2.12v6.852H6.13V2.626h-.02L4.43 7.482H3.27L1.59 2.674h-.02v4.808H.16V.63z"/></svg>'
        };
    }

    static get isReadOnlySupported() {
        return true;
    }

    constructor({ data, readOnly }) {
        this.code = data.code;
        this.caption = data.caption;
        this.readOnly = readOnly;
    }

    parse(code, preview, container) {
        preview.classList.remove('mermaid-preview-error');
        try {
            const svg = mermaid.render(generateId('svg-'), code, undefined, container);
            //const svg = mermaid.render(generateId('svg-'), code);
            preview.innerHTML = '';
            preview.insertAdjacentHTML('afterbegin', svg);
        }
        catch (e) {
            preview.classList.add('mermaid-preview-error');
            console.log(e);
        }
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('mermaid-container');

        const preview = document.createElement('div');
        let previewClasses = ['cdx-block', 'mermaid-preview'];
        if (!this.readOnly) previewClasses.push('mermaid-preview-border');
        preview.classList.add(...previewClasses);
        preview.setAttribute('id', generateId('preview-'));
        
        const input = document.createElement('textarea');
        input.classList.add('cdx-input', 'mermaid-input');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('placeholder', 'Mermaid code');

        input.value = this.code ? this.code : '';
        if (input.value) {
            // wait for mermaid
            setTimeout(() => {
                this.parse(input.value, preview, container);
            }, 0);
        }

        input.addEventListener('keyup', (e) => {
            e.preventDefault();
            this.parse(input.value, preview, container);
        });
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') e.stopPropagation();
        });

        const caption = document.createElement('div');
        if (!this.readOnly) {
            caption.classList.add('cdx-input', 'mermaid-caption');
        }
        caption.setAttribute('contenteditable', !this.readOnly);
        caption.dataset.placeholder = 'Caption';
        caption.innerText = this.caption ? this.caption : '';

        const wrapper = document.createElement('div');
        wrapper.classList.add('mermaid-wrapper');
        wrapper.appendChild(container);
        wrapper.appendChild(preview);
        if (!this.readOnly) {
            wrapper.appendChild(input);
        }
        if (!this.readOnly || this.caption) {
            wrapper.appendChild(caption);
        }
        return wrapper;
    }

    validate(savedData) {
        return savedData.code.trim() !== '';
    }

    save(blockContent) {
        return {
            'code': blockContent.querySelector('textarea').value,
            'caption': blockContent.querySelector('.mermaid-caption').innerText,
        }
    }
}

module.exports = MermaidTool;
