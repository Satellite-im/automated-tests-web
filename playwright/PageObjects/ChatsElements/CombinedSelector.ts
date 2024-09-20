import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class CombinedSelector extends MainPage {
  readonly combinedSelector: Locator;
  readonly emojiContainer: Locator;
  readonly footerTabs: Locator;
  readonly footerTabsEmojiButton: Locator;
  readonly footerTabsGifButton: Locator;
  readonly footerTabsStickerButton: Locator;
  readonly giphySelector: Locator;
  readonly stickerSelector: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.combinedSelector = this.page.getByTestId("combined-selector");
    this.emojiContainer = this.page.getByTestId("emoji-container");
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
  }

  async goToEmojisTab() {
    await this.footerTabsEmojiButton.click();
    await this.emojiContainer.waitFor({ state: "visible" });
  }

  async goToGifsTab() {
    await this.footerTabsGifButton.click();
    await this.giphySelector.waitFor({ state: "visible" });
  }

  async goToStickersTab() {
    await this.footerTabsStickerButton.click();
    await this.stickerSelector.waitFor({ state: "visible" });
  }
}
