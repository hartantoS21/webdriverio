import { $ } from '@wdio/globals'
import Page from './page.js';

class HomeEbayPage extends Page {
    // Define page selectors and methods specific to the home page
    get shopByCategory() { return $('#gh-shop-a'); }
    getCategory(categoryName) { return $(`a[href*="${categoryName}"]`); }
    getSubCategory(subCategoryName) { return $(`//a[contains(text(), '${subCategoryName}')]`); }

    get searchInput() { return $('#gh-ac'); }
    get categoryDropdown() { return $('#gh-cat'); }
    get searchButton() { return $('#gh-btn'); }
    

    async navigateToByCategory(category, subCategory) {
        await this.shopByCategory.click();
        const categoryElement = this.getCategory(category);
        await categoryElement.waitForDisplayed({ timeout: 5000 });
        await browser.pause(1000);

        const subCategoryElement = this.getSubCategory(subCategory);
        await subCategoryElement.waitForDisplayed({ timeout: 5000 });
        await subCategoryElement.click();
    }

    async open() {
        return super.open('ebay');
    }

    async searchForItem(searchString) {
        await this.searchInput.setValue(searchString);
    }

    async changeCategory(category) {
        await this.categoryDropdown.selectByVisibleText(category);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }
}

export default new HomeEbayPage();
