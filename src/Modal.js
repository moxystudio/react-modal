import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactModal from 'react-modal';

let rootSelector;

export const setAppElement = (selector) => {
    rootSelector = selector;
    ReactModal.setAppElement(selector);
};

export class Modal extends Component {
    rootElement = null;
    previousScrollValue = null;
    prevStyleValues = {};

    componentDidMount() {
        const { isOpen } = this.props;

        this.rootElement = document.querySelector(rootSelector);

        if (isOpen) {
            const newStyleValues = this.computeElementValues();

            this.rootElement.style.top = newStyleValues.top;
            this.rootElement.style.left = newStyleValues.left;
            this.rootElement.style.right = newStyleValues.right;
            this.rootElement.style.position = newStyleValues.position;
        }
    }

    getSnapshotBeforeUpdate(prevProps) {
        const { isOpen: wasOpen } = prevProps;
        const { isOpen } = this.props;

        if (!wasOpen && isOpen) {
            return this.computeElementValues();
        }

        if (wasOpen && !isOpen) {
            return {
                top: this.prevStyleValues.top,
                left: this.prevStyleValues.left,
                right: this.prevStyleValues.right,
                bottom: this.prevStyleValues.bottom,
                position: this.prevStyleValues.position,
            };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isOpen: wasOpen } = prevProps;
        const { isOpen } = this.props;

        if (wasOpen !== isOpen) {
            this.rootElement.style.top = snapshot.top;
            this.rootElement.style.left = snapshot.left;
            this.rootElement.style.right = snapshot.right;
            this.rootElement.style.position = snapshot.position;
        }

        if (wasOpen && !isOpen && this.previousScrollValue !== null) {
            window.scroll(0, this.previousScrollValue);
        }
    }

    render() {
        return <ReactModal { ...this.props } />;
    }

    computeElementValues() {
        this.previousScrollValue = window.scrollY;
        this.prevStyleValues = {
            top: this.rootElement.style.top,
            left: this.rootElement.style.left,
            right: this.rootElement.style.right,
            bottom: this.rootElement.style.bottom,
            position: this.rootElement.style.position,
        };

        return {
            top: `-${this.previousScrollValue}px`,
            left: 0,
            right: 0,
            position: 'fixed',
        };
    }
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
};

export default Modal;
