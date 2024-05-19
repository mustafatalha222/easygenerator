import ErrorMessage from "@/components/ErrorMessage";
import { render, screen } from "@testing-library/react";

describe("ErrorMessage Component", () => {
  test("renders error message when error prop is provided", () => {
    const errorMessage = "This is an error";
    render(<ErrorMessage error={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  test("does not render anything when error prop is not provided", () => {
    const { container } = render(<ErrorMessage error="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
