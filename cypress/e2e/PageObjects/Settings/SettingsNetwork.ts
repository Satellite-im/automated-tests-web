import SettingsBase from "./SettingsBase";

class SettingsNetwork extends SettingsBase {
  constructor() {
    super();
  }

  get inputRelayAddress() {
    return cy.getByTestAttr("input-relay-address");
  }

  get inputRelayName() {
    return cy.getByTestAttr("input-relay-name");
  }

  get labelRelayAddress() {
    return cy.getByTestAttr("label-relay-address");
  }

  get labelRelayName() {
    return cy.getByTestAttr("label-relay-name");
  }

  get modalAddRelay() {
    return cy.getByTestAttr("modal-relay-add");
  }

  get modalAddRelayCancelButton() {
    return this.modalAddRelay.find("[data-cy='button-relay-modal-cancel']");
  }

  get modalAddRelaySaveButton() {
    return this.modalAddRelay.find("[data-cy='button-relay-modal-save']");
  }

  get relayAddButton() {
    return cy.getByTestAttr("button-relay-add");
  }

  get relayConfigLabel() {
    return cy.getByTestAttr("label-relay");
  }

  get relayListDeleteButton() {
    return cy.getByTestAttr("button-relay-delete");
  }

  get relayListEditButton() {
    return cy.getByTestAttr("button-relay-edit");
  }

  get relayListToggleButton() {
    return cy.getByTestAttr("button-relay-toggle");
  }

  get relayRevertButton() {
    return cy.getByTestAttr("button-relay-revert");
  }

  get relaySaveButton() {
    return cy.getByTestAttr("button-relay-save");
  }
}

export default new SettingsNetwork();
