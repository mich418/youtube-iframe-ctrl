# YouTube iFrame Controller

Simple YouTube iFrame controller __with no additional dependencies and no YouTube iFrame API script__.

---
**BETA WARNING**

This package is still in BETA. It should work properly and will hopefully become stable soon, but anyway -  you have been warned.

---

[The official YouTube documentation](https://developers.google.com/youtube/iframe_api_reference) requires you to add an external script to your page and create an iFrame with JavaScript to control the player inside the iFrame. This can be complicated if you only want to perform simple actions. Most packages available on NPM are just wrappers for the official YouTube script (downloading it under the hood and exposing the same API). __This module does not require the official YouTube iFrame API script or any other dependencies__. It contains just a few lines of code and provides all the functionalities of the official API.

## Table of Contents

- Installation
- Usage
- Methods
- Properties
- Events

## Installation

To install the YouTubeIFrameCtrl you can use npm:

```sh
npm install youtube-iframe-ctrl@1.0.0-beta
```

## Usage

Here's an example of how to use the YouTubeIFrameCtrl:

Add iframe to your page / html.

---
**IMPORTANT NOTE:**

You __must__ add `enablejsapi=1` query parameter to YouTube url - otherwise iFrame controller will not work.

---

```html
<iframe
  id="youtube-iframe"
  src="https://www.youtube-nocookie.com/embed/jNQXAC9IVRw?enablejsapi=1"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
>
</iframe>
```

```js
import YouTubeIFrameCtrl from 'youtube-iframe-ctrl';

// Assuming you have an iframe element with id 'youtube-iframe'
const iframeElement = document.getElementById('youtube-iframe');
const youTubeIFrameCtrl = new YouTubeIFrameCtrl(iframe);

async function play() {
  // Mute video
  await youTubeIFrameCtrl.mute()
  // Play video
  await youTubeIFrameCtrl.play()
}

play()
```

## Methods

### `async play(): Promise<void>`

Plays the video. Under the hood it uses `command()` method.

Example:

```js
youTubeIFrameCtrl.play()
```

### `async pause(): Promise<void>`

Pauses the video. Under the hood it uses `command()` method.

Example:

```js
youTubeIFrameCtrl.pause()
```

### `async stop(): Promise<void>`

Stops the video. Under the hood it uses `command()` method.

Example:

```js
youTubeIFrameCtrl.stop()
```

### `async mute(): Promise<void>`

Mutes the video. Under the hood it uses `command()` method.

Example:

```js
youTubeIFrameCtrl.mute()
```

### `async unMute(): Promise<void>`

Unmutes the video. Under the hood it uses `command()` method.

Example:

```js
youTubeIFrameCtrl.unmute()
```

### `async command(command: string, args?: any[]): Promise<void>`

Sends a command to the YouTube player. `command` argument can be a name of any command accepted by YouTube iFrame player API, below you'll find a list of all know commands (it's based on my foundings after studing some YouTube player JS source files):

| Command | Arguments | Info |
|---------|-----------|------|
| `play` | - | Play video (you can use play method of YouTube iFrame Controller instead) |
| `pause` | - | Pause video (you can use pause method of YouTube iFrame Controller instead) |
| `stop` | - | Stop video (you can use stop method of YouTube iFrame Controller instead) |
| `mute` | - | Mute video (you can use mute method of YouTube iFrame Controller instead) |
| `unMute` | - | Unmute video (you can use unMute method of YouTube iFrame Controller instead) |
| `seekTo` | `seconds: number, allowSeekAhead: boolean` | Seek to a specified time in seconds |
| `setVolume` | `volume: number` | Set the volume (0-100) |

## Properties

### `playerState: string`

Returns the current player state as a string.

## Events

YouTube iFtame Controller adds some custom events to the iFrame element.

### `ytstatechange`

Dispatched when the player state changes. The event detail contains the new player state.

Example

```js
iframeElement.addEventListener('ytstatechange', (event) => {
  console.log('Player state changed to:', event.detail);
});
```

### `ytmessage`

Dispatched when a message is received from the YouTube player. The event detail contains the message data.

```js
iframeElement.addEventListener('ytmessage', (event) => {
  console.log('Message sent from youtube player:', event.detail);
});
```
