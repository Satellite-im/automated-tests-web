import MainPage from "../MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class SettingsAbout extends MainPage {
  readonly page: Page;
  readonly callTimerSection: Locator;
  readonly callTimerSectionCheckbox: Locator;
  readonly callTimerSectionSlider: Locator;
  readonly callTimerSectionLabel: Locator;
  readonly callTimerSectionText: Locator;
  readonly controlSoundsSection: Locator;
  readonly controlSoundsSectionCheckbox: Locator;
  readonly controlSoundsSectionSlider: Locator;
  readonly controlSoundsSectionLabel: Locator;
  readonly controlSoundsSectionText: Locator;
  readonly echoCancellationSection: Locator;
  readonly echoCancellationSectionCheckbox: Locator;
  readonly echoCancellationSectionSlider: Locator;
  readonly echoCancellationSectionLabel: Locator;
  readonly echoCancellationSectionText: Locator;
  readonly inputDeviceSection: Locator;
  readonly inputDeviceSectionLabel: Locator;
  readonly inputDeviceSectionMeter: Locator;
  readonly inputDeviceSectionSelector: Locator;
  readonly inputDeviceSectionSelectorOption: Locator;
  readonly inputDeviceSectionText: Locator;
  readonly interfaceSoundsSection: Locator;
  readonly interfaceSoundsSectionCheckbox: Locator;
  readonly interfaceSoundsSectionSlider: Locator;
  readonly interfaceSoundsSectionLabel: Locator;
  readonly interfaceSoundsSectionText: Locator;
  readonly messageSoundsSection: Locator;
  readonly messageSoundsSectionCheckbox: Locator;
  readonly messageSoundsSectionSlider: Locator;
  readonly messageSoundsSectionLabel: Locator;
  readonly messageSoundsSectionText: Locator;
  readonly outputDeviceSection: Locator;
  readonly outputDeviceSectionTestButton: Locator;
  readonly outputDeviceSectionLabel: Locator;
  readonly outputDeviceSectionMeter: Locator;
  readonly outputDeviceSectionSelector: Locator;
  readonly outputDeviceSectionSelectorOption: Locator;
  readonly outputDeviceSectionText: Locator;
  readonly testVideoButton: Locator;
  readonly testVideoPreview: Locator;
  readonly videoDeviceSection: Locator;
  readonly videoDeviceSectionLabel: Locator;
  readonly videoDeviceSectionSelector: Locator;
  readonly videoDeviceSectionSelectorOption: Locator;
  readonly videoDeviceSectionText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.callTimerSection = page.getByTestId("section-call-timer");
    this.callTimerSectionCheckbox = page.getByTestId("switch-call-timer");
    this.callTimerSectionSlider = page.locator(
      '[data-cy="section-call-timer"] > .body > .content > .switch > .slider',
    );
    this.callTimerSectionLabel = this.callTimerSection.getByTestId(
      "setting-section-label",
    );
    this.callTimerSectionText = this.callTimerSection.getByTestId(
      "setting-section-text",
    );
    this.controlSoundsSection = page.getByTestId("section-control-sounds");
    this.controlSoundsSectionCheckbox = page.getByTestId(
      "switch-control-sounds",
    );
    this.controlSoundsSectionSlider = page.locator(
      '[data-cy="section-control-sounds"] > .body > .content > .switch > .slider',
    );
    this.controlSoundsSectionLabel = this.controlSoundsSection.getByTestId(
      "setting-section-label",
    );
    this.controlSoundsSectionText = this.controlSoundsSection.getByTestId(
      "setting-section-text",
    );
    this.echoCancellationSection = page.getByTestId(
      "section-echo-cancellation",
    );
    this.echoCancellationSectionCheckbox = page.getByTestId(
      "switch-echo-cancellation",
    );
    this.echoCancellationSectionSlider = page.locator(
      '[data-cy="section-echo-cancellation"] > .body > .content > .switch > .slider',
    );
    this.echoCancellationSectionLabel =
      this.echoCancellationSection.getByTestId("setting-section-label");
    this.echoCancellationSectionText = this.echoCancellationSection.getByTestId(
      "setting-section-text",
    );
    this.inputDeviceSection = page.getByTestId("section-input-device");
    this.inputDeviceSectionLabel = this.inputDeviceSection.getByTestId(
      "setting-section-label",
    );
    this.inputDeviceSectionMeter = page.locator(".meter-mask").first();
    this.inputDeviceSectionSelector = this.inputDeviceSection.getByTestId(
      "select-input-device",
    );
    this.inputDeviceSectionSelectorOption =
      this.inputDeviceSectionSelector.getByTestId("select-option");
    this.inputDeviceSectionText = this.inputDeviceSection.getByTestId(
      "setting-section-text",
    );
    this.interfaceSoundsSection = page.getByTestId("section-interface-sounds");
    this.interfaceSoundsSectionCheckbox = page.getByTestId(
      "switch-interface-sounds",
    );
    this.interfaceSoundsSectionSlider = page.locator(
      '[data-cy="section-interface-sounds"] > .body > .content > .switch > .slider',
    );
    this.interfaceSoundsSectionLabel = this.interfaceSoundsSection.getByTestId(
      "setting-section-label",
    );
    this.interfaceSoundsSectionText = this.interfaceSoundsSection.getByTestId(
      "setting-section-text",
    );
    this.messageSoundsSection = page.getByTestId("section-message-sounds");
    this.messageSoundsSectionCheckbox = page.getByTestId(
      "switch-message-sounds",
    );
    this.messageSoundsSectionSlider = page.locator(
      '[data-cy="section-message-sounds"] > .body > .content > .switch > .slider',
    );
    this.messageSoundsSectionLabel = this.messageSoundsSection.getByTestId(
      "setting-section-label",
    );
    this.messageSoundsSectionText = this.messageSoundsSection.getByTestId(
      "setting-section-text",
    );
    this.outputDeviceSection = page.getByTestId("section-output-device");
    this.outputDeviceSectionTestButton = this.outputDeviceSection.getByTestId(
      "button-test-output-device",
    );
    this.outputDeviceSectionLabel = this.outputDeviceSection.getByTestId(
      "setting-section-label",
    );
    this.outputDeviceSectionMeter = page.locator(".meter-mask").last();
    this.outputDeviceSectionSelector = this.outputDeviceSection.getByTestId(
      "selector-output-device",
    );
    this.outputDeviceSectionSelectorOption =
      this.outputDeviceSectionSelector.getByTestId("select-option");
    this.outputDeviceSectionText = this.outputDeviceSection.getByTestId(
      "setting-section-text",
    );
    this.testVideoButton = page.getByTestId("button-test-video");
    this.testVideoPreview = page.getByTestId("test-video-preview");
    this.videoDeviceSection = page.getByTestId("section-video-device");
    this.videoDeviceSectionLabel = this.videoDeviceSection.getByTestId(
      "setting-section-label",
    );
    this.videoDeviceSectionSelector = this.videoDeviceSection.getByTestId(
      "selector-video-device",
    );
    this.videoDeviceSectionSelectorOption =
      this.videoDeviceSectionSelector.getByTestId("select-option");
    this.videoDeviceSectionText = this.videoDeviceSection.getByTestId(
      "setting-section-text",
    );
  }

  async validateInputDevices(expectedInputDevices: string[]) {
    let displayedInputDevices: string[] = [];
    const options: string[] =
      await this.inputDeviceSectionSelectorOption.allTextContents();
    displayedInputDevices = options.map((option) => option.trim());
    expect(displayedInputDevices).toEqual(expectedInputDevices);
  }

  async validateOutputDevices(expectedOutputDevices: string[]) {
    let displayedOutputDevices: string[] = [];
    const options: string[] =
      await this.outputDeviceSectionSelectorOption.allTextContents();
    displayedOutputDevices = options.map((option) => option.trim());
    expect(displayedOutputDevices).toEqual(expectedOutputDevices);
  }

  async validateVideoDevices(expectedVideoDevices: string[]) {
    let displayedVideoDevices: string[] = [];
    const options: string[] =
      await this.videoDeviceSectionSelectorOption.allTextContents();
    displayedVideoDevices = options.map((option) => option.trim());
    expect(displayedVideoDevices).toEqual(expectedVideoDevices);
  }
}
