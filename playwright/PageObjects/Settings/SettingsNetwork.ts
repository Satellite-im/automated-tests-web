import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsNetwork extends SettingsBase {
  readonly page: Page;
  readonly inputRelayAddress: Locator;
  readonly inputRelayName: Locator;
  readonly labelRelayAddress: Locator;
  readonly labelRelayName: Locator;
  readonly modalAddRelay: Locator;
  readonly modalAddRelayCancelButton: Locator;
  readonly modalAddRelaySaveButton: Locator;
  readonly relayAddButton: Locator;
  readonly relayConfigLabel: Locator;
  readonly relayListDeleteButton: Locator;
  readonly relayListEditButton: Locator;
  readonly relayListToggleButton: Locator;
  readonly relayRevertButton: Locator;
  readonly relaySaveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.inputRelayAddress = page.getByTestId("input-relay-address");
    this.inputRelayName = page.getByTestId("input-relay-name");
    this.labelRelayAddress = page.getByTestId("label-relay-address");
    this.labelRelayName = page.getByTestId("label-relay-name");
    this.modalAddRelay = page.getByTestId("modal-relay-add");
    this.modalAddRelayCancelButton = this.modalAddRelay.locator(
      "[data-cy='button-relay-modal-cancel']",
    );
    this.modalAddRelaySaveButton = this.modalAddRelay.locator(
      "[data-cy='button-relay-modal-save']",
    );
    this.relayAddButton = page.getByTestId("button-relay-add");
    this.relayConfigLabel = page.getByTestId("label-relay");
    this.relayListDeleteButton = page.getByTestId("button-relay-delete");
    this.relayListEditButton = page.getByTestId("button-relay-edit");
    this.relayListToggleButton = page.getByTestId("button-relay-toggle");
    this.relayRevertButton = page.getByTestId("button-relay-revert");
    this.relaySaveButton = page.getByTestId("button-relay-save");
  }
}
