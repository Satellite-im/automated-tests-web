import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsKeybinds from "./PageObjects/Settings/SettingsKeybinds";
import friendsPage from "./PageObjects/Friends";
import createOrImport from "./PageObjects/CreateOrImport";
import saveRecoverySeed from "./PageObjects/SaveRecoverySeed";

describe("Settings - Keybindings", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    createOrImport.launchCleanApplication();
    createOrImport.clickCreateNewAccount();
    authNewAccount.createRandomUser(username, status);
    loginPinPage.loginWithPin("1234");
    saveRecoverySeed.clickOnSavedIt();
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonKeybinds.click();
  });

  it("O1, 06 - Message at top of page and custom keybinds listed correctly", () => {
    // Assert URL displayed
    cy.url().should("include", "/settings/keybinds");

    // Validate banner text
    settingsKeybinds.bannerText.should(
      "contain",
      "Global keybinds are disabled while on this page.",
    );

    // Validate existing keybinds listed
    settingsKeybinds.validateKeybindButtonKeys(
      "Increase font size within Uplink.",
      [".", "ctrl", "shift"],
    );
    settingsKeybinds.validateKeybindButtonKeys(
      "Decrease font size within Uplink.",
      [",", "shift", "ctrl"],
    );
    settingsKeybinds.validateKeybindButtonKeys(
      "Mute & un-mute your microphone.",
      ["M", "ctrl", "shift"],
    );
    settingsKeybinds.validateKeybindButtonKeys(
      "Toggle turning off all sounds including your microphone and headphones.",
      ["D", "ctrl", "shift"],
    );
    settingsKeybinds.validateKeybindButtonKeys("Open/Close Web Inspector.", [
      "I",
      "shift",
      "ctrl",
    ]);
    settingsKeybinds.validateKeybindButtonKeys("Toggle Developer Mode.", ["~"]);
    settingsKeybinds.validateKeybindButtonKeys("Hide/Focus Uplink.", [
      "U",
      "shift",
      "ctrl",
    ]);
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
    settingsKeybinds.validateKeybindButtonKeys("Push to mute.", [".", "ctrl"]);
    settingsKeybinds.validateKeybindButtonKeys("Push to deafen.", [","]);
  });

  it("O2, 04 - Clicking a key should activate the Recorded Keys - User can save keybind", () => {
    // Validate keybind instructions
    settingsKeybinds.recordKeybindLabel.should("have.text", "Record Keybind");
    settingsKeybinds.recordKeybindInstructionsText.should(
      "have.text",
      "Press any combination of keys while on this page, then select the action you'd like to bind to this keyboard combo. Custom shortcuts will override default shortcuts. Not all actions have default shortcuts.",
    );

    // Validate keybind buttons for "Push to talk." initially set to "."
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);

    // Pressing "Shift + P" on app
    settingsKeybinds.revertKeybindSectionAllButton.type("{shift+p}");

    // Select Push to Talk and save changes
    settingsKeybinds.selectKeybind("Push to talk.");
    settingsKeybinds.newKeybindSaveButton.click();

    // Validate keybind buttons for "Push to talk." set to "Shift + P"
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["p", "shift"]);

    // Go out of Settings Keybinds and return to page and validate that keybind is still saved
    settingsKeybinds.goToFriends();
    friendsPage.goToSettings();
    settingsProfile.buttonKeybinds.click();
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["p", "shift"]);
  });

  it("O3 - Action dropdown should display correct keybind actions", () => {
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
    settingsKeybinds.newKeybindActionSelectorOption.should("have.length", 10);
    settingsKeybinds.validateKeybindActions(expectedKeybinds);
  });

  it("O5 - Clicking Cancel should cancel any custom keybinding the user was trying to add", () => {
    // Setup a keybind and cancel the changes
    settingsKeybinds.recordKeybindLabel.should("have.text", "Record Keybind");
    settingsKeybinds.recordKeybindInstructionsText.should(
      "have.text",
      "Press any combination of keys while on this page, then select the action you'd like to bind to this keyboard combo. Custom shortcuts will override default shortcuts. Not all actions have default shortcuts.",
    );

    // Validate keybind buttons for "Push to talk." initially set to "."
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);

    // Pressing "Shift + P" on app
    settingsKeybinds.revertKeybindSectionAllButton.type("{shift+p}");

    // Select Push to Talk and cancel
    settingsKeybinds.selectKeybind("Push to talk.");
    settingsKeybinds.newKeybindCancelButton.click();

    // Validate keybind buttons for "Push to talk." is still set to "."
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
  });

  it("O7 - Highlighted border should display when user clicks cancel", () => {
    // Color before clicking button
    settingsKeybinds.newKeybindCancelButton.should(
      "have.css",
      "border-bottom-color",
      "rgb(28, 29, 43)",
    );

    // Clicking on button
    settingsKeybinds.newKeybindCancelButton.click();

    // Color after clicking button
    settingsKeybinds.newKeybindKeyButton.should(
      "have.css",
      "border-bottom-color",
      "rgb(215, 226, 255)",
    );
  });

  it("O8 - Clicking Revert Keybindings should revert any custom keybindings the user has saved", () => {
    // Setup a keybind and revert the changes
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
    settingsKeybinds.revertKeybindSectionAllButton.type("{shift+p}");
    settingsKeybinds.selectKeybind("Push to talk.");

    // Save changes and validate keybind buttons for "Push to talk." set to "Shift + P"
    settingsKeybinds.newKeybindSaveButton.click();
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["p", "shift"]);

    // Revert changes by pressing revert all keybinds button and validate keybind buttons for "Push to talk." set to "."
    settingsKeybinds.revertKeybindSectionAllButton.click();
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
  });

  it("O9 - Highlighted border should be displayed when clicking Revert Keybindings", () => {
    // Color before clicking on button
    settingsKeybinds.revertKeybindSectionAllButton.should(
      "have.css",
      "border-bottom-color",
      "rgb(28, 29, 43)",
    );

    // Clicking on button
    settingsKeybinds.revertKeybindSectionAllButton.click();

    // Color after clicking on button
    settingsKeybinds.revertKeybindSectionAllButton.should(
      "have.css",
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  it("O10 - Clicking the backwards arrow should revert specific custom keybinding", () => {
    // Setup a keybind and revert the changes
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
    settingsKeybinds.revertKeybindSectionAllButton.type("{shift+p}");
    settingsKeybinds.selectKeybind("Push to talk.");

    // Save changes and validate keybind buttons for "Push to talk." set to "Shift + P"
    settingsKeybinds.newKeybindSaveButton.click();
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["p", "shift"]);

    // Revert changes by pressing revert single keybind button and validate keybind buttons for "Push to talk." set to "."
    settingsKeybinds.clickOnRevertSingleKeybind("Push to talk.");
    settingsKeybinds.validateKeybindButtonKeys("Push to talk.", ["."]);
  });
});
