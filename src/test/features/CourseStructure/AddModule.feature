Feature: RohiniM_07_JUL_2026_Add_Modules
    As an admin,
    I want to add a new module to a course
    So that I can organize the course content.

Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Course Management" option from the sidebar

@Rohini @Add_Module @Valid
Scenario: Add module with all mandatory fields
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin add the module with valid details
    Then a success message should be displayed
    And the module should appear in the course structure

@Rohini @Add_Module @WithoutTitle
Scenario: Add module without Title
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin add the module without entering the title
    Then the title validation message should be displayed

@Rohini @Add_Module @SpecialCharacter @Bug
Scenario Outline: Add module with special characters in the module title
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin adds the module with title "<title>" description "<description>" and skills "<skills>"
    Then the title validation message should be displayed
    
Examples:
    | title          | description        | skills |
    | @#$%^&*()_+{}! | Sample Description | HTML, CSS |

@Rohini @Add_Module @ExistingModule
Scenario: Add module with existing module name
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin add module with existing module name
    Then a success message should be displayed
    And the module count should increase for the existing module