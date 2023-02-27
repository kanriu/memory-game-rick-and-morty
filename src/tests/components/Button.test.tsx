import { render, screen } from "@testing-library/react";
import { Button } from "../../components";
import { ButtonProps } from "../../interface/button";

describe("Test in Button Component", () => {
  test("should match the text", () => {
    const mock: ButtonProps = {
      title: "Prueba",
      onClick: () => {},
    };
    render(<Button {...mock} />);
    expect(screen.getByText("Prueba")).toBeTruthy();
  });
  test("should render the reverse", () => {
    const mock: ButtonProps = {
      title: "Prueba",
      onClick: () => {},
      reverse: true,
    };
    render(<Button {...mock} />);
    expect(screen.getByRole("button").className).toBe(
      "button_container reverse"
    );
  });
});
