import YouTubeIFrameCtrl from './YouTubeIFrameCtrl.js'
const youtubeIFrame = document.getElementById('youtube-iframe')
const youTubeIFrameCtrl = new YouTubeIFrameCtrl(youtubeIFrame)

youtubeIFrame.contentWindow.dispatchEvent(new Event('click'))

async function play() {
  await youTubeIFrameCtrl.mute()
  await youTubeIFrameCtrl.play()
  console.log(youTubeIFrameCtrl.playerState)
}

play()

document.getElementById('play').addEventListener('click', () => {
  youTubeIFrameCtrl.play()
})

document.getElementById('pause').addEventListener('click', () => {
  youTubeIFrameCtrl.pause()
})
