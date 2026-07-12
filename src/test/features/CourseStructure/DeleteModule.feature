@Rohini @Delete_Module
Feature: Delete Module

  Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Course Management" option from the sidebar

  @Valid_Delete @Delete
  Scenario: Delete an existing module
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin enables hierarchy action
    And the Admin deletes the following module
      | moduleTitle         |
      | Introduction to Java |
    And the Admin confirms the delete action
    Then a success message should be displayed
    And the module "Introduction to Java" should not appear in the course structure

  @Invalid_Delete @Delete
  Scenario: Cancel deleting a module
    When the Admin search the course
    And the Admin clicks the "Add Course Structure" button
    And the Admin enables hierarchy action
    And the Admin deletes the following module
      | moduleTitle         |
      | Introduction to Java |
    And the Admin cancels the delete action