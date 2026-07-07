@Rohini
Feature: Add Modules to the course structure
    As an admin,
    I want to add a new module to a course
    So that I can organize the course content.

Background:
    Given the Admin is logged into the LMS
    #And the admin has created the course
    And the Admin navigates to the Course Structure page

Scenario: Add module with all mandatory fields
    When the Admin clicks the "Add Course Structure" button
    And the Admin clicks the "Add module" icon
    And the Admin enters valid module details
    And the Admin clicks the "Add Module" button
    Then a success message should be displayed
    And the module should appear in the course structure
