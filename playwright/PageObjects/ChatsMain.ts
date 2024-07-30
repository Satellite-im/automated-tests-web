import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class ChatsMainPage extends MainPage {
  readonly page: Page;
  readonly addSomeone: Locator;
  readonly buttonAddAttachment: Locator;
  readonly buttonAddFriends: Locator;
  readonly buttonChatbarEmojiPicker: Locator;
  readonly buttonChatbarGifPicker: Locator;
  readonly buttonChatbarSendMessage: Locator;
  readonly buttonChatbarStickerPicker: Locator;
  readonly buttonCreateGroupChat: Locator;
  readonly buttonMarketplace: Locator;
  readonly chatEncryptedMessage: Locator;
  readonly chatEncryptedMessageText: Locator;
  readonly chatPreview: Locator;
  readonly chatPreviewLastMessage: Locator;
  readonly chatPreviewName: Locator;
  readonly chatPreviewPicture: Locator;
  readonly chatPreviewTimestamp: Locator;
  readonly chatbar: Locator;
  readonly chatbarInput: Locator;
  readonly createGroupButton: Locator;
  readonly createGroupModal: Locator;
  readonly createGroupInputGroupName: Locator;
  readonly createGroupLabelGroupMembers: Locator;
  readonly createGroupLabelGroupName: Locator;
  readonly createGroupLabelSelectMembers: Locator;
  readonly inputAddAttachment: Locator;
  readonly labelPinnedMessages: Locator;
  readonly messageGroupLocal: Locator;
  readonly messageGroupLocalProfilePicture: Locator;
  readonly messageGroupRemote: Locator;
  readonly messageGroupRemoteProfilePicture: Locator;
  readonly messageGroupTimestamp: Locator;
  readonly messageGroupUsername: Locator;
  readonly pendingMessageGroup: Locator;
  readonly pinnedMessage: Locator;
  readonly pinnedMessageButtonGoTo: Locator;
  readonly pinnedMessageButtonUnpin: Locator;
  readonly pinnedMessageProfilePicture: Locator;
  readonly pinnedMessageSender: Locator;
  readonly pinnedMessageTimestamp: Locator;
  readonly pinnedMessagesContainer: Locator;
  readonly pinnedMessagesEmpty: Locator;
  readonly sectionAddSomeone: Locator;
  readonly topbar: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addSomeone = page.locator(".add-someone");
    this.buttonAddAttachment = page.getByTestId("button-add-attachment");
    this.buttonAddFriends = page.getByTestId("button-add-friends");
    this.buttonCreateGroupChat = page.getByTestId("button-create-group-chat");
    this.buttonChatbarEmojiPicker = page.getByTestId(
      "button-chatbar-emoji-picker",
    );
    this.buttonChatbarGifPicker = page.getByTestId("button-chatbar-gif-picker");
    this.buttonChatbarSendMessage = page.getByTestId(
      "button-chatbar-send-message",
    );
    this.buttonChatbarStickerPicker = page.getByTestId(
      "button-chatbar-sticker-picker",
    );

    this.buttonMarketplace = page.getByTestId("button-marketplace");
    this.chatEncryptedMessage = page.getByTestId("chat-encrypted-message");
    this.chatEncryptedMessageText = page.getByTestId("chat-encrypted-text");
    this.chatPreview = page.getByTestId("chat-preview");
    this.chatPreviewLastMessage = page.getByTestId("chat-preview-last-message");
    this.chatPreviewName = page.getByTestId("chat-preview-name");
    this.chatPreviewPicture = page.getByTestId("chat-preview-picture");
    this.chatPreviewTimestamp = page.getByTestId("chat-preview-timestamp");
    this.chatbar = page.getByTestId("chatbar");
    this.chatbarInput = page.getByTestId("chatbar-input");
    this.createGroupButton = page.getByTestId("button-create-group");
    this.createGroupModal = page.getByTestId("modal-create-group-chat");
    this.createGroupInputGroupName = page.getByTestId(
      "input-create-group-name",
    );
    this.createGroupLabelGroupMembers = page.getByTestId(
      "label-create-group-members",
    );
    this.createGroupLabelGroupName = page.getByTestId(
      "label-create-group-name",
    );
    this.createGroupLabelSelectMembers = page.getByTestId(
      "label-create-group-select-members",
    );
    this.inputAddAttachment = page
      .locator('[data-cy="button-add-attachment"]')
      .locator("xpath=..")
      .locator("input");
    this.labelPinnedMessages = page.getByTestId("label-pinned-messages");
    this.messageGroupLocal = page.getByTestId("message-group-local");
    this.messageGroupLocalProfilePicture = page.getByTestId(
      "message-group-local-profile-picture",
    );
    this.messageGroupRemote = page.getByTestId("message-group-remote");
    this.messageGroupRemoteProfilePicture = page.getByTestId(
      "message-group-remote-profile-picture",
    );
    this.messageGroupTimestamp = page.getByTestId("message-group-timestamp");
    this.messageGroupUsername = page.getByTestId("message-group-username");
    this.pendingMessageGroup = page.getByTestId("pending-message-group");
    this.pinnedMessage = page.getByTestId("pinned-message");
    this.pinnedMessageButtonGoTo = page.getByTestId(
      "pinned-message-button-go-to",
    );
    this.pinnedMessageButtonUnpin = page.getByTestId(
      "pinned-message-button-unpin",
    );
    this.pinnedMessageProfilePicture = page.getByTestId(
      "pinned-message-profile-picture",
    );
    this.pinnedMessageSender = page.getByTestId("pinned-message-sender");
    this.pinnedMessageTimestamp = page.getByTestId("pinned-message-timestamp");
    this.pinnedMessagesContainer = page.getByTestId(
      "pinned-messages-container",
    );
    this.pinnedMessagesEmpty = page.getByTestId("pinned-messages-empty");
    this.sectionAddSomeone = page.getByTestId("section-add-someone");
    this.topbar = page.getByTestId("topbar");
  }

  async exitCreateGroup() {
    await this.topbar.click();
  }

  async sendMessage(message: string) {
    await this.chatbarInput.click();
    await this.chatbarInput.clear();
    await this.chatbarInput.fill(message);
    await this.buttonChatbarSendMessage.click();
  }

  async validateChatsMainPageIsShown() {
    await expect(this.addSomeone).toBeVisible();
    await expect(this.page.url()).toContain("/chat");
  }
}
