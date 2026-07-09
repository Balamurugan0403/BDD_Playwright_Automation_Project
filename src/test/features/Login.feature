@Samiha
Feature: Login Functionality

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
    And "<message>" should be displayed
    Examples:
      | loginType         | message                |
      | InvalidEmail      | Email is invalid       |
      | InvalidPassword   | Password is incorrect  |