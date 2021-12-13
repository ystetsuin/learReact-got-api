export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api'
    }

    getResources = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(`Couldn't fetch ${this._apiBase}${url}, status: ${response.status}`);
        }

        return await response.json();
    }

    getAllCharacters = async () => {
        const characters = await this.getResources('/characters/?page=6');
        return characters.map( char => {
            this.setNoInfo(char);
            return this._transformCharacter(this)
        });
    }

    getCharacter = async (id) => {
        const char = await this.getResources(`/characters/${id}`);
        this.setNoInfo(char);
        return this._transformCharacter(char);
    }

    getAllBooks = async () => {
        const books = await this.getResources(`/books`);
        return books.map( book => {
            this.setNoInfo(book);
            return this._transformBook(this);
        })
    }

    getBook = async (id) => {
        const book = await this.getResources(`/books/${id}`);
        this.setNoInfo(book);
        return this._transformCharacter(book);
    }

    getAllHouses = async () => {
        const houses = await this.getResources(`/houses`);
        return houses.map(house => {
            this.setNoInfo(house);
            return this._transformHouse(this);
        })
    }

    getHouse = async (id) => {
        const house = await this.getResources(`/houses/${id}`);
        return this.setNoInfo(house);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture, 
        }
    }

    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released

        }
    }

    _transformHouse = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            coatOfArms: house.coatOfArms
        }
    }

    setNoInfo = (obj) => {
        for (let prop in obj) {
            obj[prop] = (obj[prop]) ?  obj[prop] : 'no info';
        }
    }
}