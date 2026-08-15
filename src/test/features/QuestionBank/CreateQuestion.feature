@bala @createQuestion
Feature: Question Bank Management

  Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Question Banks" option from the sidebar


  Scenario Outline: Verify question can be added successfully for <TestCase>
    And the user clicks the "Create Question" button
    And the user fills the question details for "<TestCase>"
    And the user clicks the "Save Questions" button
    Then the question should be displayed in the question list

    Examples:
      | TestCase            |
      | OS_Question         |
      | DBMS_Question       |
      | Networking_Question |
      | DS_Question         |
      | OOP_Question        |


  Scenario Outline: Verify question can be deleted successfully for <TestCase>
    And the user searches for the question "<TestCase>"
    And the user clicks the "Delete" icon for the question
    And the user confirms the deletion
    Then the question should not be displayed in the question list

    Examples:
      | TestCase            |
      | OS_Question         |
      | DBMS_Question       |
      | Networking_Question |
      | DS_Question         |
      | OOP_Question        |