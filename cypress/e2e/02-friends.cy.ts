import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMainPage from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";

describe("Friends Tests", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMainPage.validateChatsMainPageIsShown();
  });

  it("H1 - Clicking All should take you to All page within Friends", () => {
    chatsMainPage.buttonAddFriends.click();
    cy.location("href").should("include", "/friends");
  });

  it.skip("H2 - Clicking Active should take you to Active page within Friends", () => {
    // Test code for H2
  });

  it.skip("H3 - Clicking Blocked should take you to Blocked page within Friends", () => {
    // Test code for H3
  });

  it.skip("H4 - Highlighted border should appear after clicking into Add Someone input box", () => {
    // Test code for H4
  });

  it.skip("H5 - User should not be able to click Add until they have pasted did:key", () => {
    // Test code for H5
  });

  it.skip("H7 - Checkmark with Request Dispatched! Your request is making its way should appear after adding a user", () => {
    // Test code for H7
  });

  it.skip("H8 - Green border should appear around Add Someone textbox when user pastes a correct did:key into the input box", () => {
    // Test code for H8
  });

  it.skip("H10 - Highlighted border should appear when clicking into the Search Friends input box", () => {
    // Test code for H10
  });

  it.skip("H11 - Clicking the Copy button should copy your personal did:key", () => {
    // Test code for H11
  });

  it.skip("H12 - Friends should be listed in alphabetical order", () => {
    // Test code for H12
  });

  it.skip("H13 - Incoming friend requests should be listed by Newest to Oldest", () => {
    // Test code for H13
  });

  it.skip("H14 - Outgoing friend requests should be listed by last sent", () => {
    // Test code for H14
  });

  it.skip("H15 - Blocked users should be displayed alphabetically", () => {
    // Test code for H15
  });

  it.skip("H16 - User should be removed from friends list after clicking unfriend", () => {
    // Test code for H16
  });

  it.skip("H17 - Clicking block should block user", () => {
    // Test code for H17
  });

  it.skip("H18 - User should be displayed under Blocked Users after you block them", () => {
    // Test code for H18
  });

  it.skip("H19 - User should be cleared from Blocked Users after you unblock them", () => {
    // Test code for H19
  });
});
