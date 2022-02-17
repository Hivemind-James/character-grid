// external imports
import React from "react";
import { render, fireEvent } from "@testing-library/react";

// internal imports
import CharacterWrapper from "../CharacterWrapper";

// image prop required from image library
describe("Character Wrapper Tests", () => {
  // does image render
  test("rendered image", () => {
    const { getByTestId } = render(<CharacterWrapper image="src" />);
    const img = getByTestId("image");
    expect(img).toBeTruthy();
  });

  // does name render
  test("rendered name", () => {
    const { getByTestId } = render(<CharacterWrapper image="src" />);
    const name = getByTestId("name");
    expect(name).toBeTruthy();
  });

  // does button render
  test("rendered button", () => {
    const { getByTestId } = render(<CharacterWrapper image="src" />);
    const btn = getByTestId("button");
    expect(btn).toBeTruthy();
  });

  // name is displayed based on props
  test("name displays correctly based on props", () => {
    const { getByTestId } = render(
      <CharacterWrapper name="james test" image="src" />
    );
    const name = getByTestId("name");
    expect(name.innerHTML).toBe("james test");
  });

  // tests that the button onClick calls the function
  test("button click triggers onClick function", () => {
    const mockClick = jest.fn();
    const { getByTestId } = render(
      <CharacterWrapper image="src" id="4" detailsOnClick={mockClick} />
    );
    const btn = getByTestId("button");
    fireEvent.click(btn);
    expect(mockClick).toHaveBeenCalled();
  });
});
