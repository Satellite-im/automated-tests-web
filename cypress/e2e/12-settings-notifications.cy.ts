import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsNotifications from "./PageObjects/Settings/SettingsNotifications";

describe("Settings - Accessibility", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonNotifications.click();
  });

  it("Q1 - User should be able to toggle on/off Notifications", () => {
    cy.url().should("include", "/settings/notifications");
    // Label and texts for settings section are correct
    settingsNotifications.enabledSectionLabel.should("have.text", "Enabled");
    settingsNotifications.enabledSectionText.should(
      "have.text",
      "Enable notifications for incoming calls, messages, and more.",
    );

    // Checkbox should be enabled by default
    settingsNotifications.enabledSectionCheckbox.should("be.checked");

    // User can toggle checkbox to disable
    settingsNotifications.enabledSectionSlider.click();
    settingsNotifications.enabledSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsNotifications.enabledSectionSlider.click();
    settingsNotifications.enabledSectionCheckbox.should("be.checked");
  });

  it("Q2 - User should be able to toggle on/off Friend Request Notifications", () => {
    cy.url().should("include", "/settings/notifications");
    // Label and texts for settings section are correct
    settingsNotifications.friendsSectionLabel.should("have.text", "Friends");
    settingsNotifications.friendsSectionText.should(
      "have.text",
      "Enable notifications for friend requests.",
    );

    // Checkbox should be enabled by default
    settingsNotifications.friendsSectionCheckbox.should("be.checked");

    // User can toggle checkbox to disabled
    settingsNotifications.friendsSectionSlider.click();
    settingsNotifications.friendsSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsNotifications.friendsSectionSlider.click();
    settingsNotifications.friendsSectionCheckbox.should("be.checked");
  });

  it("Q3 - User should be able to toggle on/off Message Notifications", () => {
    cy.url().should("include", "/settings/notifications");
    // Label and texts for settings section are correct
    settingsNotifications.messagesSectionLabel.should("have.text", "Messages");
    settingsNotifications.messagesSectionText.should(
      "have.text",
      "Enable notifications for incoming messages.",
    );

    // Checkbox should be enabled by default
    settingsNotifications.messagesSectionCheckbox.should("be.checked");

    // User can toggle checkbox to off
    settingsNotifications.messagesSectionSlider.click();
    settingsNotifications.messagesSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsNotifications.messagesSectionSlider.click();
    settingsNotifications.messagesSectionCheckbox.should("be.checked");
  });

  it("Q4 -User should be able to toggle on/off Settings Notifications", () => {
    cy.url().should("include", "/settings/notifications");
    // Label and texts for settings section are correct
    settingsNotifications.settingsSectionLabel.should("have.text", "Settings");
    settingsNotifications.settingsSectionText.should(
      "have.text",
      "Enable notifications for updates and important alerts.",
    );

    // Checkbox should be enabled by default
    settingsNotifications.settingsSectionCheckbox.should("be.checked");

    // User can toggle checkbox to off
    settingsNotifications.settingsSectionSlider.click();
    settingsNotifications.settingsSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsNotifications.settingsSectionSlider.click();
    settingsNotifications.settingsSectionCheckbox.should("be.checked");
  });
});
