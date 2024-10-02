import { CombinedSelector } from "./CombinedSelector";
import { type Locator, type Page, expect } from "@playwright/test";

export class EmojiPicker extends CombinedSelector {
  readonly categoryNav: Locator;
  readonly categoryNavLink: Locator;
  readonly emojiSection: Locator;
  readonly emojiSectionEmojis: Locator;
  readonly emojiSectionLabel: Locator;
  readonly emojiSectionList: Locator;
  readonly emojiContainerSearchInput: Locator;
  readonly emojiContainerSizeLabel: Locator;
  readonly emojiContainerSizeRangeSelector: Locator;
  readonly emojiContainerSizeRangeSelectorInput: Locator;
  readonly emojiContainerSizeSection: Locator;
  readonly emojiSelector: Locator;
  readonly frequentlyUsedSection: Locator;
  readonly skinToneSelector: Locator;
  readonly skinToneSelectorButton: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.categoryNav = this.page.getByTestId("emoji-category-nav");
    this.emojiContainerSearchInput = this.page
      .getByTestId("emoji-container-search-input")
      .locator("input");
    this.emojiContainerSizeLabel = this.page.getByTestId(
      "emoji-container-size-label",
    );
    this.emojiContainerSizeRangeSelector = this.page
      .getByTestId("emoji-container-size-section")
      .getByTestId("range-selector");
    this.emojiContainerSizeRangeSelectorInput = this.page
      .getByTestId("emoji-container-size-section")
      .getByTestId("range-selector")
      .getByTestId("range-selector-input");
    this.emojiContainerSizeSection = this.page.getByTestId(
      "emoji-container-size-section",
    );
    this.emojiSelector = this.page.getByTestId("emoji-selector");
    this.frequentlyUsedSection = this.page.getByTestId(
      "frequently-used-section",
    );
    this.skinToneSelector = this.page.getByTestId("skin-tone-selector");
    this.skinToneSelectorButton = this.page.getByTestId(
      "skin-tone-selector-button",
    );
  }

  async changeSkinToneEmoji(index: number) {
    await this.skinToneSelector.click();
    await this.page.locator(".skin-tone-popup").waitFor({ state: "attached" });
    const skinToneButton = this.page
      .getByTestId("skin-tone-selector-button")
      .nth(index);
    await skinToneButton.click();
    await this.page.locator(".skin-tone-popup").waitFor({ state: "detached" });
  }

  async changeEmojiSizeView(size: string) {
    await this.emojiContainerSizeRangeSelectorInput.fill(size);
  }

  async navigateThroughEmojiCategories(category: string) {
    const locator = this.page.getByTestId("category-link-" + category);
    await locator.click();
    const section = this.page.getByTestId(category + "-section");
    await section.waitFor({ state: "attached" });
  }

  async searchEmoji(emoji: string) {
    await this.emojiContainerSearchInput.fill(emoji);
  }

  async selectEmoji(emoji: string) {
    await this.page
      .getByTestId("emoji-container")
      .locator("span")
      .filter({
        hasText: emoji,
      })
      .click();
  }

  async validateEmojiCategories(expectedCategories: string[]) {
    // Define an array to store section names
    const sectionNames = [];

    // Select all section elements (assuming they have a data-cy attribute ending with '-section')
    const sections = await this.page.$$(`section[data-cy$="-section"]`);

    // Loop through each section and find its corresponding label
    for (const section of sections) {
      // Find the label within the current section that ends with '-label'
      const label = await section.$(`label[data-cy$="-label"]`);
      if (label) {
        const sectionName = await label.textContent();
        sectionNames.push(sectionName.trim());
      }
    }
    expect(sectionNames).toEqual(expectedCategories);
  }

  async validateNumberOfEmojisPerSection(
    section: string,
    expectedNumber: number,
  ) {
    const emojisCount = await this.page
      .getByTestId(section + "-section")
      .locator("span")
      .count();
    expect(emojisCount).toEqual(expectedNumber);
  }

  async validateSingleEmojiSize(emoji: string, expectedSize: string) {
    const emojiLocator = this.page
      .getByTestId("emoji-container")
      .locator("span")
      .filter({
        hasText: emoji,
      });
    await expect(emojiLocator).toHaveCSS("font-size", expectedSize);
  }
}
