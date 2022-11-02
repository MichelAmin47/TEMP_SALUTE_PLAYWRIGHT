Feature: As a user I want to fill in the contact form so I can ventilate my thoughts.

    # The tag '@test' corresponds with the one set in the package.json 'test' script
    @test @demo @Smoke
    Scenario: Navigate to contact page, fill in and send contact form and validate displayed message
        When User opens the webshop
        Then User is on the homepage
        When User navigates to the contact page
        # This step takes an argument for the subject. Check the common/Smoke.js file for allowed values.
        When User fills in the contact form with subject "Customer service", email "myEmail@gmail.com", file " " and message " "
        Then The correct send success message should be displayed

    @test @demo
    Scenario Outline: The products shown in the shop are showing properly
        When User opens the webshop
        Then User is on the homepage
        When I open the details for product "<productName>"
        Then The product has the following description "<description>" and price "<price>"
        Examples:
            | productName                 | description                                                                                                                                                                                                                                                                                                                                                        | price  |
            | Hummingbird printed t-shirt | Symbol of lightness and delicacy, the hummingbird evokes curiosity and joy. Studio Design' PolyFaune collection features classic products with colorful patterns, inspired by the traditional japanese origamis. To wear with a chino or jeans. The sublimation textile printing process provides an exceptional color rendering and a color, guaranteed overtime. | €23.14 |
            | The best is yet to come'... | The best is yet to come! Give your walls a voice with a framed poster. This aesthethic, optimistic poster will look great in your desk or in an open-space office. Painted wooden frame with passe-partout for more depth.                                                                                                                                         | €35.09 |
            | Mug The best is yet to come | The best is yet to come! Start the day off right with a positive thought. 8,2cm diameter / 9,5cm height / 0.43kg. Dishwasher-proof.                                                                                                                                                                                                                                | €14.40 |


    @test @demo
    Scenario: As a customer i would like to order multiple products
        When User opens the webshop
        Then User is on the homepage
        When I add the following product to my shopping cart
            | item                        |
            | Hummingbird printed sweater |
            | Mug The adventure begins    |
        Then I open the shopping cart
        Then The shopping cart contains "2" products with a total of "€49.15"

    @test @demo @only
    Scenario: As an affiliate i would like to check the price of the product via the API
        Given An affiliate has a valid token
        Then Via the API product "2" has name "Hummingbird printed sweater" and price of "35.90"

# @test @demo
# Scenario: Reading CSV and JSON files
#     Given A CSV file is available
#     And A JSON file is available
#     Then Output the CSV file content to the log
#     And Output the JSON file content to the log

# @test @demo
# Scenario: This is a scenario which demonstrates some of the pre-loaded plugins (not standard cypress)
#     Given User is on the homepage
#     Then The page must comply with WCAG
#     # And As a user i would like to run a specific query on Microsoft SQL Server
#     # And As a user i would like to run a specific query on MySQL Server
#     And A user needs to use NTLM to log on to the application