import { fireEvent, render, screen } from "@testing-library/react";
import { useContext, useEffect } from "react";
import {
  CharacterContext,
  CharacterContextProps,
  characterInitialState,
  CharacterProvider,
} from "../../context/CharacterContext";
import { charactersMock } from "../mocks/characters";

describe("Test in CharacterContext", () => {
  const customRender = (ui: any, providerProps: CharacterContextProps) => {
    return render(
      <CharacterContext.Provider value={{ ...providerProps }}>
        {ui}
      </CharacterContext.Provider>
    );
  };
  test("should default value", () => {
    const providerProps: CharacterContextProps = {
      ...characterInitialState,
      addCharacters: () => {},
      addTurns: () => {},
    };
    customRender(
      <span>Turno: {characterInitialState.turns}</span>,
      providerProps
    );
    expect(screen.getByText(/^Turno:/)).toHaveTextContent("Turno: 0");
  });
  test("should call addCharacters", () => {
    const wrapper = ({ children }: any) => (
      <CharacterProvider>{children}</CharacterProvider>
    );
    const Test = () => {
      const { addCharacters } = useContext(CharacterContext);
      return (
        <button onClick={() => addCharacters(charactersMock)}>
          Turno: {characterInitialState.turns}
        </button>
      );
    };
    render(<Test />, { wrapper });
    const button = screen.getByRole("button");
    fireEvent.click(button);
  });
  test("should call addTurns", () => {
    const wrapper = ({ children }: any) => (
      <CharacterProvider>{children}</CharacterProvider>
    );
    const Test = () => {
      const { addTurns } = useContext(CharacterContext);
      return (
        <button onClick={() => addTurns(1)}>
          Turno: {characterInitialState.turns}
        </button>
      );
    };
    render(<Test />, { wrapper });
    const button = screen.getByRole("button");
    fireEvent.click(button);
  });
});
