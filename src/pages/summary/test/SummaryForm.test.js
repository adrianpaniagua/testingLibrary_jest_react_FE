import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

describe("Initial conditions of Summary Form component", () => {
  test("Checkbox is on the document and starts out uncheck and confirmButton is disabled", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });
});

describe("Funct. between checkbox and button", () => {
  test("Checkbox enables button at first and disables on second click", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });
});

describe("Popover interactions", () => {
  test("Popover responds to hover", async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});

// Testing notes
/*
command[All]ByQueryType
    Commands:
        - get: expect element to be in the DOM
        - query: expect element not to be in the DOM
        - find: expect element to appear async

    [All]:
        - (exclude) expect only one match
        - (include) expect more than one match

    QueryType:
        - Role (most prefered)
        - AltText (images)
        - Text (display elements)
        - Form elements:
            - Placeholdertext
            - LabelText
            - DisplayValue
*/
