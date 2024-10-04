import { type Locator, type Page, expect } from "@playwright/test";
import { CombinedSelector } from "./CombinedSelector";

export class StickerPicker extends CombinedSelector {
  readonly allStickers: Locator;
  readonly stickerCollection: Locator;
  readonly stickerCollectionItem: Locator;
  readonly stickerCollectionItemImage: Locator;
  readonly stickerCollectionItemName: Locator;
  readonly stickerCollectionLabel: Locator;
  readonly stickerSearchInput: Locator;
  readonly stickerSelectorSidebar: Locator;
  readonly stickerSidebarCollection: Locator;
  readonly stickerSelectorSidebarLabel: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.allStickers = this.page.getByTestId("sticker-contents");
    this.stickerCollection = this.page.getByTestId("sticker-collection");
    this.stickerCollectionItem = this.page.getByTestId(
      "sticker-collection-item",
    );
    this.stickerCollectionItemImage = this.stickerCollectionItem.locator("img");
    this.stickerCollectionItemName = this.stickerCollectionItem.getByTestId(
      "sticker-collection-item-name",
    );
    this.stickerCollectionLabel = this.page.getByTestId(
      "sticker-collection-label",
    );
    this.stickerSelectorSidebar = this.page.getByTestId(
      "sticker-selector-sidebar",
    );
    this.stickerSidebarCollection = this.page.getByTestId(
      "sticker-sidebar-collection",
    );
    this.stickerSelectorSidebarLabel = this.page.getByTestId(
      "sticker-selector-sidebar-label",
    );
  }

  async navigateThroughStickerCategories(collectionName: string) {
    await this.page.getByLabel("Jump to " + collectionName).click();
    await this.page
      .locator('[id="' + collectionName + '"]')
      .waitFor({ state: "attached" });
  }

  async selectSticker(collectionName: string, stickerName: string) {
    const stickerCollection = this.page.locator(
      '[id="' + collectionName + '"]',
    );
    const stickerCollectionItem = stickerCollection
      .getByTestId("sticker-collection-item")
      .filter({
        has: this.page.getByAltText(stickerName),
      });
    await stickerCollectionItem.click();
    await this.page.waitForTimeout(2000);
  }

  async searchSticker(stickerText: string) {
    await this.stickerSearchInput.focus();
    await this.page.keyboard.type(stickerText);
    await this.page.waitForTimeout(1000);
  }

  async validateStickerCategories(expectedCategories: string[]) {
    // Define an array to store section names
    const sectionNames = [];

    // Select all section elements (assuming they have a data-cy attribute ending with '-section')
    const sections = await this.page.$$(
      `section[data-cy$="sticker-collection"]`,
    );

    // Loop through each section and find its corresponding label
    for (const section of sections) {
      // Find the label within the current section that ends with '-label'
      const label = await section.$(
        `label[data-cy$="sticker-collection-label"]`,
      );
      if (label) {
        const sectionName = await label.textContent();
        sectionNames.push(sectionName.trim());
      }
    }
    expect(sectionNames).toEqual(expectedCategories);
  }

  async validateNumberOfStickersPerSection(
    collectionName: string,
    expectedNumber: number,
  ) {
    const stickerCount = await this.page
      .locator('[id="' + collectionName + '"]')
      .getByTestId("sticker-collection-item")
      .count();
    expect(stickerCount).toEqual(expectedNumber);
  }

  async waitForStickersToLoad() {
    await this.page.waitForTimeout(2000);
  }
}
