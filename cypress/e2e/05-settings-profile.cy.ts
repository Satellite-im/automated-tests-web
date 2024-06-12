import 'cypress-clipboard';
import { faker } from "@faker-js/faker";
import chatsMainPage from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import authNewAccount from "./PageObjects/AuthNewAccount";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import friendsPage from "./PageObjects/Friends";

describe("Settings Profile Tests", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    // Login with pin and wrap data from creating a new account
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);

    // Go to settings profile
    chatsMainPage.validateChatsMainPageIsShown();
    chatsMainPage.goToSettings();
    cy.location("href").should("include", "/settings/profile");
  });

  // Skipped since it needs investigation on how to implement pseudo elements validation in cypress
  it.skip("I1 - Banner Picture - Tooltip displayed", () => {
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
  it.skip("I5 - Profile picture appears blank until custom profile picture is set", () => {
    // Profile Picture should not have a src attribute
    settingsProfile.profilePictureImage.should("not.have.attr", "src");
  });

  it("I6 - Username should be displayed in the Username textbox", () => {
    // Username displayed will be equal to the username assigned randomly when creating account
    settingsProfile.inputSettingsProfileUsername.should("have.value", username);
  });

  // clipboard tests are skipped because dont work in headless 
  it.skip("I7 - UsernameID that is copied should be displayed on the page", () => {
    settingsProfile.inputSettingsProfileShortIDGroup.realHover();
    settingsProfile.inputSettingsProfileShortIDGroup.should(
      "have.attr",
      "data-tooltip",
      "Copy"
    );
  
      cy.getClipboardTextAndTriggerContextMenu().then(() => {
      cy.contains("Copy id").click(); // Click on the element that triggers the copy action
      cy.log("Clicked on the 'Copy id' element."); // Add a log after clicking
  
      // Check if the value in the clipboard matches the expected content
      cy.copyFromClipboard().then((copiedText) => {
        cy.log("Content copied to clipboard: " + copiedText);
  
        // Extract the part after the hashtag
        const partAfterHashtag = copiedText.split("#")[1];
  
        // Check if the part after the hashtag is present within the input and div elements
        cy.get('[data-cy="input-settings-profile-short-id"]').invoke('val').should("include", partAfterHashtag);
        cy.log("Part after hashtag is present within the specified elements: " + partAfterHashtag);
      });
    });
  });

  it.skip("I8 - Clicking usernameID should copy it to clipboard", () => {
    settingsProfile.inputSettingsProfileShortIDGroup.realHover();
    settingsProfile.inputSettingsProfileShortIDGroup.should(
      "have.attr",
      "data-tooltip",
      "Copy"
    );
  
      cy.getClipboardTextAndTriggerCopy().then(() => {
      cy.log("Clicked on the 'username' element."); // Add a log after clicking
      // Check if the value in the clipboard matches the expected content
      cy.copyFromClipboard().then((copiedText) => {
      cy.log("Content copied to clipboard: " + copiedText);
        
      // Expect the copied text to be equal to itself, essentially logging it
      expect(copiedText).to.equal(copiedText);
      });
    });
  });
  
  it.skip("Context menu - Clicking usernameID should copy it to clipboard", () => {
    settingsProfile.inputSettingsProfileShortIDGroup.realHover();
    settingsProfile.inputSettingsProfileShortIDGroup.should(
      "have.attr",
      "data-tooltip",
      "Copy",
    );

      cy.getClipboardTextAndTriggerContextMenu().then(() => {
      cy.contains("Copy id").click(); // Click on the element that triggers the copy action
      cy.log("Clicked on the 'Copy id' element."); // Add a log after clicking
  
      // Check if the value in the clipboard matches the expected content
      cy.copyFromClipboard().then((copiedText) => {
      cy.log("Content copied to clipboard: " + copiedText);
  
      // Expect the copied text to be equal to itself, essentially logging it
      expect(copiedText).to.equal(copiedText);
      cy.log("Content copied to clipboard is present on the page.");
      });
    });
  });

  it.skip("Context menu - Clicking DID should copy it to clipboard", () => {
    settingsProfile.inputSettingsProfileShortIDGroup.realHover();
    settingsProfile.inputSettingsProfileShortIDGroup.should(
      "have.attr",
      "data-tooltip",
      "Copy",
    );

      cy.getClipboardTextAndTriggerContextMenu().then(() => {
      cy.contains("Copy DID").click(); // Click on the element that triggers the copy action
      cy.log("Clicked on the 'Copy DID' element."); // Add a log after clicking
  
      // Check if the value in the clipboard matches the expected content
      cy.copyFromClipboard().then((copiedText) => {
        cy.log("Content copied to clipboard: " + copiedText);
  
        // Expect the copied text to be equal to itself, essentially logging it
        expect(copiedText).to.equal(copiedText);
        cy.log("Content copied to clipboard is present on the page.");
      });
    });
  });

  it("I9, I10 - User should be able to change username and see toast notification of change", () => {
    // User types into username and change value
    settingsProfile.inputSettingsProfileUsername
      .click()
      .clear()
      .type("newUsername");

    // Save modal is displayed, user selects cancel and username is not changed
    settingsProfile.saveControls.should("exist");
    settingsProfile.saveControlsButtonCancel.click();

    // Username displayed will be equal to the username assigned randomly when creating account
    settingsProfile.inputSettingsProfileUsername.should("have.value", username);

    // User types into username and change value
    settingsProfile.inputSettingsProfileUsername
      .click()
      .clear()
      .type("newUsername");

    // Save modal is displayed, user selects save and username is changed
    settingsProfile.saveControls.should("exist");
    settingsProfile.saveControlsButtonSave.click();
    chatsMainPage.toastNotification.should("exist");
    settingsProfile.inputSettingsProfileUsername.should(
      "have.value",
      "newUsername",
    );

    // User goes to another page and returns to settings profile, username is still changed
    chatsMainPage.buttonFriends.click();
    cy.location("href").should("include", "/friends");
    chatsMainPage.goToSettings();
    settingsProfile.inputSettingsProfileUsername.should(
      "have.value",
      "newUsername",
    );
  });

  // Skipped since this is not working in Uplink Web as expected per test
  it.skip("I11 - All text in Username should be selected after clicking into the text field a single time", () => {});

  it("I12 - Highlighted border should appear when clicked into the username textbox", () => {
    // Click on Username textbox and validate border is highlighted
    settingsProfile.inputSettingsProfileUsername.focus();
    settingsProfile.inputSettingsProfileUsername
      .parent()
      .should("have.css", "box-shadow", "rgb(77, 77, 255) 0px 0px 0px 1px");
  });

  // Skipped since this is not working in Uplink Web as expected per test
  it.skip("I13 - Error message should appear if user tries to input chars that are not allowed or exceeds chars amount", () => {});

  it("I14 - Highlighted border should appear when user is clicked into Status textbox", () => {
    // Click on Status textbox and validate border is highlighted
    settingsProfile.inputSettingsProfileUsername.focus();
    settingsProfile.inputSettingsProfileUsername
      .parent()
      .should("have.css", "box-shadow", "rgb(77, 77, 255) 0px 0px 0px 1px");
  });

  it("I15, I16 - User should be able to change Status Message and see toast notification for update", () => {
    // User types into status and change value
    settingsProfile.inputSettingsProfileStatus
      .click()
      .clear()
      .type("newStatusTest");

    // Save modal is displayed, user selects cancel and status is not changed
    settingsProfile.saveControls.should("exist");
    settingsProfile.saveControlsButtonCancel.click();
    // Username displayed will be equal to the username assigned randomly when creating account
    settingsProfile.inputSettingsProfileStatus.should("have.value", status);

    // User types into status and change value
    settingsProfile.inputSettingsProfileStatus
      .click()
      .clear()
      .type("newStatusTest");

    // Save modal is displayed, user selects save and status is changed
    settingsProfile.saveControls.should("exist");
    settingsProfile.saveControlsButtonSave.click();
    chatsMainPage.toastNotification.should("exist");

    // Validate status is changed
    settingsProfile.inputSettingsProfileStatus.should(
      "have.value",
      "newStatusTest",
    );

    // User goes to another page and returns to settings profile, status is still changed
    chatsMainPage.buttonFriends.click();
    cy.location("href").should("include", "/friends");
    chatsMainPage.goToSettings();
    settingsProfile.inputSettingsProfileStatus.should(
      "have.value",
      "newStatusTest",
    );
  });

  // Skipped since this is not working in Uplink Web as expected per test
  it.skip("I17 - All text in StatusMessage should be selected after clicking into the text field a single time", () => {});

  // Skipped since this is not working in Uplink Web as expected per test
  it.skip("I18 - Error message should appear if user inputs chars that are not allowed or exceeds limit", () => {});

  it("I19 - Status dropdown should show Online, Offline, Idle, Do not Disturb", () => {
    // Validate Settings Section contents
    settingsProfile.onlineStatusSectionLabel.should("have.text", "Status");
    settingsProfile.onlineStatusSectionText.should(
      "have.text",
      "Set status appearance",
    );

    // Default Status selected is Online
    settingsProfile.onlineStatusSectionSelectorCurrentlyOnline.should("exist");

    // Validate list of options
    let options = [];
    cy.get("[data-cy='selector-current-status-online']")
      .find("[data-cy='select-option']")
      .each(($option) => {
        cy.log("Option: ", $option);
        cy.log("Option Val: ", $option.text());
        options.push($option.text());
      })
      .then(() => {
        expect(options).to.have.length(4);
        // To deep equal to the array of options
        expect(options).to.deep.eq([
          "Online",
          "Offline",
          "Idle",
          "Do Not Disturb",
        ]);
      });
  });

  it("I20 - Status should show correctly depending on which status user has set", () => {
    // Change Status to Offline and validate is displayed correctly
    settingsProfile.onlineStatusSectionSelectorCurrentlyOnline
      .find("select")
      .select("offline");
    settingsProfile.onlineStatusSectionSelectorCurrentlyOffline.should("exist");

    // Change Status to Idle and validate is displayed correctly
    settingsProfile.onlineStatusSectionSelectorCurrentlyOffline
      .find("select")
      .select("idle");
    settingsProfile.onlineStatusSectionSelectorCurrentlyIdle.should("exist");

    // Change Status to Do not Disturb and validate is displayed correctly
    settingsProfile.onlineStatusSectionSelectorCurrentlyIdle
      .find("select")
      .select("do-not-disturb");
    settingsProfile.onlineStatusSectionSelectorCurrentlyDoNotDisturb.should(
      "exist",
    );

    // Go to friends page and return to Settings Profile and validate status is still the same
    chatsMainPage.buttonFriends.click();
    cy.location("href").should("include", "/friends");
    chatsMainPage.goToSettings();
    cy.location("href").should("include", "/settings/profile");
    settingsProfile.onlineStatusSectionSelectorCurrentlyDoNotDisturb.should(
      "exist",
    );
  });

  it("I21 - Clicking Reveal Phrase should display the users Recovery Phrases", () => {
    // Validate Settings Section contents
    settingsProfile.revealPhraseSectionLabel.should(
      "have.text",
      "Reveal recovery phrase",
    );
    settingsProfile.revealPhraseSectionText.should(
      "have.text",
      "Click the button to reveal your recovery seed, please do not share this with anybody, it is the master-key for your account.",
    );
    settingsProfile.storeRecoverySeedText.should(
      "have.text",
      "Store recovery seed on account (disable for increased security, irreversible)",
    );

    // Show Recovery Phrase and ensure is displayed now
    settingsProfile.revealPhraseSectionRevealButton.click().then(() => {
      settingsProfile.validateRecoveryPhraseIsShown();
    });

    // Click on Hide Phrase and validate is hidden
    settingsProfile.revealPhraseSectionHideButton.click().then(() => {
      settingsProfile.validateRecoveryPhraseIsHidden();
    });
  });

  // Cannot be automated for now since copy button does not perform any action
  it.skip("I22 - Clicking copy should copy the Recovery Phrase to the users clipboard", () => {});

  // Cannot be automated for now since checkbox checked or not checked works on the same way for now
  it.skip("I23 - User should be able to click checkbox to determine whether they want to store Recovery Phrase on account", () => {});

  it("I24 - Clicking LogOut should log user out of the account", () => {
    // Validate Settings Section contents
    settingsProfile.logOutSectionLabel.should("have.text", "Log Out");
    settingsProfile.logOutSectionText.should(
      "have.text",
      "Log out of the current account and return to the unlock page.",
    );

    // Click on Log Out and validate user is redirected to unlock page
    settingsProfile.logOutSectionButton.click();
    cy.location("href").should("include", "/auth/unlock");
  });
});
