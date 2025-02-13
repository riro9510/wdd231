// menu.js
export function createMenu(navBarMenu) {
    const header = document.createElement("header");

    const image = document.createElement("h1");
    image.innerText = "Casas Grandes";
    image.classList.add("logo");
    header.appendChild(image);

    const hamburgerComponent = document.createElement("div");
    const menuComponent = document.createElement("nav");
    const listComponente = document.createElement("ul");

    hamburgerComponent.classList.add("hamburger");
    hamburgerComponent.textContent = "☰";  

    for (let key in navBarMenu) {
        if (navBarMenu.hasOwnProperty(key)) {
            let listItem = document.createElement("li");
            let anchor = document.createElement("a");
            anchor.href = navBarMenu[key];
            anchor.textContent = key;
            listItem.appendChild(anchor);
            listComponente.appendChild(listItem);
        }
    }

    menuComponent.appendChild(listComponente);
    header.appendChild(hamburgerComponent);
    header.appendChild(menuComponent);

    function toggleMenu() {
        listComponente.classList.toggle("show");
    }

    hamburgerComponent.addEventListener("click", toggleMenu);

    return header;
}
