

async function fetchjson() {
    try {
      const response = await fetch("./scripts/places.json");
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error("Error fetching the JSON:", error);
      return [];  
    }
  }
  
  async function discover(){
    const mainContainer = document.createElement("section");
    mainContainer.classList.add("seccion3");
    const places = await fetchjson();
    console.log("que hay en places",places);

    places.forEach(place => {
        const card = document.createElement('section');
        card.classList.add('card3');
        card.setAttribute('data-title', place["name"]);

        card.innerHTML = `
            <section class="info-container">      
                   <img src=${place["url"]} width="300" height="200" loading="lazy">
                    <section class="data">
                     <p>${place["description"]}<br>
                    <br>
                    ${place["address"]}<br>
                    <br></p>
                    <section>
                    <button>Learn More</button>
                
            </section>
        `;

        console.log("datos card",card);
        mainContainer.appendChild(card);
        document.body.appendChild(mainContainer);
    });
  }
  discover();
  document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.createElement("div");
    sidebar.style.position = "fixed";
    sidebar.style.bottom = "20px";
    sidebar.style.right = "20px";
    sidebar.style.padding = "15px";
    sidebar.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    sidebar.style.color = "white";
    sidebar.style.borderRadius = "10px";
    sidebar.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
    sidebar.style.fontSize = "14px";
    sidebar.style.zIndex = "1000";
    sidebar.style.maxWidth = "250px";
    sidebar.style.transition = "opacity 0.5s ease-out";

    document.body.appendChild(sidebar);

    const lastVisit = localStorage.getItem("lastVisit");
    const now = new Date().getTime();
    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDiff = now - lastVisitDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago.`;
        }
    }

    sidebar.innerText = message;


    localStorage.setItem("lastVisit", now.toString());

    setTimeout(() => {
        sidebar.style.opacity = "0";
        setTimeout(() => sidebar.remove(), 500);
    }, 5000);
});
