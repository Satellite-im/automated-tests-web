import MainPage from "./MainPage";
import { type Locator, type Page } from "@playwright/test";

export class QuickProfile extends MainPage {
  readonly quickProfile: Locator;
  readonly quickProfileBanner: Locator;
  readonly quickProfileNoteLabel: Locator;
  readonly quickProfileNoteInput: Locator;
  readonly quickProfilePicture: Locator;
  readonly quickProfilePictureImage: Locator;
  readonly quickProfileStatusLabel: Locator;
  readonly quickProfileStatusText: Locator;
  readonly quickProfileUserButton: Locator;
  readonly quickProfileUsernameLabel: Locator;
  readonly quickProfileUsernameText: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.quickProfile = this.page.getByTestId("quick-profile");
    this.quickProfileBanner = this.quickProfile.getByTestId(
      "quick-profile-banner",
    );
    this.quickProfileNoteLabel = this.quickProfile.getByTestId(
      "label-quick-profile-note",
    );
    this.quickProfileNoteInput = this.quickProfile.getByTestId(
      "input-quick-profile-note",
    );
    this.quickProfilePicture = this.quickProfile.getByTestId(
      "quick-profile-picture",
    );
    this.quickProfilePictureImage = this.quickProfilePicture.locator("img");
    this.quickProfileStatusLabel = this.quickProfile.getByTestId(
      "label-quick-profile-status",
    );
    this.quickProfileStatusText = this.quickProfile.getByTestId(
      "text-quick-profile-status",
    );
    this.quickProfileUserButton = this.quickProfile.getByTestId(
      "button-quick-profile-user",
    );
    this.quickProfileUsernameLabel = this.quickProfile.getByTestId(
      "label-quick-profile-username",
    );
    this.quickProfileUsernameText = this.quickProfile.getByTestId(
      "text-quick-profile-username",
    );
  }
}
