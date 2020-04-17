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
            const newStyleValues = this.calculateElementStyles();

            this.updateRootElement(newStyleValues);
        }
    }

    getSnapshotBeforeUpdate(prevProps) {
        const { isOpen: wasOpen } = prevProps;
        const { isOpen } = this.props;

        if (!wasOpen && isOpen) {
            return this.calculateElementStyles();
        }

        if (wasOpen && !isOpen) {
            return this.prevStyleValues;
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isOpen: wasOpen } = prevProps;
        const { isOpen } = this.props;

        if (wasOpen !== isOpen) {
            this.updateRootElement(snapshot);
        }

        if (wasOpen && !isOpen && this.previousScrollValue !== null) {
            window.scroll(0, this.previousScrollValue);
        }
    }

    render() {
        return <ReactModal { ...this.props } />;
    }

    calculateElementStyles() {
        this.previousScrollValue = window.scrollY;
        this.prevStyleValues = {
            top: this.rootElement.style.top,
            left: this.rootElement.style.left,
            right: this.rootElement.style.right,
            position: this.rootElement.style.position,
        };

        return {
            top: `-${this.previousScrollValue}px`,
            left: 0,
            right: 0,
            position: 'fixed',
        };
    }

    updateRootElement({ top, left, right, position }) {
        this.rootElement.style.top = top;
        this.rootElement.style.left = left;
        this.rootElement.style.right = right;
        this.rootElement.style.position = position;
    }
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
};

export default Modal;
