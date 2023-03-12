export function addAudio(src, durationOutput, playBtn, audio) {
  audio.src = src;
  audio.addEventListener('loadeddata', (event) => {
    const duration = event.target.duration;
    const min = Math.floor(duration / 60).toString().padStart(2, '0');
    const sec = Math.floor(duration % 60).toString().padStart(2, '0');
    durationOutput.innerHTML = `${min}:${sec}`;
  })
  playBtn.addEventListener('click', (event) => {
    if (audio.paused) {
      event.target.innerHTML = 'pause';
      audio.play();
    }
    else {
      event.target.innerHTML = 'play_arrow';
      audio.pause();
    }
  })
}

export function updateTime(event, progress, trackTime, btn, audio) {
  const currentTime = event.target.currentTime;
  const duration = event.target.duration;
  progress.style.width = `${(currentTime / duration) * 100}%`;
  const currentMin = Math.floor(currentTime / 60).toString().padStart(2, '0');
  const currentSec = Math.floor(currentTime % 60).toString().padStart(2, '0');
  trackTime.textContent = `${currentMin}:${currentSec}`;
  if (currentTime === duration) {
    btn.innerHTML = 'play_arrow';
    audio.pause();
    progress.style.width = '0';
    trackTime.textContent = '00:00';
  }
}

export function changeCurrentTime(event, audio) {
  const trackDuration = audio.duration;
  const timelineWidth = event.target.clientWidth;
  const clickedOffSetX = event.offsetX;
  audio.currentTime = (clickedOffSetX / timelineWidth) * trackDuration;
}

export function playAnswerSound(sound, src) {
  sound.src = src;
  sound.play();
}


export function soundOff(audio, volumeBtn, volume, currentVolume) {
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeBtn.innerHTML = 'volume_off';
    volume.style.width = '0';
  }
  else {
    audio.volume = currentVolume;
    volumeBtn.innerHTML = 'volume_up';
    volume.style.width = `${currentVolume * 100}%`;
  }
}

export function setVolumeControl(event, audio, volume, currentVolumeWidth, volumeBtn) {
  const clickedOffSetX = event.offsetX;
  const volumeSliderWidth = event.target.clientWidth;
  audio.volume = clickedOffSetX / volumeSliderWidth;
  currentVolumeWidth = `${(clickedOffSetX / volumeSliderWidth) * 100}%`;
  volume.style.width = currentVolumeWidth;
  if (audio.volume) {
    volumeBtn.innerHTML = 'volume_up';
  }
  else {
    volumeBtn.innerHTML = 'volume_off';
  }
}
