import PasswordInput from "@/components/PasswordInput";
import { Form } from "@/components/ui/form";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";

interface TestFormValues {
  password: string;
}

const name = "Password";
const Wrapper = () => {
  const form = useForm<TestFormValues>();

  return (
    <Form {...form}>
      <PasswordInput<TestFormValues>
        label={name}
        name="password"
        placeholder={name}
        control={form.control}
      />
    </Form>
  );
};

describe("PasswordInput Component", () => {
  test("renders password input with correct label and placeholder", () => {
    render(<Wrapper />);

    const inputElement = screen.getByPlaceholderText(name);
    const labelElement = screen.getByText(name);

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  test("toggles password visibility when eye icon is clicked", () => {
    render(<Wrapper />);

    const inputElement = screen.getByPlaceholderText(name);
    expect(inputElement).toHaveAttribute("type", "password");

    const eyeOffIcon = screen.getByTestId("eye-off-icon");
    fireEvent.click(eyeOffIcon);
    expect(inputElement).toHaveAttribute("type", "text");

    const eyeIcon = screen.getByTestId("eye-icon");
    fireEvent.click(eyeIcon);
    expect(inputElement).toHaveAttribute("type", "password");
  });
});
