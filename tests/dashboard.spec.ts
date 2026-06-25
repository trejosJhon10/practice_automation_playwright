import { expect } from '../fixtures/expect.fixture'
import { test } from '../fixtures/pages.fixtures'
import { waitForStableText } from '../utils/utility'

test.describe('Dashboard tests suite', () => {

    test.beforeEach(async ({ loginPage, dashBoardPage }) => {
        await loginPage.navigate_to_base_url()
        await loginPage.login('admin', 'admin123')
        await expect(dashBoardPage.page).toHaveURL('https://qaplayground.com/bank/dashboard')
        await waitForStableText(dashBoardPage.totalBalanceValue);
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

    test('Dashboard quick actions navigation', async({dashBoardPage, accountsPage, navigationPage, transactionsPage}) => {
        await dashBoardPage.clickAddAccountBtn()
        await expect(accountsPage.page).toHaveURL('https://qaplayground.com/bank/accounts?action=add')
        await expect(accountsPage.newAccountModal).toBeVisible()
        await accountsPage.cancelNewAccount()
        await expect(accountsPage.newAccountModal).not.toBeVisible()

        await navigationPage.gotoDashboard()
        await expect(dashBoardPage.page).toHaveURL('https://qaplayground.com/bank/dashboard')
        await waitForStableText(dashBoardPage.totalBalanceValue)
        
        await dashBoardPage.clicNewTransaction()
        await expect(transactionsPage.page).toHaveURL('https://qaplayground.com/bank/transactions?action=new')
        await expect(transactionsPage.newTransactionModal).toBeVisible()
        await transactionsPage.cancelNewAccount()
        await expect(transactionsPage.newTransactionModal).toBeHidden()
    });

});