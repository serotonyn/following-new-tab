// FIXME: Move things to `common.test.js` + fix click handler tests

import App from '../App.svelte';

describe('App component', () => {
  it('renders correctly', () => {
    expect.assertions(1);
    const target = document.createElement('div');
    new App({ target });
    expect(target.innerHTML).toMatchSnapshot();
  });
});

describe('App click handler', () => {
  it.skip('triggers on mouse click event', () => {
    expect.assertions(3);
    const target = document.createElement('div');
    const spy1 = jest.spyOn(chrome.tabs, 'update');
    new App({ target });
    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', {
      enumerable: true,
      value: { href: 'chrome://bookmarks/' },
    });
    const spy2 = jest.spyOn(event, 'preventDefault');
    window.dispatchEvent(event);
    expect(spy1).toHaveBeenCalledWith(event);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    spy1.mockRestore();
    spy2.mockRestore();
  });

  it.skip('handles regular HTTP links', () => {
    expect.assertions(2);
    const target = document.createElement('div');
    const component = new App({ target });
    const link = target.querySelector('[href="https://github.com/MaxMilton/new-tab/issues"]');
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    Object.defineProperty(event, 'target', { enumerable: true, value: link });
    const spy1 = jest.spyOn(component, '_onLinkClick');
    const spy2 = jest.spyOn(event, 'preventDefault');
    window.dispatchEvent(event);
    expect(spy1).toHaveBeenCalledWith('');
    expect(spy2).not.toHaveBeenCalled();
    spy1.mockRestore();
    spy2.mockRestore();
  });

  it.skip('handles chrome internal links', () => {
    expect.assertions(4);
    const target = document.createElement('div');
    const component = new App({ target });
    const link = target.querySelector('[href="chrome://bookmarks/"]');
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    Object.defineProperty(event, 'target', { enumerable: true, value: link });
    const spy1 = jest.spyOn(component, '_onLinkClick');
    const spy2 = jest.spyOn(event, 'preventDefault');
    const spy3 = jest.spyOn(chrome.tabs, 'create');
    const spy4 = jest.spyOn(chrome.tabs, 'update');
    window.dispatchEvent(event);
    expect(spy1).toHaveBeenCalledWith('');
    expect(spy2).toHaveBeenCalledWith('');
    expect(spy3).not.toHaveBeenCalled();
    expect(spy4).toHaveBeenCalledWith('');
    spy1.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });

  it.skip('handles chrome internal links with _blank target', () => {
    expect.assertions(4);
    const target = document.createElement('div');
    const component = new App({ target });
    const link = target.querySelector('[href="chrome://bookmarks/"]');
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    Object.defineProperty(event, 'target', { enumerable: true, value: link });
    Object.defineProperty(event.target, 'target', {
      enumerable: true,
      value: '_blank',
    });
    const spy1 = jest.spyOn(component, '_onLinkClick');
    const spy2 = jest.spyOn(event, 'preventDefault');
    const spy3 = jest.spyOn(chrome.tabs, 'create');
    const spy4 = jest.spyOn(chrome.tabs, 'update');
    window.dispatchEvent(event);
    expect(spy1).toHaveBeenCalledWith('');
    expect(spy2).toHaveBeenCalledWith('');
    expect(spy3).toHaveBeenCalledWith('');
    expect(spy4).not.toHaveBeenCalled();
    spy1.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });

  it.skip('handles chrome internal links with ctrl key', () => {
    expect.assertions(4);
    const target = document.createElement('div');
    const component = new App({ target });
    const link = target.querySelector('[href="chrome://bookmarks/"]');
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      ctrlKey: true,
      view: window,
    });
    Object.defineProperty(event, 'target', { enumerable: true, value: link });
    const spy1 = jest.spyOn(component, '_onLinkClick');
    const spy2 = jest.spyOn(event, 'preventDefault');
    const spy3 = jest.spyOn(chrome.tabs, 'create');
    const spy4 = jest.spyOn(chrome.tabs, 'update');
    window.dispatchEvent(event);
    expect(spy1).toHaveBeenCalledWith('');
    expect(spy2).toHaveBeenCalledWith('');
    expect(spy3).toHaveBeenCalledWith('');
    expect(spy4).not.toHaveBeenCalled();
    spy1.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
    spy4.mockRestore();
  });
});
