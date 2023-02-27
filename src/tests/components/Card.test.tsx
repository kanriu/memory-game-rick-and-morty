import { render, screen } from "@testing-library/react";
import { Card } from "../../components";
import { CardProps } from "../../interface/card";
import { characterMock } from "../mocks/character";

describe("Test in Card Component", () => {
  const { id, image, name, status, species } = characterMock;
  test("should render flip on", () => {
    const mock: CardProps = {
      id,
      image,
      name,
      status,
      species,
      opacity: true,
      flip: true,
    };
    render(<Card {...mock} />);
    expect(screen.getByRole("article", { name: "card" }).className).toBe(
      "card_div_front_container"
    );
  });
  test("should render flip off", () => {
    const mock: CardProps = {
      id,
      image,
      name,
      status,
      species,
      opacity: true,
      flip: false,
    };
    render(<Card {...mock} />);
    expect(screen.getByRole("article", { name: "card" }).className).toBe(
      "card_div_back_container"
    );
  });
});
