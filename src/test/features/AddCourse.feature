@bala
Feature:Add a new Course
    As a admin i want to add a course in the Course structures so that the clients can use the course.

    Background:
        Given the user launched the application
        And the user logged in as admin
        When the user clicks the "Course Management" option from the sidebar
        When the admin clicks the "Add Course" button
        Then the "Create New Course Setup" tab opens

    @addcourse
    Scenario:Verify the admin can successfully create a new course after filling all mandatory details.
        When the admin fills in the Course Basic Configuration form using "validCourseSetup" test data
        And the admin clicks the "Next" button
        Then the admin is navigated to the "Course Hierarchy and Layout" tab
        When the admin fills the Course Hierarchy and Layout section using "validCourseSetup" test data
        And the admin clicks the "Preview & Create" button
        Then the course layout preview should be displayed
        When the admin clicks the "Create Course" button
        Then a course success message should be displayed

    @emptyfield
    Scenario:Verify the admin cannot create a course when one or more mandatory fields are left empty.
        When the admin clicks the "Next" button without filling all mandatory fields
        Then a validation error message should be displayed
        And the admin remains on the "Create New Course Setup" tab

    @duplicatecourse
    Scenario: Verify the admin cannot create a course with an already existing course name.
        When the admin fills in the Course Basic Configuration form using "existingCourseSetup" test data
        And the admin clicks the "Next" button
        Then the admin is navigated to the "Course Hierarchy and Layout" tab
        When the admin fills the Course Hierarchy and Layout section using "existingCourseSetup" test data
        And the admin clicks the "Preview & Create" button
        Then the course layout preview should be displayed
        When the admin clicks the "Create Course" button
        Then a duplicate course error message should be displayed