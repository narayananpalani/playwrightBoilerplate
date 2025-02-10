Feature: Create a new customer at XYZ Bank
#As a bank manager
#I want to be able to add new bank customers
#So that I can provide quality services to our customers

  @visualtest
  Scenario: Verify screen of customer creation
    Given user navigate to login page
    When user create a customer
    Then visual comparison check user interface changes successfully