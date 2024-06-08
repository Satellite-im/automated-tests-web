class SettingsInventory {
  get buttonUnequipInventory() {
    return cy.getByTestAttr("button-unequip-inventory");
  }

  get inventoryFrame() {
    return cy.getByTestAttr("inventory-frame");
  }

  get inventoryFrameImage() {
    return this.inventoryFrame.find("img");
  }

  get inventoryFrameButton() {
    return this.inventoryFrame.find("[data-cy='inventory-item-button']");
  }

  get inventoryFrameName() {
    return this.inventoryFrame.find("[data-cy='inventory-item-name']");
  }

  get inventoryFrameType() {
    return this.inventoryFrame.find("[data-cy='inventory-item-type']");
  }

  get labelInventoryEquippedItems() {
    return cy.getByTestAttr("label-inventory-equipped-items");
  }

  get labelInventoryFrame() {
    return cy.getByTestAttr("label-inventory-frame");
  }

  get labelInventoryFrames() {
    return cy.getByTestAttr("label-inventory-frames");
  }

  get labelProfileOverlays() {
    return cy.getByTestAttr("label-profile-overlays");
  }

  get profilePictureFrame() {
    return cy.getByTestAttr("inventory-profile-picture-frame");
  }

  get profilePictureFrameName() {
    return this.profilePictureFrame.find("[data-cy='inventory-item-name']");
  }

  get profilePictureFrameType() {
    return this.profilePictureFrame.find("[data-cy='inventory-item-type']");
  }

  get profilePictureFrameUnequipButton() {
    return this.profilePictureFrame.find(
      "[data-cy='button-unequip-inventory']",
    );
  }

  get inventoryItemName() {
    return cy.getByTestAttr("inventory-item-name");
  }

  get inventoryItemType() {
    return cy.getByTestAttr("inventory-item-type");
  }

  public getFrameByName(name: string) {
    return cy.getByTestAttr("inventory-item-name").contains(name).parent();
  }

  public validateInventoryFrames(
    expectedFrames: { name: string; type: string }[],
  ) {
    let frames: { name: string; type: string }[] = [];
    this.inventoryFrameName
      .each(($item, index, $list) => {
        frames.push({
          name: $item.text(),
          type: $item.siblings("[data-cy='inventory-item-type']").text(),
        });
      })
      .then(() => {
        expect(frames).to.deep.equal(expectedFrames);
      });
  }
}

export const settingsInventory: SettingsInventory = new SettingsInventory();
