# Demonstration of firestore security rules possible bug

- Sample project created with CRA
- Subset of my firestore rules which can possibly affect this problem is in file **/firestore.rules**
- **/seed** folder contains basic skeleton of my firestore documents used in security rules (user *0e4qY3jijlf1iBxqopSUvjUdQlp1* is the authenticated user in the example)
- **/logs** folder contains browser console logs during different scenarios of testing (debug log level for firestore)

## The problem

Security rules denying read access for messages collection query when listener is set right after the document is created.

When conversation document does not exist and I call **/src/Conversation.js#createConversation** method, listener for messages collection query throws an *Missing permissions* exception.

This problem does not seem to affect write security rule in messages collection, because when I call **/src/Conversation.js#sendMessage** with no conversation loaded (conversation is created just before the message), message is created in the firestore collection. 

The problem seems to be connected with the **get** of newly created document used in read security rule.

When I refresh the page after I get *Missing permissions* error from **/src/Conversation.js#sendMessage** everything works fine and created message is loaded in to the view.

## Firebase npm package version used
- 9.8.4 in this example
- 8.10.1 in my production code (has the same problem)


## Running this example

### Prerequisites
1. Firebase project
1. Active Firebase Authentication user with email+password provider
1. Deployed Firestore rules from file **/firestore.rules**
1. Existing companies collection in Firestore with document illustrated in **/seed/companies/N5FCErE4bOF63FNVvjkJ.json** (employeeList has to include uid of the authenticated user)
1. .env file in **/.env** (see .env.example for required env variables)
    1. REACT_APP_USER_EMAIL = email of the Authentication user from step 2.
    2. REACT_APP_USER_PASSWORD = password of the Authentication user from step 2.
    3. REACT_APP_COMPANY_ID = ID of the Firestore document in companies collection from step 4.
1. Node.js installed (This sample app was created with Node.js 16)

### To run the project
```
# npm install
# npm run start
```

> For more info on CRA see https://create-react-app.dev/
