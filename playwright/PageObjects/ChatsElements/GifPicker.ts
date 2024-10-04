import { type Locator, type Page, expect } from "@playwright/test";
import { CombinedSelector } from "./CombinedSelector";

export class GifPicker extends CombinedSelector {
  readonly allFavoritesButton: Locator;
  readonly allGifs: Locator;
  readonly favoriteGifs: Locator;
  readonly gifContainer: Locator;
  readonly gifFavoriteButton: Locator;
  readonly gifImage: Locator;
  readonly gifsSizeLabel: Locator;
  readonly gifsSizeRangeSelector: Locator;
  readonly gifsSizeRangeSelectorInput: Locator;
  readonly searchInput: Locator;
  readonly textNoFavoritesYet: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.allFavoritesButton = this.page.getByTestId(
      "giphy-selector-favorites-button",
    );
    this.allGifs = this.page.getByTestId("giphy-selector-gifs");
    this.favoriteGifs = this.page.getByTestId("giphy-selector-favorites");
    this.gifContainer = this.page.getByTestId("gif-container");
    this.gifFavoriteButton = this.gifContainer.getByTestId(
      "gif-container-favorite-button",
    );
    this.gifImage = this.gifContainer.locator("img");
    this.gifsSizeLabel = this.page.getByTestId("giphy-selector-label-size");
    this.gifsSizeRangeSelector = this.page.getByTestId("range-selector");
    this.gifsSizeRangeSelectorInput = this.page.getByTestId(
      "range-selector-input",
    );
    this.searchInput = this.page.getByTestId("giphy-selector-search-bar");
    this.textNoFavoritesYet = this.page.getByTestId("text-no-favorites-yet");
  }

  async changeGifSizeView(size: string) {
    await this.gifsSizeRangeSelectorInput.fill(size);
  }

  async getGifAltText(index: number) {
    const textOfGif = await this.gifContainer
      .nth(index)
      .locator("img")
      .getAttribute("alt");
    return textOfGif;
  }

  async searchGif(gifText: string) {
    await this.searchInput.focus();
    await this.page.keyboard.type(gifText);
    await this.page.waitForTimeout(1000);
  }

  async selectGif(gifText: string) {
    await this.page
      .getByTestId("gif-container")
      .filter({
        has: this.page.getByAltText(gifText),
      })
      .first()
      .click();
    await this.page.waitForTimeout(2000);
  }

  async validateSingleGifSize(gifText: string, expectedSize: string) {
    const gifLocator = this.page.getByTestId("gif-container").filter({
      has: this.page.getByAltText(gifText),
    });
    await expect(gifLocator).toHaveCSS("font-size", expectedSize);
  }

  async waitForGifsToLoad() {
    await this.page.waitForTimeout(2000);
  }
}
