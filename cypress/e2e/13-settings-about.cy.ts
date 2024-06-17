import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";

describe("Settings - About", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonAudioAndVideo.click();
  });

  it.skip('R1 - "About Uplink" should appear at top of page', () => {
    // Test code for R1
  });

  it.skip("R2 - Current version of Uplink should be displayed", () => {
    // Test code for R2
  });

  it.skip("R3 - Clicking Check for Updates should check for newest version of Uplink available", () => {
    // Test code for R3
  });

  it.skip("R4 - Clicking Open Website should take you to the Uplink website", () => {
    // Test code for R4
  });

  it.skip("R5 - Clicking Open Source Code should take you to the source code", () => {
    // Test code for R5
  });

  it.skip('R6 - Text should display "Our team is all over the world with different backgrounds and different day-to-day lives all working on a common goal to build this app."', () => {
    // Test code for R6
  });

  it.skip("R7 - All correct flags should appear underneath the text", () => {
    // Test code for R7
  });

  it.skip("R8 - Clicking DevMode button 10 times should enable DevMode", () => {
    // Test code for R8
  });
});
