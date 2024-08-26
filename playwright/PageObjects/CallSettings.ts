import MainPage from "./MainPage";
import { type Locator, type Page } from "@playwright/test";

export class CallSettings extends MainPage {
  readonly callSettings: Locator;
  readonly audioBitrate: Locator;
  readonly audioBitrateLabel: Locator;
  readonly audioBitrateSelector: Locator;
  readonly audioBitrateSelectorOption: Locator;
  readonly audioBitrateText: Locator;
  readonly audioChannels: Locator;
  readonly audioChannelsLabel: Locator;
  readonly audioChannelsSelector: Locator;
  readonly audioChannelsSelectorOption: Locator;
  readonly audioChannelsText: Locator;
  readonly echoCancellation: Locator;
  readonly echoCancellationCheckbox: Locator;
  readonly echoCancellationSlider: Locator;
  readonly echoCancellationLabel: Locator;
  readonly echoCancellationText: Locator;
  readonly gainControl: Locator;
  readonly gainControlCheckbox: Locator;
  readonly gainControlSlider: Locator;
  readonly gainControlLabel: Locator;
  readonly gainControlText: Locator;
  readonly noiseSupression: Locator;
  readonly noiseSupressionCheckbox: Locator;
  readonly noiseSupressionSlider: Locator;
  readonly noiseSupressionLabel: Locator;
  readonly noiseSupressionText: Locator;
  readonly sampleSize: Locator;
  readonly sampleSizeLabel: Locator;
  readonly sampleSizeSelector: Locator;
  readonly sampleSizeSelectorOption: Locator;
  readonly sampleSizeText: Locator;
  readonly videoDevice: Locator;
  readonly videoDeviceLabel: Locator;
  readonly videoDeviceSelector: Locator;
  readonly videoDeviceSelectorOption: Locator;
  readonly videoDeviceText: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.callSettings = this.page.locator(".call-settings");
    this.audioBitrate = this.page.getByTestId("section-audio-bitrate");
    this.audioBitrateLabel = this.audioBitrate.getByTestId(
      "setting-section-label",
    );
    this.audioBitrateSelector = this.audioBitrate.getByTestId(
      "selector-audio-bitrate",
    );
    this.audioBitrateSelectorOption =
      this.audioBitrateSelector.getByTestId("select-option");
    this.audioBitrateText = this.audioBitrate.getByTestId(
      "setting-section-text",
    );
    this.audioChannels = this.page.getByTestId("section-audio-channels");
    this.audioChannelsLabel = this.audioChannels.getByTestId(
      "setting-section-label",
    );
    this.audioChannelsSelector = this.audioChannels.getByTestId(
      "selector-audio-channels",
    );
    this.audioChannelsSelectorOption =
      this.audioChannelsSelector.getByTestId("select-option");
    this.audioChannelsText = this.audioChannels.getByTestId(
      "setting-section-text",
    );
    this.echoCancellation = this.page.getByTestId("section-echo-cancellation");
    this.echoCancellationCheckbox = this.echoCancellation.getByTestId(
      "switch-echo-cancellation",
    );
    this.echoCancellationSlider = this.echoCancellation.locator(
      '[data-cy="section-echo-cancellation"] > .body > .content > .switch > .slider',
    );
    this.echoCancellationLabel = this.echoCancellation.getByTestId(
      "setting-section-label",
    );
    this.echoCancellationText = this.echoCancellation.getByTestId(
      "setting-section-text",
    );
    this.gainControl = this.page.getByTestId("section-auto-gain-control");
    this.gainControlCheckbox = this.gainControl.getByTestId(
      "switch-auto-gain-control",
    );
    this.gainControlSlider = this.gainControl.locator(
      '[data-cy="section-echo-cancellation"] > .body > .content > .switch > .slider',
    );
    this.gainControlLabel = this.gainControl.getByTestId(
      "setting-section-label",
    );
    this.gainControlText = this.gainControl.getByTestId("setting-section-text");

    this.noiseSupression = this.page.getByTestId("section-noise-suppression");
    this.noiseSupressionCheckbox = this.noiseSupression.getByTestId(
      "switch-noise-suppression",
    );
    this.noiseSupressionSlider = this.noiseSupression.locator(
      '[data-cy="section-echo-cancellation"] > .body > .content > .switch > .slider',
    );
    this.noiseSupressionLabel = this.noiseSupression.getByTestId(
      "setting-section-label",
    );
    this.noiseSupressionText = this.noiseSupression.getByTestId(
      "setting-section-text",
    );
    this.sampleSize = this.page.getByTestId("section-sample-size");
    this.sampleSizeLabel = this.sampleSize.getByTestId("setting-section-label");
    this.sampleSizeSelector = this.sampleSize.getByTestId(
      "selector-sample-size",
    );
    this.sampleSizeSelectorOption =
      this.sampleSizeSelector.getByTestId("select-option");
    this.sampleSizeText = this.sampleSize.getByTestId("setting-section-text");
    this.videoDevice = this.page.getByTestId("section-video-device");
    this.videoDeviceLabel = this.videoDevice.getByTestId(
      "setting-section-label",
    );
    this.videoDeviceSelector = this.videoDevice.getByTestId(
      "selector-video-device",
    );
    this.videoDeviceSelectorOption =
      this.videoDeviceSelector.getByTestId("select-option");
    this.videoDeviceText = this.videoDevice.getByTestId("setting-section-text");
  }
}
