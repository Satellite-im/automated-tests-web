class FriendsPage {
  get buttonAddFriend() {
    return cy.getByTestAttr("button-add-friend");
  }

  get buttonCopyID() {
    return cy.getByTestAttr("button-copy-id");
  }

  get contextMenuCopyID() {
    return cy.getByTestAttr("context-menu-copy-id");
  }

  get contextOptionCopyDid() {
    return this.contextMenuCopyID.find('[data-cy="copy-did"]');
  }

  get contextOptionCopyID() {
    return this.contextMenuCopyID.find('[data-cy="copy-id"]');
  }
}

export const friendsPage: FriendsPage = new FriendsPage();
