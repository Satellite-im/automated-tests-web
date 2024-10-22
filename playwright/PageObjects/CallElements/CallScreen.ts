import MainPage from "../MainPage";
import { type Locator, type Page, expect } from "@playwright/test";

export class CallScreen extends MainPage {
  readonly callCollapseExpandButton: Locator;
  readonly callDeafenButton: Locator;
  readonly callEndButton: Locator;
  readonly callFullscreenButton: Locator;
  readonly callMuteButton: Locator;
  readonly callParticipant: Locator;
  readonly callParticipantConnecting: Locator;
  readonly callParticipantLoading: Locator;
  readonly callParticipantShaking: Locator;
  readonly callScreen: Locator;
  readonly callScreenTopbar: Locator;
  readonly callSettingsButton: Locator;
  readonly callStreamButton: Locator;
  readonly callVideoButton: Locator;
  readonly callVolumeMixerButton: Locator;
  readonly localUserVideo: Locator;
  readonly participantDeafenButton: Locator;
  readonly participantMuteButton: Locator;
  readonly participantProfilePicture: Locator;
  readonly participantProfilePictureIdenticon: Locator;
  readonly participantProfilePictureImage: Locator;
  readonly participantUser: Locator;
  readonly participantVideo: Locator;
  readonly participantWithoutVideo: Locator;
  readonly participants: Locator;
  readonly remoteUserVideo: Locator;
  readonly usersInCallText: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.callScreen = this.page.getByTestId("call-screen");
    this.callCollapseExpandButton = this.callScreen.getByTestId(
      "button-call-collapse-expand",
    );
    this.callDeafenButton = this.callScreen.getByTestId("button-call-deafen");
    this.callEndButton = this.callScreen.getByTestId("button-call-end");
    this.callFullscreenButton = this.callScreen.getByTestId(
      "button-call-fullscreen",
    );
    this.callMuteButton = this.callScreen.getByTestId("button-call-mute");
    this.callParticipant = this.callScreen.getByTestId("call-participant");
    this.callParticipantConnecting = this.page.getByText("Connecting...");
    this.callParticipantLoading = this.page.getByText("Joined, loading...");
    this.callParticipantShaking = this.page.locator(".shaking-participant");
    this.callScreenTopbar = this.callScreen.getByTestId("topbar");
    this.callSettingsButton = this.callScreen.getByTestId(
      "button-call-settings",
    );
    this.callStreamButton = this.callScreen.getByTestId("button-call-stream");
    this.callVideoButton = this.callScreen.getByTestId("button-call-video");
    this.callVolumeMixerButton = this.callScreen.getByTestId(
      "button-call-volume-mixer",
    );
    this.localUserVideo = this.callScreen.getByTestId("local-user-video");
    this.participantDeafenButton = this.callScreen.getByTestId(
      "button-participant-deafen",
    );
    this.participantMuteButton = this.callScreen.getByTestId(
      "button-participant-mute",
    );
    this.participantProfilePicture = this.page.getByTestId(
      "participant-profile-picture",
    );
    this.participantProfilePictureIdenticon =
      this.participantProfilePicture.locator(".identicon");
    this.participantProfilePictureImage =
      this.participantProfilePicture.locator("img");
    this.participantUser = this.page.getByTestId("participant-user");
    this.participantVideo = this.page.getByTestId("participant-video");
    this.participantWithoutVideo = this.page.getByTestId(
      "participant-without-video",
    );
    this.participants = this.callScreen.locator("#participants");
    this.remoteUserVideo = this.callScreen.getByTestId("remote-user-video");
    this.usersInCallText = this.callScreen.getByTestId("text-users-in-call");
  }

  async clickOnStreamButton() {
    await this.callStreamButton.click();
    await expect(this.callStreamButton).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
    await expect(this.callStreamButton).toHaveAttribute(
      "data-tooltip",
      "Stream",
    );
  }

  async collapseCall() {
    await expect(this.callCollapseExpandButton).toHaveAttribute(
      "data-tooltip",
      "Less Space",
    );
    await this.callCollapseExpandButton.click();
    await expect(this.callScreen).not.toHaveClass(/.*\bexpanded\b.*/);
    await expect(this.callCollapseExpandButton).toHaveAttribute(
      "data-tooltip",
      "More Space",
    );
  }

  async deafenCall() {
    await this.callDeafenButton.click();
    await expect(this.callDeafenButton).toHaveCSS(
      "background-color",
      "color(srgb 0.978824 0.297647 0.396471)",
    );
    await expect(this.callDeafenButton).toHaveAttribute(
      "data-tooltip",
      "Deafen",
    );
  }

  async disableVideo() {
    await expect(this.callVideoButton).toHaveAttribute(
      "data-tooltip",
      "Disable Video",
    );
    await this.callVideoButton.click();
    await expect(this.callVideoButton).toHaveCSS(
      "background-color",
      /rgb\(249, 56, 84\)|color\(srgb 0.978824 0.297647 0.396471\)/,
    );

    await expect(this.callVideoButton).toHaveAttribute(
      "data-tooltip",
      "Enable Video",
    );
  }

  async enableVideo() {
    await expect(this.callVideoButton).toHaveAttribute(
      "data-tooltip",
      "Enable Video",
    );
    await this.callVideoButton.click();
    await expect(this.callVideoButton).toHaveCSS(
      "background-color",
      "rgb(35, 41, 62)",
    );
    await expect(this.callVideoButton).toHaveAttribute(
      "data-tooltip",
      "Disable Video",
    );
  }

  async endCall() {
    await expect(this.callEndButton).toHaveAttribute("data-tooltip", "End");
    await expect(this.callEndButton).toHaveCSS(
      "background-color",
      "rgb(249, 56, 84)",
    );
    await this.callEndButton.click();
    await this.callScreen.waitFor({ state: "detached" });
  }

  async expandCall() {
    await expect(this.callCollapseExpandButton).toHaveAttribute(
      "data-tooltip",
      "More Space",
    );
    await this.callCollapseExpandButton.click();
    await expect(this.callScreen).toHaveClass(/.*\bexpanded\b.*/);
    await expect(this.callCollapseExpandButton).toHaveAttribute(
      "data-tooltip",
      "Less Space",
    );
  }

  async enterFullScreenMode() {
    await expect(this.callFullscreenButton).toHaveAttribute(
      "data-tooltip",
      "Fullscreen",
    );
    await this.callFullscreenButton.click();
    const isFullscreen = await this.page.evaluate(() => {
      return document.fullscreenElement !== null;
    });
    expect(isFullscreen).toBeTruthy();
  }
  async exitFullScreenMode() {
    await expect(this.callFullscreenButton).toHaveAttribute(
      "data-tooltip",
      "Fullscreen",
    );
    await this.callFullscreenButton.click();
    const isFullscreen = await this.page.evaluate(() => {
      return document.fullscreenElement !== null;
    });
    expect(isFullscreen).toBeFalsy();
  }

  async muteCall() {
    await expect(this.callMuteButton).toHaveAttribute("data-tooltip", "Mute");
    await this.callMuteButton.click();
    await expect(this.callMuteButton).toHaveCSS(
      "background-color",
      "color(srgb 0.978824 0.297647 0.396471)",
    );
    await expect(this.callMuteButton).toHaveAttribute("data-tooltip", "Unmute");
  }

  async openCallSettings() {
    await this.callSettingsButton.click();
  }

  async openCallVolumeMixer() {
    await this.callVolumeMixerButton.click();
  }

  async undeafenCall() {
    await this.callDeafenButton.click();
    await expect(this.callDeafenButton).toHaveCSS(
      "background-color",
      "rgb(35, 41, 62)",
    );
    await expect(this.callDeafenButton).toHaveAttribute(
      "data-tooltip",
      "Deafen",
    );
  }

  async unmuteCall() {
    await expect(this.callMuteButton).toHaveAttribute("data-tooltip", "Unmute");
    await this.callMuteButton.click();
    await expect(this.callMuteButton).toHaveCSS(
      "background-color",
      "rgb(35, 41, 62)",
    );
    await expect(this.callMuteButton).toHaveAttribute("data-tooltip", "Mute");
  }

  async validateCallScreenContents(
    localUserImgSrc: string,
    remoteUserImgSrc: string,
  ) {
    // Validate local user contents
    await expect(this.participantProfilePictureImage.first()).toHaveAttribute(
      "src",
      localUserImgSrc,
    );

    // Validate remote user profile picture
    await expect(this.participantProfilePictureImage.last()).toHaveAttribute(
      "src",
      remoteUserImgSrc,
    );

    // Validate number of users in call displayed in label
    await expect(this.usersInCallText).toHaveText("(2) users in the call");
  }

  async validateUserIsConnecting() {
    await expect(this.callParticipantConnecting).toBeVisible();
  }

  async validateAllUsersAreConnected() {
    await this.callParticipantConnecting.waitFor({ state: "detached" });
    await this.callParticipantShaking.waitFor({ state: "detached" });
    await this.callParticipantLoading.waitFor({ state: "detached" });
  }
}
