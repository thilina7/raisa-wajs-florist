import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders a label when label prop is provided", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor/id", () => {
    render(<Input label="Name" id="name-field" />);
    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("id", "name-field");
  });

  it("displays error message when error prop is provided", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input error="Required" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("sets aria-describedby pointing to error message", () => {
    render(<Input error="Required" id="test-input" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "test-input-error");
    expect(screen.getByText("Required")).toHaveAttribute("id", "test-input-error");
  });

  it("does not set aria-invalid when no error", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("does not set aria-describedby when no error", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
  });

  it("error message has role=alert", () => {
    render(<Input error="Bad input" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Bad input");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it("passes through additional HTML attributes", () => {
    render(<Input placeholder="Enter email" type="email" />);
    const input = screen.getByPlaceholderText("Enter email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("accepts user input", async () => {
    render(<Input label="Name" />);
    const input = screen.getByLabelText("Name");
    await userEvent.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("applies error border styling when error is present", () => {
    render(<Input error="Error" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-red-500");
  });

  it("applies normal border styling when no error", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-gray-300");
  });
});
