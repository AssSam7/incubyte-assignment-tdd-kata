import { test, expect } from "@playwright/experimental-ct-react";
import CalculatorForm from "./CalculatorForm";

test("should mount the component successfully", async ({ mount }) => {
  const component = await mount(<CalculatorForm />);
  await expect(component).toContainText("String Calculator TDD Kata");
});

test("should display the result when a valid expression is entered", async ({
  mount,
}) => {
  const component = await mount(<CalculatorForm />);
  await component.locator('input[name="operands-expression"]').fill("1,2,3");
  await component.locator("button[type='submit']").click();
  await expect(component).toContainText("Result:");
});

test("should show 'Calculating' while calculation is in progress", async ({
  mount,
}) => {
  const component = await mount(<CalculatorForm />);
  await component.locator('input[name="operands-expression"]').fill("1,2,3");
  await component.locator("button[type='submit']").click();
  await expect(component.locator('button[type="submit"]')).toHaveText(
    "Calculating"
  );
});

test("should handle multiple numbers separated by commas and return the sum", async ({
  mount,
}) => {
  const component = await mount(<CalculatorForm />);
  await component
    .locator('input[name="operands-expression"]')
    .fill("1,2,3,5,6,7");
  await component.locator("button[type='submit']").click();
  await expect(component).toContainText("Result: 24");
});

test("should reset the input and result when reset button is clicked", async ({
  mount,
}) => {
  const component = await mount(<CalculatorForm />);
  await component.locator('input[name="operands-expression"]').fill("1,2,3");
  await component.locator("button[type='submit']").click();
  await component.locator("button[type='button']").click();
  await expect(
    component.locator('input[name="operands-expression"]')
  ).toHaveValue("");
  await expect(component).not.toContainText("Result:");
});

test("should calculate the result for the different delimiter expression", async ({
  mount,
}) => {
  const component = await mount(<CalculatorForm />);
  await component
    .locator('input[name="operands-expression"]')
    .fill("//;\\n1;2;3");
  await component.locator("button[type='submit']").click();
  await expect(component).toContainText("Result: 6");
});

test("should calculate the result separated the \\n & commas", async ({
  mount,
}) => {
  const component = await mount(<CalculatorForm />);
  await component.locator('input[name="operands-expression"]').fill("1\n2,3");
  await component.locator("button[type='submit']").click();
  await expect(component).toContainText("Result: 4");
});
