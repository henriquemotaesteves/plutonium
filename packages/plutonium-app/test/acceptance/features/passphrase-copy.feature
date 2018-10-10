Feature: Passphrase Copy

  Scenario: Passphrase copied successfully
    Given clipboard is empty
     When button 'Copy' is clicked
     Then clipboard has passphrase
