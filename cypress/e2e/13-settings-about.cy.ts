import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsAbout from "./PageObjects/Settings/SettingsAbout";

describe("Settings - About", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonAbout.click();
  });

  it('R1 - "About Uplink" should appear at top of page', () => {
    cy.url().should("include", "/settings/about");
    // Label and texts for settings section are correct
    settingsAbout.aboutSectionLabel.should("have.text", "About");
    settingsAbout.aboutSectionText.should("have.text", "Uplink");
  });

  it("R2 - Current version of Uplink should be displayed", () => {
    // Label and texts for settings section are correct
    settingsAbout.versionSectionLabel.should("have.text", "Version");
    settingsAbout.versionSectionText.should("have.text", "0.2.5");
  });

  // Skipped since button is not performing any action now
  it.skip("R3 - Clicking Check for Updates should check for newest version of Uplink available", () => {
    settingsAbout.versionSectionButton.click();
  });

  it("R4 - Clicking Open Website should take you to the Uplink website", () => {
    // Label and texts for settings section are correct
    settingsAbout.websiteSectionLabel.should("have.text", "Website");
    settingsAbout.websiteSectionText.should(
      "have.text",
      "Open a new browser window to our official website.",
    );

    // Intercept window.open calls
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    // Click the button
    settingsAbout.websiteSectionButton.click();

    // Assert that window.open was called with the correct URL and target
    cy.get("@windowOpen").should(
      "be.calledWith",
      "https://satellite.im/",
      "_blank",
    );
  });

  it("R5 - Clicking Open Source Code should take you to the source code", () => {
    // Label and texts for settings section are correct
    settingsAbout.openSourceCodeSectionLabel.should(
      "have.text",
      "Open Source Code",
    );
    settingsAbout.openSourceCodeSectionText.should(
      "have.text",
      "Open a new browser window to our open source repository.",
    );

    // Intercept window.open calls
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    // Click the button
    settingsAbout.openSourceCodeSectionButton.click();

    // Assert that window.open was called with the correct URL and target
    cy.get("@windowOpen").should(
      "be.calledWith",
      "https://github.com/Satellite-im",
      "_blank",
    );
  });

  it("R6 and R7 - Made In header text, description and flags displayed", () => {
    // Label and texts for settings section are correct
    settingsAbout.madeInSectionLabel.should("have.text", "Made In");
    settingsAbout.madeInSectionText.should(
      "have.text",
      "Our team is all over the world with different backgrounds and different day-to-day lives all working on a common goal to build this app.",
    );

    // Validate flags displayed are correct in made in section
    settingsAbout.madeInSectionFlags.should(
      "have.text",
      "🇺🇸 🇮🇹 🇩🇪 🇵🇹 🇧🇷 🇺🇦 🇧🇾 🇯🇵 🇦🇺 🇮🇩 🇲🇽 🇨🇦",
    );
  });

  it("R8 - Clicking DevMode button 10 times should enable DevMode", () => {
    // Label and texts for settings section are correct
    settingsAbout.devModeSectionLabel.should("have.text", "DevMode");
    settingsAbout.devModeSectionText.should(
      "have.text",
      "Click 10 times to enable developer settings.",
    );

    // Open DevMode
    for (let i = 0; i < 10; i++) {
      settingsAbout.devModeSectionButton.click();
    }

    cy.url().should("include", "/settings/developer");
  });
});
