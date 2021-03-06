Feature: Orbitz
  As a Careplane user
  I want to see flight footprints on Orbitz.com

  Background:
    Given I am visiting "www.orbitz.com"

  @javascript
  Scenario: Basic Orbitz search
    When I go to the home page
    And I choose "air" within "div.products"
    And I fill in "airOrigin" with "DTW" within "#airbotForm"
    And I fill in "airDestination" with "SFO" within "#airbotForm"
    And I fill in "airStartDate" with a departure date within "#airbotForm"
    And I fill in "airEndDate" with a return date within "#airbotForm"
    And I press "Find Flights" within "#airbotForm"
    And Careplane runs as soon as "#matrix" is visible
    Then I should see "Brighter Planet"
    And I should see carbon footprints


  @chrome @firefox @safari
  Scenario: Basic Orbitz search
    When I go to the home page
    And I click the Flight Only button
    And I fill in "ar.rt.leaveSlice.orig.key" with "DTW"
    And I fill in "ar.rt.leaveSlice.dest.key" with "SFO"
    And I fill in "ar.rt.leaveSlice.date" with a departure date
    And I fill in "ar.rt.returnSlice.date" with a return date
    And I press "Search Flights"
    Then I should see "Brighter Planet"
    And I should see carbon footprints
