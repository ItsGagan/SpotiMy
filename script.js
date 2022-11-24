console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = document.getElementsByClassName('songItemPlay')

let songs1 = [
    "Pal Pal Dil ke Paas - [Title Track]",
    "Khairiyat - [Chhichhore]",
    "Shayad - [Love Aaj Kal]",
    "Ik Vaari Aa - [Raabta]",
    "Phir Kabhi - [M.S. Dhoni]",
    "Soch Na Sake - [Airlift]",
    "Darkhaast - [Shivaay]",
    "Kesariya - [Brahmastra]",
    "Jo Bheji thi Duaa - [Shanghai]",
    "Pachtaoge - [Music Video]"
]

let songs = []

for(let i=0 ; i<10 ; i++) {
    let j = Math.random()%10;  
    songs.push({songName: songs1[j], filePath: "songs/${j+1}.mp3", coverPath: "covers/${j+1}.jpg"});
}

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        // For Also Changing the Icon For Song Capsule
        songItemPlay[songIndex].classList.remove('fa-play-circle')
        songItemPlay[songIndex].classList.add('fa-pause-circle')
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        // For Also Changing the Icon For Song Capsule
        songItemPlay[songIndex].classList.remove('fa-pause-circle')
        songItemPlay[songIndex].classList.add('fa-play-circle')
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Automatically Play Next song after first song finishes
    // console.log(audioElement.currentTime)

    if(audioElement.currentTime == audioElement.duration) {
        console.log('Automatically Playing Next song after first song finished')
        let prevIndex = songIndex
        if(songIndex>=9){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        songItemPlay[prevIndex].classList.remove('fa-pause-circle')
        songItemPlay[prevIndex].classList.add('fa-play-circle')
        songItemPlay[songIndex].classList.remove('fa-play-circle') // masterSongName
        songItemPlay[songIndex].classList.add('fa-pause-circle')
    }

    // Update Seekbar
    progress = parseInt((parseFloat(audioElement.currentTime)/parseFloat(audioElement.duration))* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(songItemPlay).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(songItemPlay).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    let prevIndex = songIndex
    console.log(`Prev : ${prevIndex}`)
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    console.log(`Curr : ${songIndex}`)
    // For Also Changing the Icon of Song Capsule
    if(audioElement.currentTime > 0) {
        songItemPlay[prevIndex].classList.remove('fa-pause-circle')
        songItemPlay[prevIndex].classList.add('fa-play-circle')
    }
    songItemPlay[songIndex].classList.remove('fa-play-circle') // masterSongName
    songItemPlay[songIndex].classList.add('fa-pause-circle')
    // Normal Code
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    console.log('in next ---icon Change Kyu nhi ho rha')
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    let prevIndex = songIndex
    if(songIndex<=0){
        songIndex = 9
    }
    else{
        songIndex -= 1;
    }
    // For Also Changing the Icon of Song Capsule
    
    if(audioElement.currentTime != 0) {
        songItemPlay[prevIndex].classList.remove('fa-pause-circle')
        songItemPlay[prevIndex].classList.add('fa-play-circle')
    }
    songItemPlay[songIndex].classList.remove('fa-play-circle') // masterSongName
    songItemPlay[songIndex].classList.add('fa-pause-circle')
    // Normal Code
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    console.log('in prev ---icon Change Kyu nhi ho rha')
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
})

document.getElementById('backward').addEventListener('click', ()=>{ 
   if(audioElement.currentTime <= 5)
       audioElement.currentTime = 0;
    
    else audioElement.currentTime -= 5;
})

document.getElementById('forward').addEventListener('click', ()=>{ 
   if(audioElement.currentTime >= audioElement.duration - 5)
       audioElement.currentTime = audioElement.duration;
    
    else audioElement.currentTime += 5;
})


