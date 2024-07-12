import { test, expect } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";

test.describe("Settings Profile Tests", () => {
  const username = "test123";
  const status = "fixed status";

  test.beforeEach(async ({ page }) => {
    // Declare the page object implementations
    const createOrImport = new CreateOrImportPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const loginPinPage = new LoginPinPage(page);
    const saveRecoverySeed = new SaveRecoverySeedPage(page);
    const chatsMainPage = new ChatsMainPage(page);

    // Select Create Account
    await createOrImport.navigateTo();
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Enter PIN
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.buttonSavedPhrase.waitFor({ state: "attached" });
    await saveRecoverySeed.clickOnSavedIt();
    await chatsMainPage.addSomeone.waitFor({ state: "visible" });
    await page.waitForURL("/chat");

    // Go to Settings Profile page
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");
  });

  test("I1 - Banner Picture - Tooltip displayed", async ({ page }) => {
    // Shows tooltip when hovering
    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.profileBanner.hover();
    await settingsProfile.validatePseudoElementContent(
      "[data-cy='profile-banner']",
      "Change Banner Photo",
    );
  });

  test("I2, I3 - Banner Picture - User can upload banner", async ({ page }) => {
    // User can upload a banner picture
    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.uploadProfileBanner("cypress/fixtures/banner.jpg");

    // Property Style is reassigned to Background Image after uploading banner
    await settingsProfile.validateBannerDisplayed();
  });

  test("I4 - Clicking upload picture on Profile picture should open File Browser", async ({
    page,
  }) => {
    // Profile Picture Upload Button tooltip shows "Change profile photo"
    const settingsProfile = new SettingsProfile(page);

    // Validate user can upload profile pictures
    await settingsProfile.uploadProfilePicture("cypress/fixtures/logo.jpg");
    await settingsProfile.validateProfilePictureDisplayed();

    // Validate tooltip is displayed when hovering over the Profile Picture Upload Button
    await settingsProfile.profilePictureUploadButton.hover();
    await settingsProfile.validateTooltipAttribute(
      "[data-cy='button-file-upload']",
      "Change profile photo",
    );
  });

  test("I5 - Profile picture appears blank until custom profile picture is set", async ({
    page,
  }) => {
    // Profile Picture should not have a src attribute
    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.validateProfilePictureDisplayed();
  });

  test("I6 - Username should be displayed in the Username textbox", async ({
    page,
  }) => {
    // Username displayed will be equal to the username assigned randomly when creating account
    const settingsProfile = new SettingsProfile(page);
    await expect(settingsProfile.inputSettingsProfileUsername).toHaveValue(
      username,
    );
  });

  test("I7 - Clicking shortID should copy DID into clipboard", async ({
    page,
    context,
  }) => {
    // Validate hovering on Copy ID button shows "Copy"
    const settingsProfile = new SettingsProfile(page);
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await settingsProfile.validateTooltipAttribute(
      "[data-tooltip='Copy']",
      "Copy",
    );

    // Copy ID by just clicking on the Short ID button
    await settingsProfile.copyShortID();

    // Save copied value from clipboard into a constant
    const handle = await page.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const clipboardContent = await handle.jsonValue();

    // Paste value from Clipboard into Status and assert it is the did key
    await settingsProfile.inputSettingsProfileStatus.click();
    await settingsProfile.inputSettingsProfileStatus.clear();
    await settingsProfile.inputSettingsProfileStatus.press("Meta+v");
    await expect(settingsProfile.inputSettingsProfileStatus).toHaveValue(
      clipboardContent,
    );
  });

  test("I8 - Short ID Context menu should allow to copy DID or Short ID intoto clipboard", async ({
    page,
    context,
  }) => {
    // Copy ID by just right clicking on the Short ID button and selecting Copy ID
    const settingsProfile = new SettingsProfile(page);
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await settingsProfile.openUserIDContextMenu();
    await settingsProfile.contextMenuOptionCopyID.click();

    // Save copied value from clipboard into a constant
    const handle = await page.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const clipboardContent = await handle.jsonValue();

    // Paste value from Clipboard into Status and assert it is the did key
    await settingsProfile.inputSettingsProfileStatus.click();
    await settingsProfile.inputSettingsProfileStatus.clear();
    await settingsProfile.inputSettingsProfileStatus.press("Meta+v");
    await expect(settingsProfile.inputSettingsProfileStatus).toHaveValue(
      clipboardContent,
    );

    // Copy DID by just right clicking on the Short ID button and selecting Copy DID
    await settingsProfile.openUserIDContextMenu();
    await settingsProfile.contextMenuOptionCopyDID.click();

    // Save copied value from clipboard into a constant
    const handle2 = await page.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const clipboardContent2 = await handle2.jsonValue();

    // Paste value from Clipboard into Status and assert it is the did key
    await settingsProfile.inputSettingsProfileStatus.click();
    await settingsProfile.inputSettingsProfileStatus.clear();
    await settingsProfile.inputSettingsProfileStatus.press("Meta+v");
    await expect(settingsProfile.inputSettingsProfileStatus).toHaveValue(
      clipboardContent2,
    );
  });

  test("I9, I10 - User should be able to change username and see toast notification of change", async ({
    page,
  }) => {
    // User types into username and change value
    const settingsProfile = new SettingsProfile(page);
    const chatsMainPage = new ChatsMainPage(page);
    const newUsername = "newUsername";
    await settingsProfile.inputSettingsProfileUsername.click();
    await settingsProfile.inputSettingsProfileUsername.clear();
    await settingsProfile.inputSettingsProfileUsername.fill("newUsername");

    // Save modal is displayed, user selects cancel and username is not changed
    await settingsProfile.saveControls.waitFor({ state: "visible" });
    await settingsProfile.saveControlsButtonCancel.click();

    // Username displayed will be equal to the username assigned randomly when creating account
    await expect(settingsProfile.inputSettingsProfileUsername).toHaveValue(
      username,
    );

    // User types into username and change value
    await settingsProfile.inputSettingsProfileUsername.click();
    await settingsProfile.inputSettingsProfileUsername.clear();
    await settingsProfile.inputSettingsProfileUsername.fill("newUsername");

    // Save modal is displayed, user selects save and username is changed
    await settingsProfile.saveControls.waitFor({ state: "visible" });
    await settingsProfile.saveControlsButtonSave.click();
    await settingsProfile.toastNotification.waitFor({ state: "visible" });
    await expect(settingsProfile.toastNotificationText).toHaveText(
      "Profile Updated!",
    );
    await settingsProfile.toastNotification.waitFor({ state: "detached" });
    await expect(settingsProfile.inputSettingsProfileUsername).toHaveValue(
      newUsername,
    );

    // User goes to another page and returns to settings profile, username is still changed
    await settingsProfile.goToFriends();
    await page.waitForURL("/friends");
    await chatsMainPage.goToSettings();
    await expect(settingsProfile.inputSettingsProfileUsername).toHaveValue(
      newUsername,
    );
  });

  test("I11 - All text in Username should be selected after clicking into the text field a single time", async ({
    page,
  }) => {
    // User clicks on username textbox and all text is selected
    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.assertInputTextSelected(
      "[data-cy='input-settings-profile-username']",
    );
  });

  test("I12 - Highlighted border should appear when clicked into the username textbox", async ({
    page,
  }) => {
    // Click on Username textbox and validate border is highlighted
    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.inputSettingsProfileUsername.focus();

    const usernameInputBox =
      await settingsProfile.inputSettingsProfileUsername.locator("xpath=..");
    await expect(usernameInputBox).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );
  });

  // Skipped since this is not working in Uplink Web as expected per test
  /*test.skip("I13 - Error message should appear if user tries to input chars that are not allowed or exceeds chars amount", async ({
    page,
  }) => {});

  test("I14 - Highlighted border should appear when user is clicked into Status textbox", async ({
    page,
  }) => {
    // Click on Status textbox and validate border is highlighted
    const settingsProfile = new SettingsProfile(page);
    settingsProfile.inputSettingsProfileUsername.focus();
    settingsProfile.inputSettingsProfileUsername
      .parent()
      .should("have.css", "box-shadow", "rgb(77, 77, 255) 0px 0px 0px 1px");
  });

  // Skipped since test its failing when clicking on cancel button
  test.skip("I15, I16 - User should be able to change Status Message and see toast notification for update", async ({
    page,
  }) => {
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
  test.skip("I17 - All text in StatusMessage should be selected after clicking into the text field a single time", async ({
    page,
  }) => {});

  // Skipped since this is not working in Uplink Web as expected per test
  test.skip("I18 - Error message should appear if user inputs chars that are not allowed or exceeds limit", async ({
    page,
  }) => {});

  test("I19 - Status dropdown should show Online, Offline, Idle, Do not Disturb", async ({
    page,
  }) => {
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

  test("I20 - Status should show correctly depending on which status user has set", async ({
    page,
  }) => {
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

  test("I21 - Clicking Reveal Phrase should display the users Recovery Phrases", async ({
    page,
  }) => {
    // Validate Settings Section contents
    const settingsProfile = new SettingsProfile(page);
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
  test.skip("I22 - Clicking copy should copy the Recovery Phrase to the users clipboard", async ({
    page,
  }) => {});

  // Cannot be automated for now since checkbox checked or not checked works on the same way for now
  test.skip("I23 - User should be able to click checkbox to determine whether they want to store Recovery Phrase on account", async ({
    page,
  }) => {});

  test("I24 - Clicking LogOut should log user out of the account", async ({
    page,
  }) => {
    // Validate Settings Section contents
    const settingsProfile = new SettingsProfile(page);
    settingsProfile.logOutSectionLabel.should("have.text", "Log Out");
    settingsProfile.logOutSectionText.should(
      "have.text",
      "Log out of the current account and return to the unlock page.",
    );

    // Click on Log Out and validate user is redirected to unlock page
    settingsProfile.logOutSectionButton.click();
    cy.location("href").should("include", "/auth");
  });*/
});
