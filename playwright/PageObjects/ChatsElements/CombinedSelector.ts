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
    this.footerTabsEmojiButton = this.page.getByTestId("button-Emojis");
    this.footerTabsGifButton = this.page.getByTestId("button-GIFs");
    this.footerTabsStickerButton = this.page.getByTestId("button-Stickers");
    this.giphySelector = this.page.getByTestId("giphy-selector");
    this.stickerSelector = this.page.getByTestId("sticker-selector");
  }

  async goToEmojisTab() {
    await this.footerTabsEmojiButton.click();
    await this.emojiContainer.waitFor({ state: "attached" });
  }

  async goToGifsTab() {
    await this.footerTabsGifButton.click();
    await this.giphySelector.waitFor({ state: "attached" });
  }

  async goToStickersTab() {
    await this.footerTabsStickerButton.click();
    await this.stickerSelector.waitFor({ state: "attached" });
  }
}
