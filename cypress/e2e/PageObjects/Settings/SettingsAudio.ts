import SettingsBase from "./SettingsBase";

class SettingsAudio extends SettingsBase {
  constructor() {
    super();
  }

  get callTimerSection() {
    return cy.getByTestAttr("section-call-timer");
  }

  get callTimerSectionCheckbox() {
    return cy.getByTestAttr("switch-call-timer");
  }

  get callTimerSectionSlider() {
    return cy.get(
      '[data-cy="section-call-timer"] > .body > .content > .switch > .slider',
    );
  }

  get callTimerSectionLabel() {
    return this.callTimerSection.find("[data-cy='setting-section-label']");
  }

  get callTimerSectionText() {
    return this.callTimerSection.find("[data-cy='setting-section-text']");
  }

  get controlSoundsSection() {
    return cy.getByTestAttr("section-control-sounds");
  }

  get controlSoundsSectionCheckbox() {
    return cy.getByTestAttr("switch-control-sounds");
  }

  get controlSoundsSectionSlider() {
    return cy.get(
      '[data-cy="section-control-sounds"] > .body > .content > .switch > .slider',
    );
  }

  get controlSoundsSectionLabel() {
    return this.controlSoundsSection.find("[data-cy='setting-section-label']");
  }

  get controlSoundsSectionText() {
    return this.controlSoundsSection.find("[data-cy='setting-section-text']");
  }

  get echoCancellationSection() {
    return cy.getByTestAttr("section-echo-cancellation");
  }

  get echoCancellationSectionCheckbox() {
    return cy.getByTestAttr("switch-echo-cancellation");
  }

  get echoCancellationSectionSlider() {
    return cy.get(
      '[data-cy="section-echo-cancellation"] > .body > .content > .switch > .slider',
    );
  }

  get echoCancellationSectionLabel() {
    return this.echoCancellationSection.find(
      "[data-cy='setting-section-label']",
    );
  }

  get echoCancellationSectionText() {
    return this.echoCancellationSection.find(
      "[data-cy='setting-section-text']",
    );
  }

  get inputDeviceSection() {
    return cy.getByTestAttr("section-input-device");
  }

  get inputDeviceSectionLabel() {
    return this.inputDeviceSection.find("[data-cy='setting-section-label']");
  }

  get inputDeviceSectionMeter() {
    return cy.get(".meter-mask").eq(0);
  }

  get inputDeviceSectionSelector() {
    return cy.getByTestAttr("selector-input-device");
  }

  get inputDeviceSectionSelectorOption() {
    return this.inputDeviceSectionSelector.find("[data-cy='select-option']");
  }

  get inputDeviceSectionText() {
    return this.inputDeviceSection.find("[data-cy='setting-section-text']");
  }

  get interfaceSoundsSection() {
    return cy.getByTestAttr("section-interface-sounds");
  }

  get interfaceSoundsSectionCheckbox() {
    return cy.getByTestAttr("switch-interface-sounds");
  }

  get interfaceSoundsSectionSlider() {
    return cy.get(
      '[data-cy="section-interface-sounds"] > .body > .content > .switch > .slider',
    );
  }

  get interfaceSoundsSectionLabel() {
    return this.interfaceSoundsSection.find(
      "[data-cy='setting-section-label']",
    );
  }

  get interfaceSoundsSectionText() {
    return this.interfaceSoundsSection.find("[data-cy='setting-section-text']");
  }

  get messageSoundsSection() {
    return cy.getByTestAttr("section-message-sounds");
  }

  get messageSoundsSectionCheckbox() {
    return cy.getByTestAttr("switch-message-sounds");
  }

  get messageSoundsSectionSlider() {
    return cy.get(
      '[data-cy="section-message-sounds"] > .body > .content > .switch > .slider',
    );
  }

  get messageSoundsSectionLabel() {
    return this.messageSoundsSection.find("[data-cy='setting-section-label']");
  }

  get messageSoundsSectionText() {
    return this.messageSoundsSection.find("[data-cy='setting-section-text']");
  }

  get outputDeviceSection() {
    return cy.getByTestAttr("section-output-device");
  }

  get outputDeviceSectionTestButton() {
    return cy.getByTestAttr("button-output-device-test");
  }

  get outputDeviceSectionLabel() {
    return this.outputDeviceSection.find("[data-cy='setting-section-label']");
  }

  get outputDeviceSectionMeter() {
    return cy.get(".meter-mask").eq(1);
  }

  get outputDeviceSectionSelector() {
    return cy.getByTestAttr("selector-output-device");
  }

  get outputDeviceSectionSelectorOption() {
    return this.outputDeviceSectionSelector.find("[data-cy='select-option']");
  }

  get outputDeviceSectionText() {
    return this.outputDeviceSection.find("[data-cy='setting-section-text']");
  }

  get testVideoButton() {
    return cy.getByTestAttr("button-test-video");
  }

  get testVideoPreview() {
    return cy.getByTestAttr("test-video-preview");
  }

  get videoDeviceSection() {
    return cy.getByTestAttr("section-video-device");
  }

  get videoDeviceSectionLabel() {
    return this.videoDeviceSection.find("[data-cy='setting-section-label']");
  }

  get videoDeviceSectionSelector() {
    return cy.getByTestAttr("selector-video-device");
  }

  get videoDeviceSectionSelectorOption() {
    return this.videoDeviceSectionSelector.find("[data-cy='select-option']");
  }

  get videoDeviceSectionText() {
    return this.videoDeviceSection.find("[data-cy='setting-section-text']");
  }

  public validateInputDevices(expectedInputDevices: string[]) {
    let displayedInputDevices: string[] = [];
    this.inputDeviceSectionSelectorOption
      .each(($option) => {
        displayedInputDevices.push($option.text());
      })
      .then(() => {
        expect(displayedInputDevices).to.deep.equal(expectedInputDevices);
      });
  }

  public validateOutputDevices(expectedOutputDevices: string[]) {
    let displayedOutputDevices: string[] = [];
    this.outputDeviceSectionSelectorOption
      .each(($option) => {
        displayedOutputDevices.push($option.text());
      })
      .then(() => {
        expect(displayedOutputDevices).to.deep.equal(expectedOutputDevices);
      });
  }

  public validateVideoDevices(expectedVideoDevices: string[]) {
    let displayedVideoDevices: string[] = [];
    this.videoDeviceSectionSelectorOption
      .each(($option) => {
        displayedVideoDevices.push($option.text());
      })
      .then(() => {
        expect(displayedVideoDevices).to.deep.equal(expectedVideoDevices);
      });
  }
}

export default new SettingsAudio();
