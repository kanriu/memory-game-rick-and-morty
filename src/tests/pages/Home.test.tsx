import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  CharacterContext,
  CharacterContextProps,
} from "../../context/CharacterContext";
import { useCharacters } from "../../hooks/useCharacters";
import { Home } from "../../pages";
import { charactersMock } from "../mocks/characters";

jest.mock("../../hooks/useCharacters");

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Test in Home Page", () => {
  const contextMock: CharacterContextProps = {
    characters: [],
    turns: 0,
    addCharacters: () => {},
    addTurns: () => {},
  };
  test("should loading on", () => {
    (useCharacters as jest.Mock).mockReturnValue({
      loading: true,
      characters: [],
    });
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    expect(screen.getByRole("article").className).toBe(
      "home_loading_container"
    );
  });
  test("should navigate game page", () => {
    (useCharacters as jest.Mock).mockReturnValue({
      loading: true,
      characters: [],
    });
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/game");
  });
  test("should render characters", () => {
    (useCharacters as jest.Mock).mockReturnValue({
      loading: false,
      characters: charactersMock,
    });
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    expect(
      screen.getByRole("article", { name: "section_container" }).className
    ).toBe("home_characters_container");
  });
});
