type PlayerStateCode = -2 | -1 | 0 | 1 | 2 | 3 | 5

export default class SAFYouTubeIFrameAPI {
  private errors = [
    'Element not found',
    'Element is not an iframe'
  ];

  private playerStates: {[code in PlayerStateCode]: string} = {
    [-2]: 'NOT_READY',
    [-1]: 'UNSTARTED',
    [0]: 'ENDED',
    [1]: 'PLAYING',
    [2]: 'PAUSED',
    [3]: 'BUFFERING',
    [5]: 'CUED'
  }

  private currentPlayerStateCode: PlayerStateCode = -2
  
  private iframe: HTMLIFrameElement
  private loaded: Promise<boolean>
  private messageListener: ((event: MessageEvent) => void) | null = null

  constructor(iframe: HTMLIFrameElement | string) {
    let element: HTMLElement | null = null

    if (typeof iframe === 'string') {
      element = document.querySelector(iframe)

      if (element === null) {
        this.throwError(0, iframe)
      }
    } else  {
      element = iframe
    }

    if (element instanceof HTMLIFrameElement) {
      this.iframe = element
    } else {
      this.throwError(1)
    }

    this.loaded = new Promise(resolve => {
      let loaded = false

      const loadListener = () => {
        this.iframe.removeEventListener('load', loadListener)

        setTimeout(() => {
          this.iframe.contentWindow?.postMessage('{"event":"listening"}',  '*')
        })
      }

      this.iframe.addEventListener('load', loadListener)

      this.messageListener = (event: MessageEvent) => {
        if (event.source === this.iframe.contentWindow && event.data) {
          let eventData: any

          try {
            eventData = JSON.parse(event.data)
          } catch {
            return
          }

          if (eventData.event === 'onReady' && !loaded) {
            loaded = true
            this.iframe.removeEventListener('load', loadListener)
            resolve(true)
          }

          if (typeof eventData.info?.playerState === 'number') {
            this.stateChangeHandler(eventData.info.playerState)
          }

          this.messageHandler(eventData)
        }
      }

      window.addEventListener('message', this.messageListener)
      this.iframe.contentWindow?.postMessage('{"event":"listening"}',  '*')
    })
  }

  private throwError(errorCode: number, optionalMessage?: string): never {
    throw new Error(this.errors[errorCode] + (optionalMessage ? `: ${optionalMessage}` : '.'))
  }

  private stateChangeHandler(playerStateCode: PlayerStateCode): void {
    this.currentPlayerStateCode = playerStateCode
    const event = new CustomEvent('ytstatechange', { detail: this.playerState })
    this.iframe.dispatchEvent(event)
  }

  private messageHandler(data: any): void {
    const event = new CustomEvent('ytmessage', data)
    this.iframe.dispatchEvent(event)
  }

  async command(command: string, args?: any[]) {
    await this.loaded

    this.iframe.contentWindow?.postMessage(JSON.stringify({
      event: 'command',
      func: command,
      args: args?.join(',') || ''
    }), '*')
  }

  async play() {
    return this.command('playVideo')
  }

  async pause() {
    return this.command('pauseVideo')
  }

  async stop() {
    return this.command('stopVideo')
  }

  async mute() {
    return this.command('mute')
  }

  async unMute() {
    return this.command('unMute')
  }

  get playerState(): string {
    return this.playerStates[this.currentPlayerStateCode]
  }
}
