import Sidebar from './components/Sidebar.js';
import NotesList from './components/NotesList.js';
import EditNote from './components/EditNote.js';
import SearchView from './components/SearchView.js';

// Main application logic will go here

// Simple in-memory storage for notes
let notes = []; // Initialize with an empty array; data will be loaded from local storage

// Function to save notes to Local Storage
const saveNotesToLocalStorage = () => {
    try {
        const notesJson = JSON.stringify(notes);
        localStorage.setItem('mononote-notes', notesJson);
        console.log('Notes saved to Local Storage.');
    } catch (e) {
        console.error('Error saving notes to Local Storage:', e);
    }
};

// Function to load notes from Local Storage
const loadNotesFromLocalStorage = () => {
    try {
        const notesJson = localStorage.getItem('mononote-notes');
        if (notesJson) {
            notes = JSON.parse(notesJson);
            console.log('Notes loaded from Local Storage.', notes);
        } else {
            console.log('No notes found in Local Storage, starting with default.');
             // Start with default notes if none are in local storage
             notes = [
                 { id: 1, title: 'Welcome to MonoNote!', content: 'This is your first note. You can edit or delete it.', date: 'Apr 23, 2024', tags: ['getting-started', 'help'], pinned: true },
                 { id: 2, title: 'My second note', content: 'Just another note to test the list.', date: 'Apr 24, 2024', tags: ['test'], pinned: false },
                 { id: 3, title: 'Idea for a new feature', content: 'Implement tag filtering and search functionality.', date: 'Apr 25, 2024', tags: ['ideas', 'development'], pinned: true }
             ];
        }
    } catch (e) {
        console.error('Error loading notes from Local Storage:', e);
         // Fallback to default notes if loading fails
         notes = [
             { id: 1, title: 'Welcome to MonoNote!', content: 'This is your first note. You can edit or delete it.', date: 'Apr 23, 2024', tags: ['getting-started', 'help'], pinned: true },
             { id: 2, title: 'My second note', content: 'Just another note to test the list.', date: 'Apr 24, 2024', tags: ['test'], pinned: false },
             { id: 3, title: 'Idea for a new feature', content: 'Implement tag filtering and search functionality.', date: 'Apr 25, 2024', tags: ['ideas', 'development'], pinned: true }
         ];
    }
};

console.log('Script started');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    loadNotesFromLocalStorage(); // Load notes when the DOM is ready

    const appContainer = document.getElementById('app-container');
    const appView = document.getElementById('app-view');

    // Initialize components
    const sidebar = new Sidebar();
    const notesList = new NotesList(notes);
    const editNote = new EditNote();
    const searchView = new SearchView();

    // Add components to the DOM
    appContainer.insertBefore(sidebar.render(), appView);
    appView.appendChild(notesList.render());
    appView.appendChild(editNote.render());
    appView.appendChild(searchView.render());

    // Initial state
    showNotesListView();

    // View switching functions
    function showNotesListView() {
        notesList.render().style.display = 'flex';
        editNote.render().style.display = 'none';
        searchView.render().style.display = 'none';
        notesList.renderNotes(notes);
    }

    function showEditNoteView(note) {
        notesList.render().style.display = 'none';
        editNote.render().style.display = 'flex';
        searchView.render().style.display = 'none';
        editNote.populateNote(note);
    }

    function showSearchView() {
        notesList.render().style.display = 'none';
        editNote.render().style.display = 'none';
        searchView.render().style.display = 'flex';
    }

    // Event Listeners
    // Sidebar events
    sidebar.render().addEventListener('menuClose', () => {
        showNotesListView();
    });

    sidebar.render().addEventListener('menuItemClick', (event) => {
        const filter = event.detail.filter;
        showNotesListView();
        notesList.renderNotes(notes, filter);
    });

    // NotesList events
    notesList.render().addEventListener('searchFocus', () => {
        showSearchView();
    });

    notesList.render().addEventListener('noteClick', (event) => {
        showEditNoteView(event.detail.note);
    });

    notesList.render().addEventListener('addNoteClick', () => {
        showEditNoteView(null);
    });

    // EditNote events
    editNote.render().addEventListener('backClick', () => {
        showNotesListView();
    });

    editNote.render().addEventListener('deleteClick', () => {
        if (confirm('Are you sure you want to delete this note?')) {
            const noteId = editNote.currentNote?.id;
            if (noteId) {
                notes = notes.filter(note => note.id !== noteId);
                saveNotesToLocalStorage();
                showNotesListView();
            }
        }
    });

    editNote.render().addEventListener('autoSave', () => {
        const noteData = editNote.getNoteData();
        const existingNoteIndex = notes.findIndex(note => note.id === noteData.id);
        
        if (existingNoteIndex !== -1) {
            notes[existingNoteIndex] = noteData;
        } else {
            notes.push(noteData);
        }
        
        saveNotesToLocalStorage();
    });

    editNote.render().addEventListener('addTag', (event) => {
        const tag = event.detail.tag;
        const noteData = editNote.getNoteData();
        if (!noteData.tags.includes(tag)) {
            noteData.tags.push(tag);
            editNote.populateNote(noteData);
            saveNotesToLocalStorage();
        }
    });

    editNote.render().addEventListener('removeTag', (event) => {
        const tag = event.detail.tag;
        const noteData = editNote.getNoteData();
        noteData.tags = noteData.tags.filter(t => t !== tag);
        editNote.populateNote(noteData);
        saveNotesToLocalStorage();
    });

    // SearchView events
    searchView.render().addEventListener('backClick', () => {
        showNotesListView();
    });

    searchView.render().addEventListener('searchInput', (event) => {
        const searchTerm = event.detail.searchTerm.toLowerCase();
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm) ||
            (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
        searchView.renderResults(filteredNotes);
    });

    searchView.render().addEventListener('resultClick', (event) => {
        showEditNoteView(event.detail.note);
    });
}); 