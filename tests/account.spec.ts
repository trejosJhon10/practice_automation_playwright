import { expect } from '../fixtures/expect.fixture'
import { test } from '../fixtures/pages.fixtures'
import { extractNumberFromString, getShortAccountType } from '../utils/utility'

test.describe('Create a new account', () => {

    test.beforeEach(async ({ loginPage, dashBoardPage }) => {
        await loginPage.navigate_to_base_url()
        await loginPage.login('admin', 'admin123')
        await expect(dashBoardPage.page).toHaveURL('https://qaplayground.com/bank/dashboard')
    });

    test('User creates a new account and validates total balance at Dashboard', async ({ dashBoardPage, accountsPage, navigationPage }) => {
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

    test('User creates a new account and validates details', async ({ dashBoardPage, accountsPage}) => {
        const newAccountName = 'New Account 2'
        const newAccountBalance = 7312.68
        const newAccountType = 'Checking Account'
        const newAccountStatus = 'Inactive'

        await dashBoardPage.clickAddAccountBtn()
        await expect(accountsPage.page).toHaveURL('https://qaplayground.com/bank/accounts?action=add')
        await expect(accountsPage.newAccountModal).toBeVisible()
        await accountsPage.setAccountName(newAccountName)
        await accountsPage.selectAccountType(newAccountType)
        await accountsPage.setInitialAccountBalance(newAccountBalance)
        await accountsPage.setAccountStatus(newAccountStatus);
        await accountsPage.saveNewAccount();
        await expect(accountsPage.newAccountModal).toBeHidden()
        await accountsPage.waitForSuccessToast()

        const row = await accountsPage.getAccountsTableRowByValue(newAccountName)

        expect(await row.getByTestId('account-number').textContent()).not.toBeNull()
        expect(await row.getByTestId('account-name').textContent()).toBe(newAccountName)
        expect(await row.getByTestId('account-type').textContent()).toBe(getShortAccountType(newAccountType))
        expect(extractNumberFromString(await row.getByTestId('account-balance').textContent())).toBe(newAccountBalance)
        expect(await row.getByTestId('account-status').textContent()).toBe(newAccountStatus)
    })
});