import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactModal from 'react-modal';

let rootSelector;

export const setAppElement = (selector) => {
    rootSelector = selector;
    ReactModal.setAppElement(selector);
};

export class Modal extends Component {
    prevStyleValues = {};

    state = {
        isOpen: this.props.isOpen,
    };

    componentDidMount() {
        this.rootElement = document.querySelector(rootSelector);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        const { isOpen: wasOpenFromProps } = prevProps;
        const { isOpen: wasOpenFromState } = prevState;
        const { isOpen: isOpenFromProps } = this.props;
        const { isOpen: isOpenFromState } = this.state;

        const wasOpen = typeof wasOpenFromProps === 'undefined' ? wasOpenFromState : wasOpenFromProps;
        const isOpen = typeof isOpenFromProps === 'undefined' ? isOpenFromState : isOpenFromProps;

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

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isOpen: wasOpenFromProps } = prevProps;
        const { isOpen: wasOpenFromState } = prevState;
        const { isOpen: isOpenFromProps } = this.props;
        const { isOpen: isOpenFromState } = this.state;

        const wasOpen = typeof wasOpenFromProps === 'undefined' ? wasOpenFromState : wasOpenFromProps;
        const isOpen = typeof isOpenFromProps === 'undefined' ? isOpenFromState : isOpenFromProps;

        if (wasOpen !== isOpen) {
            this.rootElement.style.top = snapshot.top;
            this.rootElement.style.left = snapshot.left;
            this.rootElement.style.right = snapshot.right;
            this.rootElement.style.position = snapshot.position;
        }

        if (wasOpen && !isOpen && typeof this.previousScrollValue !== 'undefined') {
            window.scroll(0, this.previousScrollValue);
        }
    }

    render() {
        const { children, isOpen: isOpenFromProps, ...props } = this.props;
        const { isOpen: isOpenFromState } = this.state;

        const isOpen = typeof isOpenFromProps === 'undefined' ? isOpenFromState : isOpenFromProps;

        return (
            <ReactModal isOpen={ isOpen } onRequestClose={ this.handleOnRequestClose } { ...props }>
                { typeof children === 'function' ?
                    children({ isOpen, open: this.open, close: this.close }) :
                    children }
            </ReactModal>
        );
    }

    open = () => {
        this.setState({ isOpen: true });
    };

    close = () => {
        this.setState({ isOpen: false });
    };

    handleOnRequestClose = this.close;
}

Modal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
};

export default Modal;
