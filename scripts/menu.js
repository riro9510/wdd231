function createNavbar() {
    const header = document.createElement('header');
    const title = document.createElement('h1');
    const img = document.createElement('img');
    img.setAttribute('src', 'images/Me.jpeg');
    img.setAttribute('alt', 'Ricardo Ramos');
    img.setAttribute('width', '100');  
    img.setAttribute('height', '100');
    header.append(img);
    title.textContent = 'Ricardo Ramos Olivares';
    header.appendChild(title); 
    const button = document.createElement('button');
    button.id = 'hamburger';
    button.className = 'hamburger';
    button.setAttribute('aria-label', 'Toggle menu');
    button.innerHTML = '☰';

    const nav = document.createElement('nav');
    nav.className = 'nav';

    const ul = document.createElement('ul');

    // Define the menu items
    const menuItems = [
        { name: 'Home', link: 'index.html' },
        { name: 'Best Practices', link: 'practices.html' },
        { name: 'Resources', link: 'resources.html' },
        { name: 'Contact us', link: 'form.html' },
    ];

    // Create list items for each menu item
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.name;
        li.appendChild(a);
        ul.appendChild(li);
    });

    // Append elements to the nav
    nav.appendChild(ul);
    header.appendChild(button);
    header.appendChild(nav);

    return header;
}



// Function to replace the existing header
function replaceHeader() {
    const existingHeader = document.querySelector('header');
    const newHeader = createNavbar();

    if (existingHeader) {
        existingHeader.parentNode.replaceChild(newHeader, existingHeader);
    } else {
        // If no header exists, append the new one to the body
        document.body.prepend(newHeader);
    }
}
const toggleButton = document.getElementById('toggle-dark-mode');
document.addEventListener('DOMContentLoaded', () => {
    replaceHeader();
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('header nav:first-of-type');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open'); 
        hamburger.textContent = nav.classList.contains('open') ? '✖' : '☰'; 
    });
    const darkMode = localStorage.getItem('dark-mode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = 'Switch to Light Mode';
    }
    toggleButton.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        toggleButton.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        localStorage.setItem('dark-mode', isDarkMode);
    });
});



