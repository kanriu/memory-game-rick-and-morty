import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  CharacterContext,
  CharacterContextProps,
} from "../../context/CharacterContext";
import { Result } from "../../pages";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Test in Result Page", () => {
  const contextMock: CharacterContextProps = {
    characters: [],
    turns: 0,
    addCharacters: () => {},
    addTurns: () => {},
  };
  test("should redirect home page", () => {
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Result />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    expect(mockedUseNavigate).toHaveBeenCalledWith("/home");
  });
  test("should navigate game page", () => {
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Result />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    const button = screen.getByRole("button", { name: "Repetir" });
    fireEvent.click(button);
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });
});
