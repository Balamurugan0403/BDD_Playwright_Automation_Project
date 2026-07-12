@bala
Feature: Edit a Course
    As an admin I want to edit an existing course's details so that clients can use the correct course information.

    Background:
        Given the user launched the application
        And the user logged in as admin
        When the user clicks the "Course Management" option from the sidebar

    @editcourse
    Scenario: Verify the admin can edit an existing course with updated details
        When the admin searches for the course by client name
        And the admin selects the "Edit Course" option for the searched course
        And the admin updates the course details using "editCourseSetup" test data
        And the admin saves the changes
        Then the course list should reflect the updated details