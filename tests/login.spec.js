import { expect } from '@playwright/test'
import { test } from '../fixtures/pages.fixtures'

test.describe('Login process test', () => {

    test.beforeEach(async ({ loginPage, dashBoardPage }) => {
        await loginPage.navigate_to_base_url()
        await loginPage.login('admin', 'admin123')
        await expect(dashBoardPage.page).toHaveURL('https://qaplayground.com/bank/dashboard')
    });

    test('User is able to login into the app as admin user', async ({ dashBoardPage }) => {
        await expect(dashBoardPage.totalBalanceCard).toBeVisible()
        await expect(dashBoardPage.totalTransactionsCard).toBeVisible()
        await expect(dashBoardPage.activeAccountsCard).toBeVisible()
        await expect(dashBoardPage.logOutBtn).toBeVisible()
    }),

    test('User is able to login and log out from the app', async ({ loginPage, dashBoardPage }) => {
        await expect(dashBoardPage.logOutBtn).toBeVisible()

        await dashBoardPage.cancelLogOut()
        await expect(dashBoardPage.logOutBtn).toBeVisible()
        
        await dashBoardPage.logout()
        await expect(loginPage.userNameInput).toBeVisible()
        await expect(loginPage.passwordInput).toBeVisible()
    })

});