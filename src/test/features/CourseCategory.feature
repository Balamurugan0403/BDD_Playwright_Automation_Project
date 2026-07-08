  @sowndariya
  Feature: Sowndariya_07JUL2026_LMS_Feature File For Category Management Functionality

  Background:
    Given Admin is logged into the LMS application
    And Admin navigates to the Dynamic Field Management page
    And Admin navigates to the Course Category section

  Scenario Outline: Verify adding a new Category
    When Admin clicks the Add Category button
    And Admin enters the Category Name as "<CategoryName>"
    And Admin selects the Course Name as "<CourseName>"
    And Admin enters the Category Description as "<Description>"
    And Admin clicks the Create Category button
    Then Admin should see the Category Created Successfully message

    Examples:
      | CategoryName | CourseName | Description          |
      | Java1        | Selenium   | Java automation      |
      | Python1      | Playwright | Python sutomation    |