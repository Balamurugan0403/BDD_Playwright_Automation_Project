@vignesh @searchService
Feature: M_VIGNESHWARAN_2026_07_09_LMS_Search_Service_Feature

  Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Dynamic Field Settings" option from the sidebar
    And the user clicks the Add service button
    And the user fill the name and description
    And the user clicks the create service button
    Then the popup alert should be displayed as "Service created successfully"

  Scenario Outline: Verify search with valid keyword and case-insensitivity
    When the user enter the service name in the search field in "<case>"
    Then the services matching to the service name should be displyed

    Examples:
      | case   |
      | normal |
      | upper  |
      | lower  |

  Scenario: Verify error messge is displayed when no matches exist.
    When the user enter the different service name in the search field
    Then the message should be displayed as "No services found matching your search"

    