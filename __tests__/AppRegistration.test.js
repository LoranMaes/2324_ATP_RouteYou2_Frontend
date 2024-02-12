
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppRegistration from '@/app/components/molecules/AppRegistration';
import Cookies from "js-cookie";
import HttpService from "@/services/http.service";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
      reload: jest.fn(),
    }),
  }));
  
jest.mock("../src/services/auth.service", () => ({
    login: jest.fn(() =>
        Promise.resolve({
        message: "The user has been authenticated successfully.",
        token: "91|juTTj6BxjthBTIMm1zLDoYrhmHPCg4INF3AZmCJkd8da2f68",
        }).then((res) => Cookies.set("token", res.token))
    ),
}));

jest.mock("../src/services/http.service", () => ({
    put: jest.fn(),
}));

afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
});

describe('AppRegistration', () => {
    test('renders the component', () => {
        render(<AppRegistration />);
        const sendButton = screen.getByText('Send us a message');
        fireEvent.click(sendButton);
        expect(sendButton).toBeInTheDocument();
    });
});
