import { Page, expect } from "@playwright/test";

export function confirm_dialog(page: Page, message_expected: string) {
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain(message_expected);
    await dialog.accept();
  });
}
export function dismiss_dialog(page: Page, message_expected: string) {
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain(message_expected);
    await dialog.dismiss();
  });
}
