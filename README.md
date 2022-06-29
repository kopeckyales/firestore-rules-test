# Demonstration of firestore security rules possible bug

- Sample project created with CRA
- Subset of my firestore rules which can possibly affect this problem is in file **/firestore.rules**
- **/seed** folder contains basic skeleton of my firestore documents used in security rules (user *0e4qY3jijlf1iBxqopSUvjUdQlp1* is the authenticated user in the example)
- **/logs** folder contains browser console logs during different scenarios of testing (debug log level for firestore)

## The problem

Security rules denying read access for messages collection query when listener is set right after the document is created.

When conversation document does not exist and I call **/src/Conversation.js#createConversation** method, listener for messages collection query throws an *Missing permissions* exception.

This problem does not seem to affect write security rule in messages collection, because when I call **/src/Conversation.js#sendMessage**, message is created in the firestore collection. 

The problem seems to be connected with the **get** of newly created document used in read security rule.

When I refresh the page after I get *Missing permissions* error from **/src/Conversation.js#sendMessage** everything works fine and created message is loaded in to the view.

## Firebase npm package version used
- 9.8.4 in this example
- 8.10.1 in my production code (has the same problem)
