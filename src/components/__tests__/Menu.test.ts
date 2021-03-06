import Menu from '../Menu.svelte';

describe('Menu component', () => {
  it('renders correctly', () => {
    expect.assertions(1);
    const target = document.createElement('div');
    new Menu({ target });
    expect(target.innerHTML).toMatchSnapshot();
  });

  // TODO: Update this now that the click handler is in common.js
  // it('opens the settings page', () => {
  //   expect.assertions(1);
  //   const target = document.createElement('div');
  //   new Menu({ target });
  //   const link = target.querySelector('#o');
  //   const spy = jest.spyOn(chrome.runtime, 'openOptionsPage', 'get');
  //   link.click();
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockRestore();
  // });
});
