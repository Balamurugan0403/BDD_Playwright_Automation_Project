Feature: Add Modules to the course structure
    As an admin,
    I want to add a new module to a course
    So that I can organize the course content.

Background:
    Given the Admin is logged into the LMS
    #And the admin has created the course
    And the Admin navigates to the Course Structure page
@Rohini @Add_Module
Scenario: Add module with all mandatory fields
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin add the module with valid details
    Then a success message should be displayed
    Then the module should appear in the course structure

@Rohini @Add_Module
Scenario: Add module without Title
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin add the module without entering the title
    Then the validation message should be displayed
<<<<<<< HEAD

@Rohini @Add_Module
Scenario: Add module with exceed title length
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin add the module with exceed title length
      | title                                  |
      | SampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSample |
    Then the admin shouldn't be able to add the module

@Rohini @Special
Scenario Outline: Add module with special characters in the module title
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin adds the module with title "<title>" and description "<description>"
    Then a success message should be displayed
    And the module "<title>" should appear in the course structure

Examples:
    | title          | description        |
    | @#$%^&*()_+{}! | Sample Description |
=======
>>>>>>> abe279a18a36121489d0cbe11d1e607f7b4e910c
