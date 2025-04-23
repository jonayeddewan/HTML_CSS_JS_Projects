let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  { songName: "Salam-e-Ishq", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Shayad", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Raabta", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Tum Mile", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Let Me Love You", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Kun Faya Kun", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Dil Diyan Gallan", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Zaalima", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Hasi Ban Gaye", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Tera Ban Jaunga", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

let isShuffle = false;
let isRepeat = false;

document.getElementById("shuffle").addEventListener("click", () => {
  isShuffle = !isShuffle;
  alert("Shuffle: " + (isShuffle ? "On" : "Off"));
});

document.getElementById("repeat").addEventListener("click", () => {
  isRepeat = !isRepeat;
  alert("Repeat: " + (isRepeat ? "On" : "Off"));
});

// Auto next song or repeat
audioElement.addEventListener("ended", () => {
  if (isRepeat) {
    playSong(songIndex);
  } else if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
    playSong(songIndex);
  } else {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
  }
});

let timeDisplay = document.getElementById("timeDisplay");

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

audioElement.addEventListener("timeupdate", () => {
  myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  timeDisplay.innerText = `${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
});

let songListContainer = document.querySelector(".songItem-container");
function loadSongs() {
  songListContainer.innerHTML = "";
  songs.forEach((song, i) => {
    let songItem = document.createElement("div");
    songItem.classList.add("songItem");
    songItem.innerHTML = `
      <img src="${song.coverPath}" alt="Album cover" />
      <span class="songName">${song.songName}</span>
      <span class="songlistplay">
        <span class="timestamp">00:00 
          <i class="fa-regular fa-circle-play play-icon" data-index="${i}"></i>
        </span>
      </span>
    `;
    songListContainer.appendChild(songItem);
  });
}

loadSongs();


// Set song info in the song list
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/Pause master control
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

// Update progress bar as the song plays
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Seek song when progress bar changes
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Utility: Reset all play icons
function resetPlayIcons() {
  Array.from(document.getElementsByClassName("play-icon")).forEach((el) => {
    el.classList.remove("fa-circle-pause");
    el.classList.add("fa-circle-play");
  });
}

// Play song on clicking individual song item
Array.from(document.getElementsByClassName("play-icon")).forEach((element, i) => {
  element.addEventListener("click", (e) => {
    resetPlayIcons();
    songIndex = i;
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  });
});
