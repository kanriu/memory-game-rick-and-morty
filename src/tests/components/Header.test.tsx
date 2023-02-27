import { render, screen } from "@testing-library/react";
import { Header } from "../../components";

describe("Test in Header Component", () => {
  test("should match title", () => {
    render(<Header />);
    expect(screen.getByText("Juego de memoria")).toBeTruthy();
  });
});
