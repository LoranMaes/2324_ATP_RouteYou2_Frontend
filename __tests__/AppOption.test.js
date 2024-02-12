import React from "react";
import { render, screen } from "@testing-library/react";
import AppOption from "@/app/components/atoms/AppOption";


describe('AppOption component', () => { 
    it("renders correctly", () => {
        render(
            <AppOption/>
        )
        const option = screen.getByTestId('option')
        expect(option).toBeInTheDocument();
        expect(option).toHaveValue('No text given');
    }),
    it("renders correctly with text", () => {
        render(
            <AppOption item="Going"/>
        )
        const option = screen.getByTestId('option')
        expect(option).toHaveValue("Going")
    })
 })