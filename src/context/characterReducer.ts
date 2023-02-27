import { CardFlip } from "../interface/card";

export interface CharacterState {
  characters: CardFlip[];
  turns: number;
}

export type CharacterAction =
  | { type: "addCharacters"; payload: CardFlip[] }
  | { type: "addTurn"; payload: number }
  | { type: "null" };

export const characterReducer = (
  state: CharacterState,
  action: CharacterAction
): CharacterState => {
  switch (action.type) {
    case "addCharacters":
      return { ...state, characters: action.payload };
    case "addTurn":
      return { ...state, turns: action.payload };
    default:
      return state;
  }
};
