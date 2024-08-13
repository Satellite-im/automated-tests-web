import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class ChatsMainPage extends MainPage {
  readonly page: Page;
  readonly addSomeone: Locator;
  readonly buttonAddAttachment: Locator;
  readonly buttonAddFriends: Locator;
  readonly buttonChatAddAttachment: Locator;
  readonly buttonChatCall: Locator;
  readonly buttonChatFavorite: Locator;
  readonly buttonChatPin: Locator;
  readonly buttonChatTransact: Locator;
  readonly buttonChatVideo: Locator;
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
  readonly chatbarInputContainer: Locator;
  readonly chatTopbarProfilePicture: Locator;
  readonly chatTopbarProfileStatusIndicator: Locator;
  readonly chatTopbarStatus: Locator;
  readonly chatTopbarUsername: Locator;
  readonly coinAmountIndicator: Locator;
  readonly contextMenuChatMessage: Locator;
  readonly contextMenuOptionCopyMessage: Locator;
  readonly contextMenuOptionFavorite: Locator;
  readonly contextMenuOptionHide: Locator;
  readonly contextMenuOptionMarkRead: Locator;
  readonly contextMenuOptionPinMessage: Locator;
  readonly contextMenuOptionReplyMessage: Locator;
  readonly contextMenuOptionUnpinMessage: Locator;
  readonly contextMenuSidebarChat: Locator;
  readonly createGroupButton: Locator;
  readonly createGroupModal: Locator;
  readonly createGroupInputGroupName: Locator;
  readonly createGroupLabelGroupMembers: Locator;
  readonly createGroupLabelGroupName: Locator;
  readonly createGroupLabelSelectMembers: Locator;
  readonly emojiButton: Locator;
  readonly emojiGroup: Locator;
  readonly emojiPickerButton: Locator;
  readonly inputAddAttachment: Locator;
  readonly labelPinnedMessages: Locator;
  readonly messageBubbleContent: Locator;
  readonly messabeBubbleLocal: Locator;
  readonly messageBubbleRemote: Locator;
  readonly messageGroupLocal: Locator;
  readonly messageGroupLocalProfilePicture: Locator;
  readonly messageGroupLocalProfileStatusIndicator: Locator;
  readonly messageGroupRemote: Locator;
  readonly messageGroupRemoteProfilePicture: Locator;
  readonly messageGroupRemoteProfileStatusIndicator: Locator;
  readonly messageGroupTimestamp: Locator;
  readonly messageGroupUsername: Locator;
  readonly messagePinIndicator: Locator;
  readonly pendingMessageGroup: Locator;
  readonly pendingFileCancelButton: Locator;
  readonly pendingFileName: Locator;
  readonly pendingFileSize: Locator;
  readonly pendingFileUploadProgress: Locator;
  readonly pendingMessage: Locator;
  readonly pendingMessageText: Locator;
  readonly pinnedMessage: Locator;
  readonly pinnedMessageButtonGoTo: Locator;
  readonly pinnedMessageButtonUnpin: Locator;
  readonly pinnedMessageProfilePicture: Locator;
  readonly pinnedMessageProfileStatusIndicator: Locator;
  readonly pinnedMessageSender: Locator;
  readonly pinnedMessageText: Locator;
  readonly pinnedMessageTimestamp: Locator;
  readonly pinnedMessagesContainer: Locator;
  readonly pinnedMessagesEmpty: Locator;
  readonly sectionAddSomeone: Locator;
  readonly statusIndicator: Locator;
  readonly topbar: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addSomeone = page.locator(".add-someone");
    this.buttonAddAttachment = page.getByTestId("button-add-attachment");
    this.buttonAddFriends = page.getByTestId("button-add-friends");
    this.buttonChatAddAttachment = page.getByTestId(
      "button-chat-add-attachment",
    );
    this.buttonChatCall = page.getByTestId("button-chat-call");
    this.buttonChatFavorite = page.getByTestId("button-chat-favorite");
    this.buttonChatPin = page.getByTestId("button-chat-pin");
    this.buttonChatTransact = page.getByTestId("button-chat-transact");
    this.buttonChatVideo = page.getByTestId("button-chat-video");
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
    this.buttonCreateGroupChat = page.getByTestId("button-create-group-chat");
    this.buttonMarketplace = page.getByTestId("button-marketplace");
    this.chatEncryptedMessage = page.getByTestId("chat-encrypted-notice");
    this.chatEncryptedMessageText = page.getByTestId("chat-encrypted-text");
    this.chatPreview = page.getByTestId("chat-preview");
    this.chatPreviewLastMessage = page.getByTestId("chat-preview-last-message");
    this.chatPreviewName = page.getByTestId("chat-preview-name");
    this.chatPreviewPicture = page.getByTestId("chat-preview-picture");
    this.chatPreviewTimestamp = page.getByTestId("chat-preview-timestamp");
    this.chatbar = page.getByTestId("chatbar");
    this.chatbarInput = page
      .locator('[data-cy="chatbar-input"]')
      .locator("xpath=..")
      .getByRole("textbox");
    this.chatbarInputContainer = page
      .locator('[data-cy="chatbar-input"]')
      .locator("xpath=..");
    this.chatTopbarProfilePicture = page.getByTestId(
      "chat-topbar-profile-picture",
    );
    this.chatTopbarProfileStatusIndicator =
      this.chatTopbarProfilePicture.getByTestId("status-indicator");
    this.chatTopbarStatus = page.getByTestId("chat-topbar-status");
    this.chatTopbarUsername = page.getByTestId("chat-topbar-username");
    this.coinAmountIndicator = page
      .getByTestId("topbar")
      .locator("button")
      .first()
      .locator("p");
    this.contextMenuChatMessage = page.getByTestId("context-menu-chat-message");
    this.contextMenuOptionCopyMessage = page.getByTestId(
      "context-menu-option-Copy",
    );
    this.contextMenuOptionFavorite = page.getByTestId(
      "context-menu-option-Favorite",
    );
    this.contextMenuOptionHide = page.getByTestId("context-menu-option-Hide");
    this.contextMenuOptionMarkRead = page.getByTestId(
      "context-menu-option-Mark Read",
    );
    this.contextMenuOptionPinMessage = page.getByTestId(
      "context-menu-option-Pin Message",
    );
    this.contextMenuOptionReplyMessage = page.getByTestId(
      "context-menu-option-Reply",
    );
    this.contextMenuSidebarChat = page.getByTestId("context-menu-sidebar-chat");
    this.contextMenuOptionUnpinMessage = page.getByTestId(
      "context-menu-option-Unpin Message",
    );
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
    this.emojiButton = page.locator('[data-cy^="button-emoji-"]');
    this.emojiGroup = page.getByTestId("emoji-group");
    this.emojiPickerButton = page.getByTestId("button-emoji-picker");
    this.inputAddAttachment = page
      .locator('[data-cy="button-add-attachment"]')
      .locator("xpath=..")
      .locator("input");
    this.labelPinnedMessages = page.getByTestId("label-pinned-messages");
    this.messageBubbleContent = page
      .getByTestId("message-bubble-content")
      .locator("p")
      .locator("p");
    this.messabeBubbleLocal = page.getByTestId("message-bubble-local");
    this.messageBubbleRemote = page.getByTestId("message-bubble-remote");
    this.messageGroupLocal = page.getByTestId("message-group-local");
    this.messageGroupLocalProfilePicture = page.getByTestId(
      "message-group-local-profile-picture",
    );
    this.messageGroupLocalProfileStatusIndicator =
      this.messageGroupLocalProfilePicture.getByTestId("status-indicator");
    this.messageGroupRemote = page.getByTestId("message-group-remote");
    this.messageGroupRemoteProfilePicture = page.getByTestId(
      "message-group-remote-profile-picture",
    );
    this.messageGroupRemoteProfileStatusIndicator =
      this.messageGroupRemoteProfilePicture.getByTestId("status-indicator");
    this.messageGroupTimestamp = page.getByTestId("message-group-timestamp");
    this.messageGroupUsername = page.getByTestId("message-group-username");
    this.messagePinIndicator = page.getByTestId("message-pin-indicator");
    this.pendingFileCancelButton = page.getByTestId(
      "button-pending-file-cancel",
    );
    this.pendingFileName = page.getByTestId("pending-file-name");
    this.pendingFileSize = page.getByTestId("pending-file-size");
    this.pendingFileUploadProgress = page.getByTestId(
      "pending-file-upload-progress",
    );
    this.pendingMessage = page.getByTestId("pending-message");
    this.pendingMessageText = page.getByTestId("pending-message-text");
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
    this.pinnedMessageProfileStatusIndicator =
      this.pinnedMessageProfilePicture.getByTestId("status-indicator");
    this.pinnedMessageSender = page.getByTestId("pinned-message-sender");
    this.pinnedMessageText = page.getByTestId("pinned-message-text");
    this.pinnedMessageTimestamp = page.getByTestId("pinned-message-timestamp");
    this.pinnedMessagesContainer = page.getByTestId(
      "pinned-messages-container",
    );
    this.pinnedMessagesEmpty = page.getByTestId("pinned-messages-empty");
    this.sectionAddSomeone = page.getByTestId("section-add-someone");
    this.topbar = page.getByTestId("topbar");
  }

  async getLastLocalProfilePicture() {
    const lastProfilePicture = this.messageGroupLocal
      .last()
      .getByTestId("message-group-local-profile-picture")
      .locator("img");
    return lastProfilePicture;
  }

  async getLastLocalProfilePictureSource() {
    const source = await (
      await this.getLastLocalProfilePicture()
    ).getAttribute("src");
    return source;
  }

  async getLastRemoteProfilePicture() {
    const lastProfilePicture = this.messageGroupRemote
      .last()
      .getByTestId("message-group-remote-profile-picture")
      .locator("img");
    return lastProfilePicture;
  }

  async getLastRemoteProfilePictureSource() {
    const source = await (
      await this.getLastRemoteProfilePicture()
    ).getAttribute("src");
    return source;
  }

  async getLastMessageLocal() {
    const lastMessage = this.messageGroupLocal
      .last()
      .getByTestId("message-bubble-content")
      .last();
    return lastMessage;
  }

  async getLastMessageRemote() {
    const lastMessage = this.messageGroupRemote
      .last()
      .getByTestId("message-bubble-content")
      .last();
    return lastMessage;
  }

  async getLastTimestampLocal() {
    const lastTimestamp = this.messageGroupLocal
      .last()
      .getByTestId("message-group-timestamp");
    return lastTimestamp;
  }

  async getLastTimestampRemote() {
    const lastTimestamp = this.messageGroupRemote
      .last()
      .getByTestId("message-group-timestamp");
    return lastTimestamp;
  }

  async exitCreateGroup() {
    await this.topbar.click();
  }

  async sendMessage(message: string) {
    await this.chatbarInput.clear();
    await this.chatbarInput.fill(message);
    await this.buttonChatbarSendMessage.click();
  }

  async validateChatsMainPageIsShown() {
    await expect(this.addSomeone).toBeVisible();
    await expect(this.page.url()).toContain("/chat");
  }

  async validateMessageIsReceived(message: string) {
    await this.messageBubbleRemote.waitFor({ state: "visible" });
    await expect(this.messageBubbleContent).toHaveText(message);
  }

  async validateMessageIsSent(message: string) {
    await this.messabeBubbleLocal.waitFor({ state: "visible" });
    await expect(this.messageBubbleContent).toHaveText(message);
  }
}
