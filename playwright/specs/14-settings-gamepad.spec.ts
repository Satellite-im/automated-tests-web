import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";

test.describe("Settings Extensions Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.dismissDownloadAlert();
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.buttonGamepad.click();
    await page.waitForURL("/settings/gamepad");
  });

  // Test not implemented yet
  // test.skip("Simulate gamepad left button press", async ({
  //   singleUserContext,
  // }) => {
  //   const page = singleUserContext.page;

  //   // Inject JavaScript to simulate gamepad connection and input
  //   await page.evaluate(() => {
  //     // Simulate a gamepad being connected
  //     const gamepad = {
  //       id: "gamepad-1",
  //       index: 0,
  //       connected: true,
  //       buttons: [
  //         { pressed: false, value: 0 }, // Button 0 (e.g., 'A' button)
  //         { pressed: false, value: 0 }, // Button 1 (e.g., 'B' button)
  //         // Add more buttons as needed
  //         { pressed: false, value: 0 }, // Button 14 (e.g., 'left' button)
  //       ],
  //       axes: [0, 0, 0, 0], // Axes values
  //       mapping: "standard",
  //       timestamp: Date.now(),
  //     };

  //     // Store the gamepad state in a global variable for easy access
  //     (window as any).simulatedGamepad = gamepad;

  //     // Override the navigator.getGamepads function
  //     (navigator as any).getGamepads = () => [gamepad];

  //     // Dispatch a gamepadconnected event
  //     window.dispatchEvent(new Event("gamepadconnected"));
  //   });

  //   // Simulate pressing the left button (Button 14)
  //   await page.evaluate(() => {
  //     const gamepad = (window as any).simulatedGamepad;
  //     gamepad.buttons[14] = { pressed: true, value: 1 }; // Button 14 pressed
  //     gamepad.timestamp = Date.now(); // Update timestamp

  //     // Trigger a custom event if your application listens for it
  //     window.dispatchEvent(new Event("gamepadinput")); // Custom event, if needed
  //   });

  //   // Wait for the action to be triggered by the gamepad event
  //   await page.waitForTimeout(1000); // Adjust this time according to your application

  //   // Verify the result, e.g., check if an element has changed
  //   const result = await page.evaluate(() => {
  //     // Example: Check if an element's content or state changed
  //     return document.querySelector("#someElement")?.textContent;
  //   });

  //   // Expect the result to match the expected outcome
  //   expect(result).toBe("Expected Result After Left Button Press");
  // });
});
