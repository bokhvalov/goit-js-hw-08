import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("#vimeo-player");
const player = new Player(iframe);
const savedTime = localStorage.getItem("videoplayer-current-time") || 0;

if (savedTime) {
  player.setCurrentTime(savedTime);
  console.log(savedTime);
}

const onPlaying = function (timeUpdate) {
  console.log(timeUpdate);
  localStorage.setItem("videoplayer-current-time", timeUpdate.seconds);
};

player.on("timeupdate", throttle(onPlaying, 1000));
