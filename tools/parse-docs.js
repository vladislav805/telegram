(root => {
    const items = [];
    let current = null;

    const parseType = type => {
        if (type.includes(' or ') || type.includes(', ')) return type.split(/( or |, | and )/).map(parseType).join(' | ');
        if (type.startsWith('Array of ')) return parseType(`${type.replace('Array of ', '')}[]`);

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

    const parseRow = (current, row) => {
        if (current.type === 'object') {
            return {
                name: row.cells[0].textContent,
                type: parseType(row.cells[1].textContent),
                description: row.cells[2].textContent,
            };
        } else {
            return {
                name: row.cells[0].textContent,
                type: parseType(row.cells[1].textContent),
                required: row.cells[2].textContent === 'Yes',
                description: row.cells[3].textContent,
            };
        }
    };

    for (const node of root) {
        const tag = node.tagName.toLowerCase();
        const content = node.textContent;

        switch (tag) {
            case 'h4': {
                // Остальные заголовки
                if (content.includes(' ')) break;

                const type = /^[A-Z]/.test(content) ? 'object' : 'method';

                if (current) {
                    items.push(current);
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
