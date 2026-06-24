import { expect } from '../fixtures/expect.fixture'
import { test } from '../fixtures/pages.fixtures'

test.describe('Navigation header suite test', () => {

    test.beforeEach(async ({ loginPage, dashBoardPage }) => {
        await loginPage.navigate_to_base_url()
        await loginPage.login('admin', 'admin123')
        await expect(dashBoardPage.page).toHaveURL('https://qaplayground.com/bank/dashboard')
    });

    test('navigation header on dashboard is displayed as expected', async ({navigationPage}) => {
        expect(await navigationPage.brandName.textContent()).toBe('SecureBank')

        await expect(navigationPage.dashboardBtn).toBeClickable()
        await expect(navigationPage.dashboardBtn).toHaveAttribute('href', '/bank/dashboard')

        await expect(navigationPage.accountsBtn).toBeClickable()
        await expect(navigationPage.accountsBtn).toHaveAttribute('href', '/bank/accounts')

        await expect(navigationPage.transactionsBtn).toBeClickable()
        await expect(navigationPage.transactionsBtn).toHaveAttribute('href', '/bank/transactions')

        await expect(navigationPage.helpAndDocsBtn).toBeClickable()
        await expect(navigationPage.helpAndDocsBtn).toHaveAttribute('href', '/docs/bank-demo')

        expect(await navigationPage.usernameInfo.textContent()).toBe('admin')
        await expect(navigationPage.logOutBtn).toBeClickable()
    });

});