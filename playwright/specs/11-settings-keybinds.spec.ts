import { test, expect } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";
import { SettingsKeybinds } from "../PageObjects/Settings/SettingsKeybinds";
import { FriendsScreen } from "../PageObjects/FriendsScreen";

test.describe("Settings Keybinds Tests", () => {
  const username = "test123";
  const status = "test status";

  test.beforeEach(async ({ page }) => {
    // Declare the page object implementations
    const createOrImport = new CreateOrImportPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const loginPinPage = new LoginPinPage(page);
    const saveRecoverySeed = new SaveRecoverySeedPage(page);
    const chatsMainPage = new ChatsMainPage(page);
    const settingsProfile = new SettingsProfile(page);

    // Select Create Account
    await createOrImport.navigateTo();
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Enter PIN
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.buttonSavedPhrase.waitFor({ state: "attached" });
    await saveRecoverySeed.clickOnSavedIt();
    await chatsMainPage.addSomeone.waitFor({ state: "visible" });
    await page.waitForURL("/chat");

    // Go to Settings Profile and then Settings Inventory page
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");
    await settingsProfile.buttonKeybinds.click();
    await page.waitForURL("/settings/keybinds");
  });

  test("O1, 06 - Message at top of page and custom keybinds listed correctly", async ({
    page,
  }) => {
    const settingsKeybinds = new SettingsKeybinds(page);

    // Validate banner text
    await expect(settingsKeybinds.bannerText).toHaveText(
      "Global keybinds are disabled while on this page.",
    );

    // Validate existing keybinds listed
    await settingsKeybinds.validateKeybindButtonKeys(
      "Increase font size within Uplink.",
      [".", "shift", "ctrl"],
    );

    await settingsKeybinds.validateKeybindButtonKeys(
      "Decrease font size within Uplink.",
      [",", "shift", "ctrl"],
    );
    await settingsKeybinds.validateKeybindButtonKeys(
      "Mute & un-mute your microphone.",
      ["M", "shift", "ctrl"],
    );
    await settingsKeybinds.validateKeybindButtonKeys(
      "Toggle turning off all sounds including your microphone and headphones.",
      ["D", "shift", "ctrl"],
    );
    await settingsKeybinds.validateKeybindButtonKeys(
      "Open/Close Web Inspector.",
      ["I", "shift", "ctrl"],
    );
    await settingsKeybinds.validateKeybindButtonKeys("Toggle Developer Mode.", [
      "~",
    ]);
    await settingsKeybinds.validateKeybindButtonKeys("Hide/Focus Uplink.", [
      "U",
      "shift",
      "ctrl",
    ]);
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
    await settingsKeybinds.validateKeybindButtonKeys("Push to mute.", [
      ".",
      "ctrl",
    ]);
    await settingsKeybinds.validateKeybindButtonKeys("Push to deafen.", [","]);
  });

  test("O2, 04 - Clicking a key should activate the Recorded Keys - User can save keybind", async ({
    page,
  }) => {
    // Validate keybind instructions
    const settingsKeybinds = new SettingsKeybinds(page);
    const friendsPage = new FriendsScreen(page);
    const settingsProfile = new SettingsProfile(page);
    await expect(settingsKeybinds.recordKeybindLabel).toHaveText(
      "Record Keybind",
    );
    await expect(settingsKeybinds.recordKeybindInstructionsText).toHaveText(
      "Press any combination of keys while on this page, then select the action you'd like to bind to this keyboard combo. Custom shortcuts will override default shortcuts. Not all actions have default shortcuts.",
    );

    // Validate keybind buttons for "Push to talk." initially set to "."
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);

    // Pressing "Shift + P" on app
    await page.keyboard.press("Shift+p");

    // Select Push to Talk and save changes
    await settingsKeybinds.selectKeybind("Push to talk.");
    await settingsKeybinds.newKeybindSaveButton.click();

    // Validate keybind buttons for "Push to talk." set to "Shift + P"
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", [
      "p",
      "shift",
    ]);

    // Go out of Settings Keybinds and return to page and validate that keybind is still saved
    await settingsKeybinds.goToFriends();
    await friendsPage.goToSettings();
    await settingsProfile.buttonKeybinds.click();
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", [
      "p",
      "shift",
    ]);
  });

  test("O3 - Action dropdown should display correct keybind actions", async ({
    page,
  }) => {
    const settingsKeybinds = new SettingsKeybinds(page);
    const expectedKeybinds = [
      "Increase font size within Uplink.",
      "Decrease font size within Uplink.",
      "Mute & un-mute your microphone.",
      "Toggle turning off all sounds including your microphone and headphones.",
      "Open/Close Web Inspector.",
      "Toggle Developer Mode.",
      "Hide/Focus Uplink.",
      "Push to talk.",
      "Push to mute.",
      "Push to deafen.",
    ];

    // Validate keybind actions displayed in dropdown are correct and there are 10 of them
    const numberOfKeybinds =
      await settingsKeybinds.newKeybindActionSelectorOption.count();
    expect(numberOfKeybinds).toEqual(10);
    await settingsKeybinds.validateKeybindActions(expectedKeybinds);
  });

  test("O5 - Clicking Cancel should cancel any custom keybinding the user was trying to add", async ({
    page,
  }) => {
    // Setup a keybind and cancel the changes
    const settingsKeybinds = new SettingsKeybinds(page);
    await expect(settingsKeybinds.recordKeybindLabel).toHaveText(
      "Record Keybind",
    );
    await expect(settingsKeybinds.recordKeybindInstructionsText).toHaveText(
      "Press any combination of keys while on this page, then select the action you'd like to bind to this keyboard combo. Custom shortcuts will override default shortcuts. Not all actions have default shortcuts.",
    );

    // Validate keybind buttons for "Push to talk." initially set to "."
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);

    // Pressing "Shift + P" on app
    await page.keyboard.press("Shift+p");

    // Select Push to Talk and cancel
    await settingsKeybinds.selectKeybind("Push to talk.");
    await settingsKeybinds.newKeybindCancelButton.click();

    // Validate keybind buttons for "Push to talk." is still set to "."
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
  });

  test("O7 - Highlighted border should display when user clicks cancel", async ({
    page,
  }) => {
    // Color before clicking button
    const settingsKeybinds = new SettingsKeybinds(page);
    await expect(settingsKeybinds.newKeybindCancelButton).toHaveCSS(
      "border-bottom-color",
      "rgb(28, 29, 43)",
    );

    // Clicking on button
    await settingsKeybinds.newKeybindCancelButton.click();

    // Color after clicking button
    await expect(settingsKeybinds.newKeybindKeyButton).toHaveCSS(
      "border-bottom-color",
      "rgb(215, 226, 255)",
    );
  });

  test("O8 - Clicking Revert Keybindings should revert any custom keybindings the user has saved", async ({
    page,
  }) => {
    // Setup a keybind and revert the changes
    const settingsKeybinds = new SettingsKeybinds(page);
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
    await page.keyboard.press("Shift+p");
    await settingsKeybinds.selectKeybind("Push to talk.");

    // Save changes and validate keybind buttons for "Push to talk." set to "Shift + P"
    await settingsKeybinds.newKeybindSaveButton.click();
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", [
      "p",
      "shift",
    ]);

    // Revert changes by pressing revert all keybinds button and validate keybind buttons for "Push to talk." set to "."
    await settingsKeybinds.revertKeybindSectionAllButton.click();
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
  });

  test("O9 - Highlighted border should be displayed when clicking Revert Keybindings", async ({
    page,
  }) => {
    // Color before clicking on button
    const settingsKeybinds = new SettingsKeybinds(page);
    await expect(settingsKeybinds.revertKeybindSectionAllButton).toHaveCSS(
      "border-bottom-color",
      "rgb(28, 29, 43)",
    );

    // Clicking on button
    await settingsKeybinds.revertKeybindSectionAllButton.click();

    // Color after clicking on button
    await expect(settingsKeybinds.revertKeybindSectionAllButton).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  test("O10 - Clicking the backwards arrow should revert specific custom keybinding", async ({
    page,
  }) => {
    // Setup a keybind and revert the changes
    const settingsKeybinds = new SettingsKeybinds(page);
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
    await page.keyboard.press("Shift+p");
    await settingsKeybinds.selectKeybind("Push to talk.");

    // Save changes and validate keybind buttons for "Push to talk." set to "Shift + P"
    await settingsKeybinds.newKeybindSaveButton.click();
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", [
      "p",
      "shift",
    ]);

    // Revert changes by pressing revert single keybind button and validate keybind buttons for "Push to talk." set to "."
    await settingsKeybinds.clickOnRevertSingleKeybind("Push to talk.");
    await settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
  });
});
