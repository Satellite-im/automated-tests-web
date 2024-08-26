import { test } from "../fixtures/setup";

test.describe("Chats Tests - Two instances", () => {
  test.skip("B8 to B14 - Quick Profile tests", async ({ page }) => {
    // Test to be added
    // B8 - Clicking Profile button in 1on1 chat should display the friends profile
    // B9 - Friends profile should display friends profile picture
    // B10 - Friends profile should display friends status (whether you are friends or not)
    // B11 - Friends profile should display friends Username
    // B12 - Friends profile should display friends profile Status
    // B13 - User should be able to write a note on friends profile
    // B14 - Highlighted border should appear when user clicks into Notes textbox
  });

  test.skip("B15 and B26 to B34 - Group Chats Tests", async ({ page }) => {
    // Group chats not implemented yet
    // B15 - Clicking Groups button should display group members of the chat
    // B26 - Clicking the X next to a friend in the GroupMembers Modal should remove friend from groupchat
    // B27 - Clicking the Settings button should open the Group Chat Settings
    // B28 - Highlighted border should appear after clicking into the GroupName input box in GroupChat Settings
    // B29 - User can change name of the group
    // B30 - Highlighted border should appear after clicking into the GroupDescription input box in GroupChat Settings
    // B31 - User should be able to edit the description of the group
    // B32 - User can toggle on/off Add Members
    // B33 - User can toggle on/off ChangePhoto
    // B34 - User can toggle on/off Change Details
    // C13 - Number of members in group should appear on that chat in both Sidebar and Favorites
  });

  test.skip("B18 and B19, B23 to B25 - Chats Context Menu tests", async ({
    page,
  }) => {
    // Test to be implemented
    // B18 - Context menu appears when user right clicks a message
    // B19 - When user clicks their own message context menu should display Top 5 Most Used Emojis, Pin Message, Reply, React, Copy, Edit, Delete
    // B23 - Clicking Copy should copy text to users clipboard
    // B24 - Clicking Edit should open up the edit message modal
    // B25 - Clicking Delete should delete message from chat
  });

  test.skip("B20 - Pin Messages Tests", async ({ page }) => {
    // B20 - Clicking Pin Message should pin message in chat
  });

  test.skip("B21 - Replies Tests", async ({ page }) => {
    // B21 - Clicking Reply should open reply modal
  });

  test.skip("B22 and B50 - Reaction Tests", async ({ page }) => {
    // B22 - Clicking React should open up emoji menu
    // B50 - Number of reactions should be displayed underneath message
  });

  test.skip("B38 to B47 - Send coin tests", async ({ page }) => {
    // B38 - Clicking Send Coin should open the modal
    // B39 - Amount should be displayed at the top of Send Coin modal and user should be able to click into it and change amount
    // B40 - Only numbers should be able to be inputted in Send Coin modal
    // B41 - Highlighted border should appear when user clicks into Notes textbox in the Send Coin modal
    // B42 - Recipients should appear in recipients box as they are added in Send Coin Modal
    // B43 - Clicking the X should clear user from recipients box in Send Coin Modal
    // B44 - Highlighted border should appear around selected user
    // B45 - Scrollbar should appear if user has enough friends for it in Send Coin Modal
    // B46 - User should have to hold confirm for 3 seconds to send payment in Send Coin Modal
    // B47 - Clicking Cancel should close Send Coin modal
  });

  test.skip("B48 - Typing indicator tests", async ({ page }) => {
    // B48 - The chat typing indicator should be displayed when user is typing
    // C18 - Typing indicator should be displayed around users profile picture when they are typing (this applies to favorites as well)
  });

  test.skip("B49 - Scroll to bottom button tests", async ({ page }) => {
    // B49 - Scroll to bottom button should appear after scrolling up 2 messages
  });

  test.skip("B51 - Markdown messages tests", async ({ page }) => {
    // Test code for B51
  });

  test.skip("B52 and B53 - Sending and receiving files tests", async ({
    page,
  }) => {
    // B52 - User should be able to click on image in chat to see image preview
    // B53 - User can download media from chat by clicking download
  });

  test.skip("B54 - User should be able to view a video through the embedded video player", async ({
    page,
  }) => {
    // Test code for B54
  });
});
