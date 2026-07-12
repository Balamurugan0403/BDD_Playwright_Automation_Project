@Samiha
Feature: Course Filter_SAMIHA_08_JULY_2026

  As an LMS user
  I want to filter the courses by category
  So that I can view courses of a selected category

  Background:
    Given the user launched the application
    When the user enters a valid email
    And the user enters a valid password
    And the user clicks the Login button
    And User navigates to the Course Management page
    And User opens the Filters panel

  Scenario Outline: Verify filtering courses by Category dropdown displays only matching courses
    When User selects "<Category>" from the Category dropdown
    Then Only "<Category>" courses should be displayed

    Examples:
      | Category              |
      | Software Development  |
      | Automation Project    |
      | JAVA                  |
  
Scenario: Verify filtering courses by Level displays only matching courses
    When User opens the Level dropdown
    And User selects a level from the Level dropdown
    Then Only courses matching the selected level should be displayed

 Scenario: Verify Sort By Course Name displays courses sorted 
    When User opens the Sort By dropdown
    When User selects Course Name from the Sort By dropdown
    Then Courses should be displayed in reverse alphabetical order by course name