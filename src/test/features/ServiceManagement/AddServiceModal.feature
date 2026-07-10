@vignesh @addService
Feature: M_VIGNESHWARAN_2026_07_10_LMS_Add_Service_Modal_Feature

  Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Dynamic Field Settings" option from the sidebar
    And the user clicks the Add service button
    And the user fill the name and description
    And the user clicks the create service button
    Then the popup alert should be displayed as "Service created successfully"

  Scenario: Verify add service with name and description
    And the user fill the name and description
    And the user clicks the create service button
    Then the popup alert should be displayed as "Service created successfully"
    When the user clicks the "Course Management" option from the sidebar
    And the user clicks the Add Course button
    And the user clicks the Service type dropdown
    Then the user should see the added service as option

  Scenario: Verify duplicate service cannot be created
    And the user fill the name and description
    And the user clicks the create service button
    Then the popup alert should be displayed as "Service created successfully"
    When the user clicks the Add service button
    And the user fill the same name and description
    And the user clicks the create service button
    Then the popup alert should be displayed as "Request failed with status code 400"

  
  Scenario Outline: Verify add service with empty fields cannot be created
    When the user fill the service name as "<name>"
    And the user fill the service description as "<description>"
    And the user clicks the create service button
    Then the validation message should be displayed

    Examples:
      | name                 | description                    |
      | Software Development |                                |
      |                      | Full Stack Development Service |
      |                      |                                |
