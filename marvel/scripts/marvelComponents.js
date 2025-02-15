import fetchMarvelData from "./marvelAPI.js"


async function renderComponent() {
    const path = window.location.pathname;
    const searchValue = "";
    function changingQuery(page){
        const comics = "comics";
        const characters = "characters";
        const creators = "creators";
        if(page.includes("index")){
            return comics;
        }else if(page.includes("authors")){
            return creators; 
        }else{
            return characters;
        }
    };
    const main = document.querySelector("main");
    const modal = document.querySelector("#modal");
    const container = document.createElement('section');
    container.setAttribute("id","comics-container");
    container.classList.add("comics-grid");
    container.innerHTML = ''; 

    
 
    const searchInput = document.querySelector("#searchInput");
    let debounceTimeout;
    if (searchInput) {
        const modal = document.getElementById('modal');
        searchInput.addEventListener('input', async (event) => {
            modal.style.display = 'block';
            container.innerHTML = `<div id="spinner" class="spinner"><div class="loader"></div></div>`; 
            clearTimeout(debounceTimeout); 
            const searchQuery = event.target.value;
            if(searchQuery.length!=0){
            debounceTimeout = setTimeout(async () => {
                try {
                    const data = await fetchMarvelData({
                        tipoBusqueda: changingQuery(path),
                        busquedaGeneral: false,
                        valorBusqueda: searchQuery
                    });
    
                    container.innerHTML = ''; 
                    renderMainData(data);
                } catch (error) {
                    console.error("Error al obtener los datos:", error);
                }
            }, 500); 
        }else{
            debounceTimeout = setTimeout(async () => {
                try {
                    const data = await fetchMarvelData({
                        tipoBusqueda: changingQuery(path),
                        busquedaGeneral: true,
                        valorBusqueda: searchQuery
                    });
    
                    container.innerHTML = ''; 
                    renderMainData(data);
                } catch (error) {
                    console.error("Error al obtener los datos:", error);
                }
            }, 500); 
        }
        });
    }
    
    function renderMainData(data){
        const modal = document.getElementById('modal');
        const gridContainer = `
                ${data.length==0?`<h1>There are no ${changingQuery(path)} that match </h1>`:data.map(comic => {
                    const imgSrc = `${comic.thumbnail.path}/portrait_fantastic.jpg`; 
                    return `
                        <div class="comic-item" id="${comic.id}">
                            <img src="${imgSrc}" alt="${comic.title}" class="comic-image" loading="lazy">
                            <div class="overlay">
                                <span>${comic.title}</span>
                            </div>
                        </div>
                    `;
                }).join('')
            }
        `;
        container.innerHTML = gridContainer; 

        modal.appendChild(container);
        document.querySelectorAll('.comic-item').forEach(item => {
            item.addEventListener('click', () =>{
                const idEncontrado = Number.parseInt(item.id);
                const indexObj = data.findIndex((comic) => {
                    return comic.id == idEncontrado});
                renderSingleItem(data,indexObj);
                modal.style.display = 'none';
            });
        });
        
    }
    function renderSingleItem(data, index) { 
        const item = data[index];
        const imgSrc = `${item.thumbnail.path}/portrait_uncanny.jpg`;
        const modal = document.getElementById('modal');
        const container = document.querySelector(".container");
        container.innerHTML="";
        container.innerHTML = path.includes("index")? `
            <div class="content">
                <h1>${item.title}</h1>
                <div class="description">
                <div class="writer">
               ${item.creators.map(creator => {
                const key = Object.keys(creator)[0]; 
                const value = creator[key]; 
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                return `<h3 style="display: inline;">${capitalizedKey}:</h3> <p style="display: inline;">${value}<br></p>`;  
                }).join('')}

                </div>
                <div class="characters">
                <h3>Characters:</h3>
                <p>${item.characters.map(character=>{
                    return `${character}<br>`
                }).join('')}</p>
                </div>
                </div>
                <div class="hero-image">
                    <img src="${imgSrc}" alt="${item.title}" class="comic-image" loading="lazy">
                </div>
                <div class="buttons">
                    <button id="choose-btn" style="background:var(--marvel-red); color: white;">Choose</button>
                    <button id="next-btn" style="background:var(--secondary-color); color: white;">Next</button>
                </div>
            </div>
        `:path.includes("authors")?`
         <div class="content">
                <h1>${item.title}</h1>
                <div class="description">
                <div class="writer">
                

                </div>
                <div class="characters">
                <h3>Publications:</h3>
               <p>${item.comics.map(comic=>{
                    return `${comic}<br>`
                }).join('')}</p>
                </div>
                </div>
                <div class="hero-image">
                    <img src="${imgSrc}" alt="${item.title}" class="comic-image" loading="lazy">
                </div>
                <div class="buttons">
                    <button id="choose-btn" style="background:var(--marvel-red); color: white;">Choose</button>
                    <button id="next-btn" style="background:var(--secondary-color); color: white;">Next</button>
                </div>
            </div>`:`
         <div class="content">
                <h1>${item.title}</h1>
                <div class="description">
                <div class="writer">
                

                </div>
                <div class="characters">
                <h3>Appear on:</h3>
               <p>${item.stories.map(story=>{
                    return `${story}<br>`
                }).join('')}</p>
                </div>
                </div>
                <div class="hero-image">
                    <img src="${imgSrc}" alt="${item.title}" class="comic-image" loading="lazy">
                </div>
                <div class="buttons">
                    <button id="choose-btn" style="background:var(--marvel-red); color: white;">Choose</button>
                    <button id="next-btn" style="background:var(--secondary-color); color: white;">Next</button>
                </div>
            </div>`;

        
        document.getElementById('choose-btn').addEventListener('click', () => {
            renderMainData(data);
            modal.style.display = 'block';
        });

        
        document.getElementById('next-btn').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % data.length;
            renderSingleItem(data, currentIndex);
        });
    }
    let currentIndex = 4;
    const data = await fetchMarvelData({tipoBusqueda:changingQuery(path),busquedaGeneral:true,valorBusqueda:""});
        renderSingleItem(data, currentIndex);

    }
    

        
renderComponent();
