Feature: Passphrase Generation

  Scenario: Passphrase with default number of words generated successfully
    Given passphrase number of words is default
     When button 'Generate' is clicked
     Then passphrase with correct number of words is generated

  Scenario: Passphrase with non-default number of words generated successfully
    Given passphrase number of words is '12'
     When button 'Generate' is clicked
     Then passphrase with correct number of words is generated
