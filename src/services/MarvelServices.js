import md5 from "md5";
import useHttp from "../hooks/http.hook";

export default function useMarvelServices() {
    const {request, process, setProcess} = useHttp();

    const _offset = 210,
          _apibase = 'https://gateway.marvel.com:443/v1/public/',
          _publickey = 'b613e5c1ee278d1974ac9c3d77544391',
          _privatekey = 'b32e138e4085075474c409641be15ebc5b46dd44';
    
    const timestamp = +new Date(),
          hash = md5(timestamp + _privatekey + _publickey);

    async function getCharacters(offset = _offset) {
        const result = await request(`${_apibase}characters?` +
                                         `limit=9&offset=${offset}` +
                                         "&ts=" + timestamp +
                                         "&apikey=b613e5c1ee278d1974ac9c3d77544391" +
                                         "&hash=" + hash);
            
        return result.data.results.map(_handleChars)
    }

    async function getCharacterById(id) {
        const response = await request(`${_apibase}characters/${id}?` +
                                            "&ts=" + timestamp +
                                            "&apikey=b613e5c1ee278d1974ac9c3d77544391" +
                                            "&hash=" + hash);

        return _handleChars(response.data.results[0]);
    }

    async function getComics(offset = 0) {
        const response = await request(`${_apibase}comics?limit=8&offset=${offset}` + 
                                       "&ts=" + timestamp +
                                       "&apikey=b613e5c1ee278d1974ac9c3d77544391" +
                                       "&hash=" + hash);

        return response.data.results.map(_handleComics);
    }

    async function getComicById(id) {
        const response = await request(`${_apibase}comics/${id}?` + 
                                        `ts=` + timestamp +
                                        "&apikey=b613e5c1ee278d1974ac9c3d77544391" +
                                        "&hash=" + hash);

        return _handleComics(response.data.results[0]);
    } 

    async function getCharacterByName(name) {
        const response = await request(`${_apibase}characters?name=${name}&` +
                                        `ts=` + timestamp +
                                        "&apikey=b613e5c1ee278d1974ac9c3d77544391" +
                                        "&hash=" + hash)
        
        return _handleChars(response.data.results[0]);
    }

    const _handleChars = (response) => ({
        id: response.id,
        name: response.name,
        description: response.description ? response.description : 'There is no description here. Yet...',
        thumbnail: response.thumbnail.path + '.' + response.thumbnail.extension,
        homepage: response.urls[0].url,
        wiki: response.urls[1].url,
        comics: response.comics.items
    })

    const _handleComics = (comic) => ({
        id: comic.id,
        title: comic.title,
        thumbnail: Object.values(comic.thumbnail).join('.'),
        price: comic.prices[0].price,
        description: comic.description ? comic.description : 'There is no description here. Yet...',
        pages: comic.pageCount,
        language: comic.textObjects[0] ? comic.textObjects[0].language : ''
    })

    return {
        getCharacters, 
        getCharacterById, 
        getComics, 
        getComicById, 
        getCharacterByName, 
        process,
        setProcess
    }
}
