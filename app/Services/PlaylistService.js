import Song from "../Models/Songs.js";

//Private
// @ts-ignore
let _sandBox = axios.create({
    baseURL: '//bcw-sandbox.herokuapp.com/api/Bud/songs'
})

let _state = {
    songs: [],
    playlist: []
}

let _subscribers = {
    songs: [],
    playlist: []
}

function _setState(propName, data) {
    _state[propName] = data
    _subscribers[propName].forEach(fn => fn());
}

//Public
export default class PlaylistService {
    constructor() {
        // NOTE this will get your songs on page load
        this.getMySongs()
    }

    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

    get Songs() {
        return _state.songs.map(s => new Song(s))
    }

    get Playlist() {
        return _state.playlist
    }

    getMySongs() {
        //TODO make a request to the bcwSandbox to get all of your songs and save in your state
        _sandBox.get()
            .then(res => {
                let playlist = res.data.data.map(s => new Song(s))
                _setState('playlist', playlist)
            })
    }
    //thanks to Kenny

    addSong(id) {
        // TODO find the song from this.Songs that has the same id as the parameter of this function
        //if that song exists then send it as the payload for the post request
        let songToSave = this.Songs.find(s => s._id == id)
        if (!songToSave) return alert("We couldn't find that song. sorry.")
        _sandBox.post('', songToSave)
            .then(res => {
                console.log(res)
                let copyOfPlaylist = this.Playlist
                copyOfPlaylist.push(new Song(res.data.data))
                _setState('playlist', copyOfPlaylist)
            })
            .catch(err => console.error(err))
    }

    getMusicByQuery(query) {
        let url = 'https://itunes.apple.com/search?callback=?&term=' + query;
        // @ts-ignore
        $.getJSON(url)
            .then(res => {
                let results = res.results.map(rawData => new Song(rawData))
                _setState('songs', results)
                console.log(results);
            })
            .catch(err => console.log(err))
    }
}
