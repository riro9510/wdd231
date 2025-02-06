async function fetchjson() {
  try {
    const response = await fetch("./scripts/member.json");
    const data = await response.json();
    return data;  
  } catch (error) {
    console.error("Error fetching the JSON:", error);
    return [];  
  }
}

export async function promotionCards() {
    const mainContainer = document.createElement("section");
    mainContainer.classList.add("seccion3");
    const companies = await fetchjson();

    function getRandomElements(arr, n) {
        return arr.sort(() => 0.5 - Math.random()).slice(0, n);
    }
    const filteredCompanies = companies.filter(eachCompany => eachCompany["membershipLevel"] !== 1);
    const randomElements = getRandomElements(filteredCompanies, 3);


    randomElements.forEach(company => {
        const card = document.createElement('section');
        card.classList.add('card3');
        card.setAttribute('data-title', company["name"]);
        card.setAttribute('data-subtitle', company["membershipLevel"]==2?"Silver Member":"Golden Member");

        card.innerHTML = `
            <div class="icon-container"></div>
            <div class="info-container">
                <p>
                    Email: ${company["email"]}<br>
                    <br>
                    Phone: ${company["phone"]}<br>
                    <br>
                    Url: ${company["website"]}
                </p>
            </div>
        `;

  
        mainContainer.appendChild(card);
    });

    return mainContainer;
}
promotionCards();