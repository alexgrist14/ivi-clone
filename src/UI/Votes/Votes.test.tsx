import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import Votes from "./Votes";
import { renderWithProviders } from "/src/utils/test-utils";

jest.mock("next/router", () => require("next-router-mock"));

describe("Votes", () => {
  it("should renders without errors", () => {
    renderWithProviders(<Votes like={21} />);
  });
  it("should work events", () => {
    renderWithProviders(<Votes like={21} />);
    const like = screen.getByTestId("like");
    const dislike = screen.getByTestId("dislike");
    fireEvent.click(like);
    fireEvent.click(dislike);
    expect(screen.getByTestId("likes")).toHaveTextContent("21");
  });
});
