import MainPage from "../MainPage";
import { type Locator, type Page, expect } from "@playwright/test";

export class IncomingCall extends MainPage {
  readonly buttonAcceptVideoIncomingCall: Locator;
  readonly buttonAcceptVoiceIncomingCall: Locator;
  readonly buttonDeclineIncomingCall: Locator;
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
    this.buttonAcceptVideoIncomingCall = this.incomingCallModal.getByRole(
      "button",
      {
        name: "Video",
      },
    );
    this.buttonAcceptVoiceIncomingCall = this.incomingCallModal.getByRole(
      "button",
      {
        name: "Voice",
      },
    );
    this.buttonDeclineIncomingCall = this.incomingCallModal.getByRole(
      "button",
      {
        name: "Decline",
        exact: true,
      },
    );
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

  async acceptAudioIncomingCall() {
    await this.buttonAcceptVoiceIncomingCall.click();
  }

  async acceptVideoIncomingCall() {
    await this.buttonAcceptVideoIncomingCall.click();
  }

  async denyIncomingCall() {
    await this.buttonDeclineIncomingCall.click();
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
    await expect(this.buttonAcceptVideoIncomingCall).toBeVisible();
    await expect(this.buttonAcceptVoiceIncomingCall).toBeVisible();
    await expect(this.buttonDeclineIncomingCall).toBeVisible();
  }
}
