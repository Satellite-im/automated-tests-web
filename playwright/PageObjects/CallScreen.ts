import MainPage from "./MainPage";
import { type Locator, type Page } from "@playwright/test";

export class CallScreen extends MainPage {
  readonly callCollapseExpandButton: Locator;
  readonly callDeafenButton: Locator;
  readonly callEndButton: Locator;
  readonly callFullscreenButton: Locator;
  readonly callMuteButton: Locator;
  readonly callParticipant: Locator;
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

  constructor(public readonly page: Page) {
    super(page);
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
    this.callScreen = this.page.getByTestId("call-screen");
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
}
