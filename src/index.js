import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactModal from 'react-modal';

let rootSelector;

export const setAppElement = (selector) => {
    rootSelector = selector;
    ReactModal.setAppElement(selector);
};

export class Modal extends Component {
    state = {
        isOpen: false,
    };

    componentDidMount() {
        this.rootElement = document.querySelector(rootSelector);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        const { isOpen: wasOpen } = prevState;
        const { isOpen } = this.state;

        if (!wasOpen && isOpen) {
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

        if (wasOpen && !isOpen) {
            return {
                top: this.prevStyleValues.top,
                left: this.prevStyleValues.left,
                right: this.prevStyleValues.right,
                bottom: this.prevStyleValues.bottom,
                position: this.prevStyleValues.position,
            };
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isOpen: wasOpen } = prevState;
        const { isOpen } = this.state;

        if (wasOpen !== isOpen) {
            this.rootElement.style.top = snapshot.top;
            this.rootElement.style.left = snapshot.left;
            this.rootElement.style.right = snapshot.right;
            this.rootElement.style.position = snapshot.position;
        }

        if (wasOpen && !isOpen) {
            window.scroll(0, this.previousScrollValue);
        }
    }

    render() {
        const { children, ...props } = this.props;
        const { isOpen } = this.state;

        return (
            <ReactModal isOpen={ isOpen } onRequestClose={ this.handleOnRequestClose } { ...props }>
                { typeof children === 'function' ?
                    children({ isOpen, close: this.close, open: this.open }) :
                    children }
            </ReactModal>
        );
    }

    open = () => {
        const { onOpen } = this.props;

        this.setState({ isOpen: true }, onOpen);
    };

    close = () => {
        const { onClose } = this.props;

        this.setState({ isOpen: false }, onClose);
    };

    handleOnRequestClose = this.close;
}

Modal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onRequestClose: PropTypes.func,
};

export default Modal;
