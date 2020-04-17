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

A modal built on top of [react-modal](https://github.com/reactjs/react-modal) to fix the scrollable body in iOS.

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

Then use the component just like [`react-modal`](https://github.com/reactjs/react-modal).

```js
import React, { useState, useCallback } from 'react';
import Modal from '@moxy/react-modal';

const MyComponent = () => {
    const [isOpen, setOpen] = useState(false);

    const handleModalOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <button onClick={ handleModalOpen }>Open</button>
            <Modal isOpen={ isOpen } onRequestClose={ handleModalClose }>Modal content</Modal>
        </>
    );
};

export default MyComponent;
```

## API

### setAppElement

Wrapper around [`react-modal`](https://github.com/reactjs/react-modal)'s `setAppElement` that binds the modal to the app element and locks the scroll on that element when a modal is open.

### Modal

React component that locks the app element whenever a modal is open.
Every prop passed to `Modal` will be passed to the base component ([`react-modal`](https://github.com/reactjs/react-modal)).

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```

## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
