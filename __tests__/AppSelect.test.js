import React from "react";
import { render, screen } from "@testing-library/react";
import AppSelect from "@/app/components/molecules/AppSelect";
import Cookies from "js-cookie";
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

describe('AppSelect component', () => { 
    it("renders correctly", async () => {
        const options = [
            {label:'Dutch'},
            {label:'French'},
            {label:'German'},
            {label:'Italian'},
            {label:'Spanish'}
        ];
        render(
            <AppSelect options={options}/>
        )
        options.forEach((option) => {
            const optionElement = screen.getByText(option.label);
            expect(optionElement).toBeInTheDocument();
        });
        const selectComponent = screen.getByTestId('dropdown')
        expect(selectComponent).toBeInTheDocument();
    })
 })