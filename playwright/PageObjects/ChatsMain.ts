import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class ChatsMainPage extends MainPage {
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
  readonly chatbar: Locator;
  readonly chatbarInput: Locator;
  readonly chatbarInputContainer: Locator;
  readonly chatTopbarProfilePicture: Locator;
  readonly chatTopbarProfilePictureImage: Locator;
  readonly chatTopbarProfileStatusIndicator: Locator;
  readonly chatTopbarStatus: Locator;
  readonly chatTopbarUsername: Locator;
  readonly coinAmountIndicator: Locator;
  readonly contextMenuChatMessage: Locator;
  readonly contextMenuOptionCopyMessage: Locator;
  readonly contextMenuOptionDeleteMessage: Locator;
  readonly contextMenuOptionEditMessage: Locator;
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
  readonly editMessageInput: Locator;
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

  constructor(public readonly page: Page) {
    super(page);
    this.addSomeone = this.page.locator(".add-someone");
    this.buttonAddAttachment = this.page.getByTestId("button-add-attachment");
    this.buttonAddFriends = this.page.getByTestId("button-add-friends");
    this.buttonChatAddAttachment = this.page.getByTestId(
      "button-chat-add-attachment",
    );
    this.buttonChatCall = this.page.getByTestId("button-chat-call");
    this.buttonChatFavorite = this.page.getByTestId("button-chat-favorite");
    this.buttonChatPin = this.page.getByTestId("button-chat-pin");
    this.buttonChatTransact = this.page.getByTestId("button-chat-transact");
    this.buttonChatVideo = this.page.getByTestId("button-chat-video");
    this.buttonChatbarEmojiPicker = this.page.getByTestId(
      "button-chatbar-emoji-picker",
    );
    this.buttonChatbarGifPicker = this.page.getByTestId(
      "button-chatbar-gif-picker",
    );
    this.buttonChatbarSendMessage = this.page.getByTestId(
      "button-chatbar-send-message",
    );
    this.buttonChatbarStickerPicker = this.page.getByTestId(
      "button-chatbar-sticker-picker",
    );
    this.buttonCreateGroupChat = this.page.getByTestId(
      "button-create-group-chat",
    );
    this.buttonMarketplace = this.page.getByTestId("button-marketplace");
    this.chatEncryptedMessage = this.page.getByTestId("chat-encrypted-notice");
    this.chatEncryptedMessageText = this.page.getByTestId(
      "chat-encrypted-text",
    );
    this.chatbar = this.page.getByTestId("chatbar");
    this.chatbarInput = this.page
      .locator(".cm-editor")
      .locator(".cm-scroller")
      .getByRole("textbox");
    this.chatbarInputContainer = this.page
      .locator('[data-cy="chatbar-input"]')
      .locator("xpath=..");
    this.chatTopbarProfilePicture = this.page.getByTestId(
      "chat-topbar-profile-picture",
    );
    this.chatTopbarProfilePictureImage =
      this.chatTopbarProfilePicture.locator("img");
    this.chatTopbarProfileStatusIndicator =
      this.chatTopbarProfilePicture.getByTestId("status-indicator");
    this.chatTopbarStatus = this.page.getByTestId("chat-topbar-status");
    this.chatTopbarUsername = this.page.getByTestId("chat-topbar-username");
    this.coinAmountIndicator = this.page
      .getByTestId("topbar")
      .locator("button")
      .first()
      .locator("p");
    this.contextMenuChatMessage = this.page.getByTestId(
      "context-menu-chat-message",
    );
    this.contextMenuOptionDeleteMessage = this.page.getByTestId(
      "context-menu-option-Delete",
    );
    this.contextMenuOptionEditMessage = this.page.getByTestId(
      "context-menu-option-Edit",
    );
    this.contextMenuOptionCopyMessage = this.page.getByTestId(
      "context-menu-option-Copy",
    );
    this.contextMenuOptionFavorite = this.page.getByTestId(
      "context-menu-option-Favorite",
    );
    this.contextMenuOptionHide = this.page.getByTestId(
      "context-menu-option-Hide",
    );
    this.contextMenuOptionMarkRead = this.page.getByTestId(
      "context-menu-option-Mark Read",
    );
    this.contextMenuOptionPinMessage = this.page.getByTestId(
      "context-menu-option-Pin Message",
    );
    this.contextMenuOptionReplyMessage = this.page.getByTestId(
      "context-menu-option-Reply",
    );
    this.contextMenuSidebarChat = this.page.getByTestId(
      "context-menu-sidebar-chat",
    );
    this.contextMenuOptionUnpinMessage = this.page.getByTestId(
      "context-menu-option-Unpin Message",
    );
    this.createGroupButton = this.page.getByTestId("button-create-group");
    this.createGroupModal = this.page.getByTestId("modal-create-group-chat");
    this.createGroupInputGroupName = this.page.getByTestId(
      "input-create-group-name",
    );
    this.createGroupLabelGroupMembers = this.page.getByTestId(
      "label-create-group-members",
    );
    this.createGroupLabelGroupName = this.page.getByTestId(
      "label-create-group-name",
    );
    this.createGroupLabelSelectMembers = this.page.getByTestId(
      "label-create-group-select-members",
    );
    this.editMessageInput = this.page
      .getByTestId("message-bubble-content")
      .locator(".cm-editor")
      .locator(".cm-scroller")
      .getByRole("textbox");
    this.emojiButton = this.page.locator('[data-cy^="button-emoji-"]');
    this.emojiGroup = this.page.getByTestId("emoji-group");
    this.emojiPickerButton = this.page.getByTestId("button-emoji-picker");
    this.inputAddAttachment = this.page
      .locator('[data-cy="button-add-attachment"]')
      .locator("xpath=..")
      .locator("input");
    this.labelPinnedMessages = this.page.getByTestId("label-pinned-messages");
    this.messageBubbleContent = this.page
      .getByTestId("message-bubble-content")
      .locator("p")
      .locator("p");
    this.messabeBubbleLocal = this.page.getByTestId("message-bubble-local");
    this.messageBubbleRemote = this.page.getByTestId("message-bubble-remote");
    this.messageGroupLocal = this.page.getByTestId("message-group-local");
    this.messageGroupLocalProfilePicture = this.page.getByTestId(
      "message-group-local-profile-picture",
    );
    this.messageGroupLocalProfileStatusIndicator =
      this.messageGroupLocalProfilePicture.getByTestId("status-indicator");
    this.messageGroupRemote = this.page.getByTestId("message-group-remote");
    this.messageGroupRemoteProfilePicture = this.page.getByTestId(
      "message-group-remote-profile-picture",
    );
    this.messageGroupRemoteProfileStatusIndicator =
      this.messageGroupRemoteProfilePicture.getByTestId("status-indicator");
    this.messageGroupTimestamp = this.page.getByTestId(
      "message-group-timestamp",
    );
    this.messageGroupUsername = this.page.getByTestId("message-group-username");
    this.messagePinIndicator = this.page.getByTestId("message-pin-indicator");
    this.pendingFileCancelButton = this.page.getByTestId(
      "button-pending-file-cancel",
    );
    this.pendingFileName = this.page.getByTestId("pending-file-name");
    this.pendingFileSize = this.page.getByTestId("pending-file-size");
    this.pendingFileUploadProgress = this.page.getByTestId(
      "pending-file-upload-progress",
    );
    this.pendingMessage = this.page.getByTestId("pending-message");
    this.pendingMessageText = this.page.getByTestId("pending-message-text");
    this.pendingMessageGroup = this.page.getByTestId("pending-message-group");
    this.pinnedMessage = this.page.getByTestId("pinned-message");
    this.pinnedMessageButtonGoTo = this.page.getByTestId(
      "pinned-message-button-go-to",
    );
    this.pinnedMessageButtonUnpin = this.page.getByTestId(
      "pinned-message-button-unpin",
    );
    this.pinnedMessageProfilePicture = this.page.getByTestId(
      "pinned-message-profile-picture",
    );
    this.pinnedMessageProfileStatusIndicator =
      this.pinnedMessageProfilePicture.getByTestId("status-indicator");
    this.pinnedMessageSender = this.page.getByTestId("pinned-message-sender");
    this.pinnedMessageText = this.page.getByTestId("pinned-message-text");
    this.pinnedMessageTimestamp = this.page.getByTestId(
      "pinned-message-timestamp",
    );
    this.pinnedMessagesContainer = this.page.getByTestId(
      "pinned-messages-container",
    );
    this.pinnedMessagesEmpty = this.page.getByTestId("pinned-messages-empty");
    this.sectionAddSomeone = this.page.getByTestId("section-add-someone");
    this.topbar = this.page.getByTestId("topbar");
  }

  async exitCreateGroup() {
    await this.topbar.click();
  }

  async exitContextMenuChat() {
    await this.chatbarInput.click();
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

  async openContextMenuOnLastMessageReceived() {
    const lastMessage = await this.getLastMessageRemote();
    await lastMessage.click({ button: "right" });
    await this.contextMenuChatMessage.waitFor({ state: "visible" });
  }
  async openContextMenuOnLastMessageSent() {
    const lastMessage = await this.getLastMessageLocal();
    await lastMessage.click({ button: "right" });
    await this.contextMenuChatMessage.waitFor({ state: "visible" });
  }

  async openLocalQuickProfile() {
    const profilePicture = await this.getLastLocalProfilePicture();
    await profilePicture.click();
  }

  async openRemoteQuickProfile() {
    const profilePicture = await this.getLastRemoteProfilePicture();
    await profilePicture.click();
  }

  async pasteClipboardOnChatbar() {
    await this.chatbarInput.click();
    await this.page.keyboard.press("ControlOrMeta+v");
  }

  async selectContextMenuOption(option: string) {
    const locator = this.page.getByTestId("context-menu-option-" + option);
    await locator.click();
  }

  async sendMessage(message: string) {
    await this.chatbarInput.clear();
    await this.chatbarInput.fill(message);
    await this.buttonChatbarSendMessage.click();
  }

  async typeOnEditMessageInput(newMessage: string) {
    await this.editMessageInput.clear();
    await this.editMessageInput.fill(newMessage);
    await this.editMessageInput.press("Enter");
  }

  async validateChatsMainPageIsShown() {
    await expect(this.addSomeone).toBeVisible();
    await expect(this.page.url()).toContain("/chat");
  }

  async validateLocalContextMenuOptions() {
    await expect(this.page.getByTestId("button-emoji-👍")).toBeVisible();
    await expect(this.page.getByTestId("button-emoji-👎")).toBeVisible();
    await expect(this.page.getByTestId("button-emoji-❤️")).toBeVisible();
    await expect(this.page.getByTestId("button-emoji-🖖")).toBeVisible();
    await expect(this.page.getByTestId("button-emoji-😂")).toBeVisible();
    await expect(this.emojiPickerButton).toBeVisible();
    await expect(this.contextMenuOptionPinMessage).toBeVisible();
    await expect(this.contextMenuOptionReplyMessage).toBeVisible();
    await expect(this.contextMenuOptionCopyMessage).toBeVisible();
    await expect(this.contextMenuOptionEditMessage).toBeVisible();
    await expect(this.contextMenuOptionDeleteMessage).toBeVisible();
  }

  async validateRemoteContextMenuOptions() {
    await expect(this.page.getByTestId("button-emoji-👍")).toBeVisible();
    await expect(this.page.getByTestId("button-emoji-👎")).toBeVisible();
    await expect(this.page.getByTestId("button-emoji-❤️")).toBeVisible();
    await expect(this.page.getByTestId("button-emoji-🖖")).toBeVisible();
    await expect(this.page.getByTestId("button-emoji-😂")).toBeVisible();
    await expect(this.emojiPickerButton).toBeVisible();
    await expect(this.contextMenuOptionPinMessage).toBeVisible();
    await expect(this.contextMenuOptionReplyMessage).toBeVisible();
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
