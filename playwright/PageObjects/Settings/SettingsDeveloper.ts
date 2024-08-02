import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page, expect } from "@playwright/test";

export class SettingsDeveloper extends SettingsBase {
  readonly page: Page;
  readonly batteryIndicator: Locator;
  readonly batteryIndicatorIcon: Locator;
  readonly clearStateSection: Locator;
  readonly clearStateSectionButton: Locator;
  readonly clearStateSectionLabel: Locator;
  readonly clearStateSectionText: Locator;
  readonly cpuIndicator: Locator;
  readonly cpuIndicatorValue: Locator;
  readonly devModeSection: Locator;
  readonly devModeSectionButton: Locator;
  readonly devModeSectionLabel: Locator;
  readonly devModeSectionText: Locator;
  readonly labelWidgetBarBattery: Locator;
  readonly labelWidgetBarCpu: Locator;
  readonly labelWidgetBarRam: Locator;
  readonly loadMockSection: Locator;
  readonly loadMockSectionButton: Locator;
  readonly loadMockSectionLabel: Locator;
  readonly loadMockSectionText: Locator;
  readonly loggerLevelSection: Locator;
  readonly loggerLevelSectionLabel: Locator;
  readonly loggerLevelSectionText: Locator;
  readonly loggerLevelSectionSelector: Locator;
  readonly loggerLevelSectionSelectorOption: Locator;
  readonly memoryIndicator: Locator;
  readonly memoryIndicatorBar: Locator;
  readonly mockIncomingCallSection: Locator;
  readonly mockIncomingCallSectionButton: Locator;
  readonly mockIncomingCallSectionLabel: Locator;
  readonly mockIncomingCallSectionText: Locator;
  readonly testVoiceSection: Locator;
  readonly testVoiceSectionButton: Locator;
  readonly testVoiceSectionLabel: Locator;
  readonly testVoiceSectionText: Locator;
  readonly widgetBar: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.batteryIndicator = page.getByTestId("battery-indicator");
    this.batteryIndicatorIcon = page.getByTestId("battery-indicator-icon");
    this.clearStateSection = page.getByTestId("section-clear-state");
    this.clearStateSectionButton = page.getByTestId("button-clear-state");
    this.clearStateSectionLabel = this.clearStateSection.getByTestId(
      "setting-section-label",
    );
    this.clearStateSectionText = this.clearStateSection.getByTestId(
      "setting-section-text",
    );
    this.cpuIndicator = page.getByTestId("cpu-indicator");
    this.cpuIndicatorValue = page.getByTestId("cpu-indicator-value");
    this.devModeSection = page.getByTestId("section-devmode");
    this.devModeSectionButton = page.getByTestId("button-exit-devmode");
    this.devModeSectionLabel = this.devModeSection.getByTestId(
      "setting-section-label",
    );
    this.devModeSectionText = this.devModeSection.getByTestId(
      "setting-section-text",
    );
    this.labelWidgetBarBattery = page.getByTestId("label-widget-bar-battery");
    this.labelWidgetBarCpu = page.getByTestId("label-widget-bar-cpu");
    this.labelWidgetBarRam = page.getByTestId("label-widget-bar-ram");
    this.loadMockSection = page.getByTestId("section-load-mock");
    this.loadMockSectionButton = page.getByTestId("button-load-mock");
    this.loadMockSectionLabel = this.loadMockSection.getByTestId(
      "setting-section-label",
    );
    this.loadMockSectionText = this.loadMockSection.getByTestId(
      "setting-section-text",
    );
    this.loggerLevelSection = page.getByTestId("section-logger-level");
    this.loggerLevelSectionLabel = this.loggerLevelSection.getByTestId(
      "setting-section-label",
    );
    this.loggerLevelSectionText = this.loggerLevelSection.getByTestId(
      "setting-section-text",
    );
    this.loggerLevelSectionSelector = page.locator(
      '[data-cy^="selector-current-logger-level-"]',
    );
    this.loggerLevelSectionSelectorOption =
      this.loggerLevelSectionSelector.getByTestId("select-option");
    this.memoryIndicator = page.getByTestId("memory-indicator");
    this.memoryIndicatorBar = page.getByTestId("memory-indicator-bar");
    this.mockIncomingCallSection = page.getByTestId("section-test-call");
    this.mockIncomingCallSectionButton = page.getByTestId("button-test-call");
    this.mockIncomingCallSectionLabel =
      this.mockIncomingCallSection.getByTestId("setting-section-label");
    this.mockIncomingCallSectionText = this.mockIncomingCallSection.getByTestId(
      "setting-section-text",
    );
    this.testVoiceSection = page.getByTestId("section-test-voice");
    this.testVoiceSectionButton = page.getByTestId("button-test-voice");
    this.testVoiceSectionLabel = this.testVoiceSection.getByTestId(
      "setting-section-label",
    );
    this.testVoiceSectionText = this.testVoiceSection.getByTestId(
      "setting-section-text",
    );
    this.widgetBar = page.getByTestId("widget-bar");
  }

  async selectLoggerLevel(currentLevel: string, newLevel: string) {
    await this.page
      .getByTestId(`selector-current-logger-level-${currentLevel}`)
      .locator("select")
      .selectOption({ label: newLevel });
  }

  async validateLoggerLevels(expectedLevels: string[]) {
    let displayedLevels: string[] = [];
    const options: string[] =
      await this.loggerLevelSectionSelectorOption.allTextContents();
    displayedLevels = options.map((option) => option.trim());
    expect(displayedLevels).toEqual(expectedLevels);
  }
}
