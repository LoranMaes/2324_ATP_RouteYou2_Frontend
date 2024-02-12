
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppMollie from '@/app/components/molecules/AppMollie';
jest.mock("next/navigation", () => ({
    useRouter: () => ({
      reload: jest.fn(),
    }),
  }));

jest.mock("../src/services/http.service", () => ({
    put: jest.fn(),
}));

describe('AppMollie', () => {
    test('renders the component', () => {
        render(<AppMollie />);
        const componentElement = screen.getByTestId('app-mollie');
        expect(componentElement).toBeInTheDocument();
    });

    // test('handles payment and updates payment status', async () => {
    //     render(<AppMollie />);
    //     const makePaymentButton = screen.getByText('Pay with Mollie');
    //     fireEvent.click(makePaymentButton);
    //     expect(makePaymentButton).toBeInTheDocument();
    // });
});
