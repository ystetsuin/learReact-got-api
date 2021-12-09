export default class Got {
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

    getAllCharacters = () => {
        return this.getResources('/characters/?page=6')  
    }

    getCharacter = (id) => {
        return this.getResources(`/characters/${id}`);
    }
}