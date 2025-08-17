const music = new Audio('vande.mp3');

// create Array 

const songs = [
    {
        id: '1',
        songName: `Thodi si Daaru <br>
        <div class="subtit">AP Dhilon</div>`,
        poster: "img-1.png"
    },
    {
        id: '2',
        songName: `Perdesiya <br>
        <div class="subtitle">Sachin-jigar</div>`,
        poster: "img-2.jpg"
    },
    {
        id: '3',
        songName: `Aavan Jaavan <br>
        <div class="subtitle">Arjit Singh</div>`,
        poster: "img-3.jpg"
    },
    {
        id: '4',
        songName: `Azul <br>
        <div class="subtitle">Guru Randhawa, Gurjit Singh</div>`,
        poster: "img-4.jpg"
    },
    {
        id: '5',
        songName: `Raanjhan <br>
        <div class="subtitle">Sachet-Parampara</div>`,
        poster: "img-9.jpg"
    },
        {
        id: '6',
        songName: `Desi Kalakaar <br>
        <div class="subtitle">Yo Yo honey singh</div>`,
        poster: "img-6.jpg"
    },
        {
        id: '7',
        songName: `Bas ek Dhadak <br>
        <div class="subtitle">Darshan Raval</div>`,
        poster: "img-7.jpg"
    },
        {
        id: '8',
        songName: `Ham tere bina  <br>
        <div class="subtitle">Arjit singh</div>`,
        poster: "img-8.jpg"
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
    if(music.paused || music.currentTime <=0){
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('.active2');
    }else{
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
});

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element) =>{
        element.style.background = "rgba(105,105,170,0)";
    })
}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) =>{
        element.target.classList.remove('bi-play-circle-fill');
        element.target.classList.add('bi-pause-circle-fill');
    })
}

let index = 0;

let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element) =>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `Songs/${index}.mp3`;
        poster_master_play.src = `${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('.active2');
        music.addEventListener('ended',() =>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgba(105,105,170,0)";
    })
});

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];



music.addEventListener('timeupdate', ()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if(sec<10){
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_dur/60);
    let sec1 = Math.floor(music_dur%60);
    if(sec<10){
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seekbar.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seekbar.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})
music.addEventListener('ended', ()=>{
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('.active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if(vol.volume == 0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.volume == 0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.volume ==  50){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
    
})






