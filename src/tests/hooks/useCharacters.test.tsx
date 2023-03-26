import { act, renderHook, waitFor } from "@testing-library/react";
import { apiUrl } from "../../config/url";
import { useCharacters } from "../../hooks/useCharacters";

describe("Test in useCharacters Hook", () => {
  const addCharacters = () => {};
  test("should return the initial state", () => {
    const { result } = renderHook(() =>
      useCharacters(addCharacters, apiUrl, true)
    );
    const { loading, characters } = result.current;
    expect(loading).toBeTruthy();
    expect(characters).toBeUndefined();
  });
  test("should return loading in false and characters with content", async () => {
    const { result } = renderHook(() =>
      useCharacters(addCharacters, apiUrl, true)
    );
    await waitFor(
      () => expect(result.current.characters?.length).toBeGreaterThan(0),
      { timeout: 3000 }
    );
    const { loading, characters } = result.current;
    expect(loading).toBeFalsy();
    expect(characters?.length).toBeGreaterThan(0);
  });
  test("should show error", async () => {
    const { result } = renderHook(() => useCharacters(addCharacters, "", true));
    await waitFor(() => expect(result.current.loading).toBeFalsy());
  });
  test("should return characters with flip on", async () => {
    const { result } = renderHook(() =>
      useCharacters(addCharacters, apiUrl, true)
    );
    await waitFor(
      () => expect(result.current.characters?.length).toBeGreaterThan(0),
      { timeout: 3000 }
    );
    jest.useFakeTimers();
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.loading).toBeFalsy();
    jest.useRealTimers();
  });
});
