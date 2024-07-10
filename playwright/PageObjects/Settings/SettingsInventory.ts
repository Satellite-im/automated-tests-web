import { SettingsBase } from "./SettingsBase";
import { expect, type Locator, type Page } from "@playwright/test";

export class SettingsInventory extends SettingsBase {
  readonly page: Page;
  readonly buttonUnequipInventory: Locator;
  readonly inventoryFrame: Locator;
  readonly inventoryFrameImage: Locator;
  readonly inventoryFrameButton: Locator;
  readonly inventoryFrameEquippedButton: Locator;
  readonly inventoryFrameName: Locator;
  readonly inventoryFrameType: Locator;
  readonly labelInventoryEquippedItems: Locator;
  readonly labelInventoryFrame: Locator;
  readonly labelInventoryFrames: Locator;
  readonly labelProfileOverlays: Locator;
  readonly profilePictureFrame: Locator;
  readonly profilePictureFrameName: Locator;
  readonly profilePictureFrameType: Locator;
  readonly profilePictureFrameUnequipButton: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemType: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonUnequipInventory = page.getByTestId("button-unequip-inventory");
    this.inventoryFrame = page.getByTestId("inventory-frame");
    this.inventoryFrameImage = this.inventoryFrame.locator("img");
    this.inventoryFrameButton = this.inventoryFrame.getByTestId(
      "inventory-item-button",
    );
    this.inventoryFrameEquippedButton = this.inventoryFrame
      .locator('[data-cy="inventory-frame"].equipped')
      .getByTestId("inventory-item-button");
    this.inventoryFrameName = this.inventoryFrame.getByTestId(
      "inventory-item-name",
    );
    this.inventoryFrameType = this.inventoryFrame.getByTestId(
      "inventory-item-type",
    );
    this.labelInventoryEquippedItems = page.getByTestId(
      "label-inventory-equipped-items",
    );
    this.labelInventoryFrame = page.getByTestId("label-inventory-frame");
    this.labelInventoryFrames = page.getByTestId("label-inventory-frames");
    this.labelProfileOverlays = page.getByTestId("label-profile-overlays");
    this.profilePictureFrame = page.getByTestId(
      "inventory-profile-picture-frame",
    );
    this.profilePictureFrameName = this.profilePictureFrame.getByTestId(
      "inventory-item-name",
    );
    this.profilePictureFrameType = this.profilePictureFrame.getByTestId(
      "inventory-item-type",
    );
    this.profilePictureFrameUnequipButton =
      this.profilePictureFrame.getByTestId("button-unequip-inventory");
    this.inventoryItemName = page.getByTestId("inventory-item-name");
    this.inventoryItemType = page.getByTestId("inventory-item-type");
  }

  async clickOnFrameButton(name: string) {
    return await (await this.getFrame(name))
      .getByTestId("inventory-item-button")
      .click();
  }

  async getFrame(name: string) {
    // Locate the element with the test attribute and containing the specified text
    return this.page
      .locator('[data-cy="inventory-item-name"]')
      .locator(`text=${name}`)
      .locator("..");
  }

  async getFrameButtonText(name: string) {
    const frame = await this.getFrame(name);
    return frame.locator('[data-cy="inventory-item-button"]').locator("p");
  }

  async getFrameContainer(name: string) {
    return this.page
      .locator('[data-cy="inventory-item-name"]')
      .locator(`text=${name}`)
      .last()
      .locator("..");
  }

  public async validateInventoryFrames2(
    expectedFrames: { name: string; type: string }[],
  ) {
    // Array to store the extracted frames
    let frames: { name: string; type: string }[] = [];

    // Locate all inventory frame names
    const frameNames = await this.inventoryFrameName;

    // Get the count of the frame names
    const count = await frameNames.count();

    for (let i = 0; i < count; i++) {
      // Get the text of the frame name
      const name = await frameNames.nth(i).innerText();

      // Locate the corresponding type element and get its text
      const type = await frameNames
        .nth(i)
        .locator("[data-cy='inventory-item-type']")
        .innerText();

      // Push the extracted data to the frames array
      frames.push({ name, type });
    }

    // Validate that the extracted frames match the expected frames
    expect(frames).toEqual(expectedFrames);
  }
}
