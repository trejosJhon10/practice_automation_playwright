import { Locator, Page, expect } from "@playwright/test";

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

export async function waitForStableText(locator: Locator, stableFor = 1000) {
  let lastValue = await locator.textContent();
  let stableSince = Date.now();

  while (Date.now() - stableSince < stableFor) {
    await locator.page().waitForTimeout(100);

    const currentValue = await locator.textContent();

    if (currentValue !== lastValue) {
      lastValue = currentValue;
      stableSince = Date.now();
    }
  }

  return lastValue;
}

export async function extractNumberFromString(string:any) {
  return parseFloat(string.replace(/[^0-9.]/g,''))
}