import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMainPage from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsInventory from "./PageObjects/Settings/SettingsInventory";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";

describe("Settings - Inventory", () => {
  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser();
    chatsMainPage.validateChatsMainPageIsShown();
    chatsMainPage.goToSettings();
    settingsProfile.buttonInventory.click();
  });

  it("J1 - Page should display items purchased from Marketplace", () => {
    cy.url().should("include", "/settings/inventory");
    const expectedFrames = [
      { name: "Skull Party", type: "Profile Picture Frame" },
      { name: "Fire", type: "Profile Picture Frame" },
      { name: "Water", type: "Profile Picture Frame" },
      { name: "Gold", type: "Profile Picture Frame" },
      { name: "Mustache", type: "Profile Picture Frame" },
      { name: "Orbiting Moon", type: "Profile Picture Frame" },
    ];
    settingsInventory.validateInventoryFrames(expectedFrames);
  });

  it("J2 - After user selects Profile Picture Frame it should be properly displayed everywhere in the app where the user's profile picture appears", () => {
    cy.url().should("include", "/settings/inventory");

    // Fire inventory frame should not be equipped
    settingsInventory.getFrameButtonText("Fire").should("have.text", "Equip");

    // Equip Fire inventory frame
    settingsInventory.clickOnFrameButton("Fire");

    // Fire inventory frame should be equipped
    settingsInventory
      .getFrameContainer("Fire")
      .should("have.class", "equipped");

    settingsInventory.profilePictureFrameName.should("have.text", "Fire");
    settingsInventory.profilePictureFrameType.should(
      "have.text",
      "Profile Picture Frame",
    );

    settingsInventory.buttonProfile.click();
    settingsProfile.profileImageFrame
      .should("exist")
      .and("have.attr", "src", "/assets/frames/fire.png");

    settingsProfile.buttonInventory.click();
    ``;

    settingsInventory.profilePictureFrameUnequipButton
      .should("contain", "Unequip")
      .click();

    // Fire inventory frame should be equipped
    settingsInventory
      .getFrameContainer("Fire")
      .should("not.have.class", "equipped");

    settingsInventory.buttonProfile.click();
    settingsProfile.profileImageFrame.should("not.exist");
  });

  it("J3, J4, J5, J6 - Equipping and unequipping inventory item", () => {
    cy.url().should("include", "/settings/inventory");

    // Fire inventory frame should not be equipped
    settingsInventory.getFrameButtonText("Fire").should("have.text", "Equip");

    // Equip Fire inventory frame
    settingsInventory.clickOnFrameButton("Fire");

    // Fire inventory frame should be equipped
    settingsInventory
      .getFrameContainer("Fire")
      .should("have.class", "equipped");

    settingsInventory.inventoryFrameEquippedButton
      .should("have.css", "background-color", "rgb(77, 77, 255)")
      .should("contain", "Equipped");

    settingsInventory.profilePictureFrameName.should("have.text", "Fire");
    settingsInventory.profilePictureFrameType.should(
      "have.text",
      "Profile Picture Frame",
    );
    settingsInventory.profilePictureFrameUnequipButton
      .should("contain", "Unequip")
      .click();

    // Fire inventory frame should be equipped
    settingsInventory
      .getFrameContainer("Fire")
      .should("not.have.class", "equipped");
  });
});
