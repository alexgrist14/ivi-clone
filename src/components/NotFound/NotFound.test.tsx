import React from "react";
import NotFound from "./NotFound";
import { renderWithProviders } from "/src/utils/test-utils";
import { screen } from "@testing-library/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("BannerSlider", () => {
  it("should render without errors", () => {
    renderWithProviders(<NotFound title="title" />);
    expect(screen.getByTestId("not-found")).toBeInTheDocument();
  });
});
