import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";
const fs = require("fs");

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
  readonly chatMessageEditInput: Locator;
  readonly chatTopbarProfilePicture: Locator;
  readonly chatTopbarProfilePictureImage: Locator;
  readonly chatTopbarProfileStatusIndicator: Locator;
  readonly chatTopbarStatus: Locator;
  readonly chatTopbarUsername: Locator;
  readonly coinAmountIndicator: Locator;
  readonly contextMenuAddAttachment: Locator;
  readonly contextMenuChatMessage: Locator;
  readonly contextMenuOptionBrowseFiles: Locator;
  readonly contextMenuOptionCopyMessage: Locator;
  readonly contextMenuOptionDeleteMessage: Locator;
  readonly contextMenuOptionEditMessage: Locator;
  readonly contextMenuOptionFavorite: Locator;
  readonly contextMenuOptionHide: Locator;
  readonly contextMenuOptionMarkRead: Locator;
  readonly contextMenuOptionPinMessage: Locator;
  readonly contextMenuOptionReplyMessage: Locator;
  readonly contextMenuOptionUnpinMessage: Locator;
  readonly contextMenuOptionUpload: Locator;
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
  readonly fileEmbed: Locator;
  readonly fileEmbedAddToFilesButton: Locator;
  readonly fileEmbedDownloadButton: Locator;
  readonly fileEmbedIcon: Locator;
  readonly fileEmbedName: Locator;
  readonly fileEmbedShareButton: Locator;
  readonly fileEmbedSize: Locator;
  readonly gifPickerButton: Locator;
  readonly imageEmbedContainer: Locator;
  readonly imageEmbedDownloadButton: Locator;
  readonly imageEmbedFile: Locator;
  readonly imageEmbedFileName: Locator;
  readonly imageEmbedFileSize: Locator;
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
  readonly messageReactionsLocal: Locator;
  readonly messageReactionsRemote: Locator;
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
  readonly pinnedMessageContent: Locator;
  readonly pinnedMessageProfilePicture: Locator;
  readonly pinnedMessageProfileStatusIndicator: Locator;
  readonly pinnedMessageSender: Locator;
  readonly pinnedMessageText: Locator;
  readonly pinnedMessageTimestamp: Locator;
  readonly pinnedMessagesContainer: Locator;
  readonly pinnedMessagesEmpty: Locator;
  readonly sectionAddSomeone: Locator;
  readonly scrollToBottomButton: Locator;
  readonly statusIndicator: Locator;
  readonly stickerPickerButton: Locator;
  readonly textChatMessage: Locator;
  readonly topbar: Locator;
  readonly uploadFileInput: Locator;
  readonly uploadFilesSelectedAll: Locator;
  readonly uploadFilesSelectedSingle: Locator;
  readonly uploadFilesSelectedSingleDeleteButton: Locator;
  readonly uploadFilesSelectedSingleFilename: Locator;
  readonly uploadFilesSelectedSinglePreviewIcon: Locator;
  readonly uploadFilesSelectedSinglePreviewImage: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.addSomeone = this.page.locator(".add-someone");
    this.buttonAddAttachment = this.page.getByTestId(
      "button-chat-add-attachment",
    );
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
      .getByTestId("chatbar")
      .getByRole("textbox")
      .locator("div");
    this.chatbarInputContainer = this.chatbar
      .locator(".input-group")
      .locator(".input-container");
    this.chatMessageEditInput = this.page.getByTestId(
      "chat-message-edit-input",
    );
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
    this.contextMenuAddAttachment = this.page.getByTestId(
      "context-menu-chat-add-attachment",
    );
    this.contextMenuChatMessage = this.page.getByTestId(
      "context-menu-chat-message",
    );
    this.contextMenuOptionBrowseFiles = this.page.getByTestId(
      "context-menu-option-Browse Files",
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
    this.contextMenuOptionUpload = this.page.getByTestId(
      "context-menu-option-Upload",
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
    this.emojiPickerButton = this.page.getByTestId(
      "button-chatbar-emoji-picker",
    );
    this.fileEmbed = this.page.getByTestId("file-embed");
    this.fileEmbedAddToFilesButton = this.fileEmbed.getByTestId(
      "file-embed-add-to-files-button",
    );
    this.fileEmbedDownloadButton = this.fileEmbed.getByTestId(
      "file-embed-download-button",
    );
    this.fileEmbedIcon = this.fileEmbed.locator(".svg-icon");
    this.fileEmbedName = this.fileEmbed.getByTestId("file-embed-name");
    this.fileEmbedShareButton = this.fileEmbed.getByTestId(
      "file-embed-share-button",
    );
    this.fileEmbedSize = this.fileEmbed.getByTestId("file-embed-size");
    this.gifPickerButton = this.page.getByTestId("button-chatbar-gif-picker");
    this.imageEmbedContainer = this.page.getByTestId("image-embed-container");
    this.imageEmbedDownloadButton = this.imageEmbedContainer.getByTestId(
      "image-embed-download-button",
    );
    this.imageEmbedFile =
      this.imageEmbedContainer.getByTestId("image-embed-file");
    this.imageEmbedFileName = this.imageEmbedContainer.getByTestId(
      "image-embed-file-name",
    );
    this.imageEmbedFileSize = this.imageEmbedContainer.getByTestId(
      "image-embed-file-size",
    );
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
    this.messageReactionsLocal = this.page.getByTestId(
      "message-reactions-local",
    );
    this.messageReactionsRemote = this.page.getByTestId(
      "message-reactions-remote",
    );
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
    this.pinnedMessageContent = this.page
      .getByTestId("pinned-message-text")
      .locator("span");
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
    this.scrollToBottomButton = this.page
      .locator(".scroll-to-bottom")
      .locator("button");
    this.sectionAddSomeone = this.page.getByTestId("section-add-someone");
    this.stickerPickerButton = this.page.getByTestId(
      "button-chatbar-sticker-picker",
    );
    this.textChatMessage = this.page.getByTestId("text-chat-message");
    this.topbar = this.page.getByTestId("topbar");
    this.uploadFileInput = this.chatbar.locator('input[type="file"]');
    this.uploadFilesSelectedAll = this.page.locator(".files-selected");

    this.uploadFilesSelectedSingle =
      this.uploadFilesSelectedAll.locator(".selected-file");
    this.uploadFilesSelectedSingleDeleteButton = this.uploadFilesSelectedSingle
      .locator(".control")
      .locator("button");
    this.uploadFilesSelectedSingleFilename = this.uploadFilesSelectedSingle
      .locator(".details")
      .locator("p");
    this.uploadFilesSelectedSinglePreviewIcon =
      this.uploadFilesSelectedSingle.locator(".svg-icon");
    this.uploadFilesSelectedSinglePreviewImage =
      this.uploadFilesSelectedSingle.locator(".file-preview-image");
  }

  async clickOnGoToPinnedMessageButton(message: string) {
    const pinnedMessage = this.page
      .locator(`[data-cy="pinned-message"]`)
      .filter({
        has: this.page.getByText(message),
      });

    // Find the unpin button inside the parent element
    const goToButton = pinnedMessage.locator(
      `[data-cy="pinned-message-button-go-to"]`,
    );

    // Click on the unpin button
    await goToButton.click();
  }

  async clickOnUnpinMessageButton(message: string) {
    const pinnedMessage = this.page
      .locator(`[data-cy="pinned-message"]`)
      .filter({
        has: this.page.getByText(message),
      });

    // Find the unpin button inside the parent element
    const unpinButton = pinnedMessage.locator(
      `[data-cy="pinned-message-button-unpin"]`,
    );

    // Click on the unpin button
    await unpinButton.click();
  }

  async exitCreateGroup() {
    await this.topbar.click();
  }

  async exitContextMenuChat() {
    await this.chatbarInput.click();
  }

  async exitPinMessagesContainer() {
    await this.buttonChatPin.click({ force: true });
  }

  async getLastLocalProfilePicture() {
    const lastProfilePicture = this.messageGroupLocal
      .last()
      .getByTestId("message-group-local-profile-picture")
      .locator("img");
    await lastProfilePicture.waitFor({ state: "attached" });
    return lastProfilePicture;
  }

  async getLastLocalProfilePictureSource() {
    const source = await (
      await this.getLastLocalProfilePicture()
    ).getAttribute("src");
    return source;
  }

  async getLastLocalReactionsContainer() {
    // Extract emoji reactions into an array of objects
    const reactions = await this.page
      .locator('[data-cy="message-reactions-local"]')
      .last()
      .evaluate((container) => {
        const reactionElements = container.querySelectorAll(
          '[data-cy^="emoji-reaction-"]',
        );

        return Array.from(reactionElements).map((reaction) => {
          const emoji = reaction
            .querySelector('[data-cy="emoji-reaction"]')
            .textContent.trim();
          const count = reaction
            .querySelector('[data-cy="emoji-count"]')
            .textContent.trim();
          return { emoji, count };
        });
      });

    return reactions;
  }

  async getLastRemoteProfilePicture() {
    const lastProfilePicture = this.messageGroupRemote
      .last()
      .getByTestId("message-group-remote-profile-picture")
      .locator("img");
    await lastProfilePicture.waitFor({ state: "attached" });
    return lastProfilePicture;
  }

  async getLastRemoteProfilePictureSource() {
    const source = await (
      await this.getLastRemoteProfilePicture()
    ).getAttribute("src");
    return source;
  }

  async getLastRemoteReactionsContainer() {
    // Extract emoji reactions into an array of objects
    const reactions = await this.page
      .locator('[data-cy="message-reactions-remote"]')
      .last()
      .evaluate((container) => {
        const reactionElements = container.querySelectorAll(
          '[data-cy^="emoji-reaction-"]',
        );

        return Array.from(reactionElements).map((reaction) => {
          const emoji = reaction
            .querySelector('[data-cy="emoji-reaction"]')
            .textContent.trim();
          const count = reaction
            .querySelector('[data-cy="emoji-count"]')
            .textContent.trim();
          return { emoji, count };
        });
      });

    return reactions;
  }

  async getFirstMessageLocal() {
    const lastMessage = this.messageGroupLocal
      .first()
      .getByTestId("message-bubble-content")
      .first();
    await lastMessage.waitFor({ state: "attached" });
    return lastMessage;
  }

  async getFirstMessageRemote() {
    const firstMessage = this.messageGroupRemote
      .first()
      .getByTestId("message-bubble-content")
      .first();
    await firstMessage.waitFor({ state: "attached" });
    return firstMessage;
  }

  async getLastMessageLocal() {
    const lastMessage = this.messageGroupLocal
      .last()
      .getByTestId("message-bubble-content")
      .last();
    await lastMessage.waitFor({ state: "attached" });
    return lastMessage;
  }

  async getMarkdownFromMessage(element: Locator) {
    // Evaluate the DOM and extract both text and markdown as an array
    const result = await element.evaluate((pElement) => {
      // Recursive function to traverse DOM and collect text and markdown
      const convertToArray = (node: any) => {
        let textParts = [];
        let markdownParts = [];

        // Check the node type
        if (node.nodeType === Node.TEXT_NODE) {
          textParts.push(node.textContent); // Add plain text content
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Check for markdown-relevant tags and process them
          if (node.tagName === "EM") {
            markdownParts.push("Italic");
          } else if (node.tagName === "STRONG") {
            markdownParts.push("Bold");
          } else if (node.tagName === "DEL") {
            markdownParts.push("Strikethrough");
          }
        }

        // Traverse children and collect their content
        for (let child of node.childNodes) {
          const [childText, childMarkdown] = convertToArray(child);
          textParts = textParts.concat(childText);
          markdownParts = markdownParts.concat(childMarkdown);
        }

        return [textParts, markdownParts];
      };

      // Get the final text and markdown array
      const [text, markdown] = convertToArray(pElement);
      return [text.join(""), markdown]; // Join text parts together as a single string
    });

    return result;
  }

  async getLastMessageLocalHyperlink() {
    const lastMessage = this.messageGroupLocal
      .last()
      .getByTestId("message-bubble-content")
      .last()
      .getByTestId("text-chat-message")
      .locator("p a"); // Target the <a> tag inside the <p> element

    // Retrieve the href attribute from the <a> tag
    await lastMessage.waitFor({ state: "attached" });
    const hyperlink = await lastMessage.getAttribute("href");

    return hyperlink;
  }

  async getLastMessageRemoteHyperlink() {
    const lastMessage = this.messageGroupRemote
      .last()
      .getByTestId("message-bubble-content")
      .last()
      .getByTestId("text-chat-message")
      .locator("p a"); // Target the <a> tag inside the <p> element

    // Retrieve the href attribute from the <a> tag
    const hyperlink = await lastMessage.getAttribute("href");

    return hyperlink;
  }

  async getLastMessageWithMarkdownLocal() {
    const lastMessage = this.messageGroupLocal
      .last()
      .getByTestId("message-bubble-content")
      .last()
      .getByTestId("text-chat-message")
      .locator("p");
    await lastMessage.waitFor({ state: "attached" });

    const markdown = await this.getMarkdownFromMessage(lastMessage);
    return markdown;
  }

  async getLastMessageWithMarkdownRemote() {
    const lastMessage = this.messageGroupRemote
      .last()
      .getByTestId("message-bubble-content")
      .last()
      .getByTestId("text-chat-message")
      .locator("p");

    const markdown = await this.getMarkdownFromMessage(lastMessage);
    return markdown;
  }

  async getLastMessageRemote() {
    const lastMessage = this.messageGroupRemote
      .last()
      .getByTestId("message-bubble-content")
      .last();
    await lastMessage.waitFor({ state: "attached" });
    return lastMessage;
  }

  async getLastTimestampLocal() {
    const lastTimestamp = this.messageGroupLocal
      .last()
      .getByTestId("message-group-timestamp");
    await lastTimestamp.waitFor({ state: "attached" });
    return lastTimestamp;
  }

  async getLastTimestampRemote() {
    const lastTimestamp = this.messageGroupRemote
      .last()
      .getByTestId("message-group-timestamp");
    await lastTimestamp.waitFor({ state: "attached" });
    return lastTimestamp;
  }

  async getMessageLocal(message: string) {
    const messageLocal = this.page.getByTestId("message-group-remote").filter({
      has: this.page.getByText(message),
    });
    return messageLocal;
  }
  async getMessageRemote(message: string) {
    const messageRemote = this.page.getByTestId("message-group-remote").filter({
      has: this.page.getByText(message),
    });
    return messageRemote;
  }

  async openContextMenuOnLastMessageReceived() {
    const lastMessage = await this.getLastMessageRemote();
    await lastMessage.click({ button: "right" });
    await this.contextMenuChatMessage.waitFor({ state: "attached" });
  }

  async openContextMenuOnLastMessageSent() {
    const lastMessage = await this.getLastMessageLocal();
    await lastMessage.click({ button: "right" });
    await this.contextMenuChatMessage.waitFor({ state: "attached" });
  }

  async openContextMenuOnMessageReceived(message: string) {
    const messageGroupRemote = this.page
      .getByTestId("message-group-remote")
      .filter({
        has: this.page.getByText(message),
      });
    await messageGroupRemote.scrollIntoViewIfNeeded();
    await messageGroupRemote.click({ button: "right" });
  }

  async openContextMenuOnMessageSent(message: string) {
    const messageGroupLocal = this.page
      .getByTestId("message-group-local")
      .filter({
        has: this.page.getByText(message),
      });
    await messageGroupLocal.scrollIntoViewIfNeeded();
    await messageGroupLocal.click({ button: "right" });
  }

  async openLocalQuickProfile() {
    const profilePicture = await this.getLastLocalProfilePicture();
    await profilePicture.click();
  }

  async openPinMessagesContainer() {
    await this.buttonChatPin.click();
  }

  async openRemoteQuickProfile() {
    const profilePicture = await this.getLastRemoteProfilePicture();
    await profilePicture.click();
  }

  async pasteClipboardOnChatbar() {
    await this.chatbarInput.click();
    await this.page.keyboard.press("ControlOrMeta+v");
  }

  async removeReactionInLocalMessage(reaction: string) {
    const reactionToRemove = this.page
      .getByTestId("message-reactions-local")
      .last()
      .getByTestId("emoji-reaction-" + reaction);
    await reactionToRemove.click();
    await reactionToRemove.waitFor({ state: "detached" });
  }

  async removeReactionInRemoteMessage(reaction: string) {
    const reactionToRemove = this.page
      .getByTestId("message-reactions-remote")
      .last()
      .getByTestId("emoji-reaction-" + reaction);
    await reactionToRemove.click();
    await reactionToRemove.waitFor({ state: "detached" });
  }

  async selectContextMenuOption(option: string) {
    const locator = this.page.getByTestId("context-menu-option-" + option);
    await locator.click();
  }

  async selectDefaultReaction(reaction: string) {
    const locator = this.page.getByTestId("button-emoji-" + reaction);
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

  async validateHyperlinkFromLastMessageLocal(
    expectedText: string,
    expectedHyperlink: string,
  ) {
    await this.messabeBubbleLocal
      .getByText(expectedText)
      .waitFor({ state: "attached" });
    await this.getLastMessageLocalHyperlink().then(
      (lastMessageWithHyperlink) => {
        expect(lastMessageWithHyperlink).toEqual(expectedHyperlink);
      },
    );
  }

  async validateHyperlinkFromLastMessageRemote(
    expectedText: string,
    expectedHyperlink: string,
  ) {
    await this.messageBubbleRemote
      .getByText(expectedText)
      .waitFor({ state: "attached" });
    await this.getLastMessageRemoteHyperlink().then(
      (lastMessageWithHyperlink) => {
        expect(lastMessageWithHyperlink).toEqual(expectedHyperlink);
      },
    );
  }

  async validateMarkdownFromLastMessageLocal(
    expectedText: string,
    expectedMarkdown: string[],
  ) {
    await this.messabeBubbleLocal
      .getByText(expectedText)
      .waitFor({ state: "attached" });
    await this.getLastMessageWithMarkdownLocal().then(
      (lastMessageWithMarkdown) => {
        expect(lastMessageWithMarkdown).toEqual([
          expectedText,
          expectedMarkdown,
        ]);
      },
    );
  }

  async validateMarkdownFromLastMessageRemote(
    expectedText: string,
    expectedMarkdown: string[],
  ) {
    await this.messageBubbleRemote
      .getByText(expectedText)
      .waitFor({ state: "attached" });
    await this.getLastMessageWithMarkdownRemote().then(
      (lastMessageWithMarkdown) => {
        expect(lastMessageWithMarkdown).toEqual([
          expectedText,
          expectedMarkdown,
        ]);
      },
    );
  }

  async validateMessageIsReceived(message: string) {
    await this.messageBubbleRemote.waitFor({ state: "attached" });
    await expect(this.messageBubbleContent).toHaveText(message);
  }

  async validateMessageIsSent(message: string) {
    await this.messabeBubbleLocal.waitFor({ state: "attached" });
    await expect(this.messageBubbleContent).toHaveText(message);
  }

  async validateLastLocalMessageIsNotPinned() {
    const pinnedIndicator = this.messageGroupLocal
      .last()
      .getByTestId("message-pin-indicator");
    await pinnedIndicator.waitFor({ state: "detached" });
  }

  async validateLastLocalMessageIsPinned() {
    const pinnedIndicator = this.messageGroupLocal
      .last()
      .getByTestId("message-pin-indicator");
    await pinnedIndicator.waitFor({ state: "attached" });
  }

  async validateLastRemoteMessageIsNotPinned() {
    const pinnedIndicator = this.messageGroupRemote
      .last()
      .getByTestId("message-pin-indicator");
    await pinnedIndicator.waitFor({ state: "detached" });
  }

  async validateLastRemoteMessageIsPinned() {
    const pinnedIndicator = this.messageGroupRemote
      .last()
      .getByTestId("message-pin-indicator");
    await pinnedIndicator.waitFor({ state: "attached" });
  }

  async validatePinMessageShownInContainer(username: string, content: string) {
    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)/;
    await expect(this.pinnedMessagesContainer).toBeVisible();
    await expect(this.pinnedMessagesEmpty).toBeHidden();
    await expect(this.pinnedMessage).toBeVisible();
    await expect(this.pinnedMessageProfilePicture).toBeVisible();
    await expect(this.pinnedMessageProfileStatusIndicator).toHaveClass(
      /.*\bonline\b.*/,
    );
    await expect(this.pinnedMessageTimestamp).toHaveText(dateRegex);
    await expect(this.pinnedMessageSender).toHaveText(username);
    await expect(this.pinnedMessageButtonGoTo).toBeVisible();
    await expect(this.pinnedMessageButtonUnpin).toBeVisible();
    await expect(this.pinnedMessageContent).toHaveText(content);
  }

  async validateReactionExistsInLocalMessage(reaction: string) {
    const expectedReaction = this.page
      .getByTestId("message-reactions-local")
      .last()
      .getByTestId("emoji-reaction-" + reaction);
    await expectedReaction.waitFor({ state: "attached" });
  }

  async validateReactionExistsInRemoteMessage(reaction: string) {
    const expectedReaction = this.page
      .getByTestId("message-reactions-remote")
      .last()
      .getByTestId("emoji-reaction-" + reaction);
    await expectedReaction.waitFor({ state: "attached" });
  }

  async validateReactionDoesNotExistInLocalMessage(reaction: string) {
    const expectedReaction = this.page
      .getByTestId("message-reactions-local")
      .last()
      .getByTestId("emoji-reaction-" + reaction);
    await expectedReaction.waitFor({ state: "detached" });
  }

  async validateReactionDoesNotExistInRemoteMessage(reaction: string) {
    const expectedReaction = this.page
      .getByTestId("message-reactions-remote")
      .last()
      .getByTestId("emoji-reaction-" + reaction);
    await expectedReaction.waitFor({ state: "detached" });
  }

  // Upload Files and Images Methods
  async closeImagePreview(): Promise<void> {
    await this.page.mouse.click(0, 0);
  }

  async deleteFilePreview(numberOfFile: number) {
    const deleteButton = this.page.locator(
      "div:nth-child(" + numberOfFile + ") > .control > .button",
    );
    await deleteButton.click();
  }

  async downloadFileLastMessage(filename: string, sent: boolean = true) {
    // Declare variable for file locator
    let fileLocator: Locator;
    let downloadButton: Locator;

    // Extract the file extension from the filename
    const extension = filename.split(".").pop();

    // Define a list of image file extensions
    const imageExtensions = ["jpg", "png", "gif"];

    if (imageExtensions.includes(extension)) {
      if (sent) {
        fileLocator = await this.getLastImagesSent();
      } else {
        fileLocator = await this.getLastImagesReceived();
      }
      downloadButton = fileLocator.getByTestId("image-embed-download-button");
    } else {
      if (sent) {
        fileLocator = await this.getLastFilesSent();
      } else {
        fileLocator = await this.getLastFilesReceived();
      }
      downloadButton = fileLocator.getByTestId("file-embed-download-button");
    }

    // Wait for the download event
    const downloadPromise = this.page.waitForEvent("download");
    await downloadButton.click();
    const download = await downloadPromise;

    // Save the file manually to the specified folder
    const savedFilePath = "./downloads/" + filename;

    await download.saveAs(savedFilePath); // Save the file to the desired folder

    // Return the saved file path for further validation
    return savedFilePath;
  }

  async getFilePreview(filename: string) {
    const filePreview = this.uploadFilesSelectedSingle.filter({
      has: this.page.locator(`.details p`, { hasText: filename }),
    });
    return filePreview;
  }

  async getLastFilesReceived() {
    await this.page
      .getByTestId("message-bubble-remote")
      .waitFor({ state: "attached" });
    const lastMessageSent = this.page
      .getByTestId("message-bubble-remote")
      .last();
    await lastMessageSent.waitFor({ state: "attached" });
    const lastFilesSent = lastMessageSent.getByTestId("file-embed");
    return lastFilesSent;
  }

  async getLastFilesSent() {
    await this.page
      .getByTestId("message-bubble-local")
      .waitFor({ state: "attached" });
    const lastMessageSent = this.page
      .getByTestId("message-bubble-local")
      .last();
    await lastMessageSent.waitFor({ state: "attached" });
    const lastFilesSent = lastMessageSent.getByTestId("file-embed");
    return lastFilesSent;
  }

  async getLastImagesReceived() {
    await this.page
      .getByTestId("message-bubble-remote")
      .waitFor({ state: "attached" });
    const lastMessageSent = this.page
      .getByTestId("message-bubble-remote")
      .last();
    await lastMessageSent.waitFor({ state: "attached" });
    const lastImagesSent = lastMessageSent.getByTestId("image-embed-container");
    return lastImagesSent;
  }

  async getLastImagesSent() {
    await this.page
      .getByTestId("message-bubble-local")
      .last()
      .waitFor({ state: "attached" });
    const lastMessageSent = this.page
      .getByTestId("message-bubble-local")
      .last();
    await lastMessageSent.waitFor({ state: "attached" });
    const lastImagesSent = lastMessageSent.getByTestId("image-embed-container");
    return lastImagesSent;
  }

  async openImagePreviewLastImageReceived() {
    const lastImage = await this.getLastImagesReceived();
    await lastImage.getByTestId("image-embed-file").click();
  }

  async openImagePreviewLastImageSent() {
    const lastImage = await this.getLastImagesSent();
    await lastImage.getByTestId("image-embed-file").click();
  }

  async uploadFiles(filePaths: string[]) {
    await this.buttonAddAttachment.click();
    await expect(this.contextMenuAddAttachment).toBeVisible();
    await this.contextMenuOptionUpload.click();
    for (let i = 0; i < filePaths.length; i++) {
      await this.uploadFileInput.setInputFiles(filePaths[i]);
    }
  }

  async validateDownloadedFile(filename: string) {
    const downloadPath = "./downloads/" + filename; // Specify your download folder

    // Check if the file exists
    const fileExists = fs.existsSync(downloadPath);

    // Assert that the file exists
    if (fileExists) {
      console.log(`File ${filename} was downloaded successfully.`);
      return true;
    } else {
      console.error(`File ${filename} was not found.`);
      return false;
    }
  }

  async validateFilePreviews(filePaths: string[]) {
    const filenames = filePaths.map((path) => path.split("/").pop());
    const fileExtensions = filenames.map((path) => "." + path.split(".").pop());
    for (let i = 0; i < filePaths.length; i++) {
      const filePreview = await this.getFilePreview(filenames[i]);
      await filePreview.waitFor({ state: "attached" });
      const fileDetailsName = filePreview.locator(".details p");
      await expect(fileDetailsName).toHaveText(filenames[i]);
      if (fileExtensions[i] === ".png" || fileExtensions[i] === ".jpg") {
        const filePreviewImage = filePreview.locator(".file-preview-image");
        await expect(filePreviewImage).toBeVisible();
      } else {
        const fileIcon = filePreview.locator(".file-preview .svg-icon");
        await expect(fileIcon).toBeVisible();
      }
    }
  }

  async validateFileEmbedInChat(name: string, size: string, sent: boolean) {
    let fileEmbed: Locator;
    if (sent) {
      fileEmbed = await this.getLastFilesSent();
    } else {
      fileEmbed = await this.getLastFilesReceived();
    }
    await fileEmbed.waitFor({ state: "attached" });
    const fileEmbedIcon = fileEmbed.locator(".svg-icon").first();
    const fileEmbedName = fileEmbed.getByTestId("file-embed-name");
    const fileEmbedSize = fileEmbed.getByTestId("file-embed-size");
    const downloadButton = fileEmbed.getByTestId("file-embed-download-button");
    await expect(fileEmbedIcon).toBeVisible();
    await expect(fileEmbedName).toHaveText(name);
    await expect(fileEmbedSize).toHaveText(size);
    await expect(downloadButton).toBeVisible();
  }

  async validateImageEmbedInChat(name: string, size: string, sent: boolean) {
    let imageEmbed: Locator;
    if (sent) {
      imageEmbed = await this.getLastImagesSent();
    } else {
      imageEmbed = await this.getLastImagesReceived();
    }
    await imageEmbed.waitFor({ state: "attached" });
    const imageEmbedFile = imageEmbed.getByTestId("image-embed-file");
    const imageEmbedName = imageEmbed.getByTestId("image-embed-file-name");
    const imageEmbedSize = imageEmbed.getByTestId("image-embed-file-size");
    const downloadButton = imageEmbed.getByTestId(
      "image-embed-download-button",
    );
    await expect(imageEmbedFile).toBeVisible();
    await expect(imageEmbedName).toHaveText(name);
    await expect(imageEmbedSize).toHaveText(size);
    await expect(downloadButton).toBeVisible();
  }

  async validateImagePreviewIsVisible() {
    const modalPreview = this.page.locator(".modal");
    const modalPreviewImageContainer = modalPreview.getByTestId(
      "image-embed-container",
    );
    const modalPreviewImage =
      modalPreviewImageContainer.getByTestId("image-embed-file");
    await expect(modalPreview).toHaveClass(/.*\bblurred\b.*/);
    await expect(modalPreviewImageContainer).toBeVisible();
    await expect(modalPreviewImage).toBeVisible();
  }

  // Emojis, GIFs and Stickers methods

  async openEmojiPicker() {
    await this.emojiPickerButton.click();
  }

  async openGifPicker() {
    await this.gifPickerButton.click();
  }

  async openStickerPicker() {
    await this.stickerPickerButton.click();
  }
}
