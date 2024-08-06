# Simpe As F* YouTube IFrame API

\* use your favorite *F* word

This small module makes it simple to control YouTube Player embeded to the page via iFrame without adding 3rd party scripts like official docs says you should do.

## Table of Contents

- Installation
- Usage
- Methods
- Properties
- Events
- Error Handling

## Installation

To install the SAFYouTubeIFrameAPI you can use npm:

```sh
TBD
```

## Usage

Here's an example of how to use the SAFYouTubeIFrameAPI:

```js
import SAFYouTubeIFrameAPI from 'saf-youtube-iframe-api';

// Assuming you have an iframe element with id 'youtube-iframe'
const iframe = document.getElementById('youtube-iframe') as HTMLIFrameElement;
const api = new SAFYouTubeIFrameAPI(iframe);

// Play the video
api.play();

// Pause the video
api.pause();

// Stop the video
api.stop();
```

## Methods

| Method | Description |
|--------|-------------|
| `async command(command: string, args?: any[]): Promise<void>` | Sends a command to the YouTube player. |
| `async play(): Promise<void>` | Plays the video. |
| `async pause(): Promise<void>` | Pauses the video. |
| `async stop(): Promise<void>` | Stops the video. |
| `async mute(): Promise<void>` | Mutes the video. |
| `async unMute(): Promise<void>` | Unmutes the video. |

## Properties

| Property | Description |
|----------|-------------|
| `playerState: string` | Returns the current player state as a string. |

## Events

| Event | Description |
|-------|-------------|
| `ytstatechange` | Dispatched when the player state changes. The event detail contains the new player state. |
| `ytmessage` | Dispatched when a message is received from the YouTube player. The event detail contains the message data. |
