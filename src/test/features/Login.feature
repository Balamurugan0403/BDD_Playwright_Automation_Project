@Samiha
Feature: Login Functionality

  Background:
    Given the user launched the application

  @Samiha
  Scenario: Verify successful login with valid credentials
    When the user enters a valid email
    And the user enters a valid password
    And the user clicks the Login button
    Then the user should be redirected to the dashboard