import { act, renderHook } from "@testing-library/react";
import { useMatchCard } from "../../hooks/useMatchCard";
import { charactersMock } from "../mocks/characters";

describe("Test in useMatchCard Hook", () => {
  test("should return the initial state", () => {
    const { result } = renderHook(() => useMatchCard(charactersMock));
    const { charactersFlip, puntuation, loading, onFlip } = result.current;
    expect(loading).toBeFalsy();
    expect(charactersFlip).toEqual(charactersMock);
    expect(onFlip).toEqual(expect.any(Function));
    expect(puntuation).toEqual({
      hits: 0,
      turns: 0,
    });
  });
  test("should return characterFlip array null", () => {
    const { result } = renderHook(() => useMatchCard());
    const { charactersFlip, puntuation, loading, onFlip } = result.current;
    expect(loading).toBeFalsy();
    expect(charactersFlip).toEqual([]);
    expect(onFlip).toEqual(expect.any(Function));
    expect(puntuation).toEqual({
      hits: 0,
      turns: 0,
    });
  });
  test("should call onFlip function", async () => {
    const { result } = renderHook(() => useMatchCard(charactersMock));
    const { onFlip } = result.current;
    act(() => {
      onFlip(charactersMock[0].id, charactersMock[0].unique);
    });
    expect(result.current.charactersFlip.some((e) => e.flip)).toBeTruthy();
  });
  test("should not match two card", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMatchCard(charactersMock));
    const { onFlip } = result.current;
    act(() => {
      onFlip(charactersMock[0].id, charactersMock[0].unique);
      onFlip(charactersMock[1].id, charactersMock[1].unique);
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.puntuation).toEqual({
      hits: 0,
      turns: 1,
    });
    jest.useRealTimers();
  });
  test("should match two card", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMatchCard(charactersMock));
    const { onFlip } = result.current;
    act(() => {
      onFlip(charactersMock[0].id, charactersMock[0].unique);
      onFlip(charactersMock[6].id, charactersMock[6].unique);
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.puntuation).toEqual({
      hits: 1,
      turns: 1,
    });
    jest.useRealTimers();
  });
});
