@vignesh @addServiceModel @underDevelopment
Feature: M_VIGNESHWARAN_2026_07_10_LMS_Add_Service_Model_Feature

  Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Dynamic Field Settings" option from the sidebar
    And the user creates a new service

  Scenario Outline: Verify add service model with empty fields cannot be created
    And the user enter the service name in the search field
    And the user clicks the click to view button in the search result
    And the user clicks the Add model button
    And the user fill the "testcase" service model details
    And the user clicks the create model button
    Then the validation message should be displayed as "<message>"

    Examples:
      | testcase                           | message                   |
      | valid                              | Model Crated successfully |
      | without model name                 | Validation Error          |
      | with model description             | Validation Error          |
      | without model name and description | Validation Error          |
