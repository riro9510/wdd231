export function createFooter() {
    const footer = document.createElement("footer");

    const contactInfo = document.createElement("section");
    const titulo = document.createElement("h4");
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
 
    contactInfo.classList.add("contact-info");
    contactInfo.innerHTML = `
        <strong>NCG Chamber of Commerce</strong>
        <p>10 Jesus Urueta
        Nuevo Casas Grandes, N.- 200
        Email: info@gmail.com
        Phone: 922-123-456</p>
    `;

    const socialLinks = document.createElement("section");
    socialLinks.classList.add("social-links");
    socialLinks.innerHTML = `
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-linkedin"></i></a>
    `;

    const credits = document.createElement("section");
    credits.classList.add("credits");
    credits.innerHTML = `
        <strong>WDD231 Class Project</strong>
        <p>Ricardo Ramos Olivares
        &copy; ${currentYear} NCG Chamber of Comerce
        Last Modification: ${lastModified}</p>
    `;
    footer.appendChild(contactInfo);
    footer.appendChild(socialLinks);
    footer.appendChild(credits);

    return footer;
}
