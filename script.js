console.log("Welcome to myMusic App ");
//initialize the variable
// let songIndex=0;

let nextSong = document.getElementById('nextSong');
let prevSong = document.getElementById('prevSong');


//let songItems= Array.from(document.getElementsByClassName('songItems'));

let songs=[
    {songName: "Zahen", filePath:"songs/song.mp3", coverPath: "Bgs/Bg.jpg"},
    {songName: "Naina da kya kasoor", filePath:"songs/1song.mp3", coverPath: "Bgs/Bg.jpg"},
    {songName: "maan meri jaan", filePath:"songs/2song.mp3", coverPath: "Bgs/Bg.jpg"},
]

// songItems.forEach((element,i)=>{
//     console.log(element,i);
//     element.getElementsByTagName("img")[0].src =songs[i].coverPath;
//     element.getElementsByClassName("songName")[0].innerText =songs[i].songName;
// })

//audioElement.play();

// Handle play/pause/click
let currentSongIndex = 0;
let firstLoad = true;
let audioElement =new Audio(songs[currentSongIndex].filePath);
playSong();

function handleChangeSong(action){
    if(action === 'prev'){
        if(currentSongIndex > 0){
            currentSongIndex = currentSongIndex - 1;
        }
        console.log('song: ' + currentSongIndex);
    }
    if(action === 'next'){
        if(currentSongIndex < songs.length - 1 ){
            currentSongIndex = currentSongIndex + 1;
        }
        console.log('song: ' + currentSongIndex);
    }
    if(audioElement){
        console.log('cleanup the previous song')
        audioElement.pause();
        audioElement.currentTime = 0;
        masterPlay.removeEventListener('click',()=>{
            if(audioElement.paused || audioElement.currentTime<=0){
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play')
                masterPlay.classList.add('fa-circle-pause')
                gif.style.opacity=1;
            }
            else{
                audioElement.pause();
                masterPlay.classList.remove('fa-circle-pause')
                masterPlay.classList.add('fa-circle-play')
                gif.style.opacity=0;
            }
        })
    
        //Listen to events
        audioElement.removeEventListener('timeupdate',()=>{
          //  console.log('timeupdate');
            //update seekBar
        progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
        //console.log(progress);
        } )
        myProgressBar.removeEventListener('change', ()=>{
            audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
        })
    }
    audioElement = new Audio(songs[currentSongIndex].filePath);
    playSong();
}

function playSong(){
    let masterPlay= document.getElementById('masterPlay');
    let myProgressBar=document.getElementById('myProgressBar');
    let gif=document.getElementById('gif');
    if(firstLoad){
        firstLoad = false; 
    }
    else{
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            gif.style.opacity=1;
        }
    }
    masterPlay.addEventListener('click',()=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            gif.style.opacity=1;
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
            gif.style.opacity=0;
        }
    })

    //Listen to events
    audioElement.addEventListener('timeupdate',()=>{
      //  console.log('timeupdate');
        //update seekBar
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value=progress;
    } )
    myProgressBar.addEventListener('change', ()=>{
        audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
    })
}

nextSong.addEventListener('click', () =>{
    handleChangeSong('next');
})

prevSong.addEventListener('click', () =>{
    handleChangeSong('prev');
})

