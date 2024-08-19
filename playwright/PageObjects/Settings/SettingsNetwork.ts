import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsNetwork extends SettingsBase {
  readonly buttonCdnSave: Locator;
  readonly inputCdnAddress: Locator;
  readonly inputCdnName: Locator;
  readonly inputRelayAddress: Locator;
  readonly inputRelayName: Locator;
  readonly labelCdn: Locator;
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
  readonly underConstruction: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.buttonCdnSave = this.page.getByTestId("button-cdn-save");
    this.inputCdnAddress = this.page.getByTestId("input-cdn-address");
    this.inputCdnName = this.page.getByTestId("input-cdn-name");
    this.inputRelayAddress = this.page.getByTestId("input-relay-address");
    this.inputRelayName = this.page.getByTestId("input-relay-name");
    this.labelCdn = this.page.getByTestId("label-cdn");
    this.labelRelayAddress = this.page.getByTestId("label-relay-address");
    this.labelRelayName = this.page.getByTestId("label-relay-name");
    this.modalAddRelay = this.page.getByTestId("modal-relay-add");
    this.modalAddRelayCancelButton = this.modalAddRelay.locator(
      "[data-cy='button-relay-modal-cancel']",
    );
    this.modalAddRelaySaveButton = this.modalAddRelay.locator(
      "[data-cy='button-relay-modal-save']",
    );
    this.relayAddButton = this.page.getByTestId("button-relay-add");
    this.relayConfigLabel = this.page.getByTestId("label-relay");
    this.relayListDeleteButton = this.page.getByTestId("button-relay-delete");
    this.relayListEditButton = this.page.getByTestId("button-relay-edit");
    this.relayListToggleButton = this.page.getByTestId("button-relay-toggle");
    this.relayRevertButton = this.page.getByTestId("button-relay-revert");
    this.relaySaveButton = this.page.getByTestId("button-relay-save");
    this.underConstruction = this.page.getByTestId("under-construction");
  }
}
