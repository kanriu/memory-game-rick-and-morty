import { apiUrl } from "../../config/url";

describe("Test in url config", () => {
  const urlMock: string = "https://rickandmortyapi.com/api/character";
  test("should match apiUrl", () => {
    expect(urlMock).toBe(apiUrl);
  });
});
