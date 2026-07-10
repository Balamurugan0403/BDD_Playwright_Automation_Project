
Feature: Login Functionality_SAMIHA_07_07_2026

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
    Then the login should fail And "<message>" should be displayed
    Examples:
      | loginType         | message                |
      | InvalidEmail      | Email is invalid       |
      | InvalidPassword   | Password is incorrect  |

Scenario: Verify login with an empty email and password field
    When User leaves the email field empty
    And User leaves the password field empty
    And the user clicks the Login button
    Then User should see the required field validation message
