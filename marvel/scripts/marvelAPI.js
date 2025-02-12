import * as marvelClases from "./marvelClases.js"


 async function fetchMarvelData({tipoBusqueda,busquedaGeneral=true,valorBusqueda=""}) {
    const publicKey = "59441354a370e2a2909004257377eba4";
    const privateKey = "62e1dc3acc79ef12e481ecbe70cf201f521a863b"; 
    const ts = new Date().getTime(); 
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const adicionalData = tipoBusqueda=="comics"?"titleStartsWith":"nameStartsWith";
    console.log("valores mandados",[tipoBusqueda,busquedaGeneral,adicionalData,valorBusqueda]);
    const url = busquedaGeneral?`https://gateway.marvel.com/v1/public/${tipoBusqueda}?ts=${ts}&apikey=${publicKey}&hash=${hash}`:`https://gateway.marvel.com/v1/public/${tipoBusqueda}?${adicionalData}=${valorBusqueda}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    console.log("url",url);
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        console.log("response",rawData.data);
        const concatenado = tipoBusqueda=="comics"?marvelClases.MarvelComicBuilder:tipoBusqueda=="characters"?marvelClases.CharacterBuilder:marvelClases.AuthorBuilder;
        const data = rawData.data.results.map(comicData => {
            const builder = new concatenado(comicData);
            return builder.build();
        });
       /* Object.entries(data).forEach(([index, comic]) => {
            console.log(comic.title); 
            console.log(comic.images);
        });*/
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
export default fetchMarvelData;
