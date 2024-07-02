import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import SettingsAccessibility from "./PageObjects/Settings/SettingsAccessibility";

describe("Settings - Accessibility", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonAccessibility.click();
  });

  it("P1, P2 - User should be able to toggle on/off Dyslexic mode and changes are applied everywhere", () => {
    // Assert URL displayed
    cy.url().should("include", "/settings/accessibility");

    // Label and texts for settings section are correct
    SettingsAccessibility.openDyslexicSectionLabel.should(
      "have.text",
      "Open Dyslexic",
    );
    SettingsAccessibility.openDyslexicSectionText.should(
      "have.text",
      "Open Dyslexic may help some users who suffer from dyslexia, it's a custom font you can enable.",
    );

    // Checkbox should be disabled by default
    SettingsAccessibility.openDyslexicSectionCheckbox.should("not.be.checked");

    // User can toggle checkbox to on
    SettingsAccessibility.openDyslexicSectionSlider.click();
    SettingsAccessibility.openDyslexicSectionCheckbox.should("be.checked");

    // Validate font size applied everywhere through the app
    SettingsAccessibility.openDyslexicSectionText.should(
      "have.css",
      "font-family",
      "OpenDyslexic",
    );

    // Validate font size applied on different page - Main Chat
    SettingsAccessibility.goToChat();
    cy.contains("Let's get something started!").should(
      "have.css",
      "font-family",
      "OpenDyslexic",
    );

    // Return to Settings Accessibility page
    chatsMain.goToSettings();
    settingsProfile.buttonAccessibility.click();
    cy.url().should("include", "/settings/accessibility");

    // User can toggle again checkbox to off
    SettingsAccessibility.openDyslexicSectionSlider.click();
    SettingsAccessibility.openDyslexicSectionCheckbox.should("not.be.checked");

    // Validate font size was restored to default everywhere through the app
    SettingsAccessibility.openDyslexicSectionText.should(
      "have.css",
      "font-family",
      "Poppins",
    );

    // Validate font size was restored to default everywhere through the app - Main Chat
    SettingsAccessibility.goToChat();
    cy.contains("Let's get something started!").should(
      "have.css",
      "font-family",
      "Poppins",
    );
  });
});
