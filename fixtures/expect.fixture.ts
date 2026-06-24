import { expect as baseExpect} from '@playwright/test';

export const expect = baseExpect.extend({
  async toBeReadyForInteraction(locator) {
    await locator.scrollIntoViewIfNeeded();

    await expect(locator).toBeAttached();
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await expect(locator).toBeInViewport();

    return {
      pass: true,
      message: () => 'Element is ready for interaction'
    };
  },
  async toBeClickable(locator) {
    try {
      await locator.click({ trial: true });

      return {
        pass: true,
        message: () => 'Element is clickable'
      };
    } catch (error) {
      return {
        pass: false,
        message: () =>
          `Expected element to be clickable.\n\n${error}`
      };
    }
  },
  async toBeReadyForTyping(locator) {
    await locator.scrollIntoViewIfNeeded();

    await expect(locator).toBeAttached();
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await expect(locator).toBeEditable();

    return {
      pass: true,
      message: () => 'Element is ready for typing'
    };
  }
});