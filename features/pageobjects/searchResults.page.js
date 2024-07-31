import { $ } from '@wdio/globals'
import Page from './page.js';

class SearchResultsPage extends Page{
    get firstResult() { return $('//ul[@class="srp-results srp-list clearfix"]/li[2]//div[@class="s-item__info clearfix"]//div[@class="s-item__title"]/span'); }
    
    async getFirstResultName() {
        return await this.firstResult.getText();
    }
}

export default new SearchResultsPage();