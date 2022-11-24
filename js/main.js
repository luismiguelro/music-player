/*Objetivo: llevar acabo cada una de las funciones correspondientes , 
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
const progress = document.getElementById("progress");
const time = document.getElementById("time");
const progressContainer = document.getElementById("progress-container");

//evento Progress
progressContainer.addEventListener("click", setProgress);
// evento elemento AUDIO
audio.addEventListener("timeupdate",updateProgress);
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

// cargar cancion seleccionada
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

// barra de progreso clicable
function setProgress(event){
    // width
    const totalWidth = this.offsetWidth;
    const progressWidth = event.offsetX;
    const current = (progressWidth/totalWidth)* audio.duration;
    audio.currentTime=current;        
}
// Actualizar barra de progreso de la cancion
function updateProgress(event){
    const {duration, currentTime} = event.srcElement;
    const percent = (currentTime/duration)*100
    progress.style.width=percent + "%";
    /*Convertir a minutos
    time.textContent=duration;*/  
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
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
}

//siguiente cancion
function nextSong(){
    if(actualSong<songList.length-1){
        loadSong(actualSong+1);
    } else{
        loadSong(0);
    }
}
audio.addEventListener("ended", ()=> nextSong());
//GO
loadSongs();

/* POR AGREGAR
Tiempo duracion cancion
tiempo actual de la cancion
darle al play, reproduzca primera cancion
*/