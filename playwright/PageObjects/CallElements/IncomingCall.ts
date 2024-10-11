import MainPage from "../MainPage";
import { type Locator, type Page, expect } from "@playwright/test";

export class IncomingCall extends MainPage {
  readonly buttonAcceptIncomingCall: Locator;
  readonly buttonDenyIncomingCall: Locator;
  readonly incomingCallModal: Locator;
  readonly incomingCallProfilePicture: Locator;
  readonly incomingCallProfilePictureIdenticon: Locator;
  readonly incomingCallProfilePictureImage: Locator;
  readonly incomingCallStatus: Locator;
  readonly incomingCallStatusIndicator: Locator;
  readonly incomingCallUsername: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.incomingCallModal = this.page.locator("#incoming-call");
    this.buttonAcceptIncomingCall = this.incomingCallModal.getByRole("button", {
      name: "Answer",
    });

    this.buttonDenyIncomingCall = this.incomingCallModal.getByRole("button", {
      name: "End",
      exact: true,
    });
    this.incomingCallProfilePicture = this.incomingCallModal.getByTestId(
      "friend-profile-picture",
    );
    this.incomingCallProfilePictureIdenticon =
      this.incomingCallProfilePicture.locator(".identicon img");
    this.incomingCallProfilePictureImage =
      this.incomingCallProfilePicture.locator("img");
    this.incomingCallStatus = this.incomingCallModal.getByText(
      "status from second user",
    ); // Temporarily hardcoded
    this.incomingCallStatusIndicator =
      this.incomingCallModal.getByTestId("status-indicator");
    this.incomingCallUsername = this.incomingCallModal.getByText("ChatUserB"); // Temporarily hardcoded
  }

  async acceptIncomingCall() {
    await this.buttonAcceptIncomingCall.click();
  }

  async denyIncomingCall() {
    await this.buttonDenyIncomingCall.click();
  }

  async validateIncomingCallModal(
    username: string,
    status: string,
    imageSrc: string,
  ) {
    await expect(this.incomingCallUsername).toHaveText(username);
    await expect(this.incomingCallStatus).toHaveText(status);
    await expect(this.incomingCallStatusIndicator).toHaveClass(
      /.*\bonline\b.*/,
    );
    await expect(this.incomingCallProfilePictureImage).toHaveAttribute(
      "src",
      imageSrc,
    );
  }
}
