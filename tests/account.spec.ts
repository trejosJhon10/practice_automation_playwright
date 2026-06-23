import { expect } from '@playwright/test'
import { test } from '../fixtures/pages.fixtures'

test.describe('Create a new account', () => {

    test.beforeEach(async ({ loginPage, dashBoardPage }) => {
        await loginPage.navigate_to_base_url()
        await loginPage.login('admin', 'admin123')
        await expect(dashBoardPage.page).toHaveURL('https://qaplayground.com/bank/dashboard')
    });

    test('User creates a new account and validates total balance', async ({ dashBoardPage, accountsPage, navigationPage }) => {
        const initValue = await dashBoardPage.obtainTotalBalance();
        const newAccountBalance = 1234.34
        await dashBoardPage.clickAddAccountBtn()
        await expect(accountsPage.page).toHaveURL('https://qaplayground.com/bank/accounts?action=add')
        await expect(accountsPage.newAccountModal).toBeVisible()
        await accountsPage.setAccountName('New Account 1')
        await accountsPage.selectAccountType('Savings Account')
        await accountsPage.setInitialAccountBalance(newAccountBalance)
        await accountsPage.setAccountStatus('Active');
        await accountsPage.saveNewAccount();
        await expect(accountsPage.newAccountModal).toBeHidden()
        await accountsPage.waitForSuccessToast()
        await navigationPage.gotoDashboard();
        expect(await dashBoardPage.obtainTotalBalance()).toBe(initValue + newAccountBalance)
    })

});