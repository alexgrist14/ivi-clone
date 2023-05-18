import { screen } from "@testing-library/react";
import NavigationLayout from "/src/components/Layout/Header/NavigationLayout/NavigationLayout";
import { store } from "/src/store";
import { setWindowSize } from "/src/store/slices/windowSizeSlice";
import { renderWithProviders } from "/src/utils/test-utils";

const setIsDropdownActive = jest.fn();
const setDropDownType = jest.fn();
describe("NavigationLayout", () => {
  it("should renders without errors", () => {
    renderWithProviders(
      <NavigationLayout
        setIsDropdownActive={setIsDropdownActive}
        setDropDownType={setDropDownType}
      />
    );

    expect(screen.getByTestId("navigation-layout")).toBeInTheDocument();
  });

  it("should renders navigation if window size more than 1159px", () => {
    store.dispatch(setWindowSize({ width: 1200, height: 500 }));
    renderWithProviders(
      <NavigationLayout
        setIsDropdownActive={setIsDropdownActive}
        setDropDownType={setDropDownType}
      />
    );
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
  });
});