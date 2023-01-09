import { render } from "react-dom";
import { renderWithProviders } from "utils/test-utils";
import NavBar from "components/NavBar/NavBar";
import { cleanup, fireEvent, screen } from "@testing-library/react";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") ),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  cleanup();
});

test("clicking submit should show number of emails caught in nav bar", () => {
  renderWithProviders(<NavBar />);

  fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
  expect(screen.getAllByTestId("emailicon")).toHaveLength(5);
});
