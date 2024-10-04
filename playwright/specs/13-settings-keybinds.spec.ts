import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { SettingsKeybinds } from "playwright/PageObjects/Settings/SettingsKeybinds";
import { FriendsScreen } from "playwright/PageObjects/FriendsScreen";

test.describe("Settings Keybinds Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const viewport = singleUserContext.viewport;
    if (viewport === "desktop-chrome") {
      const page = singleUserContext.page;
      const chatsMainPage = new ChatsMainPage(page, viewport);
      await chatsMainPage.goToSettings();
      await page.waitForURL("/settings/profile");

      const settingsProfile = new SettingsProfile(page, viewport);
      await settingsProfile.buttonKeybinds.click();
      await page.waitForURL("/settings/keybinds");
    } else {
      test.skip();
    }
  });

  test("O1, 06 - Message at top of page and custom keybinds listed correctly", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsKeybinds = new SettingsKeybinds(page, viewport);

    // Validate banner text
    await expect(settingsKeybinds.bannerText).toHaveText(
      "Global keybinds are disabled while on this page.",
    );

    // Validate existing keybinds listed
    const keybindButtonsIncreaseFontSize =
      await settingsKeybinds.getKeybindButtonKeys(
        "Increase font size within Uplink.",
      );
    expect(keybindButtonsIncreaseFontSize).toEqual([".", "shift", "ctrl"]);

    const keybindButtonsDecreaseFontSize =
      await settingsKeybinds.getKeybindButtonKeys(
        "Decrease font size within Uplink.",
      );
    expect(keybindButtonsDecreaseFontSize).toEqual([",", "shift", "ctrl"]);

    const keybindButtonsMuteMicrophone =
      await settingsKeybinds.getKeybindButtonKeys(
        "Mute & un-mute your microphone.",
      );
    expect(keybindButtonsMuteMicrophone).toEqual(["M", "shift", "ctrl"]);

    const keybindButtonsToggleSounds =
      await settingsKeybinds.getKeybindButtonKeys(
        "Toggle turning off all sounds including your microphone and headphones.",
      );
    expect(keybindButtonsToggleSounds).toEqual(["D", "shift", "ctrl"]);

    const keybindButtonsOpenCloseWebInspector =
      await settingsKeybinds.getKeybindButtonKeys("Open/Close Web Inspector.");
    expect(keybindButtonsOpenCloseWebInspector).toEqual(["I", "shift", "ctrl"]);

    const keybindButtonsToggleDeveloperMode =
      await settingsKeybinds.getKeybindButtonKeys("Toggle Developer Mode.");
    expect(keybindButtonsToggleDeveloperMode).toEqual(["~"]);

    const keybindButtonsHideFocusUplink =
      await settingsKeybinds.getKeybindButtonKeys("Hide/Focus Uplink.");
    expect(keybindButtonsHideFocusUplink).toEqual(["U", "shift", "ctrl"]);

    const keybindButtonsPushToTalk =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(keybindButtonsPushToTalk).toEqual(["."]);

    const keybindButtonsPushToMute =
      await settingsKeybinds.getKeybindButtonKeys("Push to mute.");
    expect(keybindButtonsPushToMute).toEqual([".", "ctrl"]);

    const keybindButtonsPushToDeafen =
      await settingsKeybinds.getKeybindButtonKeys("Push to deafen.");
    expect(keybindButtonsPushToDeafen).toEqual([","]);
  });

  test("O2, 04 - Clicking a key should activate the Recorded Keys - User can save keybind", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsKeybinds = new SettingsKeybinds(page, viewport);
    const friendsScreen = new FriendsScreen(page, viewport);
    const settingsProfile = new SettingsProfile(page, viewport);

    // Validate keybind instructions
    await expect(settingsKeybinds.recordKeybindLabel).toHaveText(
      "Record Keybind",
    );
    await expect(settingsKeybinds.recordKeybindInstructionsText).toHaveText(
      "Press any combination of keys while on this page, then select the action you'd like to bind to this keyboard combo. Custom shortcuts will override default shortcuts. Not all actions have default shortcuts.",
    );

    // Validate keybind buttons for "Push to talk." initially set to "."
    const keybindButtonsPushToTalk =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(keybindButtonsPushToTalk).toEqual(["."]);

    // Pressing "Shift + P" on app
    await page.keyboard.press("Shift+p");

    // Select Push to Talk and save changes
    await settingsKeybinds.selectKeybind("Push to talk.");
    await settingsKeybinds.newKeybindSaveButton.click();

    // Validate keybind buttons for "Push to talk." set to "Shift + P"
    const modifiedKeybindButtonsPushToTalk =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(modifiedKeybindButtonsPushToTalk).toEqual(["p", "shift"]);

    // Go out of Settings Keybinds and return to page and validate that keybind is still saved
    await settingsKeybinds.goToFriends();
    await page.waitForURL("/friends");
    await friendsScreen.goToSettings();
    await page.waitForURL("/settings/profile");
    await settingsProfile.buttonKeybinds.click();
    await page.waitForURL("/settings/keybinds");

    // Validate keybind buttons for "Push to talk." set to "Shift + P"
    const modifiedKeybindButtonsPushToTalk2 =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(modifiedKeybindButtonsPushToTalk2).toEqual(["p", "shift"]);
  });

  test("O3 - Action dropdown should display correct keybind actions", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsKeybinds = new SettingsKeybinds(page, viewport);

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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsKeybinds = new SettingsKeybinds(page, viewport);

    // Setup a keybind and cancel the changes
    await expect(settingsKeybinds.recordKeybindLabel).toHaveText(
      "Record Keybind",
    );
    await expect(settingsKeybinds.recordKeybindInstructionsText).toHaveText(
      "Press any combination of keys while on this page, then select the action you'd like to bind to this keyboard combo. Custom shortcuts will override default shortcuts. Not all actions have default shortcuts.",
    );

    // Validate keybind buttons for "Push to talk." initially set to "."
    const keybindButtonsPushToTalk =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(keybindButtonsPushToTalk).toEqual(["."]);

    // Pressing "Shift + P" on app
    await page.keyboard.press("Shift+p");

    // Select Push to Talk and cancel
    await settingsKeybinds.selectKeybind("Push to talk.");
    await settingsKeybinds.newKeybindCancelButton.click();

    // Validate keybind buttons for "Push to talk." is still set to "."
    const modifiedKeybindButtonsPushToTalk =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(modifiedKeybindButtonsPushToTalk).toEqual(["."]);
  });

  test("O7 - Highlighted border should display when user clicks cancel", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsKeybinds = new SettingsKeybinds(page, viewport);

    // Color before clicking button
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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsKeybinds = new SettingsKeybinds(page, viewport);

    // Setup a keybind and revert the changes
    const pushToTalkKeybind =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(pushToTalkKeybind).toEqual(["."]);

    await page.keyboard.press("Shift+p");
    await settingsKeybinds.selectKeybind("Push to talk.");

    // Save changes and validate keybind buttons for "Push to talk." set to "Shift + P"
    await settingsKeybinds.newKeybindSaveButton.click();
    const pushToTalkKeybindModified =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(pushToTalkKeybindModified).toEqual(["p", "shift"]);

    // Revert changes by pressing revert all keybinds button and validate keybind buttons for "Push to talk." set to "."
    await settingsKeybinds.revertKeybindSectionAllButton.click();
    const pushToTalkKeybindReverted =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(pushToTalkKeybindReverted).toEqual(["."]);
  });

  test("O9 - Highlighted border should be displayed when clicking Revert Keybindings", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsKeybinds = new SettingsKeybinds(page, viewport);

    // Color before clicking on button
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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsKeybinds = new SettingsKeybinds(page, viewport);

    // Setup a keybind and revert the changes
    const pushToTalkKeybind =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(pushToTalkKeybind).toEqual(["."]);

    await page.keyboard.press("Shift+p");
    await settingsKeybinds.selectKeybind("Push to talk.");

    // Save changes and validate keybind buttons for "Push to talk." set to "Shift + P"
    await settingsKeybinds.newKeybindSaveButton.click();
    const pushToTalkKeybindModified =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(pushToTalkKeybindModified).toEqual(["p", "shift"]);

    // Revert changes by pressing revert single keybind button and validate keybind buttons for "Push to talk." set to "."
    await settingsKeybinds.clickOnRevertSingleKeybind("Push to talk.");
    const pushToTalkKeybindReverted =
      await settingsKeybinds.getKeybindButtonKeys("Push to talk.");
    expect(pushToTalkKeybindReverted).toEqual(["."]);
  });
});
