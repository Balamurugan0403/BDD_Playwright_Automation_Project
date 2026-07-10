Feature:Search a Course
    As a admin i want to search a course in the Course structures so that I can verify course details for clients.

    Background:
        Given the user launched the application
        And the user logged in as admin
        When the user clicks the "Course Management" option from the sidebar
    @searchcourse
    Scenario Outline: Verify the admin can search for a course using the search bar
        When the admin enters "<searchTerm>" in the course search bar
        Then the course list should display only courses matching "<searchTerm>"

        Examples:
            | searchTerm |
            | Frontend   |
            | J-TM-T-006 |