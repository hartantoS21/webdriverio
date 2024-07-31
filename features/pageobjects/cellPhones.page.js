import { $ } from '@wdio/globals'
import Page from './page.js';

class CellPhonesPage extends Page {
    get cellPhonesSmartphones() { return $(`//a[contains(text(), 'Cell Phones & Smartphones')]`); }
    get allFiltersButton() { return $('button[aria-label="All Filters"]'); }

    async clickOnCellPhonesSmartphones() {
        await this.cellPhonesSmartphones.waitForDisplayed({ timeout: 5000 });
        await this.cellPhonesSmartphones.click();
        await browser.pause(1000); // Delay of 1 second
    }

    async clickAllFilters() {
        await browser.pause(1000); 
        await this.allFiltersButton.waitForDisplayed({ timeout: 5000 });
        await this.allFiltersButton.click();
        await browser.pause(1000); // Delay of 1 second
    }
}

export default new CellPhonesPage();
