class EditNote {
    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'edit-note-view';
        this.currentNote = null;
        this.init();
    }

    init() {
        // Create header
        const header = document.createElement('div');
        header.id = 'edit-note-header';
        this.element.appendChild(header);

        // Back button
        const backButton = document.createElement('button');
        backButton.textContent = '←';
        header.appendChild(backButton);

        // Header icons container
        const headerIcons = document.createElement('div');
        headerIcons.id = 'edit-note-header-icons';
        header.appendChild(headerIcons);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        headerIcons.appendChild(deleteButton);

        // History button
        const historyButton = document.createElement('button');
        historyButton.textContent = '🕒';
        headerIcons.appendChild(historyButton);

        // Title input
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Note title';
        this.element.appendChild(titleInput);

        // Date display
        const dateDisplay = document.createElement('div');
        dateDisplay.id = 'note-date';
        this.element.appendChild(dateDisplay);

        // Content textarea
        const contentArea = document.createElement('textarea');
        contentArea.placeholder = 'Note content';
        this.element.appendChild(contentArea);

        // Tag management section
        const tagManagement = document.createElement('div');
        tagManagement.id = 'tag-management';
        this.element.appendChild(tagManagement);

        const tagsLabel = document.createElement('label');
        tagsLabel.textContent = 'Tags:';
        tagManagement.appendChild(tagsLabel);

        const tagsDisplay = document.createElement('div');
        tagsDisplay.id = 'tags-display';
        tagManagement.appendChild(tagsDisplay);

        const addTagInput = document.createElement('input');
        addTagInput.type = 'text';
        addTagInput.placeholder = 'Add tag...';
        addTagInput.id = 'add-tag-input';
        tagManagement.appendChild(addTagInput);

        this.addEventListeners();
    }

    addEventListeners() {
        const backButton = this.element.querySelector('#edit-note-header button:first-child');
        const deleteButton = this.element.querySelector('#edit-note-header button:nth-child(2)');
        const historyButton = this.element.querySelector('#edit-note-header button:nth-child(3)');
        const addTagInput = this.element.querySelector('#add-tag-input');

        if (backButton) {
            backButton.addEventListener('click', () => {
                this.onBackClick();
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                this.onDeleteClick();
            });
        }

        if (historyButton) {
            historyButton.addEventListener('click', () => {
                this.onHistoryClick();
            });
        }

        if (addTagInput) {
            addTagInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    this.onAddTag(addTagInput.value.trim());
                    addTagInput.value = '';
                }
            });
        }

        // Auto-save functionality
        let saveTimer;
        this.element.addEventListener('input', () => {
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => {
                this.onAutoSave();
            }, 1000);
        });
    }

    onBackClick() {
        const event = new CustomEvent('backClick');
        this.element.dispatchEvent(event);
    }

    onDeleteClick() {
        const event = new CustomEvent('deleteClick');
        this.element.dispatchEvent(event);
    }

    onHistoryClick() {
        const event = new CustomEvent('historyClick');
        this.element.dispatchEvent(event);
    }

    onAddTag(tag) {
        if (!tag) return;
        
        const event = new CustomEvent('addTag', {
            detail: { tag: tag.toLowerCase() }
        });
        this.element.dispatchEvent(event);
    }

    onAutoSave() {
        const event = new CustomEvent('autoSave');
        this.element.dispatchEvent(event);
    }

    populateNote(note) {
        this.currentNote = note;
        const titleInput = this.element.querySelector('input[type="text"]');
        const dateDisplay = this.element.querySelector('#note-date');
        const contentArea = this.element.querySelector('textarea');
        const tagsDisplay = this.element.querySelector('#tags-display');

        if (note) {
            titleInput.value = note.title;
            dateDisplay.textContent = note.date;
            contentArea.value = note.content;
            
            // Clear and repopulate tags
            tagsDisplay.innerHTML = '';
            if (note.tags) {
                note.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.classList.add('tag');
                    tagSpan.textContent = tag;

                    const removeButton = document.createElement('span');
                    removeButton.classList.add('remove-tag');
                    removeButton.textContent = ' x';
                    tagSpan.appendChild(removeButton);

                    removeButton.addEventListener('click', () => {
                        this.onRemoveTag(tag);
                    });

                    tagsDisplay.appendChild(tagSpan);
                });
            }
        } else {
            // Clear fields for new note
            titleInput.value = '';
            const today = new Date();
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            dateDisplay.textContent = today.toLocaleDateString(undefined, options);
            contentArea.value = '';
            tagsDisplay.innerHTML = '';
        }
    }

    onRemoveTag(tag) {
        const event = new CustomEvent('removeTag', {
            detail: { tag }
        });
        this.element.dispatchEvent(event);
    }

    getNoteData() {
        const titleInput = this.element.querySelector('input[type="text"]');
        const contentArea = this.element.querySelector('textarea');
        const tagsDisplay = this.element.querySelector('#tags-display');
        const dateDisplay = this.element.querySelector('#note-date');

        return {
            id: this.currentNote ? this.currentNote.id : Date.now(),
            title: titleInput.value.trim() || 'Untitled Note',
            content: contentArea.value.trim(),
            date: dateDisplay.textContent,
            tags: Array.from(tagsDisplay.querySelectorAll('.tag')).map(span => 
                span.textContent.replace(' x', '').trim()
            )
        };
    }

    render() {
        return this.element;
    }
}

export default EditNote; 