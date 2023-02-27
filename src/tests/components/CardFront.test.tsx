import { render, screen } from "@testing-library/react";
import { CardFront } from "../../components/card/CardFront";
import { CardOpacity } from "../../interface/card";
import { characterMock } from "../mocks/character";

describe("Test in CardFront Component", () => {
  const { id, image, name, status, species } = characterMock;
  test("should render opacity", () => {
    const mock: CardOpacity = {
      id,
      image,
      name,
      status,
      species,
      opacity: true,
    };
    render(<CardFront {...mock} />);
    expect(screen.getByRole("article").className).toBe(
      "card_front_container opacity"
    );
  });
  test("should match text secondary", () => {
    const mock: CardOpacity = {
      id,
      image,
      name,
      status,
      species,
    };
    render(<CardFront {...mock} />);
    expect(screen.getByText(`${status} - ${species}`)).toBeTruthy();
  });
});
