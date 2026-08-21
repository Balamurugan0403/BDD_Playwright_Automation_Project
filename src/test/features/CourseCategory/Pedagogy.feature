@sowndariya
Feature: SOWNDARIYA_K_15-07-2026_Pedagogy Management _UPDATED_20-08-2026

  Background:
    Given the user launched the application
    And the user logged in as admin
    When the user clicks the "Dynamic Field Settings" option from the sidebar
    And Admin navigates to the Pedagogy section

  Scenario: Verify the User can Add a New Element in Existing Pedagogy Activities
    And the user clicks on the Pedagogy view elements button 
    And the user clicks on the Add Element button
    And the user enters the element details
    And the user clicks on the Create Element button
    Then the user should be able to see the created element in the list of pedagogy elements

 Scenario: verify the User can edit element in Existing Pedagogy activites
       And the user clicks on the Pedagogy view elements button
       And the user Clicks on the edit button
       And the user edits the content of element name
       And the user clicks on the Update Element button
       And the user should be able to see the updated element 

  Scenario: verify the User can delete element in Existing Pedagogy activites
       And the user clicks on the Pedagogy view elements button
       And the user Clicks on the delete button
       And the user clicks on the delete confirmation button
       Then the user should be able to see the deleted element is not present in the list of pedagogy elements   


  Scenario Outline: verify the User can Search The Pedagogy Activities   
       And the user enters the "<data type>" in pedagogy activities search bar
       Then the user should be able to see the corresponding activity

    Examples:
            |data type       |
            |I DO            |
            |We DO           |
            |You DO          |
            |Lowercase Search|

  # --- New scenarios ---

  Scenario: Verify validation message when Element Name field is left blank
       And the user clicks on the Pedagogy view elements button
       And the user clicks on the Add Element button
       And the user leaves the element name field empty
       And the user clicks on the Create Element button
       Then the user should see a required field validation message for element name

  Scenario: Verify the User can cancel adding a new pedagogy element
       And the user clicks on the Pedagogy view elements button
       And the user clicks on the Add Element button
       And the user enters the element details
       And the user clicks the Cancel button while adding an element
       Then the Add Element modal should be closed


