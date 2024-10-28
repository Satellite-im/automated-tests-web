import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class ReplyModal extends MainPage {
  readonly chatbarReplyModal: Locator;
  readonly attachmentContainer: Locator;
  readonly buttonCancelReply: Locator;
  readonly labelReplyTo: Locator;
  readonly repliedMessage: Locator;
  readonly repliedMessageBubbleRemote: Locator;
  readonly repliedMessageBubbleYourself: Locator;
  readonly repliedMessageContentRemote: Locator;
  readonly repliedMessageContentYourself: Locator;
  readonly repliedUserRemoteProfilePicture: Locator;
  readonly repliedUserRemoteProfilePictureIdenticon: Locator;
  readonly repliedUserRemoteProfilePictureImage: Locator;
  readonly repliedUserRemoteProfilePictureStatusIndicator: Locator;
  readonly repliedUserYourselfProfilePicture: Locator;
  readonly repliedUserYourselfProfilePictureIdenticon: Locator;
  readonly repliedUserYourselfProfilePictureImage: Locator;
  readonly repliedUserYourselfProfilePictureStatusIndicator: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.chatbarReplyModal = this.page.getByTestId("chatbar-reply");
    this.attachmentContainer = this.chatbarReplyModal.getByTestId(
      "reply-attachment-container",
    );
    this.buttonCancelReply = this.chatbarReplyModal.getByTestId(
      "button-cancel-reply",
    );
    this.labelReplyTo = this.chatbarReplyModal.getByTestId("label-reply-to");
    this.repliedMessage = this.chatbarReplyModal.locator(".reply-message");
    this.repliedMessageBubbleRemote = this.repliedMessage.getByTestId(
      "message-bubble-remote",
    );
    this.repliedMessageBubbleYourself = this.repliedMessage.getByTestId(
      "message-bubble-local",
    );
    this.repliedMessageContentRemote =
      this.repliedMessageBubbleRemote.getByTestId("text-chat-message");
    this.repliedMessageContentYourself =
      this.repliedMessageBubbleYourself.getByTestId("text-chat-message");
    this.repliedUserRemoteProfilePicture = this.chatbarReplyModal.getByTestId(
      "message-group-remote-profile-picture",
    );
    this.repliedUserRemoteProfilePictureIdenticon =
      this.repliedUserRemoteProfilePicture.locator(".identicon").locator("img");
    this.repliedUserRemoteProfilePictureImage =
      this.repliedUserRemoteProfilePicture.locator("img");
    this.repliedUserRemoteProfilePictureStatusIndicator =
      this.repliedUserRemoteProfilePicture.getByTestId("status-indicator");
    this.repliedUserYourselfProfilePicture = this.chatbarReplyModal.getByTestId(
      "message-group-local-profile-picture",
    );
    this.repliedUserYourselfProfilePictureIdenticon =
      this.repliedUserYourselfProfilePicture
        .locator(".identicon")
        .locator("img");
    this.repliedUserYourselfProfilePictureImage =
      this.repliedUserYourselfProfilePicture.locator("img");
    this.repliedUserYourselfProfilePictureStatusIndicator =
      this.repliedUserYourselfProfilePicture.getByTestId("status-indicator");
  }

  async cancelReply() {
    await this.buttonCancelReply.click();
    await this.buttonCancelReply.waitFor({ state: "detached" });
  }
}
