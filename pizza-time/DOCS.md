# documentation

## how to make an authorized request

Any route that writes to the database (PUT,POST,DELETE),
deals with the user info, or user friends will require
a user to be logged in. To simplify thisyou can wrap any
of your requests with this function:

```javaScript
authorizedRequest(url, method, body = {})
```

where `body` is optional.

The function is located in `/pizza-time/src/firebase/authorizedRequest.js`
It is the only function exported from the file.
