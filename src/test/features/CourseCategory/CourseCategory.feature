
Feature: Sowndariya_07JUL2026_LMS_Feature File For Category Management Functionality

  Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Dynamic Field Settings" option from the sidebar
    And Admin navigates to the Course Category section

  Scenario Outline: Verify adding a new Category
    When Admin clicks the Add Category button
    And Admin enters a dynamically generated Category Name for course "<CourseName>" and description "<Description>"
    And Admin selects the Course Name as "<CourseName>"
    And Admin enters the Category Description as "<Description>"
    And Admin clicks the Create Category button
    Then Admin should see the Category Created Successfully message

    Examples:
      | CourseName | Description        |
      | Selenium   | Java automation    |
      | Playwright | Python automation   |

@sowndariya
  Scenario: Validate adding existing Category
    When Admin clicks the Add Category button
    And Admin enters the existing Category Name
    And Admin enters the Course Name
    And Admin enters the Category Description
    And Admin clicks the Create Category button
    Then Admin should see the Category Already Exists error message


  Scenario: Verify the Category is displayed in the Category Management list.
    When Admin searches for the category
    Then Admin should see the category in the category list


  Scenario: Verify the category is available in Course Management
    When the user clicks the "Course Management" option from the sidebar
    And the user clicks the Add Course button
    And Admin clicks the Select Category dropdown
    Then Admin should see the category in the Category dropdown


  Scenario: Verify Admin can edit a category
    When Admin searches for the category
    And Admin clicks the Action button for the category
    And Admin clicks the Edit option
    And Admin updates the Category Description as "Updated automation description"
    And Admin clicks the Save button
    Then Admin should see the Category Created Successfully message


  Scenario: Verify Admin can delete a category
    When Admin searches for the category
    And Admin clicks the Action button for the category
    And Admin clicks the Delete option
    And Admin clicks the Confirm Delete button
    And Admin searches for the category
    Then Admin should see the No Data Found message
