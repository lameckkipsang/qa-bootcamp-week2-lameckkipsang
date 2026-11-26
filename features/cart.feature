Feature: Shopping cart management
  As a Toolshop shopper
  I want to add, update, and remove products in my shopping cart
  So that I can review my items before checking out

  Background:
    Given the shopper is on the Toolshop home page

  Scenario: Add an in-stock product to the cart
    When the shopper opens the "Combination Pliers" product page
    And adds 1 unit to the cart
    Then the shopping cart shows 1 item
    And "Combination Pliers" appears in the cart with its unit price

  Scenario: Update the quantity of an item in the cart
    Given the shopper has 1 "Combination Pliers" in the cart
    When the shopper views the shopping cart
    And changes the quantity of "Combination Pliers" to 2
    Then the shopping cart shows 2 items
    And the item total updates to reflect 2 units

  Scenario: Remove an item from the cart
    Given the shopper has "Combination Pliers" in the cart
    When the shopper views the shopping cart
    And removes "Combination Pliers" from the cart
    Then the shopping cart is empty