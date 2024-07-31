Feature: Access a Product via category after applying multiple filters

  Scenario: Apply filters and verify on eBay
    Given I am on the ebay page
    When I navigate to "Electronics" > "Cell phones & accessories"
    And I click on Cell Phones & Smartphones
    And I click on All Filters
    And I apply filters for Condition is "New"
    And I apply filters for Price is 1000000 to 100000000
    And I apply filters for Item location is "Asia"
    And I click on Apply filters
    Then I should see the applied filter tags

  Scenario: Access a product via search
    Given I am on the ebay page
    When I search for "MacBook"
    And I change the category to "Computers/Tablets & Networking"
    And I click the search button
    Then the page should load completely
    And the first result name should contain "MacBook"
