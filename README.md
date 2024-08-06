# YouTube iFrame Controller

Simple YouTube iFrame controller __with no additional dependencies and no YouTube iFrame API script__.

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
npm install youtube-iframe-ctrl
```

## Usage

Here's an example of how to use the YouTubeIFrameCtrl:

```js
import YouTubeIFrameCtrl from 'youtube-iframe-ctrl';

// Assuming you have an iframe element with id 'youtube-iframe'
const iframe = document.getElementById('youtube-iframe');
const ytIfCtrl = new YouTubeIFrameCtrl(iframe);

async function play() {
  // Mute video
  await ytIfCtrl.mute()
  // Play video
  await ytIfCtrl.play()
}

play()
```

## Methods

### `async command(command: string, args?: any[]): Promise<void>`

Sends a command to the YouTube player.

### `async play(): Promise<void>`

Plays the video.

### `async pause(): Promise<void>`

Pauses the video.

### `async stop(): Promise<void>`

Stops the video.

### `async mute(): Promise<void>`

Mutes the video.

### `async unMute(): Promise<void>`

Unmutes the video.

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
