Feature: Add Modules to the course structure
    As an admin,
    I want to add a new module to a course
    So that I can organize the course content.

Background:
    Given the Admin is logged into the LMS
    #And the admin has created the course
    And the Admin navigates to the Course Structure page
@Rohini
Scenario: Add module with all mandatory fields
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin add the module with valid details
    Then a success message should be displayed
    Then the module should appear in the course structure

@Rohini @Invalid
Scenario: Add module without Title
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin add the module without entering the title
    Then the validation message should be displayed
