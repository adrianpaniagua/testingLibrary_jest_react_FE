import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Prebuilt test on CRA template", () => {
  test.skip("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
