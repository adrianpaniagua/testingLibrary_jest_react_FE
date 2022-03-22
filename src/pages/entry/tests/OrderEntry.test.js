import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";

// We import here again rest and server to create a handler which will give us an error from the BE, in that way we can handle those errors on the FE.
import { rest } from "msw";
import { server } from "../../../mocks/server";

// In this file, if we only want to run one test, we can write test.only
// The reverse, if we want to execute all test but one, we can write test.skip

test("handles errors for scoops and toppings routes", async () => {
  // reset handlers and get an error from the response.
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      rest(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  // We will display the alert on an asyncronous action, on the .catch() in the Options.jsx, that´s why we will be using find and not get.
  // Also, we need to implement the waitFor method so we can receive both calls to the API (one for the scoops and the another one for the toppings)
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
