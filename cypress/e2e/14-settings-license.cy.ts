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

  it("S1 - Clicking View License should take user to our licenses page", () => {
    cy.url().should("include", "/settings/licenses");
    // Label and texts for settings section are correct
    settingsLicenses.licensesSectionLabel.should("have.text", "Uplink");
    settingsLicenses.licensesSectionText.should(
      "have.text",
      "Both code and icons are under the MIT license.",
    );

    // Validate open website button has correct href and target
    settingsLicenses.licensesSectionButton
      .should(
        "have.attr",
        "href",
        "https://github.com/Satellite-im/UplinkWeb/blob/dev/LICENSE-MIT",
      )
      .and("have.attr", "target", "_blank");

    // Intercept window.open calls
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    // Click the button
    settingsLicenses.licensesSectionButton.click();

    // Assert that window.open was called with the correct URL and target
    cy.get("@windowOpen").should(
      "be.calledWith",
      "https://github.com/Satellite-im/UplinkWeb/blob/dev/LICENSE-MIT",
      "_blank",
    );
  });
});
