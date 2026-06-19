import { expect } from '@playwright/test'
import { test } from '../fixtures/pages.fixtures'
import { ALERT_INVALID_LOGIN_MESSAGE } from '../constants.ts'

test.describe('Login process test', () => {

    test.beforeEach(async ({ loginPage, dashBoardPage }) => {
        await loginPage.navigate_to_base_url()
        await loginPage.login('admin', 'admin123')
        await expect(dashBoardPage.page).toHaveURL('https://qaplayground.com/bank/dashboard')
    });

    test('User is able to login into the app', async ({ dashBoardPage }) => {
        await expect(dashBoardPage.totalBalanceCard).toBeVisible()
        await expect(dashBoardPage.totalTransactionsCard).toBeVisible()
        await expect(dashBoardPage.activeAccountsCard).toBeVisible()
        await expect(dashBoardPage.logOutBtn).toBeVisible()
    }),

    test('user is able to use the toggle password btn', async ({loginPage, dashBoardPage}) => {
        await dashBoardPage.logout()
        await expect(loginPage.userNameInput).toBeVisible()

        await loginPage.login('fake', 'fake123');
        await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

        await loginPage.show_password_info();
        await expect(loginPage.passwordInput).toHaveAttribute('type','text');
        expect(await loginPage.passwordInput.inputValue()).toBe('fake123')
    }),

    test('User is able to login and log out from the app', async ({ loginPage, dashBoardPage }) => {
        await expect(dashBoardPage.logOutBtn).toBeVisible()

        await dashBoardPage.cancelLogOut()
        await expect(dashBoardPage.logOutBtn).toBeVisible()

        await dashBoardPage.logout()
        await expect(loginPage.userNameInput).toBeVisible()
        await expect(loginPage.passwordInput).toBeVisible()
    }),

    test('User is able to see error messages when wrong login', async( {loginPage, dashBoardPage }) => {
        await dashBoardPage.logout()
        await expect(loginPage.userNameInput).toBeVisible()

        await loginPage.login('fake', 'fake123')
        await expect(loginPage.alertInvalidLogin).toBeVisible()
        await expect(loginPage.alertInvalidLogin).toContainText(ALERT_INVALID_LOGIN_MESSAGE)
    })

});