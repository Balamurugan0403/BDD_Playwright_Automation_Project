@bala
Feature:Add a new Course
    As a admin i want to add a course in the Course structures so that the clients can use the course.
    Background:
        Given the Admin is logged into the LMS
        And the Admin navigates to the Course Structure page
    Scenario:Verify the admin can proceed to the Course Hierarchy and Layout section after entering all mandatory fields in the Course Basic Configuration section.
    When the admin clicks the "Add Course" button
    Then the "Create New Course Setup" tab opens
    When the admin fills in the Course Basic Configuration form using "validCourseSetup" test data
    Then the "Course ID" field is auto-generated with a value
    When the admin clicks the "Next" button
    Then the admin is navigated to the "Course Hierarchy and Layout" tab

