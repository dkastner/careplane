Feature: Kayak
  As a Careplane user
  I want to see flight footprints on Kayak.com

  Scenario: Basic domestic search
    Given I am visiting "www.kayak.com"
    When I go to the home page
    And I follow "Flights"
    And I fill in "origin" with "DTW"
    And I fill in "destination" with "SFO"
    And I fill in "depart_date" with a departure date
    And I fill in "return_date" with a return date
    And I press "fdimgbutton"
    Then I should see "Emission estimates powered by Brighter Planet"
    And I should see "[\d]+,[\d]+ lbs CO2e"
