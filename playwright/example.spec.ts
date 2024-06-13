import { test, expect } from "@playwright/test";

test.describe("Pin Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to main page
    await page.goto("/");
  });

  test("Has correct URL redirected", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveURL("auth/unlock");
  });

  test("Enter valid PIN", async ({ page }) => {
    // Enter a valid pin to continue
    await page.getByTestId("button-pin-1").click();
    await page.getByTestId("button-pin-2").click();
    await page.getByTestId("button-pin-3").click();
    await page.getByTestId("button-pin-4").click();
    await page.getByTestId("button-confirm-pin").click();

    // Expect a title "to contain" a substring.
    await expect(page).toHaveURL("pre");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveURL("chat");
  });
});
