import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsExtensions from "./PageObjects/Settings/SettingsExtensions";
import createOrImport from "./PageObjects/CreateOrImport";
import saveRecoverySeed from "./PageObjects/SaveRecoverySeed";

describe("Settings - Extensions", () => {
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
    settingsProfile.buttonExtensions.click();
  });

  it("N1 - User should land on Installed when navigating to this page", () => {
    cy.url().should("include", "/settings/extensions");
    settingsExtensions.installedButton.should("be.visible");
    settingsExtensions.exploreButton.should("be.visible");
    settingsExtensions.settingsButton.should("be.visible");
    settingsExtensions.underConstructionIndicator
      .should("be.visible")
      .and("contain", "Under Construction");
    settingsExtensions.noExtensionsInstalledLabel
      .should("be.visible")
      .and("contain", "No extensions installed");
  });

  it.skip("N2 - Clicking Explore should take user to Explore page", () => {
    // Test code for N2
  });

  it.skip("N3 - Clicking Settings should take user to Settings page", () => {
    // Test code for N3
  });
});
