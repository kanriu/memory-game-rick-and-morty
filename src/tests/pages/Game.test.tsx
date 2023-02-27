import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  CharacterContext,
  CharacterContextProps,
} from "../../context/CharacterContext";
import { useMatchCard } from "../../hooks/useMatchCard";
import { Game } from "../../pages";
import { charactersMock } from "../mocks/characters";

const mockedUseNavigate = jest.fn();

jest.mock("../../hooks/useMatchCard");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Test in Game Page", () => {
  const hits: number = 6;
  const mockedAddTurns = jest.fn();
  const mockedOnFlip = jest.fn();
  const contextMock: CharacterContextProps = {
    characters: [],
    turns: 0,
    addCharacters: () => {},
    addTurns: mockedAddTurns,
  };
  beforeEach(() => jest.resetAllMocks());
  test("should redirect home page", () => {
    (useMatchCard as jest.Mock).mockReturnValue({
      charactersFlip: [],
      onFlip: jest.fn(),
      puntuation: {
        hits: 0,
        turns: 0,
      },
      loading: false,
    });
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    expect(mockedUseNavigate).toHaveBeenCalledWith("/home");
  });
  test("should navigate result page", () => {
    (useMatchCard as jest.Mock).mockReturnValue({
      charactersFlip: charactersMock,
      onFlip: jest.fn(),
      puntuation: {
        hits,
        turns: 6,
      },
      loading: false,
    });
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    expect(mockedUseNavigate).toHaveBeenCalledWith("/result");
    expect(mockedAddTurns).toHaveBeenCalledWith(hits);
  });
  test("should render charactersFlip", () => {
    (useMatchCard as jest.Mock).mockReturnValue({
      charactersFlip: charactersMock,
      onFlip: jest.fn(),
      puntuation: {
        hits,
        turns: 6,
      },
      loading: false,
    });
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    expect(screen.getAllByText(charactersMock[0].name)).toBeTruthy();
  });
  test("should render hits", () => {
    (useMatchCard as jest.Mock).mockReturnValue({
      charactersFlip: charactersMock,
      onFlip: jest.fn(),
      puntuation: {
        hits: 5,
        turns: 6,
      },
      loading: false,
    });
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    expect(screen.getByText(/^Aciertos:/)).toHaveTextContent("Aciertos: 5");
  });
  test("should call onFlip", () => {
    (useMatchCard as jest.Mock).mockReturnValue({
      charactersFlip: charactersMock,
      onFlip: mockedOnFlip,
      puntuation: {
        hits: 2,
        turns: 4,
      },
      loading: false,
    });
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    const card = screen.getByRole("article", { name: "card_back 1" });
    fireEvent.click(card);
    expect(mockedOnFlip).toHaveBeenCalled();
  });
  test("should not call onFlip", () => {
    (useMatchCard as jest.Mock).mockReturnValue({
      charactersFlip: charactersMock,
      onFlip: mockedOnFlip,
      puntuation: {
        hits: 2,
        turns: 4,
      },
      loading: true,
    });
    render(
      <CharacterContext.Provider value={{ ...contextMock }}>
        <MemoryRouter>
          <Game />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
    const card = screen.getByRole("article", { name: "card_back 2" });
    fireEvent.click(card);
    expect(mockedOnFlip).toHaveBeenCalledTimes(0);
  });
});
