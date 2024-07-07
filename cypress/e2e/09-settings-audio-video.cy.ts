import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsAudio from "./PageObjects/Settings/SettingsAudio";
import createOrImport from "./PageObjects/CreateOrImport";
import saveRecoverySeed from "./PageObjects/SaveRecoverySeed";

describe("Settings - Audio & Video", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    createOrImport.launchCleanApplication();
    createOrImport.clickCreateNewAccount();
    authNewAccount.createRandomUser(username, status);
    loginPinPage.loginWithPin("1234");
    saveRecoverySeed.clickOnSavedIt();
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonAudioAndVideo.click();
  });

  it("M1 and M2 - Input dropdown and input volume indicator should display", () => {
    cy.url().should("include", "/settings/audio_video");
    settingsAudio.inputDeviceSectionLabel.should("have.text", "Input Device");
    settingsAudio.inputDeviceSectionText.should(
      "have.text",
      "Select your input device, this is usually your microphone.",
    );

    settingsAudio.testVideoButton.click();
  });

  it("M3 and M4 - Output device dropdown and output volume indicator should display", () => {
    settingsAudio.outputDeviceSectionLabel.should("have.text", "Output Device");
    settingsAudio.outputDeviceSectionText.should(
      "have.text",
      "Select your output device, this is usually your headphones or speakers.",
    );

    settingsAudio.testVideoButton.click();
  });

  it("M5 - User should be able to toggle on and off Echo Cancellation", () => {
    // Label and texts for settings section are correct
    settingsAudio.echoCancellationSectionLabel.should(
      "have.text",
      "Echo Cancellation",
    );
    settingsAudio.echoCancellationSectionText.should(
      "have.text",
      "Helps minimize feedback from your headphones/speakers into your microphone.",
    );

    // Checkbox should be enabled by default
    settingsAudio.echoCancellationSectionCheckbox.should("be.checked");

    // User can toggle checkbox to off
    settingsAudio.echoCancellationSectionSlider.click();
    settingsAudio.echoCancellationSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsAudio.echoCancellationSectionSlider.click();
    settingsAudio.echoCancellationSectionCheckbox.should("be.checked");
  });

  it("M6 - User should be able to toggle on and off Interface Sounds", () => {
    // Label and texts for settings section are correct
    settingsAudio.interfaceSoundsSectionLabel.should(
      "have.text",
      "Interface Sounds",
    );
    settingsAudio.interfaceSoundsSectionText.should(
      "have.text",
      "Play sounds when interacting with UI elements.",
    );

    // Checkbox should be disabled by default
    settingsAudio.interfaceSoundsSectionCheckbox.should("not.be.checked");

    // User can toggle checkbox to on
    settingsAudio.interfaceSoundsSectionSlider.click();
    settingsAudio.interfaceSoundsSectionCheckbox.should("be.checked");

    // User can toggle again checkbox to off
    settingsAudio.interfaceSoundsSectionSlider.click();
    settingsAudio.interfaceSoundsSectionCheckbox.should("not.be.checked");
  });

  it("M7 - User should be able to toggle on and off Control Sounds", () => {
    // Label and texts for settings section are correct
    settingsAudio.controlSoundsSectionLabel.should(
      "have.text",
      "Control Sounds",
    );
    settingsAudio.controlSoundsSectionText.should(
      "have.text",
      "When enabled you will hear a sound when turning controls on or off, such as muting and unmuting.",
    );

    // Checkbox should be enabled by default
    settingsAudio.controlSoundsSectionCheckbox.should("be.checked");

    // User can toggle checkbox to off
    settingsAudio.controlSoundsSectionSlider.click();
    settingsAudio.controlSoundsSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsAudio.controlSoundsSectionSlider.click();
    settingsAudio.controlSoundsSectionCheckbox.should("be.checked");
  });

  it("M8 - User should be able to toggle on and off Message Sounds", () => {
    // Label and texts for settings section are correct
    settingsAudio.messageSoundsSectionLabel.should(
      "have.text",
      "Message Sounds",
    );
    settingsAudio.messageSoundsSectionText.should(
      "have.text",
      "Play a notification sound when a new message is received.",
    );

    // Checkbox should be enabled by default
    settingsAudio.messageSoundsSectionCheckbox.should("be.checked");

    // User can toggle checkbox to off
    settingsAudio.messageSoundsSectionSlider.click();
    settingsAudio.messageSoundsSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsAudio.messageSoundsSectionSlider.click();
    settingsAudio.messageSoundsSectionCheckbox.should("be.checked");
  });

  it("M9 - User should be able to toggle on and off Call Timer", () => {
    // Label and texts for settings section are correct
    settingsAudio.callTimerSectionLabel.should("have.text", "Call Timer");
    settingsAudio.callTimerSectionText.should(
      "have.text",
      "Show the duration of an active call in the UI.",
    );

    // Checkbox should be enabled by default
    settingsAudio.callTimerSectionCheckbox.should("be.checked");

    // User can toggle checkbox to off
    settingsAudio.callTimerSectionSlider.click();
    settingsAudio.callTimerSectionCheckbox.should("not.be.checked");

    // User can toggle again checkbox to on
    settingsAudio.callTimerSectionSlider.click();
    settingsAudio.callTimerSectionCheckbox.should("be.checked");
  });

  it("M10 - User should be able to test video device", () => {
    settingsAudio.videoDeviceSectionLabel.should("have.text", "Video Device");
    settingsAudio.videoDeviceSectionText.should(
      "have.text",
      "Select your video device, this is usually your webcam.",
    );

    // Enable test video
    settingsAudio.testVideoButton.click().then(() => {
      settingsAudio.testVideoPreview.then(($video) => {
        // Access the native HTML video element
        const videoElement = $video[0];
        // Assert that srcObject property exists
        expect(videoElement).to.have.property("srcObject");
      });
    });
  });
});
