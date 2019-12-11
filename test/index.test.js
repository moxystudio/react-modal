import React, { useRef, useState, useCallback } from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Modal, setAppElement } from '../src';

beforeAll(() => {
    document.documentElement.innerHTML = '<div id="app" style="position: static; top: auto; left: auto; right: auto" />';

    setAppElement('#app');
});

const ControlledTree = (props) => {
    const modalRef = useRef();

    const [isOpen, setOpen] = useState(false);

    const handleToggle = useCallback(() => {
        if (isOpen) {
            modalRef.current.close();
            setOpen(false);
        } else {
            modalRef.current.open();
            setOpen(true);
        }
    }, [isOpen]);

    return (
        <>
            <Modal ref={ modalRef } { ...props } />
            <button onClick={ handleToggle }>Toggle</button>
        </>
    );
};

describe('Controlled', () => {
    it('should render its content when open', () => {
        const { queryByText, getByRole } = render(<ControlledTree>Hello world</ControlledTree>);

        expect(queryByText('Hello world')).not.toBeTruthy();

        fireEvent.click(getByRole('button'));

        expect(queryByText('Hello world')).toBeTruthy();
    });

    it('should render nothing after is closed and scroll to the latest position', () => {
        global.window.scroll = jest.fn();
        const { queryByText, getByRole } = render(<ControlledTree>Hello world</ControlledTree>);

        fireEvent.click(getByRole('button'));
        fireEvent.click(getByRole('button'));

        expect(queryByText('Hello world')).not.toBeTruthy();
        expect(global.window.scroll).toHaveBeenCalledTimes(1);
        expect(global.window.scroll).toHaveBeenCalledWith(0, 0);
    });
});

describe('Uncontrolled', () => {
    it('should render its content when open and not render after closed', () => {
        const { queryByText, rerender } = render(<Modal isOpen>Hello world</Modal>);

        expect(queryByText('Hello world')).toBeTruthy();

        rerender(<Modal isOpen={ false }>Hello world</Modal>);

        expect(queryByText('Hello world')).not.toBeTruthy();
    });
});

it('should pass its children functions to open, close and its state', () => {
    const mockChild = jest.fn(() => 'Hello world');

    render(<Modal isOpen>{ mockChild }</Modal>);

    expect(mockChild).toHaveBeenCalledWith({
        isOpen: expect.any(Boolean),
        open: expect.any(Function),
        close: expect.any(Function),
    });
});
