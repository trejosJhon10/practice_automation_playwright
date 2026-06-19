import { LoginPage } from '../pages/login.page'
import { DashBoardPage } from '../pages/dashboard.page';
import { test as baseTest } from '@playwright/test'

type MyPages = {
    loginPage: LoginPage;
    dashBoardPage: DashBoardPage;
}

export const test = baseTest.extend<MyPages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashBoardPage: async ({page}, use) => {
        await use(new DashBoardPage(page));
    }
})