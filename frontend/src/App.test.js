import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Scratch", () => {
  render(<App />);
  const linkElement = screen.getByText(/Scratch/i);
  expect(linkElement).toBeInTheDocument();
});
