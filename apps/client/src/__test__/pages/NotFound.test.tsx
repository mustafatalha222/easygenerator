import { vi } from "vitest";
import { render } from "@testing-library/react";
import NotFound from "@/pages/NotFound";
import { ReactNode } from "react";
export * from "react-router-dom";

const setup = () => {
  vi.mock("react-router-dom", () => ({
    Link: ({ to, children }: { to: string; children: ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  }));
  const utils = render(<NotFound />);

  return utils;
};

describe("Not Found", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders NotFound component correctly", async () => {
    const { getByText } = setup();
    const notFound = getByText(/404/i);
    expect(notFound).toBeInTheDocument();
  });

  test('renders "Go to Home" button', async () => {
    const { getByRole } = setup();

    const button = getByRole("button", { name: /home/i });
    expect(button).toBeInTheDocument();
  });
});
