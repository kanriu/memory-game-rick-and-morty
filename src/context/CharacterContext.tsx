import { createContext, useReducer } from "react";
import { CardFlip } from "../interface/card";
import { shuffle } from "../utils";
import { characterReducer, CharacterState } from "./characterReducer";

export type CharacterContextProps = {
  characters: CardFlip[];
  turns: number;
  addCharacters: (characters: CardFlip[]) => void;
  addTurns: (turns: number) => void;
};

export const characterInitialState: CharacterState = {
  characters: [],
  turns: 0,
};

export const CharacterContext = createContext({} as CharacterContextProps);

export const CharacterProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(characterReducer, characterInitialState);

  const addCharacters = (characters: CardFlip[]) => {
    dispatch({ type: "addCharacters", payload: shuffle(characters) });
  };

  const addTurns = (payload: number) => {
    dispatch({ type: "addTurn", payload });
  };
  return (
    <CharacterContext.Provider value={{ ...state, addCharacters, addTurns }}>
      {children}
    </CharacterContext.Provider>
  );
};
