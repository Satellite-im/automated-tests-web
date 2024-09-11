import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";

test.describe("Settings Profile Tests", () => {
  const username = "test123";
  const status = "fixed status";

  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");
  });

  test("I1 - Banner Picture - Tooltip displayed", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Shows tooltip when hovering
    await settingsProfile.profileBanner.hover();
    await settingsProfile.validatePseudoElementContent(
      "[data-cy='profile-banner']",
      "Change Banner Photo",
    );
  });

  test("I2, I3 - Banner Picture - User can upload banner", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // User can upload a banner picture
    await settingsProfile.uploadProfileBanner("playwright/assets/banner.jpg");
  });

  test("I4 - Clicking upload picture on Profile picture should open File Browser", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Profile Picture Upload Button tooltip shows "Change profile photo"
    // Validate user can upload profile pictures
    await settingsProfile.uploadProfilePicture("playwright/assets/logo.jpg");

    // Validate tooltip is displayed when hovering over the Profile Picture Upload Button
    await settingsProfile.profilePictureUploadButton.hover();
    await settingsProfile.validateTooltipAttribute(
      "[data-cy='button-file-upload']",
      "Change profile photo",
    );
  });

  test("I5 - Profile picture shows default profile picture until custom profile picture is set", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Identicon picture is setup by default
    await expect(settingsProfile.identiconSettingsProfile).toBeVisible();

    // Upload Profile Picture
    await settingsProfile.uploadProfilePicture("playwright/assets/logo.jpg");

    // Upload Profile Banner
    await settingsProfile.uploadProfileBanner("playwright/assets/banner.jpg");

    // Validate snapshot after uploading both pictures
    await settingsProfile.validateProfilePictureDisplayed();
  });

  test("I6 - Username should be displayed in the Username textbox", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Username displayed will be equal to the username assigned randomly when creating account
    await expect(settingsProfile.inputSettingsProfileUsername).toHaveValue(
      username,
    );
  });

  test("I7 - Clicking shortID should copy DID into clipboard", async ({
    singleUserContext,
  }) => {
    const context = singleUserContext.context;
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Validate hovering on Copy ID button shows "Copy"
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
    await settingsProfile.pasteClipboardIntoStatus();
    await expect(settingsProfile.inputSettingsProfileStatus).toHaveValue(
      clipboardContent,
    );
  });

  test("I8 - Short ID Context menu should allow to copy DID or Short ID intoto clipboard", async ({
    singleUserContext,
  }) => {
    const context = singleUserContext.context;
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Copy ID by just right clicking on the Short ID button and selecting Copy ID
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
    await settingsProfile.inputSettingsProfileStatus.press("ControlOrMeta+v");
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
    await settingsProfile.inputSettingsProfileStatus.press("ControlOrMeta+v");
    await expect(settingsProfile.inputSettingsProfileStatus).toHaveValue(
      clipboardContent2,
    );
  });

  test("I9, I10 - User should be able to change username and see toast notification of change", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);
    const chatsMainPage = new ChatsMainPage(page);

    // User types into username and change value
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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // User clicks on username textbox and all text is selected
    await settingsProfile.assertInputTextSelected(
      "[data-cy='input-settings-profile-username']",
    );
  });

  test("I12 - Highlighted border should appear when clicked into the username textbox", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Click on Username textbox and validate border is highlighted
    await settingsProfile.inputSettingsProfileUsername.focus();

    const usernameInputBox =
      await settingsProfile.inputSettingsProfileUsername.locator("xpath=..");
    await expect(usernameInputBox).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );
  });

  test("I13 - Error message should appear if user tries to input chars that are not allowed or exceeds chars amount", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // User leaves empty username - Warning message is displayed
    await settingsProfile.inputSettingsProfileUsername.click();
    await settingsProfile.inputSettingsProfileUsername.clear();
    await settingsProfile.warningMessage.waitFor({ state: "visible" });
    await expect(settingsProfile.warningMessage).toHaveText(
      "This field is required.",
    );

    // User types less characters than expected into username - Warning message is displayed
    await settingsProfile.inputSettingsProfileUsername.fill("123");
    await expect(settingsProfile.warningMessage).toHaveText(
      "Minimum length is 4 characters.",
    );

    // User types long username - Warning message is displayed
    await settingsProfile.inputSettingsProfileUsername.clear();
    await settingsProfile.inputSettingsProfileUsername.fill(
      "123456789012345678901234567890123",
    );
    await expect(settingsProfile.warningMessage).toHaveText(
      "Maximum length is 32 characters.",
    );

    // User types invalid  username - Warning message is displayed
    await settingsProfile.inputSettingsProfileUsername.clear();
    await settingsProfile.inputSettingsProfileUsername.fill("&*&*&&*");
    await expect(settingsProfile.warningMessage).toHaveText("Invalid format.");
  });

  test("I14 - Highlighted border should appear when user is clicked into Status textbox", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Click on Status textbox and validate border is highlighted
    await settingsProfile.inputSettingsProfileStatus.focus();

    const usernameStatusBox =
      await settingsProfile.inputSettingsProfileStatus.locator("xpath=..");
    await expect(usernameStatusBox).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );
  });

  test("I15, I16 - User should be able to change Status Message and see toast notification for update", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);
    const chatsMainPage = new ChatsMainPage(page);

    // User types into username and change value
    const newStatus = "this is my new status";
    await settingsProfile.inputSettingsProfileStatus.click();
    await settingsProfile.inputSettingsProfileStatus.clear();
    await settingsProfile.inputSettingsProfileStatus.fill(newStatus);

    // Save modal is displayed, user selects cancel and username is not changed
    await settingsProfile.saveControls.waitFor({ state: "visible" });
    await settingsProfile.saveControlsButtonCancel.click();

    // Username displayed will be equal to the username assigned randomly when creating account
    await expect(settingsProfile.inputSettingsProfileStatus).toHaveValue(
      status,
    );

    // User types into username and change value
    await settingsProfile.inputSettingsProfileStatus.click();
    await settingsProfile.inputSettingsProfileStatus.clear();
    await settingsProfile.inputSettingsProfileStatus.fill(newStatus);

    // Save modal is displayed, user selects save and username is changed
    await settingsProfile.saveControls.waitFor({ state: "visible" });
    await settingsProfile.saveControlsButtonSave.click();
    await settingsProfile.toastNotification.waitFor({ state: "visible" });
    await expect(settingsProfile.toastNotificationText).toHaveText(
      "Profile Updated!",
    );
    await settingsProfile.toastNotification.waitFor({ state: "detached" });
    await expect(settingsProfile.inputSettingsProfileStatus).toHaveValue(
      newStatus,
    );

    // User goes to another page and returns to settings profile, username is still changed
    await settingsProfile.goToFriends();
    await page.waitForURL("/friends");
    await chatsMainPage.goToSettings();
    await expect(settingsProfile.inputSettingsProfileStatus).toHaveValue(
      newStatus,
    );
  });

  test("I17 - All text in StatusMessage should be selected after clicking into the text field a single time", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // User clicks on status textbox and all text is selected
    await settingsProfile.assertInputTextSelected(
      "[data-cy='input-settings-profile-status-message']",
    );
  });

  test("I18 - Error message should appear if user inputs chars that are not allowed or exceeds limit", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // User types more characters than expected into status - Warning message is displayed
    await settingsProfile.inputSettingsProfileStatus.click();
    await settingsProfile.inputSettingsProfileStatus.clear();
    await settingsProfile.inputSettingsProfileStatus.fill(
      "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    );
    await settingsProfile.warningMessage.waitFor({ state: "visible" });
    await expect(settingsProfile.warningMessage).toHaveText(
      "Maximum length is 128 characters.",
    );
  });

  test("I19 - Status dropdown should show Online, Offline, Idle, Do not Disturb", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Validate Settings Section contents
    await expect(settingsProfile.onlineStatusSectionLabel).toHaveText("Status");
    await expect(settingsProfile.onlineStatusSectionText).toHaveText(
      "Set status appearance",
    );

    // Default Status selected is Online
    await settingsProfile.validateOnlineStatus("online");

    // Validate list of options
    let options = ["Online", "Offline", "Idle", "Do Not Disturb"];
    const actualOptions = await settingsProfile.getSelectorOptions(
      "[data-cy='selector-current-status-online']",
    );
    await expect(actualOptions).toEqual(options);
  });

  test("I20 - Status should show correctly depending on which status user has set", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Change Status to Offline and validate is displayed correctly
    await settingsProfile.selectOnlineStatus("offline");
    await settingsProfile.validateOnlineStatus("offline");

    // Change Status to Idle and validate is displayed correctly
    await settingsProfile.selectOnlineStatus("idle");
    await settingsProfile.validateOnlineStatus("idle");

    // Change Status to Do not Disturb and validate is displayed correctly
    await settingsProfile.selectOnlineStatus("do-not-disturb");
    await settingsProfile.validateOnlineStatus("do-not-disturb");

    // Change Status back to Online and validate is displayed correctly
    await settingsProfile.selectOnlineStatus("online");
    await settingsProfile.validateOnlineStatus("online");
  });

  test("I21 - Clicking Reveal Phrase should display the users Recovery Phrases", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Validate Settings Section contents
    await expect(settingsProfile.revealPhraseSectionLabel).toHaveText(
      "Reveal recovery phrase",
    );
    await expect(settingsProfile.revealPhraseSectionText).toHaveText(
      "Click the button to reveal your recovery seed, please do not share this with anybody, it is the master-key for your account.",
    );
    await expect(settingsProfile.storeRecoverySeedText).toHaveText(
      "Store recovery seed on account (disable for increased security, irreversible)",
    );

    // Show Recovery Phrase and ensure is displayed now
    await settingsProfile.revealPhraseSectionRevealButton.click();
    await settingsProfile.validateRecoveryPhraseIsShown();

    // Click on Hide Phrase and validate is hidden
    await settingsProfile.revealPhraseSectionHideButton.click();
    await settingsProfile.validateRecoveryPhraseIsHidden();
  });

  test("I22 - Clicking copy should copy the Recovery Phrase to the users clipboard", async ({
    singleUserContext,
  }) => {
    const context = singleUserContext.context;
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Grant clipboard permissions to browser
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // Show Recovery Phrase and ensure is displayed now
    await settingsProfile.revealPhraseSectionRevealButton.click();
    await settingsProfile.validateRecoveryPhraseIsShown();
    await settingsProfile.revealPhraseSectionButtonCopyPhrase.click();
    const expectedPhraseArray = await settingsProfile.getRecoveryPhrase();
    const expectedPhraseString = expectedPhraseArray.join(" ");

    // Copy recovery phrase from clipboard to status and validate it is the expected
    await settingsProfile.pasteClipboardIntoStatus();
    await expect(settingsProfile.inputSettingsProfileStatus).toHaveValue(
      expectedPhraseString,
    );
  });

  test("I23 - User should be able to click checkbox to determine whether they want to store Recovery Phrase on account", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Validate Store Recovery Seed checkbox is checked by default
    await expect(settingsProfile.storeRecoverySeedCheckbox).toHaveClass(
      /checked/,
    );

    // Click on Store Recovery Seed checkbox and select cancel - Validate recovery seed is not removoed
    await settingsProfile.storeRecoverySeedCheckbox.click();
    await expect(settingsProfile.seedPhraseModal).toBeVisible();
    await expect(settingsProfile.seedPhraseModalText).toHaveText(
      "Your recovery phrase will not be stored anymore and will be removed. Make sure to save the phrase! This change is irreversible!",
    );
    await settingsProfile.seedPhraseModalCancelButton.click();
    await expect(settingsProfile.storeRecoverySeedCheckbox).toHaveClass(
      /checked/,
    );

    // Click on Store Recovery Seed checkbox and select cancel - Validate recovery seed is not removoed
    await settingsProfile.storeRecoverySeedCheckbox.click();
    await expect(settingsProfile.seedPhraseModal).toBeVisible();
    await settingsProfile.seedPhraseModalConfirmButton.click();

    // Validate recovery seed is hidden
    await expect(
      settingsProfile.revealPhraseSectionRevealButton,
    ).not.toBeVisible();
    await expect(settingsProfile.storeRecoverySeedCheckbox).not.toBeVisible();
  });

  test("I24 - Clicking LogOut should log user out of the account", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsProfile = new SettingsProfile(page);

    // Validate Settings Section contents
    await expect(settingsProfile.logOutSectionLabel).toHaveText("Log Out");
    await expect(settingsProfile.logOutSectionText).toHaveText(
      "Log out of the current account and return to the unlock page.",
    );

    // Click on Log Out and validate user is redirected to unlock page
    await settingsProfile.logOutSectionButton.click();
    await page.waitForURL("/auth");
  });
});
