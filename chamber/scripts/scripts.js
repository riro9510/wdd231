const navBarMenu = {
    "Home": "#",
    "Directory": "#",
    "Join": "#",
    "Discover": "#"
};

const header = document.createElement("header");
const image = document.createElement("div");
image.innerHTML = "<i class='fas fa-gavel'></i> Chamber Logo";
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
document.body.appendChild(header);


function toggleMenu() {
    listComponente.classList.toggle("show");
}

hamburgerComponent.addEventListener("click", toggleMenu);

const main = document.querySelector("main");
const imagePlaceholder = document.createElement("div");
imagePlaceholder.classList.add("image-placeholder");
main.prepend(imagePlaceholder);