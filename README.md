# react-modal

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/react-modal
[downloads-image]:https://img.shields.io/npm/dm/@moxy/react-modal.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/react-modal.svg
[travis-url]:https://travis-ci.org/moxystudio/react-modal
[travis-image]:https://img.shields.io/travis/moxystudio/react-modal/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/react-modal
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/react-modal/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/react-modal
[david-dm-image]:https://img.shields.io/david/moxystudio/react-modal.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/react-modal?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/react-modal.svg

A self controlled modal built on top of [react-modal](https://github.com/reactjs/react-modal) that also fixes the scrollable body in iOS.

## Installation

```sh
$ npm install @moxy/react-modal
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.


## Usage

First, make sure to bind modal to your appElement.

```js
import Modal from '@moxy/react-modal';

Modal.setAppElement('#yourAppElement');
```

...and then use the Modal as the example:

```js
import React, { useRef, useCallback } from 'react';
import Modal from '@moxy/react-modal';

const MyComponent = () => {
    const modalRef = useRef();

    const handleModalOpen = useCallback(() => {
        modalRef.current.open();
    }, []);

    return (
        <>
            <button onClick={ handleModalOpen }>Open</button>
            <Modal>This is the modal's content</Modal>
        </>
    );
};

export default MyComponent;
```

## API

### setAppElement

Wrapper around [react-modal](https://github.com/reactjs/react-modal)'s `setAppElement` that not only bind the modal to the app element aswell as saves it to lock the scroll when a modal is open.

### Modal

React component that already has a state that controls if the modal is open or not. Can be opened by passing a ref and calling its methods `open` or `close`. Every prop passed to `Modal` will be passed to the base component.

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```


## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
