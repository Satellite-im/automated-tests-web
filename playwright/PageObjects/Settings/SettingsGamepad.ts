import { vi } from "@faker-js/faker";
import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsGamepad extends SettingsBase {
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

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.labelGamepadControllerInfo = this.page.getByTestId(
      "label-gamepad-controller-info",
    );
    this.labelGamepadDeadzone = this.page.getByTestId("label-gamepad-deadzone");
    this.labelGamepadLeftControlItem = this.page.getByTestId(
      "label-gamepad-left-control-item",
    );
    this.labelGamepadPointer = this.page.getByTestId("label-gamepad-pointer");
    this.labelGamepadRightControlItem = this.page.getByTestId(
      "label-gamepad-right-control-item",
    );
    this.gamepadMappings = this.page.getByTestId("gamepad-mappings");
    this.gamepadMappingsLeftControls = this.page.getByTestId(
      "gamepad-mappings-left-controls",
    );
    this.gamepadMappingsRightControls = this.page.getByTestId(
      "gamepad-mappings-right-controls",
    );
    this.gamepadLeftControlItemSelector = this.page.getByTestId(
      "selector-gamepad-left-control-item",
    );
    this.gamepadLeftControlItemSelectorOption =
      this.gamepadLeftControlItemSelector.getByTestId("selector-option");
    this.gamepadRightControlItemSelector = this.page.getByTestId(
      "selector-gamepad-right-control-item",
    );
    this.gamepadRightControlItemSelectorOption =
      this.gamepadRightControlItemSelector.getByTestId("selector-option");
    this.rangeSelectorDeadzone = this.page
      .getByTestId("range-selector")
      .first();
    this.rangeSelectorInputDeadzone = this.rangeSelectorDeadzone.getByTestId(
      "range-selector-input",
    );
    this.rangeSelectorPointer = this.page.getByTestId("range-selector").last();
    this.rangeSelectorInputPointer = this.rangeSelectorPointer.getByTestId(
      "range-selector-input",
    );
    this.switchGamepadEnabled = this.page.getByTestId("switch-gamepad-enabled");
    this.textGamepadTestItOut = this.page.getByTestId(
      "text-gamepad-test-it-out",
    );
  }
}
