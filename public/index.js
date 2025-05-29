// Main application logic will go here

// Simple in-memory storage for notes
let notes = [
    { id: 1, title: 'Welcome to MonoNote!', content: 'This is your first note. You can edit or delete it.', date: 'Apr 23, 2024', tags: ['getting-started', 'help'], pinned: true },
    { id: 2, title: 'My second note', content: 'Just another note to test the list.', date: 'Apr 24, 2024', tags: ['test'], pinned: false },
    { id: 3, title: 'Idea for a new feature', content: 'Implement tag filtering and search functionality.', date: 'Apr 25, 2024', tags: ['ideas', 'development'], pinned: true }
];

console.log('Script started');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    const appView = document.getElementById('app-view');
    console.log('app-view element:', appView);

    // Create Views - Get them if they exist, create if not (handle initial load vs dynamic creation)
    let notesListView = document.getElementById('notes-list-view');
    let editNoteView = document.getElementById('edit-note-view');
    let menuView = document.getElementById('menu-view');
    let searchView = document.getElementById('search-view');

    // If views don't exist, create and append them
    if (!notesListView) {
        console.log('Creating notesListView');
        notesListView = document.createElement('div');
        notesListView.id = 'notes-list-view';
        appView.appendChild(notesListView);
        console.log('notesListView appended', notesListView);

        // Create Notes List Header
        const notesListHeader = document.createElement('div');
        notesListHeader.id = 'notes-list-header';
        notesListView.appendChild(notesListHeader); // Append header first
        console.log('notesListHeader appended', notesListHeader);

        const notesHeading = document.createElement('h2');
        notesHeading.textContent = 'Notes';
        notesListHeader.appendChild(notesHeading);
        console.log('notesHeading appended', notesHeading);

        const menuToggle = document.createElement('button');
        menuToggle.textContent = '☰'; // Placeholder hamburger icon
        menuToggle.id = 'menu-toggle';
        notesListHeader.appendChild(menuToggle);
         console.log('menuToggle appended', menuToggle);

         // Search bar in Notes List view
        const searchBarNotesList = document.createElement('input');
        searchBarNotesList.type = 'text';
        searchBarNotesList.placeholder = 'Search notes';
        notesListView.appendChild(searchBarNotesList);
         console.log('searchBarNotesList appended', searchBarNotesList);

         // Tag filter placeholder
        const tagFilter = document.createElement('div');
        tagFilter.textContent = 'Tag 1'; // Placeholder for tag filter
        // Add a class to style this placeholder if needed
        // tagFilter.classList.add('tag-filter-placeholder');
        notesListView.appendChild(tagFilter);
         console.log('tagFilter appended', tagFilter);

         // Container for notes list
        const notesList = document.createElement('div');
        notesList.id = 'notes-list';
        notesListView.appendChild(notesList);
         console.log('notesList appended', notesList);

         // Add New Note button
        const addNewNoteButton = document.createElement('button');
        addNewNoteButton.textContent = '+ Add New Note';
        addNewNoteButton.id = 'add-new-note';
        notesListView.appendChild(addNewNoteButton);
         console.log('addNewNoteButton appended', addNewNoteButton);
    }
    console.log('notesListView state after creation/check:', notesListView);

    if (!editNoteView) {
        console.log('Creating editNoteView');
        editNoteView = document.createElement('div');
        editNoteView.id = 'edit-note-view';
        appView.appendChild(editNoteView);
        console.log('editNoteView appended', editNoteView);

        // Header for Edit Note View
        const editNoteHeader = document.createElement('div');
        editNoteHeader.id = 'edit-note-header';
        editNoteView.appendChild(editNoteHeader);
         console.log('editNoteHeader appended', editNoteHeader);

        const backButton = document.createElement('button');
        backButton.textContent = '←';
        editNoteHeader.appendChild(backButton);
         console.log('backButton appended', backButton);

        const headerIcons = document.createElement('div');
        headerIcons.id = 'edit-note-header-icons';
        editNoteHeader.appendChild(headerIcons);
         console.log('headerIcons appended', headerIcons);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️'; // Placeholder delete icon
        // deleteButton.classList.add('fa-trash'); // Add class for styling if using font awesome
        headerIcons.appendChild(deleteButton);
         console.log('deleteButton appended', deleteButton);

        const historyButton = document.createElement('button');
        historyButton.textContent = '🕒'; // Placeholder history icon
        headerIcons.appendChild(historyButton);
         console.log('historyButton appended', historyButton);

         // Note details
        const noteTitleInput = document.createElement('input');
        noteTitleInput.type = 'text';
        noteTitleInput.placeholder = 'Note title';
        editNoteView.appendChild(noteTitleInput);
         console.log('noteTitleInput appended', noteTitleInput);

        const noteDate = document.createElement('div');
        noteDate.id = 'note-date';
        editNoteView.appendChild(noteDate);
         console.log('noteDate appended', noteDate);

        const noteContentArea = document.createElement('textarea');
        noteContentArea.placeholder = 'Note content';
        editNoteView.appendChild(noteContentArea);
         console.log('noteContentArea appended', noteContentArea);

         // Tag management section
        const tagManagement = document.createElement('div');
        tagManagement.id = 'tag-management';
        editNoteView.appendChild(tagManagement);
         console.log('tagManagement appended', tagManagement);

        const tagsLabel = document.createElement('label');
        tagsLabel.textContent = 'Tags:';
        tagManagement.appendChild(tagsLabel);
         console.log('tagsLabel appended', tagsLabel);

        const tagsDisplay = document.createElement('div');
        tagsDisplay.id = 'tags-display';
        tagManagement.appendChild(tagsDisplay);
         console.log('tagsDisplay appended', tagsDisplay);

        const addTagInput = document.createElement('input');
        addTagInput.type = 'text';
        addTagInput.placeholder = 'Add tag...';
        addTagInput.id = 'add-tag-input';
        tagManagement.appendChild(addTagInput);
         console.log('addTagInput appended', addTagInput);
    }
    console.log('editNoteView state after creation/check:', editNoteView);

     if (!menuView) {
        console.log('Creating menuView');
        menuView = document.createElement('div');
        menuView.id = 'menu-view';
        appView.appendChild(menuView);
         console.log('menuView appended', menuView);

        const menuHeader = document.createElement('div');
        menuHeader.id = 'menu-header';
        menuView.appendChild(menuHeader);
         console.log('menuHeader appended', menuHeader);

        const closeMenuButton = document.createElement('button');
        closeMenuButton.textContent = '✕'; // Placeholder close icon
        menuHeader.appendChild(closeMenuButton);
         console.log('closeMenuButton appended', closeMenuButton);

        const menuNav = document.createElement('nav');
        menuNav.id = 'menu-nav';
        menuView.appendChild(menuNav);
         console.log('menuNav appended', menuNav);

        // Add menu items (placeholders)
        const menuItemsContent = ['All Notes', 'Tag 1', 'Tag 2', 'Folder', 'Settings'];
        menuItemsContent.forEach(itemText => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.textContent = itemText;
            menuNav.appendChild(menuItem);
             console.log('menuItem appended', menuItem);
        });
     }
     console.log('menuView state after creation/check:', menuView);

    if (!searchView) {
        console.log('Creating searchView');
        searchView = document.createElement('div');
        searchView.id = 'search-view';
        appView.appendChild(searchView);
        console.log('searchView appended', searchView);

         // Header for Search View
        const searchHeader = document.createElement('div');
        searchHeader.id = 'search-header';
        searchView.appendChild(searchHeader);
        console.log('searchHeader appended', searchHeader);

        const backButtonSearch = document.createElement('button');
        backButtonSearch.textContent = '←'; // Back icon
        searchHeader.appendChild(backButtonSearch);
        console.log('backButtonSearch appended', backButtonSearch);

        const searchViewInput = document.createElement('input');
        searchViewInput.type = 'text';
        searchViewInput.placeholder = 'Search notes';
        searchHeader.appendChild(searchViewInput);
        console.log('searchViewInput appended', searchViewInput);

        const searchResultsList = document.createElement('div');
        searchResultsList.id = 'search-results-list';
        searchView.appendChild(searchResultsList);
        console.log('searchResultsList appended', searchResultsList);
    }
     console.log('searchView state after creation/check:', searchView);

    // --- View Switching Functions ---

    // Function to show Notes List View and hide other views
    const showNotesListView = () => {
        console.log('Showing Notes List View');
        notesListView.style.display = 'flex';
        editNoteView.style.display = 'none';
        menuView.style.display = 'none';
        searchView.style.display = 'none';
         renderNotesList(); // Re-render notes list when showing
    };

    // Function to show Edit Note View and hide other views
    const showEditNoteView = (note) => {
        console.log('Showing Edit Note View for note:', note);
        notesListView.style.display = 'none';
        editNoteView.style.display = 'flex';
        menuView.style.display = 'none';
        searchView.style.display = 'none';
        populateEditNoteView(note); // Populate edit view with note data
    };

     // Function to show Menu View and hide other views (except potentially Notes List on larger screens)
     const showMenuView = () => {
        console.log('Showing Menu View');
        // Depending on desired behavior, Notes List might stay visible or be hidden
        notesListView.style.display = 'none'; // Hide Notes List when menu is open
        editNoteView.style.display = 'none';
        menuView.style.display = 'flex'; // Use flex to maintain layout from CSS
        searchView.style.display = 'none';
     };

     // Function to show Search View and hide other views
     const showSearchView = () => {
        console.log('Showing Search View');
        notesListView.style.display = 'none';
        editNoteView.style.display = 'none';
        menuView.style.display = 'none';
        searchView.style.display = 'flex'; // Use flex to maintain layout from CSS
        // Optionally, focus the search input in the search view when showing it
        // searchView.querySelector('input[type="text"]').focus();
    };

    // --- Rendering and Functionality ---

    // Function to render the notes list
    const renderNotesList = (filter = 'all') => {
        console.log('Rendering notes list with filter:', filter);
        const notesList = document.getElementById('notes-list');
        if (!notesList) {
            console.error('Notes list container not found.');
            return;
        }
        notesList.innerHTML = ''; // Clear current list

        let notesToRender = notes;

        // Apply filtering based on the filter parameter
        if (filter === 'all') {
            notesToRender = notes; // Show all notes
        } else if (filter.startsWith('tag:')) {
            const tag = filter.substring(4);
            // Filter by notes containing this tag
            notesToRender = notes.filter(note => note.tags && note.tags.includes(tag));
             console.log(`Filtering by tag: ${tag}`);
        } // Add more filter types (e.g., folder) here

        // Sort notes: pinned notes first, then by date (or other criteria)
        notesToRender.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1; // a comes first if pinned and b is not
            if (!a.pinned && b.pinned) return 1; // b comes first if pinned and a is not
            // If both are pinned or neither are, sort by date (placeholder, requires date parsing)
            // For now, just maintain original order if pin status is the same
            return 0;
        });

        notesToRender.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');
            noteItem.dataset.noteId = note.id; // Store note id on the element

            const title = document.createElement('div');
            title.classList.add('note-title');
            title.textContent = note.title;

            // Add pinned indicator if the note is pinned
            if (note.pinned) {
                const pinnedIndicator = document.createElement('span');
                pinnedIndicator.textContent = '📌 '; // Pin icon/character
                pinnedIndicator.style.marginRight = '5px';
                pinnedIndicator.style.fontWeight = 'normal'; // Don't make the pin bold
                title.prepend(pinnedIndicator); // Add pin to the beginning of the title
            }

            const contentPreview = document.createElement('div');
            contentPreview.classList.add('note-content-preview');
            // Display only the first few lines or characters as preview
            const previewText = note.content.split('\n')[0] || note.content.substring(0, 100) + '...';
            contentPreview.textContent = previewText;

            noteItem.appendChild(title);
            noteItem.appendChild(contentPreview);
            notesList.appendChild(noteItem);
             console.log('Note item appended:', noteItem);

            // Event listener for clicking a note item
            noteItem.addEventListener('click', () => {
                console.log('Clicked on note:', note.title);
                showEditNoteView(note);
            });
        });
    };

    // Function to populate the Edit Note view
    const populateEditNoteView = (note) => {
        console.log('Populating Edit Note View with note:', note);
        const noteTitleInput = editNoteView.querySelector('input[type="text"]');
        const noteDateElement = editNoteView.querySelector('#note-date');
        const noteContentArea = editNoteView.querySelector('textarea');
        const deleteButton = editNoteView.querySelector('#edit-note-header button:nth-child(2)'); // Targeting the delete icon placeholder
        const tagsDisplay = editNoteView.querySelector('#tags-display');

        // Store the current note's ID on the edit view for saving later
        editNoteView.dataset.editingNoteId = note ? note.id : null;

        if (note) {
            noteTitleInput.value = note.title;
            noteDateElement.textContent = note.date;
            noteContentArea.value = note.content;
             // Show delete button for existing notes
            // if (deleteButton) deleteButton.style.display = 'inline-block'; // Assuming delete button exists and is hidden by default
        } else {
            // Clear fields for a new note
            noteTitleInput.value = '';
            // Set current date for a new note
            const today = new Date();
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            noteDateElement.textContent = today.toLocaleDateString(undefined, options);
            noteContentArea.value = '';
            // Hide delete button for new notes
            // if (deleteButton) deleteButton.style.display = 'none';
        }

        // Populate tags
        if (tagsDisplay) {
            tagsDisplay.innerHTML = ''; // Clear current tags
            if (note && note.tags) {
                note.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.classList.add('tag'); // Add a class for styling tags
                    tagSpan.textContent = tag;
                    tagsDisplay.appendChild(tagSpan);
                });
            }
        }
    };

    // Function to save a note
    const saveNote = () => {
        console.log('Attempting to save note...');
        const editingNoteId = editNoteView.dataset.editingNoteId;
        const noteTitleInput = editNoteView.querySelector('input[type="text"]');
        const noteDateElement = editNoteView.querySelector('#note-date');
        const noteContentArea = editNoteView.querySelector('textarea');
        const tagsDisplay = editNoteView.querySelector('#tags-display');

        // Get tags from the displayed spans
        const tags = tagsDisplay ? Array.from(tagsDisplay.querySelectorAll('.tag')).map(span => span.textContent) : [];

        if (!noteTitleInput.value.trim() && !noteContentArea.value.trim()) {
            console.log('Note is empty, not saving.');
            // Optionally alert the user or handle empty notes differently
             // showNotesListView(); // Go back without saving if empty - removing automatic navigation
            return;
        }

        const updatedNote = {
            id: editingNoteId ? parseInt(editingNoteId) : Date.now(), // Use ID if editing, otherwise generate a simple one
            title: noteTitleInput.value.trim() || 'Untitled Note', // Default title if empty
            content: noteContentArea.value.trim(),
            date: noteDateElement.textContent, // Keep the existing date for now, update on save for new notes later
            tags: tags // Include tags in the saved note
        };

        if (editingNoteId) {
            // Update existing note
            notes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
            console.log('Note updated:', updatedNote);
        } else {
            // Add new note
            notes.push(updatedNote);
            console.log('New note added:', updatedNote);
             // Update the editingNoteId dataset for the newly created note
             editNoteView.dataset.editingNoteId = updatedNote.id;
        }

        // After saving, DO NOT automatically go back to the notes list
        // showNotesListView(); // Removed automatic navigation
         console.log('Note saved.');
    };

    // Function to delete a note
    const deleteNote = () => {
        console.log('Attempting to delete note...');
        const editingNoteId = editNoteView.dataset.editingNoteId;
        if (editingNoteId) {
            notes = notes.filter(note => note.id !== parseInt(editingNoteId));
            console.log('Note deleted with ID:', editingNoteId);
            showNotesListView(); // Go back after deleting
        } else {
            console.log('No note ID to delete.');
        }
    };

    // Function to filter search results
    const filterSearchResults = (searchTerm) => {
        console.log('Filtering search results for:', searchTerm);
        const searchResultsList = document.getElementById('search-results-list');
        if (!searchResultsList) {
             console.error('Search results list container not found.');
             return;
        }
        searchResultsList.innerHTML = ''; // Clear current results

        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        if (lowerCaseSearchTerm.length === 0) {
            // Optionally display recent searches or a message when search term is empty
            return;
        }

        const filteredNotes = notes.filter(note => {
            return note.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                   note.content.toLowerCase().includes(lowerCaseSearchTerm) ||
                   (note.tags && note.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))); // Include tags in search
        });

        filteredNotes.forEach(note => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('note-item'); // Reuse note-item class for styling
            resultItem.dataset.noteId = note.id; // Store note id

            const title = document.createElement('div');
            title.classList.add('note-title');
            title.textContent = note.title;

            // Display a preview highlighting the search term (basic implementation)
            const previewText = note.content.replace(new RegExp(lowerCaseSearchTerm, 'gi'), match => `**${match}**`); // Basic highlighting
            // Ensure previewText is treated as HTML for highlighting
            const contentPreview = document.createElement('div');
            contentPreview.classList.add('note-content-preview');
            contentPreview.innerHTML = previewText.substring(0, 150) + (previewText.length > 150 ? '...' : ''); // Limit preview length

            resultItem.appendChild(title);
            resultItem.appendChild(contentPreview);
            searchResultsList.appendChild(resultItem);
             console.log('Search result item appended:', resultItem);

             // Event listener for clicking a search result item
            resultItem.addEventListener('click', () => {
                console.log('Clicked on search result:', note.title);
                // Find the full note object from the notes array
                const clickedNote = notes.find(n => n.id === note.id);
                if (clickedNote) {
                    showEditNoteView(clickedNote); // Go to edit view with the selected note
                }
            });
        });
    };

    // --- Event Listeners ---

    // Get elements *after* they are created or retrieved
    const searchBarNotesList = notesListView.querySelector('input[type="text"]');
    const tagFilter = notesListView.querySelector('#notes-list-view > div:nth-child(3)');
    const addNewNoteButton = notesListView.querySelector('#add-new-note');
    const backButtonEdit = editNoteView.querySelector('#edit-note-header button:first-child');
    const deleteButtonEdit = editNoteView.querySelector('#edit-note-header button:nth-child(2)'); // Assuming delete is the second button
    const historyButtonEdit = editNoteView.querySelector('#edit-note-header button:nth-child(3)'); // Assuming history is the third button
    const menuToggle = notesListView.querySelector('#menu-toggle');
    const closeMenuButton = menuView.querySelector('#menu-header button:first-child');
    const backButtonSearch = searchView.querySelector('#search-header button:first-child');
    const searchViewInput = searchView.querySelector('input[type="text"]');
    const menuItems = menuView.querySelectorAll('.menu-item');
    const addTagInput = editNoteView.querySelector('#add-tag-input');


    // Basic event listener for search input in Notes List view to show Search view
    if (searchBarNotesList) {
        searchBarNotesList.addEventListener('focus', () => {
            showSearchView();
            // Copy the current search term to the search view input and trigger a search
            if (searchViewInput) {
                searchViewInput.value = searchBarNotesList.value;
                filterSearchResults(searchViewInput.value); // Trigger search immediately
                searchViewInput.focus(); // Focus the search input in the search view
            }
        });
    }

    // Basic event listener for tag filter
    if (tagFilter) {
        tagFilter.addEventListener('click', () => {
            console.log('Filtering by Tag 1');
            // In a real application, this would filter the notes list by Tag 1
            alert('Filtering by Tag 1 (placeholder)'); // Provide visual feedback
            // For now, just re-render all notes as a placeholder for filtering
            renderNotesList();
        });
    }

    // Event listener for Add New Note button
    if (addNewNoteButton) {
        addNewNoteButton.addEventListener('click', () => {
            console.log('Add New Note button clicked');
            showEditNoteView(null); // Pass null to indicate a new note
        });
    }

    // Event listener for the back button in Edit Note View
    if (backButtonEdit) {
        backButtonEdit.addEventListener('click', () => {
            console.log('Back button clicked from Edit View');
            // Optionally save changes before going back
            // saveNote(); // Consider autosave handling here instead
            showNotesListView();
        });
    }

    // Event listener for the delete button in Edit Note View
     if (deleteButtonEdit) { // Ensure the button exists
         deleteButtonEdit.addEventListener('click', () => {
             console.log('Delete button clicked from Edit View');
             if (confirm('Are you sure you want to delete this note?')) {
                 deleteNote();
             }
         });
     }

     // Event listener for the history button in Edit Note View
      if (historyButtonEdit) { // Ensure the button exists
          historyButtonEdit.addEventListener('click', () => {
              console.log('History button clicked from Edit View');
              alert('Version history (placeholder)'); // Indicate functionality
          });
      }

    // Event listeners for Menu View toggle
    if (menuToggle) {
     menuToggle.addEventListener('click', () => {
        console.log('Menu toggle clicked');
        showMenuView();
    });
    }

    if (closeMenuButton) {
     closeMenuButton.addEventListener('click', () => {
        console.log('Close menu button clicked');
        showNotesListView(); // Go back to Notes List when menu is closed
     });
    }

     // Event listeners for Menu Items
     if (menuItems) {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const filterText = item.textContent.trim(); // Get text content
                let filter = 'all'; // Default filter

                if (filterText === 'All Notes') {
                    filter = 'all';
                } else if (filterText.startsWith('Tag ')) {
                    filter = 'tag:' + filterText.substring(4).toLowerCase(); // e.g., 'tag:1' or 'tag:2'
                } else if (filterText === 'Folder') {
                    // Handle folder filtering (placeholder for now)
                    console.log('Folder menu item clicked (placeholder)');
                     filter = 'all'; // Default to all for now
                } else if (filterText === 'Settings') {
                    // Handle Settings (placeholder)
                    console.log('Settings menu item clicked (placeholder)');
                     filter = 'all'; // Default to all for now
                }

                console.log(`Menu item clicked, applying filter: ${filter}`);
                showNotesListView(); // Go back to notes list after selecting menu item
                renderNotesList(filter); // Render notes with the selected filter
            });
        });
    }

    // Event listener for the back button in Search View
    if (backButtonSearch) {
        backButtonSearch.addEventListener('click', () => {
            console.log('Back button clicked from Search View');
            showNotesListView();
            // Clear the search input in the Notes List view when returning
            if (searchBarNotesList) {
                 searchBarNotesList.value = '';
            }
        });
    }

    // Event listener for search input in Search view
    if (searchViewInput) {
        searchViewInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value;
            console.log('Search View search term:', searchTerm);
            filterSearchResults(searchTerm); // Filter results on input
        });
    }

    // Basic auto-save functionality (saves 1 second after typing stops)
    let saveTimer; // Declare saveTimer outside the event listener
    if (editNoteView) {
        editNoteView.addEventListener('input', () => {
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => {
                console.log('Auto-saving...');
                saveNote();
            }, 1000); // Save after 1 second of inactivity
        });
    }

    // Event listener for adding tags in Edit Note view
    if (addTagInput) {
        addTagInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                const newTag = addTagInput.value.trim().toLowerCase();
                if (newTag) {
                    const editingNoteId = editNoteView.dataset.editingNoteId;
                    const noteToUpdate = notes.find(note => note.id === parseInt(editingNoteId));
                    if (noteToUpdate) {
                        if (!noteToUpdate.tags) {
                            noteToUpdate.tags = [];
                        }
                        if (!noteToUpdate.tags.includes(newTag)) {
                            noteToUpdate.tags.push(newTag);
                            // Re-render tags display
                            const tagsDisplay = editNoteView.querySelector('#tags-display');
                            if (tagsDisplay) {
                                const tagSpan = document.createElement('span');
                                tagSpan.classList.add('tag');
                                tagSpan.textContent = newTag;
                                tagsDisplay.appendChild(tagSpan);
                            }
                        }
                        addTagInput.value = ''; // Clear input field
                         // Auto-save after adding a tag
                        // Consider if you want to auto-save on every tag addition or only when the note content/title changes
                        // saveNote();
                    } else {
                        console.log('Could not find note to add tag.');
                    }
                } else {
                     console.log('Tag input is empty.');
                }
            }
        });
    }

    // Initial state: show notes list
    showNotesListView();
}); 