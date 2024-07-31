import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import HomeEbayPage from '../pageobjects/home.ebay.page.js';
import CellPhonesPage from '../pageobjects/cellPhones.page.js';
import FiltersPage from '../pageobjects/filters.page.js';
import SearchResultsPage from '../pageobjects/searchResults.page.js';

const pages = {
    ebay: HomeEbayPage,
    cellPhones: CellPhonesPage,
    filter: FiltersPage,
    searchResults: SearchResultsPage
}

let filter = [] , minPrice, maxPrice;

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I navigate to "([^"]+)" > "([^"]+)"$/, async (category, subCategory) => {
    await HomeEbayPage.navigateToByCategory(category, subCategory);
});

When('I click on Cell Phones & Smartphones', async () => {
    await CellPhonesPage.clickOnCellPhonesSmartphones();
});

When('I click on All Filters', async () => {
    await CellPhonesPage.clickAllFilters();
});

When('I apply filters for Condition is {string}', async (condition) => {
    filter.push(`Condition: ${condition}`)
    await FiltersPage.applyConditionFilter(condition);
});

When('I apply filters for Price is {int} to {int}', async (min, max) => {
    minPrice = min;
    maxPrice = max;
    filter.push(`Price: $${min} to $${max}`)
    await FiltersPage.applyPriceFilter(minPrice, maxPrice);
});

When('I apply filters for Item location is {string}', async (location) => {
    filter.push(`Item Location: ${location}`)
    await FiltersPage.applyItemLocationFilter(location);
});

When('I click on Apply filters', async () => {
    await FiltersPage.clickApplyButton();
});

Then('I should see the applied filter tags', async () => {
    await FiltersPage.verifyFilters(filter, minPrice, maxPrice);
});

When('I search for {string}', async (searchString) => {
    await HomeEbayPage.searchForItem(searchString);
});

When('I change the category to {string}', async (category) => {
    await HomeEbayPage.changeCategory(category);
});

When('I click the search button', async () => {
    await HomeEbayPage.clickSearchButton();
});

Then('the page should load completely', async () => {
    await expect(browser).toHaveUrlContaining('ebay.com');
    await expect($('body')).toBeDisplayed();
});

Then('the first result name should contain {string}', async (searchString) => {
    const firstResultName = await SearchResultsPage.getFirstResultName();
    await expect(firstResultName).toContain(searchString);
});