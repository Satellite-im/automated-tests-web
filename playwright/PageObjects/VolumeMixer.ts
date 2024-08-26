import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class VolumeMixer extends MainPage {
  readonly masterVolumeLabel: Locator;
  readonly masterVolumeRangeSelector: Locator;
  readonly masterVolumeRangeSelectorInput: Locator;
  readonly masterVolumeText: Locator;
  readonly userVolumeLabel: Locator;
  readonly userVolumeProfilePicture: Locator;
  readonly userVolumeProfilePictureImage: Locator;
  readonly userVolumeRangeSelector: Locator;
  readonly userVolumeRangeSelectorInput: Locator;
  readonly userVolumeProfileStatusIndicator: Locator;
  readonly userVolumeText: Locator;
  readonly volumeMixer: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.masterVolumeLabel = this.page.getByTestId("label-master-volume");
    this.masterVolumeRangeSelector = this.page
      .getByTestId("range-selector")
      .first();
    this.masterVolumeRangeSelectorInput =
      this.masterVolumeRangeSelector.getByTestId("range-selector-input");
    this.masterVolumeText = this.page.getByTestId("text-master-volume");
    this.userVolumeLabel = this.page.getByTestId("label-user-volume");
    this.userVolumeProfilePicture = this.page.getByTestId("mixer-user-picture");
    this.userVolumeProfilePictureImage =
      this.userVolumeProfilePicture.getByTestId("profile-image");
    this.userVolumeProfileStatusIndicator =
      this.userVolumeProfilePicture.getByTestId("status-indicator");
    this.userVolumeRangeSelector = this.page
      .getByTestId("range-selector")
      .nth(1);
    this.userVolumeRangeSelectorInput =
      this.userVolumeRangeSelector.getByTestId("range-selector-input");
    this.userVolumeText = this.page.getByTestId("text-user-volume");
    this.volumeMixer = this.page.getByTestId("volume-mixer");
  }
}
