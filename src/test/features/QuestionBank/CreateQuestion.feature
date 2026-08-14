@bala @createQuestion
Feature: Question Bank Management

  Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Question Banks" option from the sidebar


  Scenario: Verify question can be added successfully
    And the user clicks the "Create Question" button
    And the user fills the question details
    And the user clicks the "Save Questions" button
    Then the question should be displayed in the question list