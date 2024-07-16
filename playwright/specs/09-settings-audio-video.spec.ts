import { expect, test } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";
import { SettingsAudio } from "../PageObjects/Settings/SettingsAudio";

test.describe("Settings Audio and Video Tests", () => {
  const username = "test123";
  const status = "test status";

  test.beforeEach(async ({ page }) => {
    // Declare the page object implementations
    const createOrImport = new CreateOrImportPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const loginPinPage = new LoginPinPage(page);
    const saveRecoverySeed = new SaveRecoverySeedPage(page);
    const chatsMainPage = new ChatsMainPage(page);
    const settingsProfile = new SettingsProfile(page);

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

    // Go to Settings Profile and then Settings Inventory page
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");
    await settingsProfile.buttonAudioAndVideo.click();
    await page.waitForURL("/settings/audio_video");
  });

  test("M1 and M2 - Input dropdown and input volume indicator should display", async ({
    page,
  }) => {
    const settingsAudio = new SettingsAudio(page);
    const expectedInputDevices = ["Default"];

    await expect(settingsAudio.inputDeviceSectionLabel).toHaveText(
      "Input Device",
    );
    await expect(settingsAudio.inputDeviceSectionText).toHaveText(
      "Select your input device, this is usually your microphone.",
    );

    await settingsAudio.validateInputDevices(expectedInputDevices);
  });

  test("M3 and M4 - Output device dropdown and output volume indicator should display", async ({
    page,
  }) => {
    const settingsAudio = new SettingsAudio(page);
    const expectedOutputDevices = ["Default"];
    await expect(settingsAudio.outputDeviceSectionLabel).toHaveText(
      "Output Device",
    );
    await expect(settingsAudio.outputDeviceSectionText).toHaveText(
      "Select your output device, this is usually your headphones or speakers.",
    );

    await settingsAudio.validateOutputDevices(expectedOutputDevices);
  });

  test("M5 - User should be able to toggle on and off Echo Cancellation", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAudio = new SettingsAudio(page);
    await expect(settingsAudio.echoCancellationSectionLabel).toHaveText(
      "Echo Cancellation",
    );
    await expect(settingsAudio.echoCancellationSectionText).toHaveText(
      "Helps minimize feedback from your headphones/speakers into your microphone.",
    );

    // Checkbox should be enabled by default
    await expect(settingsAudio.echoCancellationSectionCheckbox).toBeChecked();

    // User can toggle checkbox to off
    await settingsAudio.echoCancellationSectionSlider.click();
    await expect(
      settingsAudio.echoCancellationSectionCheckbox,
    ).not.toBeChecked();

    // User can toggle again checkbox to on
    await settingsAudio.echoCancellationSectionSlider.click();
    await expect(settingsAudio.echoCancellationSectionCheckbox).toBeChecked();
  });

  test("M6 - User should be able to toggle on and off Interface Sounds", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAudio = new SettingsAudio(page);

    await expect(settingsAudio.interfaceSoundsSectionLabel).toHaveText(
      "Interface Sounds",
    );
    await expect(settingsAudio.interfaceSoundsSectionText).toHaveText(
      "Play sounds when interacting with UI elements.",
    );

    // Checkbox should be disabled by default
    await expect(
      settingsAudio.interfaceSoundsSectionCheckbox,
    ).not.toBeChecked();

    // User can toggle checkbox to on
    await settingsAudio.interfaceSoundsSectionSlider.click();
    await expect(settingsAudio.interfaceSoundsSectionCheckbox).toBeChecked();

    // User can toggle again checkbox to off
    await settingsAudio.interfaceSoundsSectionSlider.click();
    await expect(
      settingsAudio.interfaceSoundsSectionCheckbox,
    ).not.toBeChecked();
  });

  test("M7 - User should be able to toggle on and off Control Sounds", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAudio = new SettingsAudio(page);
    await expect(settingsAudio.controlSoundsSectionLabel).toHaveText(
      "Control Sounds",
    );
    await expect(settingsAudio.controlSoundsSectionText).toHaveText(
      "When enabled you will hear a sound when turning controls on or off, such as muting and unmuting.",
    );

    // Checkbox should be enabled by default
    await expect(settingsAudio.controlSoundsSectionCheckbox).toBeChecked();

    // User can toggle checkbox to off
    await settingsAudio.controlSoundsSectionSlider.click();
    await expect(settingsAudio.controlSoundsSectionCheckbox).not.toBeChecked();

    // User can toggle again checkbox to on
    await settingsAudio.controlSoundsSectionSlider.click();
    await expect(settingsAudio.controlSoundsSectionCheckbox).toBeChecked();
  });

  test("M8 - User should be able to toggle on and off Message Sounds", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAudio = new SettingsAudio(page);
    await expect(settingsAudio.messageSoundsSectionLabel).toHaveText(
      "Message Sounds",
    );
    await expect(settingsAudio.messageSoundsSectionText).toHaveText(
      "Play a notification sound when a new message is received.",
    );

    // Checkbox should be enabled by default
    await expect(settingsAudio.messageSoundsSectionCheckbox).toBeChecked();

    // User can toggle checkbox to off
    await settingsAudio.messageSoundsSectionSlider.click();
    await expect(settingsAudio.messageSoundsSectionCheckbox).not.toBeChecked();

    // User can toggle again checkbox to on
    await settingsAudio.messageSoundsSectionSlider.click();
    await expect(settingsAudio.messageSoundsSectionCheckbox).toBeChecked();
  });

  test("M9 - User should be able to toggle on and off Call Timer", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAudio = new SettingsAudio(page);
    await expect(settingsAudio.callTimerSectionLabel).toHaveText("Call Timer");
    await expect(settingsAudio.callTimerSectionText).toHaveText(
      "Show the duration of an active call in the UI.",
    );

    // Checkbox should be enabled by default
    await expect(settingsAudio.callTimerSectionCheckbox).toBeChecked();

    // User can toggle checkbox to off
    await settingsAudio.callTimerSectionSlider.click();
    await expect(settingsAudio.callTimerSectionCheckbox).not.toBeChecked();

    // User can toggle again checkbox to on
    await settingsAudio.callTimerSectionSlider.click();
    await expect(settingsAudio.callTimerSectionCheckbox).toBeChecked();
  });

  test("M10 - User should be able to test video device", async ({ page }) => {
    const settingsAudio = new SettingsAudio(page);
    await expect(settingsAudio.videoDeviceSectionLabel).toHaveText(
      "Video Device",
    );
    await expect(settingsAudio.videoDeviceSectionText).toHaveText(
      "Select your video device, this is usually your webcam.",
    );

    // Enable test video
    await settingsAudio.testVideoButton.click();
    const videoHandle = await settingsAudio.testVideoPreview.elementHandle();
    const srcObjectExists = await videoHandle.evaluate(
      (video) => "srcObject" in video,
    );
    expect(srcObjectExists).toBe(true);
  });
});