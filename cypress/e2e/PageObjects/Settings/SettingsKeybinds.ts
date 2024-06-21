import _ = require("cypress/types/lodash");
import SettingsBase from "./SettingsBase";

class SettingsKeybinds extends SettingsBase {
  constructor() {
    super();
  }

  get bannerText() {
    return cy.getByTestAttr("banner-text");
  }

  get existingKeybind() {
    return cy.getByTestAttr("keybind");
  }

  get existingKeybindDescription() {
    return cy.getByTestAttr("text-keybind-action");
  }

  get existingKeybindButton() {
    return cy.getByTestAttr("key-button");
  }

  get existingKeybindButtonText() {
    return cy.getByTestAttr("key-button-text");
  }

  get existingKeybindRevertButton() {
    return cy.getByTestAttr("button-keybind-revert-single");
  }

  get newKeybindSection() {
    return cy.getByTestAttr("section-new-keybind");
  }

  get newKeybindActionLabel() {
    return this.newKeybindSection.find("[data-cy='label-keybind-action']");
  }

  get newKeybindActionSelector() {
    return this.newKeybindSection.find("[data-cy='selector-keybind-action']");
  }

  get newKeybindActionSelectorOption() {
    return this.newKeybindActionSelector.find("[data-cy='select-option']");
  }

  get newKeybindRecordedKeysLabel() {
    return this.newKeybindSection.find(
      "[data-cy='label-keybind-recorded-keys']",
    );
  }

  get newKeybindKeyButton() {
    return this.newKeybindSection.find("[data-cy='key-button']");
  }

  get newKeybindKeyButtonText() {
    return this.newKeybindSection.find("[data-cy='key-button-text']");
  }

  get newKeybindCancelButton() {
    return this.newKeybindSection.find("[data-cy='button-keybind-cancel']");
  }

  get newKeybindSaveButton() {
    return this.newKeybindSection.find("[data-cy='button-keybind-save']");
  }

  get recordKeybindLabel() {
    return cy.getByTestAttr("label-record-keybind");
  }

  get recordKeybindInstructionsText() {
    return cy.getByTestAttr("text-keybind-instructions");
  }

  get revertKeybindSection() {
    return cy.getByTestAttr("section-revert-keybind");
  }

  get revertKeybindSectionLabel() {
    return this.revertKeybindSection.find("[data-cy='setting-section-label']");
  }

  get revertKeybindSectionText() {
    return this.revertKeybindSection.find("[data-cy='setting-section-text']");
  }

  get revertKeybindSectionAllButton() {
    return cy.getByTestAttr("button-keybind-revert-all");
  }

  public clickOnRevertSingleKeybind(action: string) {
    cy.get("[data-cy='text-keybind-action']")
      .contains(action)
      .parent()
      .find("[data-cy='button-keybind-revert-single']")
      .click();
  }

  public validateKeybindButtonKeys(action: string, expectedKeys: string[]) {
    let keysArray: string[] = [];
    cy.get("[data-cy='text-keybind-action']")
      .contains(action)
      .parent()
      .find("[data-cy='key-button-text']")
      .each(($el) => {
        keysArray.push($el.text());
      })
      .then(() => {
        expect(keysArray).to.have.deep.members(expectedKeys);
      });
  }

  public selectKeybind(name: string) {
    cy.get('[data-cy="selector-keybind-action"]').find("select").select(name);
  }

  public validateKeybindActions(expectedKeybinds: string[]) {
    let displayedKeybinds: string[] = [];
    this.newKeybindActionSelectorOption
      .each(($option) => {
        displayedKeybinds.push($option.text());
      })
      .then(() => {
        expect(displayedKeybinds).to.deep.equal(expectedKeybinds);
      });
  }
}

export default new SettingsKeybinds();
