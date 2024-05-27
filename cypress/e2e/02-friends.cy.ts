import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { preLoadingPage } from "./PageObjects/PreLoading";

describe("Chat Page Tests", () => {
  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    preLoadingPage.validatePreLoadingPage();
    chatsMainPage.validateChatsMainPageIsShown();
  });

  it("Add Friends should navigate to Friends Page", () => {
    chatsMainPage.clickAddFriends();
    cy.location("href").should("include", "/friends");
  });

  // Cannot be automated at this moment
  xit("User should land on this page after logging in", () => {});

  // Cannot be automated at this moment
  xit("Clicking Add Friends should navigate you to Friends page", () => {});

  // Cannot be automated at this moment
  xit("Messages are secured by end-to-end encryption, sent over a peer-to-peer network should be displayed at the top of every chat", () => {});

  // Cannot be automated at this moment
  xit("Amount of coin should be displayed at top right toolbar", () => {});

  // Cannot be automated at this moment
  xit("Highlighted border should appear around call button when clicked", () => {});

  // Cannot be automated at this moment
  xit("Highlighted border should appear around Video button when clicked", () => {});

  // Cannot be automated at this moment
  xit("Favorite button should should be highlighted after clicked and grey when unclicked", () => {});

  // Cannot be automated at this moment
  xit("Clicking Profile button in 1on1 chat should display the friends profile", () => {});

  // Cannot be automated at this moment
  xit("Friends profile should display friends profile picture", () => {});

  // Cannot be automated at this moment
  xit("Friends profile should display friends status (wether you are friends or not)", () => {});

  // Cannot be automated at this moment
  xit("Friends profile should display friends Username", () => {});

  // Cannot be automated at this moment
  xit("Friends profile should display friends profile Status", () => {});

  // Cannot be automated at this moment
  xit("User should be able to write a note on friends profile", () => {});

  // Cannot be automated at this moment
  xit("Highlighted border should appear when user clicks into Notes textbox", () => {});

  // Cannot be automated at this moment
  xit("Clicking Groups button should display group members of the chat", () => {});

  // Cannot be automated at this moment
  xit("Timestamp appears after most recent message sent", () => {});

  // Cannot be automated at this moment
  xit("Users profile picture appears next to messages sent", () => {});

  // Cannot be automated at this moment
  xit("Context menu appears when user right clicks a message", () => {});

  // Cannot be automated at this moment
  xit("When user clicks their own message context menu should display Top 5 Most Used Emojis, Pin Message, Reply, React, Copy, Edit, Delete", () => {});

  // Cannot be automated at this moment
  xit("Clicking Pin Message should pin message in chat", () => {});

  // Cannot be automated at this moment
  xit("Clicking Reply should open reply modal", () => {});

  // Cannot be automated at this moment
  xit("Clicking React should open up emoji menu", () => {});

  // Cannot be automated at this moment
  xit("Clicking Copy should copy text to users clipboard", () => {});

  // Cannot be automated at this moment
  xit("Clicking Edit should open up the edit message modal", () => {});

  // Cannot be automated at this moment
  xit("Clicking Delete should delete message from chat", () => {});

  // Cannot be automated at this moment
  xit("Clicking the X next to a friend in the GroupMembers Modal should remove friend from groupchat", () => {});

  // Cannot be automated at this moment
  xit("Clicking the Settings button should open the Group Chat Settings", () => {});

  // Cannot be automated at this moment
  xit("Highlighted border should appear after clicking into the GroupName input box in GroupChat Settings", () => {});

  // Cannot be automated at this moment
  xit("User can change name off the group", () => {});

  // Cannot be automated at this moment
  xit("Highlighted border should appear after clicking into the GroupDescription input box in GroupChat Settings", () => {});

  // Cannot be automated at this moment
  xit("User should be able to edit the description of the group", () => {});

  // Cannot be automated at this moment
  xit("User can toggle on/off Add Members", () => {});

  // Cannot be automated at this moment
  xit("User can toggle on/off ChangePhoto", () => {});

  // Cannot be automated at this moment
  xit("User can toggle on/off Change Details", () => {});

  // Cannot be automated at this moment
  xit("Highlighted border should appear around textbox in chat when user clicks into it", () => {});

  // Cannot be automated at this moment
  xit("User should already be clicked into textbox when they enter a chat", () => {});

  // Cannot be automated at this moment
  xit("User should not be able to send a blank message (Send button should be greyed out until any text is added into the textbox)", () => {});

  // Cannot be automated at this moment
  xit("Clicking Send Coin should open the modal", () => {});

  // Cannot be automated at this moment
  xit("Amount should be displayed at the top of Send Coin modal and user should be able to click into it and change amount", () => {});

  // Cannot be automated at this moment
  xit("Only numbers should be able to be inputed in Send Coin modal", () => {});

  // Cannot be automated at this moment
  xit("Highlighted border should appear when user clicks into Notes textbox in the Send Coin modal", () => {});

  // Cannot be automated at this moment
  xit("Recipients should appear in recipients box as they are added in Send Coin Modal", () => {});

  // Cannot be automated at this moment
  xit("Clicking the X should clear user from recipients box in Send Coin Modal", () => {});

  // Cannot be automated at this moment
  xit("Highlited border should appear around selected user", () => {});

  // Cannot be automated at this moment
  xit("Scrollbar should appear if uesr has enough friends for it in Send Coin Modal", () => {});

  // Cannot be automated at this moment
  xit("User should have to hold confirm for 3 seconds to send payment in Send Coin Modal", () => {});

  // Cannot be automated at this moment
  xit("Clicking Cancel should close Send Coin modal", () => {});

  // Cannot be automated at this moment
  xit("The chat typing indicator should be displayed when user is typing", () => {});

  // Cannot be automated at this moment
  xit("Scroll to bottom button should appear after scrolling up 2 messages", () => {});

  // Cannot be automated at this moment
  xit("Number of reactions should be displayed underneath message", () => {});

  // Cannot be automated at this moment
  xit("Markdown should show when typing in chatbar", () => {});

  // Cannot be automated at this moment
  xit("User should be able to click on image in chat to see image preview", () => {});

  // Cannot be automated at this moment
  xit("Uesr can download media from chat by clicking download", () => {});

  // Cannot be automated at this moment
  xit("User should be able to view a video through the embedded video player", () => {});

  // Cannot be automated at this moment
  xit("Messages should be limited to 2048 chars", () => {});
});
