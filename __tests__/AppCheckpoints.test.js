
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppCheckpoints from '@/app/components/molecules/AppCheckpoints';

describe('AppCheckpoints', () => {
    test('renders the component', () => {
        render(<AppCheckpoints />);
        const sendButton = screen.getByText('Add checkpoint');
        fireEvent.click(sendButton);
        expect(sendButton).toBeInTheDocument();
    });
});
