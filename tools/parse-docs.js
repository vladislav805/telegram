((/** @type {HTMLElement[]} */ children) => {
    const items = [];
    let current = null;

    const parseType = type => {
        if (type.includes(' or ')) return type.split(' or ').map(parseType).join(' | ');
        if (type.startsWith('Array of ')) return parseType(`${parseType(type.substring(9))}[]`);

        switch (type) {
            case 'String': return 'string';
            case 'Boolean': return 'boolean';
            case 'True': return 'true';
            case 'Float':
            case 'Float number':
            case 'Integer': return 'number';
        }

        return type;
    };

    const parseRow = (current, /** @type {HTMLTableRowElement} */ row) => {
        if (current.type === 'object') {
            return {
                name: row.cells[0].innerText,
                type: parseType(row.cells[1].innerText),
                description: row.cells[2].innerText,
            };
        } else {
            return {
                name: row.cells[0].innerText,
                type: parseType(row.cells[1].innerText),
                required: row.cells[2].innerText === 'Yes',
                description: row.cells[3].innerText,
            };
        }
    };

    for (const node of children) {
        const tag = node.tagName.toLowerCase();
        const content = node.innerText;

        switch (tag) {
            case 'h4': {
                // Остальные заголовки
                let textHeader = content.includes(' ');

                const type = /^[A-Z]/.test(content) ? 'object' : 'method';

                if (current || textHeader) {
                    items.push(current);
                }

                if (textHeader) {
                    break;
                }

                current = {
                    type,
                    name: content,
                    description: [],
                    items: [],
                    notes: [],
                };
                break;
            }

            case 'p': {
                if (!current) break;

                current.description.push(content);
                break;
            }

            case 'table': {
                if (!current) break;

                for (let i = 1, row; row = node.rows[i]; ++i) {
                    current.items.push(parseRow(current, row))
                }

                break;
            }
        }
    }

    items.push(current);

    copy(JSON.stringify(items))
})([...document.getElementById('dev_page_content').children]);
// См. `sendMediaGroup`: `"type": "InputMediaAudio, InputMediaDocument, InputMediaPhoto and InputMediaVideo[]",`
