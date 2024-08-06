import YouTubeIFrameCtrl from './YouTubeIFrameCtrl';

describe('YouTubeIFrameCtrl', () => {
  let iframe: HTMLIFrameElement;
  let api: YouTubeIFrameCtrl;
  let commandSpy: jest.SpyInstance;

  beforeEach(() => {
    // Create a mock iframe element
    iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    api = new YouTubeIFrameCtrl(iframe);
    commandSpy = jest.spyOn(api, 'command');
  });

  afterEach(() => {
    // Clean up the mock iframe element
    document.body.removeChild(iframe);
    commandSpy.mockRestore();
  });

  const loadYouTube = () => {
    // Simulate iframe load event
    const loadEvent = new Event('load');
    iframe.dispatchEvent(loadEvent);

    // Simulate message event from iframe content window
    const messageEvent = new MessageEvent('message', {
      source: iframe.contentWindow,
      data: JSON.stringify({ event: 'onReady' })
    });
    window.dispatchEvent(messageEvent);
  }

  test('should initialize correctly with an iframe element', () => {
    expect(api).toBeInstanceOf(YouTubeIFrameCtrl);
  });

  test('should throw error if element not found by selector', () => {
    expect(() => {
      new YouTubeIFrameCtrl('#nonexistent');
    }).toThrow('Element not found: #nonexistent');
  });

  test('should throw error if element is not an iframe', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    expect(() => {
      // @ts-expect-error
      new YouTubeIFrameCtrl(div);
    }).toThrow('Element is not an iframe');

    document.body.removeChild(div);
  });

  test('should resolve loaded promise when iframe is ready', async () => {
    // Simulate iframe load event
    const loadEvent = new Event('load');
    iframe.dispatchEvent(loadEvent);

    // Simulate message event from iframe content window
    const messageEvent = new MessageEvent('message', {
      source: iframe.contentWindow,
      data: JSON.stringify({ event: 'onReady' })
    });
    window.dispatchEvent(messageEvent);

    // @ts-expect-error
    await expect(api.loaded).resolves.toBe(true);
  });

  test('should return correct playerstate', async () => {
    expect(api.playerState).toBe('NOT_READY');

    loadYouTube();

    const messageEvent = new MessageEvent('message', {
      source: iframe.contentWindow,
      data: JSON.stringify({ info: { playerState: -1 } })
    });

    window.dispatchEvent(messageEvent);

    expect(api.playerState).toBe('UNSTARTED');
  })

  test('should send postMessage to iframe when command method is called', async () => {
    const postMessageSpy = jest.spyOn(iframe.contentWindow!, 'postMessage');

    loadYouTube();

    // Call the command method
    await api.command('playVideo', ['arg1', 'arg2']);

    // Check if postMessage was called with the correct arguments
    expect(postMessageSpy).toHaveBeenCalledWith(
      JSON.stringify({ event: 'command', func: 'playVideo', args: 'arg1,arg2' }),
      '*'
    );

    postMessageSpy.mockRestore();
  });

  test('should call command method with "playVideo" when play is called', async () => {
    loadYouTube();
    await api.play();
    expect(commandSpy).toHaveBeenCalledWith('playVideo');
  });

  test('should call command method with "pauseVideo" when pause is called', async () => {
    loadYouTube();
    await api.pause();
    expect(commandSpy).toHaveBeenCalledWith('pauseVideo');
  });

  test('should call command method with "stopVideo" when stop is called', async () => {
    loadYouTube();
    await api.stop();
    expect(commandSpy).toHaveBeenCalledWith('stopVideo');
  });

  test('should call command method with "mute" when mute is called', async () => {
    loadYouTube();
    await api.mute();
    expect(commandSpy).toHaveBeenCalledWith('mute');
  });

  test('should call command method with "unMute" when unmute is called', async () => {
    loadYouTube();
    await api.unMute();
    expect(commandSpy).toHaveBeenCalledWith('unMute');
  });
});
