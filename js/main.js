// Song data
const songList = [
    {
        title: "The Final Countdown",
        file: "TheFinalCountdown.mp3",
        cover: "europe.jpg"

    },
    {
        title: "Radio Ga Ga (Live Aid)",
        file: "RadioGaGa(Live Aid).mp3",
        cover: "queen-img.jpg"
    },
    {
        title: "Africa",
        file: "Africa.mp3",
        cover: "toto.jpg"
    },
]

// cancion actual
let actualSong = null;

// capturar elementos DOM
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");

function loadSongs() {
    //index, saber que cancion reproducir
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li")
        // Crear a
        const link = document.createElement("a")
        // Hidratar a
        link.textContent = song.title
        link.href="#";

        //eventos
        link.addEventListener("click", ()=> loadSong(index));
        // Añadir a li
        li.appendChild(link)
        // Aañadir li a ul
        songs.appendChild(li)
    })
}
// cargar cancion seleccionado
function loadSong (songIndex){
    
    // cancion actual
    if (songIndex !== actualSong){
        actualSong= songIndex;
        // cambiar fuente del audio
        audio.src = "./audio/"+ songList[songIndex].file;
        audio.play();

        changeCover(songIndex);
        changeSongTitle(songIndex);
    }
    

}

//  cancion actual


// Cambiar cover cancion
function changeCover(songIndex){
    
    cover.src = "./img/"+ songList[songIndex].cover;
}

//cambiar itutlo de la cancion
function changeSongTitle(songIndex){
    title.innerText = songList[songIndex].title;
}


loadSongs();