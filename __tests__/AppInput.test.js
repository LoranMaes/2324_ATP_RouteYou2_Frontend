import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppInput from "@/app/components/atoms/AppInput";

describe("AppInput Component", () => {
  it("renders correctly", () => {
    render(
      <AppInput
        type="text"
        name="name"
        label="Name"
        placeholder={"Name"}
        handleChange={() => {}}
        error={{}}
        register={() => {}}
        validationSchema={{
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Please enter a minimum of 3 characters",
          },
        }}
        required
      />
    );

    expect(screen.getByLabelText("Name*")).toBeInTheDocument();
  });

  it("displays an error message for required validation", () => {
    const errors = {
      name: {
        type: "required",
        message: "Name is required",
      },
    };

    render(
      <AppInput
        type="text"
        name="name"
        label="Name"
        placeholder={"Name"}
        error={errors}
        errorText={errors.name.message}
        handleChange={() => {}}
        register={() => {}}
        validationSchema={{
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Please enter a minimum of 3 characters",
          },
        }}
        required
      />
    );

    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const register = jest.fn();
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(
      <AppInput
        type="text"
        name="name"
        label="Name"
        error={{}}
        handleChange={handleChange}
        register={register}
        validationSchema={{
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Please enter a minimum of 3 characters",
          },
        }}
        required
      />
    );

    const input = screen.getByLabelText("Name*");
    await user.type(input, "Sample name");

    expect(input).toHaveValue("Sample name");
    expect(register).toHaveBeenCalledWith("name", expect.any(Object));
  });
});
