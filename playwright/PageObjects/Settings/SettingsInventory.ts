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
    this.inventoryFrameEquippedButton = this.inventoryFrame.getByRole(
      "button",
      { name: "Equipped" },
    );
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
      .locator('[data-cy="inventory-item-name"]', { hasText: name })
      .locator("xpath=..");
  }

  async getFrameButtonText(name: string) {
    const frame = await this.getFrame(name);
    return frame.locator('[data-cy="inventory-item-button"]').locator("p");
  }

  async getFrameContainer(name: string) {
    return this.page
      .locator('[data-cy="inventory-item-name"]', { hasText: name })
      .last()
      .locator("xpath=..");
  }

  async validateInventoryFrames(
    expectedFrames: { name: string; type: string }[],
  ) {
    let frames: { name: string; type: string }[] = [];
    const inventoryFrames = await this.inventoryFrameName;
    const inventoryFramesCount = await inventoryFrames.count();

    for (let i = 0; i < inventoryFramesCount; i++) {
      frames.push({
        name: await inventoryFrames.nth(i).textContent(),
        type: await inventoryFrames
          .nth(i)
          .locator('~ [data-cy="inventory-item-type"]')
          .textContent(),
      });
    }

    expect(frames).toEqual(expectedFrames);
  }

  async equipFrame(frameName: string) {
    const frameButtonText = await this.getFrameButtonText(frameName);
    expect(frameButtonText).toHaveText("Equip");

    await this.clickOnFrameButton(frameName);
    const frameButtonTextTwo = await this.getFrameButtonText(frameName);
    expect(frameButtonTextTwo).toHaveText("Equipped");
  }

  async unequipFrame(frameName: string) {
    const unequipButton = this.profilePictureFrameUnequipButton;
    expect(unequipButton).toHaveText("Unequip");

    const frameContainer = await this.getFrameContainer(frameName);
    await expect(frameContainer).not.toHaveClass("equipped");
    await unequipButton.click();
  }

  async validateEquippedFrame(frameName: string) {
    await expect(this.profilePictureFrameName).toHaveText(frameName);
    await expect(this.profilePictureFrameType).toHaveText(
      "Profile Picture Frame",
    );
  }
}
