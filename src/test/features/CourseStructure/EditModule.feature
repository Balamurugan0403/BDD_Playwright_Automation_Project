@Rohini @Edit_Module
Feature: RohiniM_21_Aug_2026_Edit_Modules

  Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Course Management" option from the sidebar

  @Valid_Edit @Edit
  Scenario: Edit an existing module with valid data
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin enables hierarchy action
    And the Admin clicks the Edit option
    And the Admin updates the module with valid data from CSV
    And the Admin saves the module
    Then the module should be updated successfully