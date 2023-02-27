import { render, screen } from "@testing-library/react";
import { Loading } from "../../components";
import img from "../../assets/ricky_morty_img.svg";
//coverage
describe("Test in Loading Component", () => {
  test("should match the src", () => {
    render(<Loading />);
    const { src } = screen.getByRole("img") as HTMLImageElement;
    expect(src).toContain(img);
  });
});
