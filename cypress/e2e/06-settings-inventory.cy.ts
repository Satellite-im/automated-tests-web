import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMainPage from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsInventory from "./PageObjects/Settings/SettingsInventory";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";

describe("Settings - Inventory", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);
  const pin = "1234";

  beforeEach(() => {
    // Login and set up user before each test
    loginPinPage.loginWithPin(pin);
    authNewAccount.createRandomUser(username, status);
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

    // Equip Fire inventory frame
    equipFrame("Fire");

    // Validate the frame is equipped and displayed correctly
    validateEquippedFrame("Fire");

    // Navigate to Profile page and verify frame is displayed
    settingsInventory.buttonProfile.click();
    settingsProfile.profileImageFrame
      .should("exist")
      .and("have.attr", "src", "/assets/frames/fire.png");

    // Navigate back to Inventory and unequip the frame
    settingsProfile.buttonInventory.click();
    unequipFrame("Fire");

    // Validate the frame is unequipped
    settingsInventory.buttonProfile.click();
    settingsProfile.profileImageFrame.should("not.exist");
  });

  it("J3, J4, J5, J6 - Equipping and unequipping inventory item", () => {
    cy.url().should("include", "/settings/inventory");

    // Equip Fire inventory frame
    equipFrame("Fire");

    // Validate equipped frame
    settingsInventory.inventoryFrameEquippedButton
      .should("have.css", "background-color", "rgb(77, 77, 255)")
      .should("contain", "Equipped");

    settingsInventory.profilePictureFrameName.should("have.text", "Fire");
    settingsInventory.profilePictureFrameType.should(
      "have.text",
      "Profile Picture Frame",
    );

    // Unequip the frame
    unequipFrame("Fire");
  });

  // Helper functions
  const equipFrame = (frameName) => {
    settingsInventory
      .getFrameButtonText(frameName)
      .should("have.text", "Equip");
    settingsInventory.clickOnFrameButton(frameName);
    settingsInventory
      .getFrameContainer(frameName)
      .should("have.class", "equipped");
  };

  const unequipFrame = (frameName) => {
    settingsInventory.profilePictureFrameUnequipButton
      .should("contain", "Unequip")
      .click();
    settingsInventory
      .getFrameContainer(frameName)
      .should("not.have.class", "equipped");
  };

  const validateEquippedFrame = (frameName) => {
    settingsInventory.profilePictureFrameName.should("have.text", frameName);
    settingsInventory.profilePictureFrameType.should(
      "have.text",
      "Profile Picture Frame",
    );
  };
});
