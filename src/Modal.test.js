import React from 'react';
import { render } from '@testing-library/react';

import Modal, { setAppElement } from './Modal';

beforeAll(() => {
    document.documentElement.innerHTML = '<div id="app" data-testid="app" />';
    window.scroll = jest.fn();

    setAppElement('#app');
});

it('should render its content when open and not render after closed', () => {
    const { queryByText, rerender } = render(<Modal isOpen>Hello World</Modal>);

    expect(queryByText('Hello World')).toBeTruthy();

    rerender(<Modal isOpen={ false }>Hello World</Modal>);

    expect(queryByText('Hello World')).not.toBeTruthy();
});

it('should apply fixed styles to the app element when opened', () => {
    const { getByTestId, rerender } = render(<Modal>Hello World</Modal>);
    const appElement = getByTestId('app');

    rerender(<Modal isOpen>Hello World</Modal>);

    expect(appElement.style.position).toBe('fixed');
    expect(appElement.style.top).toBe('-0px');
    expect(appElement.style.left).toBe('0px');
    expect(appElement.style.right).toBe('0px');

    rerender(<Modal>Hello World</Modal>);

    expect(appElement.style.position).toBe('');
    expect(appElement.style.top).toBe('');
    expect(appElement.style.left).toBe('');
    expect(appElement.style.right).toBe('');
});

it('should scroll the window to its original position after closing', () => {
    window.scrollY = 100;
    window.scroll.mockClear();

    const { getByTestId, rerender } = render(<Modal>Hello World</Modal>);
    const appElement = getByTestId('app');

    rerender(<Modal isOpen>Hello World</Modal>);

    expect(appElement.style.top).toBe(`-${window.scrollY}px`);

    rerender(<Modal>Hello World</Modal>);

    expect(window.scroll).toHaveBeenCalledTimes(1);
    expect(window.scroll).toHaveBeenCalledWith(0, window.scrollY);
});

it('should render correctly if receives different props than those that it uses', () => {
    const { queryByText, rerender } = render(<Modal isOpen>Hello World</Modal>);

    expect(queryByText('Hello World')).toBeTruthy();

    rerender(<Modal isOpen shouldCloseOnOverlayClick={ false }>Hello World</Modal>);

    expect(queryByText('Hello World')).toBeTruthy();
});
