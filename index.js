let songs = [];

let currentSong = 0;

const colors = [
  "#E3BAB3",
  "#FEB47B",
  "#AED9DA",
  "#F7DFD4",
  "#A0C1B8",
  "#E9DCCD",
  "#E7CC8F",
  "#CBC5C1",
  "#DFE2D2",
  "#E2B091",
];

const title = document.querySelector("h1");
const input = document.querySelector("input");
const label = document.querySelector("label");
const previous = document.querySelector("#previous");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const player = document.querySelector("audio");
const titleSong = document.querySelector("#title-song");
player.volume = 0.3;

// Event listeners when the user upload something
input.onchange = getSongs;
next.onclick = nextSong;
previous.onclick = previousSong;

function getSongs(event) {
  // Save all the files to the songs arr
  songs = event.target.files;
  // Play the first song
  playSong();
  // Change title-song to the name of the song
  titleSong.innerText = songs[currentSong].name.slice(0, -4);
  // Change title
  title.innerText = "Music Player";
}

function playSong() {
  // Get temporary URL for mp3 file
  let song = URL.createObjectURL(songs[currentSong]);
  // Change title-song to the name of the song
  titleSong.innerText = songs[currentSong].name.slice(0, -4);
  //Change the background when the song plays
  label.style.backgroundColor =
    colors[Math.floor(Math.random() * songs.length)];
  //Change the label when the song plays
  label.style.color = "transparent";

  player.setAttribute("src", song);
  player.play();
  play.querySelector("i.fas").classList.remove("fa-play");
  play.querySelector("i.fas").classList.add("fa-pause");
  play.onclick = pause;
}

function pause() {
  play.querySelector("i.fas").classList.add("fa-play");
  play.querySelector("i.fas").classList.remove("fa-pause");
  player.pause();
  play.onclick = playCurrent;
  //Change the label when the song is paused
  label.style.color = "#444444";
}

function playCurrent() {
  play.querySelector("i.fas").classList.remove("fa-play");
  play.querySelector("i.fas").classList.add("fa-pause");
  player.play();
  play.onclick = pause;
  //Change the label when the song is paused
  label.style.color = "transparent";
}

function nextSong() {
  // Go back to the first song if the current one is the last in the list
  if (currentSong < songs.length - 1) {
    currentSong += 1;
  } else {
    currentSong = 0;
  }
  playSong();
}

function previousSong() {
  // Go back to the last song if the current one is the first in the list
  if (currentSong > 0) {
    currentSong -= 1;
  } else {
    currentSong = songs.length - 1;
  }
  playSong();
}
