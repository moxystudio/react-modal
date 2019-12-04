import React, { useRef, useState, useCallback } from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Modal, setAppElement } from '../src';

const Tree = (props) => {
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

beforeAll(() => {
    document.documentElement.innerHTML = '<div id="app" style="position: static; top: auto; left: auto; right: auto" />';

    setAppElement('#app');
});

it('should render its content when open', () => {
    const { queryByText, getByRole } = render(<Tree>Hello world</Tree>);

    expect(queryByText('Hello world')).not.toBeTruthy();

    fireEvent.click(getByRole('button'));

    expect(queryByText('Hello world')).toBeTruthy();
});

it('should render nothing after is closed and scroll to the latest position', () => {
    global.window.scroll = jest.fn();
    const { queryByText, getByRole } = render(<Tree>Hello world</Tree>);

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));

    expect(queryByText('Hello world')).not.toBeTruthy();
    expect(global.window.scroll).toHaveBeenCalledTimes(1);
    expect(global.window.scroll).toHaveBeenCalledWith(0, 0);
});
