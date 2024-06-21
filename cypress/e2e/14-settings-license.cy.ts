import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsLicenses from "./PageObjects/Settings/SettingsLicenses";

describe("Settings - License", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonLicenses.click();
  });

  // Skipped since the licenses button does not perform any action
  it.skip("S1 - Clicking View License should take user to our licenses page", () => {
    cy.url().should("include", "/settings/licenses");
    // Label and texts for settings section are correct
    settingsLicenses.licensesSectionLabel.should("have.text", "Uplink");
    settingsLicenses.licensesSectionText.should(
      "have.text",
      "Both code and icons are under the MIT license.",
    );

    // Click on licenses button to show Uplink license
    settingsLicenses.licensesSectionButton.click();
  });
});
