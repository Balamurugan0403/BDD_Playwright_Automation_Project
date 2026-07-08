@Samiha
Feature: Login Functionality_Samiha_07JUL2026

  Background:
    Given the user launched the application

  Scenario: Verify successful login with valid credentials
    When the user enters a valid email
    And the user enters a valid password
    And the user clicks the Login button
    Then the user should be redirected to the dashboard

  Scenario Outline: Verify login with invalid credentials
    When the user enters "<loginType>" credentials
    And the user clicks the Login button
    Then the login should fail
    And an error message should be displayed

    Examples:
      | loginType |
      | InvalidEmail |
      | InvalidPassword |