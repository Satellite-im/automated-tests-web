import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsGamepad extends SettingsBase {
  readonly page: Page;
  readonly labelGamepadControllerInfo: Locator;
  readonly labelGamepadDeadzone: Locator;
  readonly labelGamepadLeftControlItem: Locator;
  readonly labelGamepadPointer: Locator;
  readonly labelGamepadRightControlItem: Locator;
  readonly gamepadMappings: Locator;
  readonly gamepadMappingsLeftControls: Locator;
  readonly gamepadMappingsRightControls: Locator;
  readonly gamepadLeftControlItemSelector: Locator;
  readonly gamepadLeftControlItemSelectorOption: Locator;
  readonly gamepadRightControlItemSelector: Locator;
  readonly gamepadRightControlItemSelectorOption: Locator;
  readonly rangeSelectorDeadzone: Locator;
  readonly rangeSelectorInputDeadzone: Locator;
  readonly rangeSelectorPointer: Locator;
  readonly rangeSelectorInputPointer: Locator;
  readonly switchGamepadEnabled: Locator;
  readonly textGamepadTestItOut: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.labelGamepadControllerInfo = page.getByTestId(
      "label-gamepad-controller-info",
    );
    this.labelGamepadDeadzone = page.getByTestId("label-gamepad-deadzone");
    this.labelGamepadLeftControlItem = page.getByTestId(
      "label-gamepad-left-control-item",
    );
    this.labelGamepadPointer = page.getByTestId("label-gamepad-pointer");
    this.labelGamepadRightControlItem = page.getByTestId(
      "label-gamepad-right-control-item",
    );
    this.gamepadMappings = page.getByTestId("gamepad-mappings");
    this.gamepadMappingsLeftControls = page.getByTestId(
      "gamepad-mappings-left-controls",
    );
    this.gamepadMappingsRightControls = page.getByTestId(
      "gamepad-mappings-right-controls",
    );
    this.gamepadLeftControlItemSelector = page.getByTestId(
      "selector-gamepad-left-control-item",
    );
    this.gamepadLeftControlItemSelectorOption =
      this.gamepadLeftControlItemSelector.getByTestId("selector-option");
    this.gamepadRightControlItemSelector = page.getByTestId(
      "selector-gamepad-right-control-item",
    );
    this.gamepadRightControlItemSelectorOption =
      this.gamepadRightControlItemSelector.getByTestId("selector-option");
    this.rangeSelectorDeadzone = page.getByTestId("range-selector").first();
    this.rangeSelectorInputDeadzone = this.rangeSelectorDeadzone.getByTestId(
      "range-selector-input",
    );
    this.rangeSelectorPointer = page.getByTestId("range-selector").last();
    this.rangeSelectorInputPointer = this.rangeSelectorPointer.getByTestId(
      "range-selector-input",
    );
    this.switchGamepadEnabled = page.getByTestId("switch-gamepad-enabled");
    this.textGamepadTestItOut = page.getByTestId("text-gamepad-test-it-out");
  }
}
