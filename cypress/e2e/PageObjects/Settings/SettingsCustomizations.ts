import SettingsBase from "./SettingsBase";

class SettingsCustomizations extends SettingsBase {
  constructor() {
    super();
  }

  get appLanguageSection() {
    return cy.getByTestAttr("section-app-language");
  }

  get appLanguageSectionLabel() {
    return this.appLanguageSection.find("[data-cy='setting-section-label']");
  }

  get appLanguageSectionSelector() {
    return cy.getByTestAttr("selector-app-language");
  }

  get appLanguageSectionSelectorOption() {
    return this.appLanguageSectionSelector.find("[data-cy='select-option']");
  }

  get appLanguageSectionText() {
    return this.appLanguageSection.find("[data-cy='setting-section-text']");
  }

  get customCSSSection() {
    return cy.getByTestAttr("section-custom-css");
  }

  get customCSSSectionLabel() {
    return this.customCSSSection.find("[data-cy='setting-section-label']");
  }

  get customCSSSectionText() {
    return this.customCSSSection.find("[data-cy='setting-section-text']");
  }

  get customCSSSectionTextArea() {
    return cy.getByTestAttr("text-area-custom-css");
  }

  get fontSection() {
    return cy.getByTestAttr("section-font");
  }

  get fontSectionButton() {
    return cy.getByTestAttr("button-font-open-folder");
  }

  get fontSectionLabel() {
    return this.fontSection.find("[data-cy='setting-section-label']");
  }

  get fontSectionSelector() {
    return cy.get("[data-cy^=selector-current-font-]");
  }

  get fontSectionSelectorOption() {
    return this.fontSectionSelector.find("[data-cy='select-option']");
  }

  get fontSectionText() {
    return this.fontSection.find("[data-cy='setting-section-text']");
  }

  get fontScalingSection() {
    return cy.getByTestAttr("section-font-scaling");
  }

  get fontScalingSectionDecreaseButton() {
    return cy.getByTestAttr("button-font-scaling-decrease");
  }

  get fontScalingSectionIncreaseButton() {
    return cy.getByTestAttr("button-font-scaling-increase");
  }

  get fontScalingSectionInput() {
    return cy.getByTestAttr("input-font-scaling");
  }

  get fontScalingSectionLabel() {
    return this.fontScalingSection.find("[data-cy='setting-section-label']");
  }

  get fontScalingSectionText() {
    return this.fontScalingSection.find("[data-cy='setting-section-text']");
  }

  get primaryColorSection() {
    return cy.getByTestAttr("section-primary-color");
  }

  get primaryColorSectionColorSwatchButton() {
    return this.primaryColorSection.find("[data-cy='color-swatch']");
  }

  get primaryColorSectionLabel() {
    return this.primaryColorSection.find("[data-cy='setting-section-label']");
  }

  get primaryColorSectionPopUpButton() {
    return cy.getByTestAttr("primary-color-popup-button");
  }

  get primaryColorSectionText() {
    return this.primaryColorSection.find("[data-cy='setting-section-text']");
  }

  get themeSection() {
    return cy.getByTestAttr("section-theme");
  }

  get themeSectionOpenFolderButton() {
    return cy.getByTestAttr("button-theme-open-folder");
  }

  get themeSectionThemeMoonButton() {
    return cy.getByTestAttr("button-theme-moon");
  }

  get themeSectionLabel() {
    return this.themeSection.find("[data-cy='setting-section-label']");
  }

  get themeSectionSelector() {
    return cy.getByTestAttr("selector-theme");
  }

  get themeSectionSelectorOption() {
    return this.themeSectionSelector.find("[data-cy='select-option']");
  }

  get themeSectionText() {
    return this.themeSection.find("[data-cy='setting-section-text']");
  }
}

export default new SettingsCustomizations();
