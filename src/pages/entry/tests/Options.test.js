import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("Displays image for each scoop option from the server", async () => {
  render(<Options optionType="scoops" />);
  // Notes about this test
  /*
    - Here we will try to test an array of scoops. 
    - We get them with the getByAllRole() method.
    - We can map between them as an array or object
    - We need to use async await when testing asyncronous calls like Axios (to get data from the server)+
    - And also use findAllByRole() method, and not getAllByRole.
  */

  // Find images
  // scoop$ => ($) find scoop at the end of the string
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((img) => img.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Displays image for each topping option from the server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingImages.map((img) => img.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
