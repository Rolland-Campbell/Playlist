import PlaylistService from "../Services/PlaylistService.js";

//Private
let _playlistService = new PlaylistService()

function _draw() {
    let elem = document.getElementById('songs')
    let songs = _playlistService.Songs
    let template = '<ul>'
    songs.forEach(s => {
        template += s.Template
    })
    elem.innerHTML = template + '</ul>'
}

function _drawPlaylist() {
    let elem = document.getElementById('playlist')
    let songs = _playlistService.Playlist
    let template = '<ul>'
    songs.forEach(s => {
        template += s.playlistTemplate
    })
    elem.innerHTML = template + '</ul>'
}

//Public
export default class PlaylistController {
    constructor() {
        _playlistService.addSubscriber("songs", _draw)
        _playlistService.addSubscriber("playlist", _drawPlaylist)
        _playlistService.getMusicByQuery('')
    }

    search(e) {
        e.preventDefault();
        _playlistService.getMusicByQuery(e.target.query.value)
    }

    addSong(id) {
        _playlistService.addSong(id)
    }
}