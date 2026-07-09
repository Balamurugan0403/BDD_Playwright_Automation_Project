@bala
Feature:Add a new Course
    As a admin i want to add a course in the Course structures so that the clients can use the course.
    Background:
        Given the user launched the application
        And the user logged in as admin
        When the user clicks the "Course Management" option from the sidebar
    @addcourse
    Scenario:Verify the admin can proceed to the Course Hierarchy and Layout section after entering all mandatory fields in the Course Basic Configuration section.
        When the admin clicks the "Add Course" button
        Then the "Create New Course Setup" tab opens
        When the admin fills in the Course Basic Configuration form using "validCourseSetup" test data
        When the admin clicks the "Next" button
        Then the admin is navigated to the "Course Hierarchy and Layout" tab

    Scenario:Verify the admin cannot create a course when one or more mandatory fields are left empty.
        When the admin clicks the "Add Course" button
        Then the "Create New Course Setup" tab opens
        When the admin clicks the "Next" button without filling all mandatory fields
        Then a validation error message should be displayed
        And the admin remains on the "Create New Course Setup" tab

    Scenario:Verify the course layout preview is displayed after clicking "Preview & Create".
        When the admin clicks the "Add Course" button
        Then the "Create New Course Setup" tab opens
        When the admin fills in the Course Basic Configuration form using "validCourseSetup" test data
        And the admin clicks the "Next" button
        And the admin fills the Course Hierarchy and Layout section
        And the admin clicks the "Preview & Create" button
        Then the course layout preview should be displayed

    Scenario:Verify a success message is displayed after successfully creating the course.
        When the admin clicks the "Add Course" button
        Then the "Create New Course Setup" tab opens
        When the admin fills in the Course Basic Configuration form using "validCourseSetup" test data
        And the admin clicks the "Next" button
        And the admin fills the Course Hierarchy and Layout section
        And the admin clicks the "Preview & Create" button
        Then the course layout preview should be displayed
        When the admin clicks the "Create Course" button
        Then a success message should be displayed