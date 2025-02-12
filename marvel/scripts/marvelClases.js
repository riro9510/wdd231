class creators{
    constructor(role,name){this.role,this.name};
}
class MarvelComic {
    constructor(
        id,
        digitalId,
        title,
        issueNumber,
        variantDescription,
        description,
        modified,
        isbn,
        upc,
        diamondCode,
        ean,
        issn,
        format,
        pageCount,
        textObjects,
        resourceURI,
        urls,
        series,
        variants,
        collections,
        collectedIssues,
        dates,
        prices,
        thumbnail,
        images,
        creators,
        characters,
        stories,
        events
    ) {
        this.id = id;
        this.digitalId = digitalId;
        this.title = title;
        this.issueNumber = issueNumber;
        this.variantDescription = variantDescription;
        this.description = description;
        this.modified = modified;
        this.isbn = isbn;
        this.upc = upc;
        this.diamondCode = diamondCode;
        this.ean = ean;
        this.issn = issn;
        this.format = format;
        this.pageCount = pageCount;
        this.textObjects = textObjects;
        this.resourceURI = resourceURI;
        this.urls = urls;
        this.series = series;
        this.variants = variants;
        this.collections = collections;
        this.collectedIssues = collectedIssues;
        this.dates = dates;
        this.prices = prices;
        this.thumbnail = thumbnail;
        this.images = images;
        this.creators = creators;
        this.characters = characters;
        this.stories = stories;
        this.events = events;
    }
}
export  class MarvelComicBuilder {
    constructor(comicData) {
        this.comicData = comicData;
    }

    build() {
        const creadores = Object.entries(this.comicData.creators.items).map(([key, value]) => {
            return {[value.role]: value.name};
        });
        const characters = Object.entries(this.comicData.characters.items).map(([key, value]) => {
            return value.name;});
        return new MarvelComic(
            this.comicData.id,
            this.comicData.digitalId,
            this.comicData.title,
            this.comicData.issueNumber,
            this.comicData.variantDescription,
            this.comicData.description,
            this.comicData.modified,
            this.comicData.isbn,
            this.comicData.upc,
            this.comicData.diamondCode,
            this.comicData.ean,
            this.comicData.issn,
            this.comicData.format,
            this.comicData.pageCount,
            this.comicData.textObjects,
            this.comicData.resourceURI,
            this.comicData.urls,
            this.comicData.series,
            this.comicData.variants,
            this.comicData.collections,
            this.comicData.collectedIssues,
            this.comicData.dates,
            this.comicData.prices,
            this.comicData.thumbnail,
            this.comicData.images,
            creadores,
            characters,
            this.comicData.stories,
            this.comicData.events
        );
    }
}
     class Author {
    constructor(id,firstName, modified, resourceURI, thumbnail, comics, events, series, stories, urls) {
        this.id = id;
        this.title = firstName;
        this.modified = modified;
        this.resourceURI = resourceURI;
        this.thumbnail = thumbnail;
        this.comics = comics;
        this.events = events;
        this.series = series;
        this.stories = stories;
        this.urls = urls;
    }

}
export class AuthorBuilder {
    constructor(authorData) {
        this.authorData = authorData;
    }

    build() {
        const comics = Object.entries(this.authorData.comics.items).map(([key, value]) => {
            return value.name;});
        return new Author(
        this.authorData.id,
        this.authorData.firstName ,
        this.authorData.modified ,
        this.authorData.resourceURI ,
        this.authorData.thumbnail ,
        comics,
        this.authorData.events,
        this.authorData.series,
        this.authorData.stories,
        this.authorData.urls,
    )
    }
}

class Character {
    constructor(
        id, title, description, modified, resourceURI, comics, events, series, stories, thumbnail, urls
    ) {
        const storiesV = stories.items.map(item => {
            return item.name
           
        });   
        console.log(storiesV);     
        this.id = id;
        this.title = title; 
        this.description = description;
        this.modified = modified;
        this.resourceURI = resourceURI;
        this.comics = comics;
        this.events = events;
        this.series = series;
        this.stories = storiesV;
        this.thumbnail = thumbnail;
        this.urls = urls;
    }
}

export class CharacterBuilder {
    constructor(characterData) {
        this.characterData = characterData;
    }

    build() {
        return new Character(
            this.characterData.id,
            this.characterData.name, 
            this.characterData.description,
            this.characterData.modified,
            this.characterData.resourceURI,
            this.characterData.comics,
            this.characterData.events,
            this.characterData.series,
            this.characterData.stories,
            this.characterData.thumbnail,
            this.characterData.urls
        );
    }
}
