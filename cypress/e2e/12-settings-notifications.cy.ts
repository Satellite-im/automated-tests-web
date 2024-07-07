import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsNotifications from "./PageObjects/Settings/SettingsNotifications";
import createOrImport from "./PageObjects/CreateOrImport";
import saveRecoverySeed from "./PageObjects/SaveRecoverySeed";

describe("Settings - Accessibility", () => {
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
    settingsProfile.buttonNotifications.click();
    cy.url().should("include", "/settings/notifications");
  });

  function verifyToggleFunctionality(slider, checkbox) {
    // Click the slider and wait for the UI to update
    slider.click().then(() => {
      // After the slider click, assert checkbox state
      checkbox.should("not.be.checked");
      // Click the slider again and wait for the UI to update
      slider.click().then(() => {
        // After the second slider click, assert checkbox state
        checkbox.should("be.checked");
      });
    });
  }

  it("Q1 - User should be able to toggle on/off Notifications", () => {
    // Label and texts for settings section are correct
    settingsNotifications.enabledSectionLabel.should("have.text", "Enabled");
    settingsNotifications.enabledSectionText.should(
      "have.text",
      "Enable notifications for incoming calls, messages, and more.",
    );
    settingsNotifications.enabledSectionCheckbox.should("be.checked");
    verifyToggleFunctionality(
      settingsNotifications.enabledSectionSlider,
      settingsNotifications.enabledSectionCheckbox,
    );
  });

  it("Q2 - User should be able to toggle on/off Friend Request Notifications", () => {
    // Label and texts for settings section are correct
    settingsNotifications.friendsSectionLabel.should("have.text", "Friends");
    settingsNotifications.friendsSectionText.should(
      "have.text",
      "Enable notifications for friend requests.",
    );
    settingsNotifications.friendsSectionCheckbox.should("be.checked");
    verifyToggleFunctionality(
      settingsNotifications.friendsSectionSlider,
      settingsNotifications.friendsSectionCheckbox,
    );
  });

  it("Q3 - User should be able to toggle on/off Message Notifications", () => {
    // Label and texts for settings section are correct
    settingsNotifications.messagesSectionLabel.should("have.text", "Messages");
    settingsNotifications.messagesSectionText.should(
      "have.text",
      "Enable notifications for incoming messages.",
    );
    settingsNotifications.messagesSectionCheckbox.should("be.checked");
    verifyToggleFunctionality(
      settingsNotifications.messagesSectionSlider,
      settingsNotifications.messagesSectionCheckbox,
    );
  });

  it("Q4 - User should be able to toggle on/off Settings Notifications", () => {
    // Label and texts for settings section are correct
    settingsNotifications.settingsSectionLabel.should("have.text", "Settings");
    settingsNotifications.settingsSectionText.should(
      "have.text",
      "Enable notifications for updates and important alerts.",
    );
    settingsNotifications.settingsSectionCheckbox.should("be.checked");
    verifyToggleFunctionality(
      settingsNotifications.settingsSectionSlider,
      settingsNotifications.settingsSectionCheckbox,
    );
  });
});
