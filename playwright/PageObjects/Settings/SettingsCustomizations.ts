import { SettingsBase } from "./SettingsBase";
import { expect, type Locator, type Page } from "@playwright/test";

export class SettingsCustomizations extends SettingsBase {
  readonly appLanguageSection: Locator;
  readonly appLanguageSectionLabel: Locator;
  readonly appLanguageSectionSelector: Locator;
  readonly appLanguageSectionSelectorOption: Locator;
  readonly appLanguageSectionText: Locator;
  readonly customCSSSection: Locator;
  readonly customCSSSectionLabel: Locator;
  readonly customCSSSectionText: Locator;
  readonly customCSSSectionTextArea: Locator;
  readonly emojiFontSection: Locator;
  readonly emojiFontSectionButton: Locator;
  readonly emojiFontSectionLabel: Locator;
  readonly emojiFontSectionRandomEmoji: Locator;
  readonly emojiFontSectionSelector: Locator;
  readonly emojiFontSectionSelectorOption: Locator;
  readonly emojiFontSectionText: Locator;
  readonly fontSection: Locator;
  readonly fontSectionButton: Locator;
  readonly fontSectionLabel: Locator;
  readonly fontSectionSelector: Locator;
  readonly fontSectionSelectorOption: Locator;
  readonly fontSectionText: Locator;
  readonly fontScalingSection: Locator;
  readonly fontScalingSectionDecreaseButton: Locator;
  readonly fontScalingSectionIncreaseButton: Locator;
  readonly fontScalingSectionInput: Locator;
  readonly fontScalingSectionLabel: Locator;
  readonly fontScalingSectionText: Locator;
  readonly identiconSection: Locator;
  readonly identiconSectionButton: Locator;
  readonly identiconSectionLabel: Locator;
  readonly identiconSectionProfilePicture: Locator;
  readonly identiconSectionSelector: Locator;
  readonly identiconSectionSelectorOption: Locator;
  readonly identiconSectionText: Locator;
  readonly minimalCallingAlertsSection: Locator;
  readonly minimalCallingAlertsSectionCheckbox: Locator;
  readonly minimalCallingAlertsSectionLabel: Locator;
  readonly minimalCallingAlertsSectionText: Locator;
  readonly minimalCallingAlertsSectionSlider: Locator;
  readonly primaryColorSection: Locator;
  readonly primaryColorSectionColorSwatchButton: Locator;
  readonly primaryColorSectionLabel: Locator;
  readonly primaryColorSectionPopUpButton: Locator;
  readonly primaryColorSectionText: Locator;
  readonly themeSection: Locator;
  readonly themeSectionOpenFolderButton: Locator;
  readonly themeSectionThemeMoonButton: Locator;
  readonly themeSectionLabel: Locator;
  readonly themeSectionSelector: Locator;
  readonly themeSectionSelectorOption: Locator;
  readonly themeSectionText: Locator;
  readonly widgetPanelSection: Locator;
  readonly widgetPanelSectionCheckbox: Locator;
  readonly widgetPanelSectionLabel: Locator;
  readonly widgetPanelSectionSlider: Locator;
  readonly widgetPanelSectionText: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.appLanguageSection = this.page.getByTestId("section-app-language");
    this.appLanguageSectionLabel = this.appLanguageSection.getByTestId(
      "setting-section-label",
    );
    this.appLanguageSectionSelector = this.page.getByTestId(
      "selector-app-language",
    );
    this.appLanguageSectionSelectorOption =
      this.appLanguageSectionSelector.getByTestId("select-option");
    this.appLanguageSectionText = this.appLanguageSection.getByTestId(
      "setting-section-text",
    );
    this.customCSSSection = this.page.getByTestId("section-custom-css");
    this.customCSSSectionLabel = this.customCSSSection.getByTestId(
      "setting-section-label",
    );
    this.customCSSSectionText = this.customCSSSection.getByTestId(
      "setting-section-text",
    );
    this.customCSSSectionTextArea = this.page.getByTestId(
      "text-area-custom-css",
    );
    this.emojiFontSection = this.page.getByTestId("section-emoji-font");
    this.emojiFontSectionLabel = this.emojiFontSection.getByTestId(
      "setting-section-label",
    );
    this.emojiFontSectionButton = this.emojiFontSection.getByTestId(
      "button-emoji-font-open-folder",
    );
    this.emojiFontSectionRandomEmoji = this.page.getByTestId(
      "emoji-font-random-emoji",
    );
    this.emojiFontSectionSelector = this.emojiFontSection.locator("select");
    this.emojiFontSectionSelectorOption =
      this.emojiFontSectionSelector.getByTestId("select-option");
    this.emojiFontSectionText = this.emojiFontSection.getByTestId(
      "setting-section-text",
    );
    this.fontSection = this.page.getByTestId("section-font");
    this.fontSectionButton = this.page.getByTestId("button-font-open-folder");
    this.fontSectionLabel = this.fontSection.getByTestId(
      "setting-section-label",
    );
    this.fontSectionSelector = this.fontSection.locator("select");
    this.fontSectionSelectorOption =
      this.fontSectionSelector.getByTestId("select-option");
    this.fontSectionText = this.fontSection.getByTestId("setting-section-text");
    this.fontScalingSection = this.page.getByTestId("section-font-scaling");
    this.fontScalingSectionDecreaseButton = this.fontScalingSection.getByTestId(
      "button-font-scaling-decrease",
    );
    this.fontScalingSectionIncreaseButton = this.fontScalingSection.getByTestId(
      "button-font-scaling-increase",
    );
    this.fontScalingSectionInput = this.fontScalingSection
      .getByTestId("input-font-scaling")
      .locator("input");
    this.fontScalingSectionLabel = this.fontScalingSection.getByTestId(
      "setting-section-label",
    );
    this.fontScalingSectionText = this.fontScalingSection.getByTestId(
      "setting-section-text",
    );
    this.identiconSection = this.page.getByTestId("section-identicon");
    this.identiconSectionButton = this.identiconSection.getByTestId(
      "button-identicon-open-folder",
    );
    this.identiconSectionLabel = this.identiconSection.getByTestId(
      "setting-section-label",
    );
    this.identiconSectionProfilePicture = this.page.getByTestId(
      "identicon-profile-picture",
    );
    this.identiconSectionSelector = this.identiconSection.locator("select");
    this.identiconSectionSelectorOption =
      this.identiconSectionSelector.getByTestId("select-option");
    this.identiconSectionText = this.identiconSection.getByTestId(
      "setting-section-text",
    );
    this.minimalCallingAlertsSection = this.page.getByTestId(
      "section-minimal-call-alerts",
    );
    this.minimalCallingAlertsSectionCheckbox =
      this.minimalCallingAlertsSection.getByTestId(
        "switch-minimal-call-alerts",
      );
    this.minimalCallingAlertsSectionLabel =
      this.minimalCallingAlertsSection.getByTestId("setting-section-label");
    this.minimalCallingAlertsSectionText =
      this.minimalCallingAlertsSection.getByTestId("setting-section-text");
    this.minimalCallingAlertsSectionSlider =
      this.minimalCallingAlertsSection.locator(".slider");
    this.primaryColorSection = this.page.getByTestId("section-primary-color");
    this.primaryColorSectionColorSwatchButton =
      this.primaryColorSection.getByTestId("color-swatch");
    this.primaryColorSectionLabel = this.primaryColorSection.getByTestId(
      "setting-section-label",
    );
    this.primaryColorSectionPopUpButton = this.page.getByTestId(
      "primary-color-popup-button",
    );
    this.primaryColorSectionText = this.primaryColorSection.getByTestId(
      "setting-section-text",
    );
    this.themeSection = this.page.getByTestId("section-theme");
    this.themeSectionOpenFolderButton = this.page.getByTestId(
      "button-theme-open-folder",
    );
    this.themeSectionThemeMoonButton =
      this.page.getByTestId("button-theme-moon");
    this.themeSectionLabel = this.themeSection.getByTestId(
      "setting-section-label",
    );
    this.themeSectionSelector = this.themeSection.locator(".select-group");
    this.themeSectionSelectorOption =
      this.themeSectionSelector.getByTestId("select-option");
    this.themeSectionText = this.themeSection.getByTestId(
      "setting-section-text",
    );
    this.widgetPanelSection = this.page.getByTestId("section-widget-panel");
    this.widgetPanelSectionCheckbox = this.widgetPanelSection.getByTestId(
      "switch-widget-panel",
    );
    this.widgetPanelSectionLabel = this.widgetPanelSection.getByTestId(
      "setting-section-label",
    );
    this.widgetPanelSectionText = this.widgetPanelSection.getByTestId(
      "setting-section-text",
    );
    this.widgetPanelSectionSlider = this.widgetPanelSection.locator(".slider");
  }

  async selectColorSwatch(color: string) {
    await this.page
      .locator(`[data-cy="color-swatch"][data-tooltip="${color}"]`)
      .click();
  }

  async selectDefaultProfileStyle(style: string) {
    await this.identiconSection
      .locator("select")
      .selectOption({ label: style });
  }

  async selectEmojiFont(font: string) {
    await this.emojiFontSection.locator("select").selectOption({ label: font });
  }

  async selectFont(font: string) {
    await this.fontSection.locator("select").selectOption({ label: font });
  }

  async selectTheme(theme: string) {
    await this.themeSection
      .locator(".select-group")
      .locator("select")
      .selectOption({ label: theme });
  }

  async validateCurrentTheme(theme: string) {
    const stylesheet = this.page.locator("#app link[rel='stylesheet']");
    await expect(stylesheet).toHaveAttribute("href", theme);
  }

  async validateDefaultProfileStyles(expectedStyles: string[]) {
    let displayedStyles: string[] = [];
    const options: string[] =
      await this.identiconSectionSelectorOption.allTextContents();
    displayedStyles = options.map((option) => option.trim());
    expect(displayedStyles).toEqual(expectedStyles);
  }

  async validateEmojiFontNames(expectedFonts: string[]) {
    let displayedFonts: string[] = [];
    const options: string[] =
      await this.emojiFontSectionSelectorOption.allTextContents();
    displayedFonts = options.map((option) => option.trim());
    expect(displayedFonts).toEqual(expectedFonts);
  }

  async validateFontNames(expectedFonts: string[]) {
    let displayedFonts: string[] = [];
    const options: string[] =
      await this.fontSectionSelectorOption.allTextContents();
    displayedFonts = options.map((option) => option.trim());
    expect(displayedFonts).toEqual(expectedFonts);
  }

  public async validatePrimaryColors(expectedPrimaryColors: string[]) {
    // Array to store the displayed primary colors
    let displayedPrimaryColors: string[] = [];

    // Get all the color swatch buttons in the primary color section
    const colorSwatchButtons =
      await this.primaryColorSectionColorSwatchButton.elementHandles();

    // Iterate over each button and push its data-tooltip attribute to the array
    for (const button of colorSwatchButtons) {
      const tooltip = await button.getAttribute("data-tooltip");
      if (tooltip) {
        displayedPrimaryColors.push(tooltip);
      }
    }

    // Validate that the displayed primary colors match the expected primary colors
    expect(displayedPrimaryColors).toEqual(expectedPrimaryColors);
  }

  async validateThemeNames(expectedThemes: string[]) {
    let displayedThemes: string[] = [];
    const options: string[] =
      await this.themeSectionSelectorOption.allTextContents();
    displayedThemes = options.map((option) => option.trim());
    expect(displayedThemes).toEqual(expectedThemes);
  }
}
