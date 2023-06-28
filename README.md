# backpopup

[![npm package][npm-img]][npm-url] [![Issues][issues-img]][issues-url]

A small library to display a modal when the back button is pressed.

## Install

```bash
npm install backpopup
```

## Usage

```javascript
import { backpopup } from 'backpopup';

const elements = // Any elements on the page. Typicall will be a ll `<a>` tags.

const { goBack } = backpopup({
  elements,
  openModal: () => {
    // Your code to display the modal.
  },
});

const modalCloseButton = // Element to close the modal when clicked.

modalCloseEl.addEventListener("click", () => {
  $(modalEl).fadeOut();
  // IMPORTANT: Call `goBack` to force the browser to go back to the previous page.
  goBack();
});
```

## API

### backpopup(elements, openModal, backPopupStateName, pushedStateName)

#### elements

Type: `HTMLElement[]`

List of HTML elements that will trigger a state to be pushed to the history.  
This is necessary as some browsers do not allow `pushState` to be called without a user interaction.

#### openModal

Type: `() => void`

Function that will be called when the back button is pressed.

#### backPopupStateName

Type: `string`
Default: `back_popup`

Name of the first state that is pushed to history.  
The `openModal` will be called When this state is popped from history.

#### pushedStateName

Type: `string`
Default: `already_pushed`

Name of the second state that is pushed to history.  
This second state is necessary to detect when the `backPopupStateName` state is popped from history.

[npm-img]: https://img.shields.io/npm/v/backpopup
[npm-url]: https://www.npmjs.com/package/backpopup
[issues-img]: https://img.shields.io/github/issues/diskshima/backpopup
[issues-url]: https://github.com/diskshima/backpopup/issues
