import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class IncomingCall extends MainPage {
  readonly incomingCallModal: Locator;
  readonly incomingProfilePicture: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.incomingCallModal = this.page.getByTestId("incoming-call");
    this.incomingProfilePicture = this.incomingCallModal.getByTestId(
      "friend-profile-picture",
    );
  }
}
