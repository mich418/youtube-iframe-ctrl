export default class YouTubeIFrameCtrl {
    errors = [
        'Element not found',
        'Element is not an iframe',
        'Youtube url does not include query parameter - enablejsapi=1 - JS API is disabled'
    ];
    playerStates = {
        [-2]: 'NOT_READY',
        [-1]: 'UNSTARTED',
        [0]: 'ENDED',
        [1]: 'PLAYING',
        [2]: 'PAUSED',
        [3]: 'BUFFERING',
        [5]: 'CUED'
    };
    currentPlayerStateCode = -2;
    iframe;
    loaded;
    messageListener = null;
    constructor(iframe) {
        let element = null;
        if (typeof iframe === 'string') {
            element = document.querySelector(iframe);
            if (element === null) {
                this.throwError(0, iframe);
            }
        }
        else {
            element = iframe;
        }
        if (element instanceof HTMLIFrameElement) {
            this.iframe = element;
        }
        else {
            this.throwError(1);
        }
        if (!this.iframe.src.includes('enablejsapi=1')) {
            this.throwError(2, this.iframe.src);
        }
        this.loaded = new Promise(resolve => {
            let loaded = false;
            const loadListener = () => {
                this.iframe.removeEventListener('load', loadListener);
                setTimeout(() => {
                    this.iframe.contentWindow?.postMessage('{"event":"listening"}', '*');
                });
            };
            this.iframe.addEventListener('load', loadListener);
            this.messageListener = (event) => {
                if (event.source === this.iframe.contentWindow && event.data) {
                    let eventData;
                    try {
                        eventData = JSON.parse(event.data);
                    }
                    catch {
                        return;
                    }
                    if (eventData.event === 'onReady' && !loaded) {
                        loaded = true;
                        this.iframe.removeEventListener('load', loadListener);
                        resolve(true);
                    }
                    if (typeof eventData.info?.playerState === 'number') {
                        this.stateChangeHandler(eventData.info.playerState);
                    }
                    this.messageHandler(eventData);
                }
            };
            window.addEventListener('message', this.messageListener);
            this.iframe.contentWindow?.postMessage('{"event":"listening"}', '*');
        });
    }
    throwError(errorCode, optionalMessage) {
        throw new Error(this.errors[errorCode] + (optionalMessage ? `: ${optionalMessage}` : '.'));
    }
    stateChangeHandler(playerStateCode) {
        this.currentPlayerStateCode = playerStateCode;
        const event = new CustomEvent('ytstatechange', { detail: this.playerStates[this.currentPlayerStateCode] });
        this.iframe.dispatchEvent(event);
    }
    messageHandler(data) {
        const event = new CustomEvent('ytmessage', data);
        this.iframe.dispatchEvent(event);
    }
    async command(command, args) {
        await this.loaded;
        this.iframe.contentWindow?.postMessage(JSON.stringify({
            event: 'command',
            func: command,
            args: args || []
        }), '*');
    }
    async play() {
        return this.command('playVideo');
    }
    async pause() {
        return this.command('pauseVideo');
    }
    async stop() {
        return this.command('stopVideo');
    }
    async mute() {
        return this.command('mute');
    }
    async unMute() {
        return this.command('unMute');
    }
    get playerState() {
        return this.playerStates[this.currentPlayerStateCode];
    }
}
