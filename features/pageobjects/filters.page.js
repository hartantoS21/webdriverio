import { $ } from '@wdio/globals'
import Page from './page.js';

class FiltersPage extends Page {
    get conditionFilter() { return $('//*[@id="c3-mainPanel-condition"]'); }
    get priceFilter() { return $('//*[@id="c3-mainPanel-price"]'); }
    get itemLocationFilter() { return $('//*[@id="c3-mainPanel-location"]'); }
    get applyButton() { return $('button[aria-label="Apply"]'); }
    get filterHeader() { return $('//h1[@class="b-pageheader"]/span'); }
    get appliedFilter() { return $('//span[contains(text(),"filters applied")]/parent::button'); }
    get appliedFilterTags() {
        return $$('//li[@class="brm__aspect-item brm__aspect-item--applied"]//span[@class="brm__item-label"]');
    }
    async applyConditionFilter(condition) {
        await this.conditionFilter.click();
        await browser.pause(5000);
        const conditionCheckbox = $(`//label[@for="c3-subPanel-LH_ItemCondition_${condition}_cbx"]`);
        await conditionCheckbox.waitForDisplayed({ timeout: 5000 });
        await conditionCheckbox.click();
        await browser.pause(1000); // Delay of 1 second
        // }
    }

    async applyPriceFilter(minPrice, maxPrice) {
        await this.priceFilter.waitForDisplayed({ timeout: 5000 });
        await this.priceFilter.click();
        const minPriceInput = $('input[aria-label="Minimum Value, US Dollar"]');
        const maxPriceInput = $('input[aria-label="Maximum Value, US Dollar"]');

        await minPriceInput.setValue(minPrice);
        await browser.pause(500); // Delay of 0.5 second

        await maxPriceInput.setValue(maxPrice);
        await browser.pause(500); // Delay of 0.5 second
    }

    async applyItemLocationFilter(location) {
        await this.itemLocationFilter.click()
        const locationRadioBtn = $(`//div[@id="c3-subPanel-location_${location}"]/span/span`)
        await locationRadioBtn.waitForDisplayed({ timeout: 5000 });
        await locationRadioBtn.click();
        await browser.pause(1000); // Delay of 1 second
    }

    async clickApplyButton() {
        await this.applyButton.waitForDisplayed({ timeout: 5000 });
        await this.applyButton.click();
    }

    async verifyFilters(filter, minPrice, maxPrice) {
        await this.filterHeader.waitForDisplayed({ timeout: 10000 });
        const expectedText = `Cell Phones & Smartphones between IDR${(minPrice)} and IDR${(maxPrice)}`;
        let actualText = await this.filterHeader.getText();

        // Remove commas and ".00" from the actual text
        actualText = actualText.replace(/\.00/g, '').replace(/,/g, '');

        expect(actualText).toContain(expectedText);

        await this.appliedFilter.waitForDisplayed({ timeout: 10000 });
        await this.appliedFilter.click()
        const tags = await this.appliedFilterTags;
    
        for (let i = 0; i < tags.length; i++) {
            const actualText = await tags[i].getText();
            expect(actualText.replace(/\.00/g, '').replace(/,/g, '')).toContain(filter[i]);
        }
    }
}

export default new FiltersPage();