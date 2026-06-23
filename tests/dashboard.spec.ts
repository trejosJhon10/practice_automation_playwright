//import { expect } from '@playwright/test'
import { expect } from '../fixtures/expect.fixture'
import { test } from '../fixtures/pages.fixtures'

test.describe('Dashboard tests suite', () => {

    test.beforeEach(async ({ loginPage, dashBoardPage }) => {
        await loginPage.navigate_to_base_url()
        await loginPage.login('admin', 'admin123')
        await expect(dashBoardPage.page).toHaveURL('https://qaplayground.com/bank/dashboard')
    });

    test('Dashboard landing page succesfully displayed all expected elements', async({dashBoardPage}) => {
        await expect(dashBoardPage.navigationHeader).toBeReadyForInteraction()
        await expect(dashBoardPage.summarySection).toBeReadyForInteraction()
        await expect(dashBoardPage.quickActionsSection).toBeReadyForInteraction()
        await expect(dashBoardPage.quickStatsSection).toBeReadyForInteraction()
        await expect(dashBoardPage.pinnedAccountSection).toBeReadyForInteraction()
        await expect(dashBoardPage.recentTransactionSection).toBeReadyForInteraction()
        await expect(dashBoardPage.accountsOverviewSection).toBeReadyForInteraction()
    });

    test('navigation header on dashboard is displayed as expected', async ({dashBoardPage}) => {
        expect(await dashBoardPage.navigationBrandName.textContent()).toBe('SecureBank')

        await expect(dashBoardPage.navigationDashBoardBtn).toBeClickable()
        await expect(dashBoardPage.navigationDashBoardBtn).toHaveAttribute('href', '/bank/dashboard')

        await expect(dashBoardPage.navigationAccountsBtn).toBeClickable()
        await expect(dashBoardPage.navigationAccountsBtn).toHaveAttribute('href', '/bank/accounts')

        await expect(dashBoardPage.navigationTransactionsBtn).toBeClickable()
        await expect(dashBoardPage.navigationTransactionsBtn).toHaveAttribute('href', '/bank/transactions')

        await expect(dashBoardPage.navigationHelpAndDocsBtn).toBeClickable()
        await expect(dashBoardPage.navigationHelpAndDocsBtn).toHaveAttribute('href', '/docs/bank-demo')

        expect(await dashBoardPage.navigationUserInfo.textContent()).toBe('admin')
        await expect(dashBoardPage.logOutBtn).toBeClickable()
    });

});