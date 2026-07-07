Feature: M_VIGNESHWARAN_2026_07_07_Smart_Add_Service_Feature

  Background:
    Given the user launched the application
    And the user logged in as admin
    And the user clicks the "Dynamic Field Settings" option from the sidebar
    When the user clicks the Add service button

  Scenario: Verify add service with name and description
    And the user fill the name and description
      | Name                 | Description                    |
      | Software Development | Full Stack Development Service |
    And the user clicks the create service button
    Then the popup alert should be displayed as "Service Created Successfully"
    When the user clicks the "Course Management" option from the sidebar
    And the user clicks the Add Course button
    And the user clicks the Service type dropdown
    Then the user should see the added service as option

  Scenario Outline: Verify add service with empty fields
    When the user fill the service name as "<name>"
    And the user fill the service description as "<description>"
    And the user clicks the create service button
    Then the validation message should be displayed as "Please fill in this field."

    Examples:
      | Name                 | Description                    |
      | Software Development |                                |
      |                      | Full Stack Development Service |
      |                      |                                |

    
