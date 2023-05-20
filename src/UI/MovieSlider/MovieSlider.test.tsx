import { screen } from "@testing-library/react";
import React from "react";
import MovieSlider from "./MovieSlider";
import { renderWithProviders } from "/src/utils/test-utils";
import { mockMovie } from "/src/utils/movie";

jest.mock("next/router", () => require("next-router-mock"));

describe("Votes", () => {
  it("should renders without errors", () => {
    renderWithProviders(<MovieSlider slides={[mockMovie]} />);
    expect(screen.getByTestId("movie-slider")).toBeInTheDocument();
  });
  it("should render title", () => {
    renderWithProviders(<MovieSlider title={"movie"} slides={[mockMovie]} />);
    expect(screen.getByTestId("title")).toBeInTheDocument();
  });
});