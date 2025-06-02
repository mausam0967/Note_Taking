class SearchView {
    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'search-view';
        this.init();
    }

    init() {
        // Create header
        const header = document.createElement('div');
        header.id = 'search-header';
        this.element.appendChild(header);

        // Back button
        const backButton = document.createElement('button');
        backButton.textContent = '←';
        header.appendChild(backButton);

        // Search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search notes';
        header.appendChild(searchInput);

        // Search results container
        const resultsList = document.createElement('div');
        resultsList.id = 'search-results-list';
        this.element.appendChild(resultsList);

        this.addEventListeners();
    }

    addEventListeners() {
        const backButton = this.element.querySelector('#search-header button');
        const searchInput = this.element.querySelector('#search-header input');

        if (backButton) {
            backButton.addEventListener('click', () => {
                this.onBackClick();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                this.onSearchInput(event.target.value);
            });
        }
    }

    onBackClick() {
        const event = new CustomEvent('backClick');
        this.element.dispatchEvent(event);
    }

    onSearchInput(searchTerm) {
        const event = new CustomEvent('searchInput', {
            detail: { searchTerm }
        });
        this.element.dispatchEvent(event);
    }

    renderResults(results) {
        const resultsList = this.element.querySelector('#search-results-list');
        if (!resultsList) return;

        resultsList.innerHTML = '';

        results.forEach(note => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('note-item');
            resultItem.dataset.noteId = note.id;

            const title = document.createElement('div');
            title.classList.add('note-title');
            title.textContent = note.title;

            const contentPreview = document.createElement('div');
            contentPreview.classList.add('note-content-preview');
            const previewText = note.content.substring(0, 150) + (note.content.length > 150 ? '...' : '');
            contentPreview.textContent = previewText;

            resultItem.appendChild(title);
            resultItem.appendChild(contentPreview);
            resultsList.appendChild(resultItem);

            resultItem.addEventListener('click', () => {
                this.onResultClick(note);
            });
        });
    }

    onResultClick(note) {
        const event = new CustomEvent('resultClick', {
            detail: { note }
        });
        this.element.dispatchEvent(event);
    }

    render() {
        return this.element;
    }
}

export default SearchView; 