import {
  CharacterAction,
  characterReducer,
  CharacterState,
} from "../../context/characterReducer";
import { charactersMock } from "../mocks/characters";

describe("Test in characterReducer from the context", () => {
  const initialState: CharacterState = {
    characters: [],
    turns: 0,
  };
  test("should return initial state", () => {
    const newState = characterReducer(initialState, { type: "null" });
    expect(newState).toBe(initialState);
  });
  test("should add characters", () => {
    const action: CharacterAction = {
      type: "addCharacters",
      payload: charactersMock,
    };
    const newState = characterReducer(initialState, action);
    expect(newState.characters.length).toBeGreaterThan(0);
  });
  test("should add turn", () => {
    const action: CharacterAction = {
      type: "addTurn",
      payload: 1,
    };
    const newState = characterReducer(initialState, action);
    expect(newState.turns).toBe(1);
  });
});
