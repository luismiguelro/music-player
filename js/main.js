/*Objetivo: llevar acabo cada una de las funciones correspondientes desglozadas, 
aunque puede tener mejoras en el codigo */

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
const play = document.getElementById("play");
const next = document.getElementById("next");
const prev = document.getElementById("prev");


// eventos controles
play.addEventListener("click",()=>{
   if(audio.paused){
        playSong();
    } else if(audio.play){
        pausedSong();
    }
});

next.addEventListener("click",()=>nextSong());
prev.addEventListener("click",()=>prevSong());

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
        changeActiveClass(actualSong,songIndex)
        actualSong= songIndex;
        // cambiar fuente del audio
        audio.src = "./audio/"+ songList[songIndex].file;
        playSong();
        changeCover(songIndex);
        changeSongTitle(songIndex);
    }
    

}

//Actualizar controles
function updateControls(){
    if(audio.paused){
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");

    }else{
        play.classList.add("fa-pause");
        play.classList.remove("fa-play");
    }

}

//reproducir cancion
function playSong(){
    if(actualSong !== null){
    audio.play();
    updateControls();
    }
}

// pausar cancion
function pausedSong(){
    audio.pause();
    updateControls();
}

//  cambiar clase activa 
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a");
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active");
    }
    links[newIndex].classList.add("active");
}

// Cambiar cover cancion
function changeCover(songIndex){
    
    cover.src = "./img/"+ songList[songIndex].cover;
}

//cambiar itutlo de la cancion
function changeSongTitle(songIndex){
    title.innerText = songList[songIndex].title;
}
//anterior cancion
function prevSong(){
    loadSong(actualSong-1);
}

//siguiente cancion
function nextSong(){
    if(actualSong<songList.length-1){
        loadSong(actualSong+1);
    } else{
        loadSong(0);
    }
    
}
//GO
loadSongs();