
export function createMenu(navBarMenu) {
    const path = window.location.pathname;
    const header = document.createElement("header");
    header.classList.add("menu-header");

    const logo = document.createElement("div");
    logo.innerHTML = " Marvel";
    logo.classList.add("logo");
    
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search...";
    searchInput.setAttribute("id","searchInput");
    searchContainer.appendChild(searchInput);

    const hamburgerComponent = document.createElement("div");
    hamburgerComponent.classList.add("hamburger");
    hamburgerComponent.textContent = "☰";  

    const menuComponent = document.createElement("nav");
    const listComponent = document.createElement("ul");

    for (let key in navBarMenu) {
        if (navBarMenu.hasOwnProperty(key)) {
            let listItem = document.createElement("li");
            let anchor = document.createElement("a");
            anchor.href = navBarMenu[key];
            anchor.textContent = key;
            listItem.appendChild(anchor);
            listComponent.appendChild(listItem);
        }
    }
    menuComponent.appendChild(listComponent);

    function toggleMenu() {
        menuComponent.classList.toggle("show");
    }
    hamburgerComponent.addEventListener("click", toggleMenu);

    header.appendChild(hamburgerComponent);
    header.appendChild(menuComponent);
    header.appendChild(logo);
    const emptyContainer = document.createElement("section");
    !path.includes("form")?header.appendChild(searchContainer):header.appendChild(emptyContainer);

    return header;
}
