import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsMessages from "./PageObjects/Settings/SettingsMessages";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";

describe("Settings - Messages", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonMessages.click();
  });

  it("L1 - User should be able to toggle on and off emoji conversion", () => {
    // Label and texts for settings section are correct
    settingsMessages.convertToEmojiSectionLabel.should(
      "have.text",
      "Convert to Emoji",
    );
    settingsMessages.convertToEmojiSectionText.should(
      "have.text",
      "Convert smileys and other symbols like <3 to ❤️",
    );

    // Checkbox should be enabled by default
    settingsMessages.convertToEmojiSectionCheckbox.should("be.checked");

    // User can toggle checkbox to off
    settingsMessages.convertToEmojiSectionSlider.click();
    settingsMessages.convertToEmojiSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsMessages.convertToEmojiSectionSlider.click();
    settingsMessages.convertToEmojiSectionCheckbox.should("be.checked");
  });

  it("L2 - User should be able to toggle on and off Markdown support", () => {
    // Label and texts for settings section are correct
    settingsMessages.markdownSupportSectionLabel.should(
      "have.text",
      "Markdown Support",
    );
    settingsMessages.markdownSupportSectionText.should(
      "have.text",
      "Enabled the rendering of Markdown within messaging.",
    );

    // Checkbox should be enabled by default
    settingsMessages.markdownSupportSectionCheckbox.should("be.checked");

    // User can toggle checkbox to off
    settingsMessages.markdownSupportSectionSlider.click();
    settingsMessages.markdownSupportSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsMessages.markdownSupportSectionSlider.click();
    settingsMessages.markdownSupportSectionCheckbox.should("be.checked");
  });

  it("L3 - User should be able to toggle on and off emoji Spam/Bot detection & rejection", () => {
    // Label and texts for settings section are correct
    settingsMessages.spamBotDetectionSectionLabel.should(
      "have.text",
      "Spam/Bot Detection & Rejection",
    );
    settingsMessages.spamBotDetectionSectionText.should(
      "have.text",
      "Enabled the automatic rejection of messages from known spam bots or scammers. This uses a public ledger that we reserve privately for 30 days to prevent bots from detecting they have been blocked too quickly.",
    );

    // Checkbox should be enabled by default
    settingsMessages.spamBotDetectionSectionCheckbox.should("be.checked");

    // User can toggle checkbox to off
    settingsMessages.spamBotDetectionSectionSlider.click();
    settingsMessages.spamBotDetectionSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsMessages.spamBotDetectionSectionSlider.click();
    settingsMessages.spamBotDetectionSectionCheckbox.should("be.checked");
  });
});
