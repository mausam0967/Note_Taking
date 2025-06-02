class NotesList {
    constructor(notes = []) {
        this.element = document.createElement('div');
        this.element.id = 'notes-list-view';
        this.notes = notes;
        this.init();
    }

    init() {
        // Create header
        const header = document.createElement('div');
        header.id = 'notes-list-header';
        this.element.appendChild(header);

        const title = document.createElement('h2');
        title.textContent = 'Notes';
        header.appendChild(title);

        // Create search bar
        const searchBar = document.createElement('input');
        searchBar.type = 'text';
        searchBar.placeholder = 'Search notes';
        this.element.appendChild(searchBar);

        // Create tag filter
        const tagFilter = document.createElement('div');
        tagFilter.textContent = 'Tag 1';
        this.element.appendChild(tagFilter);

        // Create notes list container
        const notesList = document.createElement('div');
        notesList.id = 'notes-list';
        this.element.appendChild(notesList);

        // Create Add New Note button
        const addButton = document.createElement('button');
        addButton.textContent = '+ Add New Note';
        addButton.id = 'add-new-note';
        this.element.appendChild(addButton);

        this.addEventListeners();
    }

    addEventListeners() {
        const searchBar = this.element.querySelector('input[type="text"]');
        const tagFilter = this.element.querySelector('#notes-list-view > div:nth-child(3)');
        const addButton = this.element.querySelector('#add-new-note');

        if (searchBar) {
            searchBar.addEventListener('focus', () => {
                this.onSearchFocus();
            });
        }

        if (tagFilter) {
            tagFilter.addEventListener('click', () => {
                this.onTagFilterClick();
            });
        }

        if (addButton) {
            addButton.addEventListener('click', () => {
                this.onAddNoteClick();
            });
        }
    }

    onSearchFocus() {
        const event = new CustomEvent('searchFocus');
        this.element.dispatchEvent(event);
    }

    onTagFilterClick() {
        const event = new CustomEvent('tagFilterClick');
        this.element.dispatchEvent(event);
    }

    onAddNoteClick() {
        const event = new CustomEvent('addNoteClick');
        this.element.dispatchEvent(event);
    }

    renderNotes(notes, filter = 'all') {
        const notesList = this.element.querySelector('#notes-list');
        if (!notesList) return;

        notesList.innerHTML = '';

        let notesToRender = notes;

        // Apply filtering
        if (filter.startsWith('tag:')) {
            const tag = filter.substring(4);
            notesToRender = notes.filter(note => note.tags && note.tags.includes(tag));
        }

        // Sort notes: pinned first
        notesToRender.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return 0;
        });

        notesToRender.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');
            noteItem.dataset.noteId = note.id;

            const title = document.createElement('div');
            title.classList.add('note-title');
            
            if (note.pinned) {
                const pinnedIndicator = document.createElement('span');
                pinnedIndicator.textContent = '📌 ';
                pinnedIndicator.style.marginRight = '5px';
                title.prepend(pinnedIndicator);
            }
            
            title.textContent = note.title;

            const contentPreview = document.createElement('div');
            contentPreview.classList.add('note-content-preview');
            const previewText = note.content.split('\n')[0] || note.content.substring(0, 100) + '...';
            contentPreview.textContent = previewText;

            noteItem.appendChild(title);
            noteItem.appendChild(contentPreview);
            notesList.appendChild(noteItem);

            noteItem.addEventListener('click', () => {
                this.onNoteClick(note);
            });
        });
    }

    onNoteClick(note) {
        const event = new CustomEvent('noteClick', {
            detail: { note }
        });
        this.element.dispatchEvent(event);
    }

    render() {
        return this.element;
    }
}

export default NotesList; 