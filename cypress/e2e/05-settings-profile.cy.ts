import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { authNewAccount } from "./PageObjects/AuthNewAccount";
import { settingsProfile } from "./PageObjects/Settings/SettingsProfile";
import { friendsPage } from "./PageObjects/Friends";

describe("Settings Profile Tests", () => {
  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    cy.wrap(authNewAccount.createRandomUser()).as("username");
    chatsMainPage.validateChatsMainPageIsShown();
    chatsMainPage.goToSettings();
    cy.location("href").should("include", "/settings/profile");
  });

  // Skipped since it needs investigation on how to implement pseudo elements validation in cypress
  xit("I1 - Banner Picture - Tooltip displayed", () => {
    // Shows tooltip when hovering
    settingsProfile.profileBanner.realHover();
  });

  it("I2, I3 - Banner Picture - User can upload banner", () => {
    // Shows tooltip when hovering
    settingsProfile.profileBanner.realHover();

    // User can upload a banner picture
    settingsProfile.uploadProfileBanner("cypress/fixtures/banner.jpg");

    // Property Style is reassigned to Background Image after uploading banner
    settingsProfile.validateProfileBannerURLIsValid();
  });

  it("I4 - Clicking upload picture on Profile picture should open File Browser", () => {
    // Profile Picture Upload Button tooltip shows "Change Profile Picture"
    settingsProfile.profilePictureUploadButton.realHover();
    settingsProfile.profilePictureUploadButton.should(
      "have.attr",
      "data-tooltip",
      "Change profile photo",
    );

    // Validate user can upload profile pictures
    settingsProfile.uploadProfilePicture("cypress/fixtures/logo.jpg");
    settingsProfile.validateProfilePictureURLIsValid();
  });

  // Skipped since it needs investigation on how to truly delete data before executing test
  xit("I5 - Profile picture appears blank until custom profile picture is set", () => {
    settingsProfile.profilePictureImage.should("not.have.attr", "src");
  });

  it("I6 - Username should be displayed in the Username textbox", () => {
    // Username displayed will be equal to the username assigned randomly when creating account
    cy.get("@username").then((username) => {
      settingsProfile.inputSettingsProfileUsername.should(
        "have.value",
        username,
      );
    });
  });

  it("I7 - UsernameID should be displayed next to username", () => {
    // Go to friends and copy short ID
    chatsMainPage.buttonFriends.click();
    cy.location("href").should("include", "/friends");
    friendsPage.buttonCopyID.rightclick();
    friendsPage.contextOptionCopyID.click();
    chatsMainPage.goToSettings();

    // Short ID button tooltip shows "Copy"
    settingsProfile.inputSettingsProfileShortIDGroup.realHover();
    settingsProfile.inputSettingsProfileShortIDGroup.should(
      "have.attr",
      "data-tooltip",
      "Copy",
    );

    cy.window().then(async (win) => {
      const text = await win.navigator.clipboard.readText();
      const statusText = String(text);
      // Extract the last 8 characters
      const last8Chars = statusText.slice(-8);
      // Store the last 8 characters in a Cypress alias
      cy.wrap(last8Chars).as("last8Chars");
    });

    cy.get("@last8Chars").then((last8Chars) => {
      settingsProfile.inputSettingsProfileShortID.should(
        "have.value",
        last8Chars,
      );
    });
  });

  xit("I9 - User should be able to click into username textbox and change username", () => {});
  xit("I10 - Toast notifcation should appear when user changes username", () => {});
  xit("I12 - Highlighted border should appear when clicked into the username textbox", () => {});
  xit("I14 - Highlighted border should appear when user is clicked into Status textbox", () => {});
  xit("I15 - User should be able to click into the Status Message textbox", () => {});
  xit("I16 - Toast notification should appear when user updates status", () => {});
  xit("I19 - Status dropdown should show Online, Offline, Idle, Do not Disturb", () => {});
  xit("I20 - Status should show correctly depending on which status user has set", () => {});
  xit("I21 - Clicking Reveal Phrase should display the users Recovery Phrases", () => {});
  xit("I24 - Clicking LogOut should log user out of the account", () => {});
});
