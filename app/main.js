import PlaylistController from "./Controllers/PlaylistController.js";


class App {
    constructor() {
        this.controllers = {
            playlistController: new PlaylistController()
        }
    }
}

window['app'] = new App()