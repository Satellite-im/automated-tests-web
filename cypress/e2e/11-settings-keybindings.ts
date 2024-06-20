import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";

describe("Settings - Keybindings", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonAudioAndVideo.click();
  });

  it.skip('O1 - Message at top of page should display: "Global keybinds are disabled while on this page."', () => {
    // Test code for O1
  });

  it.skip("O2 - Clicking a key should activate the Recorded Keys", () => {
    // Test code for O2
  });

  it.skip("O3 - Action dropdown should display: Increase font size within Uplink, Decrease font size within Uplink, Mute & un-mute your microphone, Toggle turning off all sounds including your microphone and headphones, Open/Close Web Inspector, Toggle Developer Mode, Hide/Focus Uplink", () => {
    // Test code for O3
  });

  it.skip("O4 - Clicking Save should save any custom keybinding user has", () => {
    // Test code for O4
  });

  it.skip("O5 - Clicking Cancel should cancel any custom keybinding the user was trying to add", () => {
    // Test code for O5
  });

  it.skip("O6 - Custom keybinding should be displayed next to assigned function", () => {
    // Test code for O6
  });

  it.skip("O7 - Highlighted border should display when user clicks cancel", () => {
    // Test code for O7
  });

  it.skip("O8 - Clicking Revert Keybindings should revert any custom keybindings the user has saved", () => {
    // Test code for O8
  });

  it.skip("O9 - Highlighted border should be displayed when clicking Revert Keybindings", () => {
    // Test code for O9
  });

  it.skip("O10 - Clicking the backwards arrow should revert specific custom keybinding", () => {
    // Test code for O10
  });
});
