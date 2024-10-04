import MainPage from "./MainPage";
import { type Locator, type Page } from "@playwright/test";

export class CallControls extends MainPage {
  readonly callAnswerButton: Locator;
  readonly callControls: Locator;
  readonly callDeafenButton: Locator;
  readonly callDenyButton: Locator;
  readonly callEndButton: Locator;
  readonly callGoButton: Locator;
  readonly callMuteButton: Locator;
  readonly ellapsedTimeCallText: Locator;
  readonly inCallLabel: Locator;
  readonly incomingCallLabel: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.callAnswerButton = this.page.getByTestId("button-call-answer");
    this.callControls = this.page.getByTestId("call-controls");
    this.callDeafenButton = this.page.getByTestId("button-call-deafen");
    this.callDenyButton = this.page.getByTestId("button-call-deny");
    this.callEndButton = this.page.getByTestId("button-call-end");
    this.callGoButton = this.page.getByTestId("button-call-go");
    this.callMuteButton = this.page.getByTestId("button-call-mute");
    this.ellapsedTimeCallText = this.callControls.getByTestId(
      "text-ellapsed-time-call",
    );
    this.inCallLabel = this.callControls.getByTestId("label-in-call");
    this.incomingCallLabel = this.page.getByTestId("label-incoming-call");
  }
}
