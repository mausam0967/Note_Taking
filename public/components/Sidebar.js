class Sidebar {
    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'sidebar';
        this.menuView = null;
        this.init();
    }

    init() {
        // Create menu view
        this.menuView = document.createElement('div');
        this.menuView.id = 'menu-view';
        this.element.appendChild(this.menuView);

        // Create menu header
        const menuHeader = document.createElement('div');
        menuHeader.id = 'menu-header';
        this.menuView.appendChild(menuHeader);

        // Create close button
        const closeMenuButton = document.createElement('button');
        closeMenuButton.textContent = '✕';
        menuHeader.appendChild(closeMenuButton);

        // Create menu navigation
        const menuNav = document.createElement('nav');
        menuNav.id = 'menu-nav';
        this.menuView.appendChild(menuNav);

        // Add menu items
        const menuItemsContent = ['All Notes', 'Tag 1', 'Tag 2', 'Folder', 'Settings'];
        menuItemsContent.forEach(itemText => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.textContent = itemText;
            menuNav.appendChild(menuItem);
        });

        // Add event listeners
        this.addEventListeners();
    }

    addEventListeners() {
        const closeMenuButton = this.menuView.querySelector('#menu-header button');
        const menuItems = this.menuView.querySelectorAll('.menu-item');

        if (closeMenuButton) {
            closeMenuButton.addEventListener('click', () => {
                this.onCloseMenu();
            });
        }

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const filterText = item.textContent.trim();
                this.onMenuItemClick(filterText);
            });
        });
    }

    onCloseMenu() {
        // Dispatch custom event for menu close
        const event = new CustomEvent('menuClose');
        this.element.dispatchEvent(event);
    }

    onMenuItemClick(filterText) {
        // Dispatch custom event for menu item click
        const event = new CustomEvent('menuItemClick', {
            detail: { filter: this.getFilterFromText(filterText) }
        });
        this.element.dispatchEvent(event);
    }

    getFilterFromText(text) {
        if (text === 'All Notes') return 'all';
        if (text.startsWith('Tag ')) return 'tag:' + text.substring(4).toLowerCase();
        if (text === 'Folder') return 'folder';
        if (text === 'Settings') return 'settings';
        return 'all';
    }

    render() {
        return this.element;
    }
}

export default Sidebar; 