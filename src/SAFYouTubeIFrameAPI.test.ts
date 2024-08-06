import SAFYouTubeIFrameAPI from './SAFYouTubeIFrameAPI';

describe('SAFYouTubeIFrameAPI', () => {
  let iframe: HTMLIFrameElement;

  beforeEach(() => {
    // Create a mock iframe element
    iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
  });

  afterEach(() => {
    // Clean up the mock iframe element
    document.body.removeChild(iframe);
  });

  test('should initialize correctly with an iframe element', () => {
    const api = new SAFYouTubeIFrameAPI(iframe);
    expect(api).toBeInstanceOf(SAFYouTubeIFrameAPI);
  });

  test('should throw error if element not found by selector', () => {
    expect(() => {
      new SAFYouTubeIFrameAPI('#nonexistent');
    }).toThrow('Element not found: #nonexistent');
  });

  test('should throw error if element is not an iframe', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    expect(() => {
      // @ts-expect-error
      new SAFYouTubeIFrameAPI(div);
    }).toThrow('Element is not an iframe');

    document.body.removeChild(div);
  });

  test('should resolve loaded promise when iframe is ready', async () => {
    const api = new SAFYouTubeIFrameAPI(iframe);

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

  // Add more tests for other methods and properties as needed
});
