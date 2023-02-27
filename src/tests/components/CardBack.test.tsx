import { fireEvent, render, screen } from "@testing-library/react";
import { CardBack } from "../../components/card/CardBack";
import { CardFaceDownProps } from "../../interface/card";

describe("Test in CardBack Component", () => {
  test("should simulate the onClick and send those parameters", () => {
    const mock: CardFaceDownProps = {
      id: 1,
      unique: 10,
      onClick: jest.fn(),
    };
    render(<CardBack {...mock} />);
    const article = screen.getByRole("article");
    fireEvent.click(article);
    expect(mock.onClick).toBeCalled();
  });
  test("should get number unique for defect 0", () => {
    const mockFunction = jest.fn((id, unique) => unique);
    const mock: CardFaceDownProps = {
      id: 1,
      onClick: mockFunction,
    };
    render(<CardBack {...mock} />);
    const article = screen.getByRole("article");
    fireEvent.click(article);
    expect(mock.onClick).toBeCalledWith(mock.id, 0);
  });
  test("should call function null for defect", () => {
    const mock: CardFaceDownProps = {
      id: 1,
      unique: 10,
    };
    render(<CardBack {...mock} />);
    const article = screen.getByRole("article");
    fireEvent.click(article);
  });
});
