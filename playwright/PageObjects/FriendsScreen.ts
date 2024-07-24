import MainPage from "./MainPage";
import { type Locator, type Page } from "@playwright/test";

export class FriendsScreen extends MainPage {
  readonly page: Page;
  readonly buttonAddFriend: Locator;
  readonly buttonCopyID: Locator;
  readonly buttonFriendCancel: Locator;
  readonly buttonFriendChat: Locator;
  readonly buttonFriendRemove: Locator;
  readonly buttonFriendBlock: Locator;
  readonly buttonFriendsActive: Locator;
  readonly buttonFriendsAll: Locator;
  readonly buttonFriendsBlocked: Locator;
  readonly contextMenuCopyID: Locator;
  readonly contextOptionCopyDid: Locator;
  readonly contextOptionCopyID: Locator;
  readonly friendName: Locator;
  readonly friendProfilePicture: Locator;
  readonly friendProfilePictureImage: Locator;
  readonly friendUser: Locator;
  readonly inputAddFriend: Locator;
  readonly inputContainerAddFriend: Locator;
  readonly inputSearchFriends: Locator;
  readonly inputContainerSearchFriends: Locator;
  readonly labelAddSomeone: Locator;
  readonly labelBlockedUsers: Locator;
  readonly labelFriendList: Locator;
  readonly labelIncomingRequests: Locator;
  readonly labelOutgoingRequests: Locator;
  readonly labelSearchFriends: Locator;
  readonly labelSearchResults: Locator;
  readonly modalRequestDispatched: Locator;
  readonly modalRequestDispatchedButton: Locator;
  readonly modalRequestDispatchedHeader: Locator;
  readonly modalRequestDispatchedDescription: Locator;
  readonly textNoBlockedUsers: Locator;
  readonly textNoIncomingRequests: Locator;
  readonly textNoOutgoingRequests: Locator;
  readonly textSearchFriendNoResults: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonAddFriend = page.getByTestId("button-add-friend");
    this.buttonCopyID = page.getByTestId("button-copy-id");
    this.buttonFriendCancel = page.getByTestId("button-friend-cancel");
    this.buttonFriendChat = page.getByTestId("button-friend-chat");
    this.buttonFriendRemove = page.getByTestId("button-friend-remove");
    this.buttonFriendBlock = page.getByTestId("button-friend-block");
    this.buttonFriendsActive = page.getByTestId("button-friends-active");
    this.buttonFriendsAll = page.getByTestId("button-friends-all");
    this.buttonFriendsBlocked = page.getByTestId("button-friends-blocked");
    this.contextMenuCopyID = page.getByTestId("context-menu-copy-id");
    this.contextOptionCopyDid = this.contextMenuCopyID.getByTestId(
      "context-menu-option-Copy DID",
    );
    this.contextOptionCopyID = this.contextMenuCopyID.getByTestId(
      "context-menu-option-Copy id",
    );
    this.friendName = page.getByTestId("friend-name");
    this.friendProfilePicture = page.getByTestId("friend-profile-picture");
    this.friendProfilePictureImage = page.getByTestId("profile-image");
    this.friendUser = page.locator('[data-cy^="friend-did:key:"]');
    this.inputAddFriend = page.getByTestId("input-add-friend");
    this.inputContainerAddFriend = this.inputAddFriend.locator("xpath=..");
    this.inputContainerSearchFriends =
      this.inputSearchFriends.locator("xpath=..");
    this.inputSearchFriends = page.getByTestId("input-search-friends");
    this.labelAddSomeone = page.getByTestId("label-add-someone");
    this.labelBlockedUsers = page.getByTestId("label-blocked-users");
    this.labelFriendList = page.locator('[data-cy^="label-friend-list-"]');
    this.labelIncomingRequests = page.getByTestId("label-incoming-requests");
    this.labelOutgoingRequests = page.getByTestId("label-outgoing-requests");
    this.labelSearchFriends = page.getByTestId("label-search-friends");
    this.labelSearchResults = page.getByTestId("label-search-results");
    this.modalRequestDispatched = page.getByTestId("modal-request-sent");
    this.modalRequestDispatchedButton = page.getByTestId(
      "label-modal-request-sent",
    );
    this.modalRequestDispatchedHeader = page.getByTestId(
      "label-modal-request-sent",
    );
    this.modalRequestDispatchedDescription = page.getByTestId(
      "text-modal-request-sent",
    );
    this.textNoBlockedUsers = page.getByTestId("text-no-blocked-users");
    this.textNoIncomingRequests = page.getByTestId("text-no-incoming-requests");
    this.textNoOutgoingRequests = page.getByTestId("text-no-outgoing-requests");
    this.textSearchFriendNoResults = page.getByTestId(
      "text-search-friend-no-results",
    );
  }

  async acceptFriendRequest(username: string, didkey: string) {
    const friendUser = await this.getFriendWithNameOrKey(username, didkey);
    await friendUser.getByTestId("button-friend-accept").click();
  }

  async addFriend(didKey: string) {
    await this.inputAddFriend.fill(didKey);
    await this.buttonAddFriend.click();
    await this.toastNotification.waitFor({ state: "attached" });
    await expect(this.toastNotificationText).toHaveText("");
    await this.toastNotification.waitFor({ state: "detached" });
  }

  async blockFriend(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-block").click();
  }

  async cancelFriendRequest(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-cancel").click();
  }

  async chatWithFriend(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-chat").click();
  }

  async copyDID() {
    await this.buttonCopyID.click({ button: "right" });
    await this.contextMenuCopyID.waitFor({ state: "attached" });
    await this.contextOptionCopyDid.click();
  }

  async pasteClipboardOnAddInput() {
    await this.inputAddFriend.click();
    await this.page.keyboard.press("Control+V");
  }

  async denyFriendRequest(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-deny").click();
  }

  async goToAllFriendsList() {
    await this.buttonFriendsAll.click();
  }

  async goToBlockedList() {
    await this.buttonFriendsBlocked.click();
  }

  async goToRequestList() {
    await this.buttonFriendsActive.click();
  }

  async removeFriend(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-remove").click();
  }

  async getFriendWithNameOrKey(username: string, didkey: string) {
    // Array of possible locators
    const locators = [
      `[data-cy^="friend-${username}"]`,
      `[data-cy^="friend-${didkey}"]`,
    ];

    for (const locator of locators) {
      try {
        await this.page
          .locator(locator)
          .waitFor({ state: "attached", timeout: 5000 });
        return this.page.locator(locator);
      } catch (error) {
        // Ignore the error and try the next locator
      }
    }

    throw new Error(
      `Friend with username ${username} or ID ${didkey} not found.`,
    );
  }

  async getFriendFromList(username: string) {
    await this.page
      .locator(`[data-cy^="friend-${username}"]`)
      .waitFor({ state: "attached" });
    return this.page.locator(`[data-cy^="friend-${username}"]`);
  }

  async unblockFriend(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-unblock").click();
  }

  async validateIncomingRequestExists() {
    await this.textNoIncomingRequests.waitFor({
      state: "detached",
    });
  }

  async validateOutgoingRequestExists() {
    await this.textNoOutgoingRequests.waitFor({
      state: "detached",
    });
  }

  async validateURL() {
    await this.page.waitForURL("/friends");
  }
}
