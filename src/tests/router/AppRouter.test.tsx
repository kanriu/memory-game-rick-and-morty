import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../router/AppRouter";

describe("Test in AppRouter", () => {
  test("should render initial page", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("Personajes")).toBeTruthy();
  });
});
