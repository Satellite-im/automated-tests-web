import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class EmojiPicker extends MainPage {
  readonly emojiSection: Locator;
  readonly aemojiSectionEmojis: Locator;
  readonly emojiSectionLabel: Locator;
  readonly emojiSectionList: Locator;
  readonly categoryNav: Locator;
  readonly categoryNavLink: Locator;
  readonly combinedSelector: Locator;
  readonly emojiContainer: Locator;
  readonly emojiContainerSearchInput: Locator;
  readonly emojiContainerSizeLabel: Locator;
  readonly emojiContainerSizeRangeSelector: Locator;
  readonly emojiContainerSizeRangeSelectorInput: Locator;
  readonly emojiContainerSizeSection: Locator;
  readonly emojiSelector: Locator;
  readonly footerTabs: Locator;
  readonly footerTabsEmojiButton: Locator;
  readonly footerTabsGifButton: Locator;
  readonly footerTabsStickerButton: Locator;
  readonly skinToneSelector: Locator;
  readonly skinToneSelectorButton: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.categoryNav = this.page.getByTestId("emoji-category-nav");
    this.combinedSelector = this.page.getByTestId("combined-selector");
    this.emojiContainer = this.page.getByTestId("emoji-container");
    this.emojiContainerSearchInput = this.page.getByTestId(
      "emoji-container-search-input",
    );
    this.emojiContainerSizeLabel = this.page.getByTestId(
      "emoji-container-size-label",
    );
    this.emojiContainerSizeRangeSelector = this.page
      .getByTestId("emoji-container-size-selection")
      .getByTestId("range-selector");
    this.emojiContainerSizeRangeSelectorInput = this.page
      .getByTestId("emoji-container-size-selection")
      .getByTestId("range-selector-input");
    this.emojiContainerSizeSection = this.page.getByTestId(
      "emoji-container-size-selection",
    );
    this.emojiSelector = this.page.getByTestId("emoji-selector");

    this.footerTabs = this.page.getByTestId(".pill-tabs");
    this.footerTabsEmojiButton = this.page
      .getByTestId(".pill-tabs")
      .getByTestId("button-Emojis");
    this.footerTabsGifButton = this.page
      .getByTestId(".pill-tabs")
      .getByTestId("button-GIFs");
    this.footerTabsStickerButton = this.page
      .getByTestId(".pill-tabs")
      .getByTestId("button-Stickers");
    this.skinToneSelector = this.page.getByTestId("skin-tone-selector");
    this.skinToneSelectorButton = this.page.getByTestId(
      "skin-tone-selector-button",
    );
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
}
