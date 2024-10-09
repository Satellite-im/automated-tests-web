import MainPage from "./MainPage";
import { type Locator, type Page, expect } from "@playwright/test";

export class FriendsScreen extends MainPage {
  readonly buttonAddFriend: Locator;
  readonly buttonCopyID: Locator;
  readonly buttonFriendCancel: Locator;
  readonly buttonFriendChat: Locator;
  readonly buttonFriendRemove: Locator;
  readonly buttonFriendBlock: Locator;
  readonly buttonFriendsActive: Locator;
  readonly buttonFriendsAll: Locator;
  readonly buttonFriendsBlocked: Locator;
  readonly buttonFriendsHamburger: Locator;
  readonly contextFriendListOptionAll: Locator;
  readonly contextFriendListOptionBlocked: Locator;
  readonly contextFriendListOptionRequests: Locator;
  readonly contextMenuCopyID: Locator;
  readonly contextOptionCopyDid: Locator;
  readonly contextOptionCopyID: Locator;
  readonly friendName: Locator;
  readonly friendProfilePicture: Locator;
  readonly friendProfilePictureImage: Locator;
  readonly friendsSectionAll: Locator;
  readonly friendsSectionBlocked: Locator;
  readonly friendsSectionRequests: Locator;
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

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.buttonAddFriend = this.page.getByTestId("button-add-friend");
    this.buttonCopyID = this.page.getByTestId("button-copy-id");
    this.buttonFriendCancel = this.page.getByTestId("button-friend-cancel");
    this.buttonFriendChat = this.page.getByTestId("button-friend-chat");
    this.buttonFriendRemove = this.page.getByTestId("button-friend-remove");
    this.buttonFriendBlock = this.page.getByTestId("button-friend-block");
    this.buttonFriendsActive = this.page.getByTestId("button-friends-active");
    this.buttonFriendsAll = this.page.getByTestId("button-friends-all");
    this.buttonFriendsBlocked = this.page.getByTestId("button-friends-blocked");
    this.buttonFriendsHamburger = this.page
      .getByTestId("topbar")
      .getByRole("button")
      .nth(1);
    this.contextFriendListOptionAll =
      this.page.getByTestId("button-friends-all");
    this.contextFriendListOptionBlocked = this.page.getByTestId(
      "button-friends-blocked",
    );
    this.contextFriendListOptionRequests = this.page.getByTestId(
      "button-friends-active",
    );
    this.contextMenuCopyID = this.page.getByTestId("context-menu-copy-id");
    this.contextOptionCopyDid = this.contextMenuCopyID.getByTestId(
      "context-menu-option-Copy DID",
    );
    this.contextOptionCopyID = this.contextMenuCopyID.getByTestId(
      "context-menu-option-Copy ID",
    );
    this.friendName = this.page.getByTestId("friend-name");
    this.friendProfilePicture = this.page.getByTestId("friend-profile-picture");
    this.friendProfilePictureImage = this.page.getByTestId("profile-image");
    this.friendUser = this.page.locator('[data-cy^="friend-did:key:"]');
    this.friendsSectionAll = this.page.getByTestId("friends-section-all");
    this.friendsSectionBlocked = this.page.getByTestId(
      "friends-section-blocked",
    );
    this.friendsSectionRequests = this.page.getByTestId(
      "friends-section-requests",
    );
    this.inputAddFriend = this.page
      .getByTestId("input-add-friend")
      .locator("input");
    this.inputContainerAddFriend = this.page
      .getByTestId("input-add-friend")
      .locator(".input-container");
    this.inputContainerSearchFriends = this.page
      .getByTestId("input-search-friends")
      .locator(".input-container");
    this.inputSearchFriends = this.page
      .getByTestId("input-search-friends")
      .locator("input");
    this.labelAddSomeone = this.page.getByTestId("label-add-someone");
    this.labelBlockedUsers = this.page.getByTestId("label-blocked-users");
    this.labelFriendList = this.page.locator('[data-cy^="label-friend-list-"]');
    this.labelIncomingRequests = this.page.getByTestId(
      "label-incoming-requests",
    );
    this.labelOutgoingRequests = this.page.getByTestId(
      "label-outgoing-requests",
    );
    this.labelSearchFriends = this.page.getByTestId("label-search-friends");
    this.labelSearchResults = this.page.getByTestId("label-search-results");
    this.modalRequestDispatched = this.page.getByTestId("modal-request-sent");
    this.modalRequestDispatchedButton = this.page.getByTestId(
      "label-modal-request-sent",
    );
    this.modalRequestDispatchedHeader = this.page.getByTestId(
      "label-modal-request-sent",
    );
    this.modalRequestDispatchedDescription = this.page.getByTestId(
      "text-modal-request-sent",
    );
    this.textNoBlockedUsers = this.page.getByTestId("text-no-blocked-users");
    this.textNoIncomingRequests = this.page.getByTestId(
      "text-no-incoming-requests",
    );
    this.textNoOutgoingRequests = this.page.getByTestId(
      "text-no-outbound-requests",
    );
    this.textSearchFriendNoResults = this.page.getByTestId(
      "text-search-friend-no-results",
    );
  }

  async acceptFriendRequest(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-accept").click();
  }

  async addFriend(didKey: string) {
    await this.inputAddFriend.fill(didKey);
    await this.buttonAddFriend.click();
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

  async clearAddFriendInput() {
    await this.inputAddFriend.clear();
  }

  async copyDIDFromContextMenu() {
    await this.buttonCopyID.click({ button: "right" });
    await this.contextMenuCopyID.waitFor({ state: "attached" });
    await this.contextOptionCopyDid.click();
  }

  async copyIDFromContextMenu() {
    await this.buttonCopyID.click({ button: "right" });
    await this.contextMenuCopyID.waitFor({ state: "attached" });
    await this.contextOptionCopyID.click();
  }

  async pasteClipboardOnAddInput() {
    await this.inputAddFriend.click();
    await this.page.keyboard.press("ControlOrMeta+v");
  }

  async denyFriendRequest(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-deny").click();
  }

  async goToAllFriendsList() {
    if (this.viewport === "mobile-chrome") {
      await this.buttonFriendsHamburger.click();
      await this.contextFriendListOptionAll.click();
    } else {
      await this.buttonFriendsAll.click();
    }
  }

  async goToBlockedList() {
    if (this.viewport === "mobile-chrome") {
      await this.buttonFriendsHamburger.click();
      await this.contextFriendListOptionBlocked.click();
    } else {
      await this.buttonFriendsBlocked.click();
    }
  }

  async goToRequestList() {
    if (this.viewport === "mobile-chrome") {
      await this.buttonFriendsHamburger.click();
      await this.contextFriendListOptionRequests.click();
    } else {
      await this.buttonFriendsActive.click();
    }
  }

  async removeFriend(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-remove").click();
  }

  async getListOfCurrentFriends() {
    const friends = await this.page.locator(".body").getByTestId("friend-name");
    let displayedFriends: string[] = [];
    const options: string[] = await friends.allTextContents();
    displayedFriends = options.map((option) => option.trim());
    return displayedFriends;
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

  async typeOnAddFriendInput(value: string) {
    await this.clearAddFriendInput();
    await this.inputAddFriend.fill(value);
  }

  async unblockFriend(username: string) {
    const friendUser = await this.getFriendFromList(username);
    await friendUser.getByTestId("button-friend-unblock").click();
  }

  async validateUserIsBlocked(username: string) {
    const users = this.page.locator(".body").getByTestId("friend-name");
    let displayedUsers: string[] = [];
    const options: string[] = await users.allTextContents();
    displayedUsers = options.map((option) => option.trim());
    expect(displayedUsers).toContain(username);
  }

  async validateFriendListIsDisplayed(letter: string) {
    const list = this.page.locator(`[data-cy="label-friend-list-${letter}"]`);
    await list.waitFor({ state: "attached" });
  }

  async validateFriendListDoesNotExist(letter: string) {
    const list = this.page.locator(`[data-cy="label-friend-list-${letter}"]`);
    await list.waitFor({ state: "detached" });
  }

  async validateBlockedUserExists() {
    await this.page
      .getByTestId("button-friend-unblock")
      .waitFor({ state: "attached" });
  }

  async validateIncomingRequestExists() {
    await this.page
      .getByTestId("button-friend-accept")
      .waitFor({ state: "attached" });
  }

  async validateNoBlockedUsersExist() {
    // Validate blocked list now shows empty
    await this.textNoBlockedUsers.waitFor({
      state: "attached",
    });
    await expect(this.textNoBlockedUsers).toHaveText("No users blocked.");
  }

  async validateNoIncomingRequestsExist() {
    // Validate incoming list now shows empty on user who received and denied the friend request
    await this.textNoIncomingRequests.waitFor({
      state: "attached",
    });
    await expect(this.textNoIncomingRequests).toHaveText(
      "No inbound requests.",
    );
  }

  async validateNoOutgoingRequestsExist() {
    // Validate outgoing list now shows empty on user who sent the friend request
    await this.textNoOutgoingRequests.waitFor({
      state: "attached",
    });
    await expect(this.textNoOutgoingRequests).toHaveText(
      "No outbound requests.",
    );
  }

  async validateOutgoingRequestExists() {
    await this.page
      .getByTestId("button-friend-cancel")
      .waitFor({ state: "attached" });
  }

  async validateToastCannotAddYourself() {
    await this.toastNotificationText.waitFor({ state: "attached" });
    await expect(this.toastNotificationText).toHaveText(
      "You cannot send yourself a friend request",
    );
  }

  async validateToastRequestReceived(username: string) {
    await this.toastNotificationText.waitFor({ state: "attached" });
    await expect(this.toastNotificationText).toHaveText(
      `${username} sent a request.`,
    );
  }

  async validateToastRequestSent() {
    await this.page
      .getByText("Your request is making it's way!")
      .waitFor({ state: "attached" });
  }

  async validateURL() {
    await this.page.waitForURL("/friends");
  }
}
