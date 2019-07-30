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

To test this on postman you _need_ the `accessToken` from firebase.

To get the `accessToken` copy and paste the code below in to your
console _while you are logged in_, and then copy the key that comes back
into the `authorization` header field inside post man.

```javaScript
var DB_NAME = 'firebaseLocalStorageDb';
var STORE_NAME = 'firebaseLocalStorage';
var DBOpenRequest = window.indexedDB.open(DB_NAME);
var db;

DBOpenRequest.onsuccess = function(event) {
    db = DBOpenRequest.result;
    getData();
};

function getData() {
    var transaction = db.transaction([STORE_NAME], "readwrite");
    var objectStore = transaction.objectStore(STORE_NAME);
    var objectStoreRequest = objectStore.get("firebase:authUser:AIzaSyCitaEbYQsGXYRnuUk0PthEzuwuTmV37PQ:[DEFAULT]");
    objectStoreRequest.onsuccess = function(event) {
        var myRecord = objectStoreRequest.result;
    };
}
```
