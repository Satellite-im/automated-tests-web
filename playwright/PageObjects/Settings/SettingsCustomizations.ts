import { SettingsBase } from "./SettingsBase";
import { expect, type Locator, type Page } from "@playwright/test";

export class SettingsCustomizations extends SettingsBase {
  readonly page: Page;
  readonly appLanguageSection: Locator;
  readonly appLanguageSectionLabel: Locator;
  readonly appLanguageSectionSelector: Locator;
  readonly appLanguageSectionSelectorOption: Locator;
  readonly appLanguageSectionText: Locator;
  readonly customCSSSection: Locator;
  readonly customCSSSectionLabel: Locator;
  readonly customCSSSectionText: Locator;
  readonly customCSSSectionTextArea: Locator;
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

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.appLanguageSection = page.getByTestId("section-app-language");
    this.appLanguageSectionLabel = this.appLanguageSection.getByTestId(
      "setting-section-label",
    );
    this.appLanguageSectionSelector = page.getByTestId("selector-app-language");
    this.appLanguageSectionSelectorOption =
      this.appLanguageSectionSelector.getByTestId("select-option");
    this.appLanguageSectionText = this.appLanguageSection.getByTestId(
      "setting-section-text",
    );
    this.customCSSSection = page.getByTestId("section-custom-css");
    this.customCSSSectionLabel = this.customCSSSection.getByTestId(
      "setting-section-label",
    );
    this.customCSSSectionText = this.customCSSSection.getByTestId(
      "setting-section-text",
    );
    this.customCSSSectionTextArea = page.getByTestId("text-area-custom-css");
    this.fontSection = page.getByTestId("section-font");
    this.fontSectionButton = page.getByTestId("button-font-open-folder");
    this.fontSectionLabel = this.fontSection.getByTestId(
      "setting-section-label",
    );
    this.fontSectionSelector = page.locator(
      '[data-cy^="selector-current-font-"]',
    );
    this.fontSectionSelectorOption =
      this.fontSectionSelector.getByTestId("select-option");
    this.fontSectionText = this.fontSection.getByTestId("setting-section-text");
    this.fontScalingSection = page.getByTestId("section-font-scaling");
    this.fontScalingSectionDecreaseButton = this.fontScalingSection.getByTestId(
      "button-font-scaling-decrease",
    );
    this.fontScalingSectionIncreaseButton = this.fontScalingSection.getByTestId(
      "button-font-scaling-increase",
    );
    this.fontScalingSectionInput =
      this.fontScalingSection.getByTestId("input-font-scaling");
    this.fontScalingSectionLabel = this.fontScalingSection.getByTestId(
      "setting-section-label",
    );
    this.fontScalingSectionText = this.fontScalingSection.getByTestId(
      "setting-section-text",
    );
    this.primaryColorSection = page.getByTestId("section-primary-color");
    this.primaryColorSectionColorSwatchButton =
      this.primaryColorSection.getByTestId("color-swatch");
    this.primaryColorSectionLabel = this.primaryColorSection.getByTestId(
      "setting-section-label",
    );
    this.primaryColorSectionPopUpButton = page.getByTestId(
      "primary-color-popup-button",
    );
    this.primaryColorSectionText = this.primaryColorSection.getByTestId(
      "setting-section-text",
    );
    this.themeSection = page.getByTestId("section-theme");
    this.themeSectionOpenFolderButton = page.getByTestId(
      "button-theme-open-folder",
    );
    this.themeSectionThemeMoonButton = page.getByTestId("theme-moon-button");
    this.themeSectionLabel = this.themeSection.getByTestId(
      "setting-section-label",
    );
    this.themeSectionSelector = page.getByTestId("selector-theme");
    this.themeSectionSelectorOption =
      this.themeSectionSelector.getByTestId("select-option");
    this.themeSectionText = this.themeSection.getByTestId(
      "setting-section-text",
    );
  }

  async selectColorSwatch(color: string) {
    await this.page
      .locator(`[data-cy="color-swatch"][data-tooltip="${color}"]`)
      .click();
  }

  async selectFont(font: string) {
    await this.page
      .getByTestId("selector-current-font-poppins")
      .locator("select")
      .selectOption({ label: font });
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