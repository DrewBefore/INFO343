/*
 * This file should contain code for the following tasks:
 * 1. Display the list of chat messages.
 * 2. Send a new message.
 * 3. Allow a user to edit and delete their own messages.
 * 4. Allow a user to log out.
 * 5. Redirect a user to index.html if they are not logged in.
 */

var messagesList = document.getElementById("messages");
var textArea = document.getElementById("message-input");
var logoutButton = document.getElementById("logout");
//console.log(user.photoURL);
//var photoURL = "https://www.gravatar.com/avatar/" + md5(email);
logoutButton.addEventListener("click", function (e) {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    // If the user is logged in, user will be an object (truthy).
    // Otherwise, it will be null (falsey).
    if (user) {
        console.log(user);
        // Connect to firebase
        var database = firebase.database();
        var messages = database.ref('channels/general');

        // This event listener will be called for each item
        // that has been added to the list.
        // Use this to generate each chat message,
        // both on initial page load and whenver someone creates a new message.
        messages.on('child_added', function(data) {
            var div = document.createElement("div");
            div.className = "message";
            messagesList.appendChild(div);
            var id = data.key;
            div.id = id + "div";
            var message = data.val();
            var user = firebase.auth().currentUser;
            var picture = user.photoURL;

            var text = message.text;
            var timestamp = message.timestamp;
            timestamp = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');

            var messageImg = document.createElement("img");
            messageImg.src= picture;
            messageImg.className = "messageImg";
            var messageLi = document.createElement("li");
            messageLi.id = id;
            messageLi.innerText = text;
            var name = document.createElement("p");
            name.innerHTML= user.displayName + " ";
            name.className= "name";
            var timeStamp = document.createElement("p");
            timeStamp.innerHTML = timestamp + " ";
            timeStamp.className= "timeStamp";

            var edit = document.createElement("p");
            edit.innerHTML = "edit ";
            edit.className = "edit";

            var erase = document.createElement("p");
            erase.innerHTML = "delete";
            erase.className = "erase";
            div.appendChild(messageImg);

            erase.addEventListener("click", function() {
                
                console.log("delete this message");
                console.log(id);
                database.ref('channels/general').child(id).remove();
            });

            edit.addEventListener("click", function() {
                var ref = database.ref('channels/general').child(id);
                var response = prompt("Enter new Message:")
                ref.child('text').set(response);
                ref.child('timestamp').set(new Date().getTime());
            });
            

            div.appendChild(name);
            div.appendChild(timeStamp);
            div.appendChild(edit);
            div.appendChild(erase); //delete
            div.appendChild(messageLi);
            messagesList.appendChild(div);
        });

        // This event listener will be called whenever an item in the list is edited.
        // Use this to update the HTML of the message that was edited.
        messages.on('child_changed', function(data) {
            var id = data.key;
            var message = data.val();
            console.log(message);
            console.log(message.text);
            var editedMessage = document.getElementById(id);
            editedMessage.innerText = message.text;

        });

        // This event listener will be called whenever an item in the list is deleted.
        // Use this to remove the HTML of the message that was deleted.
        messages.on('child_removed', function(data) {
            var id = data.key;
            var deletedMessage = document.getElementById(id + "div");
            deletedMessage.parentElement.removeChild(deletedMessage);
        });

    } else {
        // If the user is not logged in, redirect to index.html
        window.location.href = "index.html";
    }
});

var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");

// When the user submits the form to send a message,
// add the message to the list of messages.
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //var photoURL = "https://www.gravatar.com/avatar/" + md5(email);

    // Connect to the firebase data
    var database = firebase.database();

    // Get the ref for your messages list
    var messages = database.ref('channels/general');

    // Get the message the user entered
    var message = messageInput.value;

    // Create a new message and add it to the list.
    messages.push({
        text: message,
        timestamp: new Date().getTime() // unix timestamp in milliseconds
    })
    .then(function () {
        textArea.value = "";
        // message created succesfully
    })
    .catch(function(error) {
        // message not created succesfully
    });
});


// When the user deletes the message,
// delete the message from the list of messages.
messageForm.addEventListener("erase", function (e) {
    console.log("erase it");
    e.preventDefault();
});
//     //var photoURL = "https://www.gravatar.com/avatar/" + md5(email);

//     // Connect to the firebase data
//     var database = firebase.database();

//     // Get the ref for your messages list
//     var messages = database.ref('channels/general');

//     // Get the message the user entered
//     var message = messageInput.value;

//     // Create a new message and add it to the list.
//     messages.remove({
//         text: message,
//         timestamp: new Date().getTime() // unix timestamp in milliseconds
//     })
//     .then(function () {
//         textArea.value = "";
//         // message created succesfully
//     })
//     .catch(function(error) {
//         // message not created succesfully
//     });
// });

//var postId = newPostRef.key;