import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from './App';


test('button has correct initial color', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVilotRed'});

  
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
  expect(colorButton.textContent).toBe ('Change to Medium Violet Red');
});

test("initial conditions", () => {
  render(<App />);

 
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  expect(colorButton).toHaveStyle({backgroundColor: 'MediumVilotRed'});

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Checkbox disables button on first click and enables on second click", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("Disabled button has gray background and reverts to red", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: gray");

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: red");
});

test("Clicked disabled button has gray background and reverts to blue", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // change button to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: gray");

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: blue");
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});