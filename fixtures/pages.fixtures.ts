import { LoginPage } from '../pages/login.page';
import { DashBoardPage } from '../pages/dashboard.page';
import { AccountsPage } from '../pages/accounts.page';
import { NavigationPage } from '../pages/navigation.page';
import { test as baseTest } from '@playwright/test';

type MyPages = {
    loginPage: LoginPage;
    dashBoardPage: DashBoardPage;
    accountsPage: AccountsPage;
    navigationPage: NavigationPage;
}

export const test = baseTest.extend<MyPages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashBoardPage: async ({page}, use) => {
        await use(new DashBoardPage(page));
    },
    accountsPage: async ({page}, use) => {
        await use(new AccountsPage(page))
    },
    navigationPage: async ({page}, use) => {
        await use(new NavigationPage(page))
    }
})