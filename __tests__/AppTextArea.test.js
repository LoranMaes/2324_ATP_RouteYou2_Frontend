import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppTextArea from "@/app/components/atoms/AppTextArea";

describe("AppTextArea Component", () => {
  it("renders correctly", () => {
    render(
      <AppTextArea
        name="description"
        label="Description"
        placeholder={"Description"}
        error={{}}
        register={() => {}}
        validationSchema={{
          required: "Description is required",
          minLength: {
            value: 3,
            message: "Please enter a minimum of 3 characters",
          },
        }}
        required
        handleChange={() => {}}
      />
    );

    expect(screen.getByLabelText("Description*")).toBeInTheDocument();
  });

  it("displays an error message for required validation", () => {
    const errors = {
      description: {
        type: "required",
        message: "Description is required",
      },
    };

    render(
      <AppTextArea
        name="description"
        label="Description"
        placeholder={"Description"}
        error={errors}
        errorText={errors.description.message}
        register={() => {}}
        validationSchema={{
          required: "Description is required",
          minLength: {
            value: 3,
            message: "Please enter a minimum of 3 characters",
          },
        }}
        required
        handleChange={() => {}}
      />
    );

    expect(screen.getByText("Description is required")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const register = jest.fn();
    const user = userEvent.setup();

    render(
      <AppTextArea
        name="description"
        label="Description"
        placeholder={"Description"}
        error={{}}
        register={register}
        validationSchema={{
          required: "Description is required",
          minLength: {
            value: 3,
            message: "Please enter a minimum of 3 characters",
          },
        }}
        required
        handleChange={() => {}}
      />
    );

    const textarea = screen.getByLabelText("Description*");
    await user.type(textarea, "Sample description");

    expect(textarea).toHaveValue("Sample description");
    expect(register).toHaveBeenCalledWith("description", expect.any(Object));
  });
});
