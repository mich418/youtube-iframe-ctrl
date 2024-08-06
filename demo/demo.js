import SAFYouTubeIFrameAPI from './SAFYouTubeIFrameAPI.js'
const youtubeIFrame = document.getElementById('youtube-iframe')
const safYouTubeIFrameAPI = new SAFYouTubeIFrameAPI(youtubeIFrame)

youtubeIFrame.contentWindow.dispatchEvent(new Event('click'))

async function play() {
  await safYouTubeIFrameAPI.mute()
  await safYouTubeIFrameAPI.play()
}

play()

document.getElementById('play').addEventListener('click', () => {
  safYouTubeIFrameAPI.play()
})

document.getElementById('pause').addEventListener('click', () => {
  safYouTubeIFrameAPI.pause()
})
