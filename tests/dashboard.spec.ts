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

});