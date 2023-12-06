'use strict';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/applicationHub")
    .build();

connection.start().catch((err) => {
    return console.error(err.toString());
});

// Set up the notification event listener
connection.on("Notification", (message) => {
    const incoming = JSON.parse(message);
    if (incoming.type === "add number") {
        populateWithRandomNumber(incoming.data);
    }
});

const btnGetRandomNumber = document.querySelector("#btnGetRandomNumber");
btnGetRandomNumber.addEventListener('click', (e) => {
    getRandomNumber();
})

function getRandomNumber() {
    fetch("/home/randomnumber/")
        .then(response => {
            if (!response.ok) {
                throw new Error('There was a network error!');
            }
            return response.json();
        })
        .then(result => {
            // This is also a connected client so will automatically update
            // when the notification comes in (see above)
            notifyConnectedClients("add number", result);
        });
}

function populateWithRandomNumber(number) {
    const ulRandomNumbers = document.querySelector("#ulRandomNumbers");
    const li = document.createElement("li");
    li.textContent = String(number);
    ulRandomNumbers.appendChild(li);
}

function notifyConnectedClients(type, data) {
    let message = {
        type, data
    };
    console.log(JSON.stringify(message));
    connection.invoke("SendMessageToAllAsync", JSON.stringify(message))
        .catch(function (err) {
            return console.error(err.toString());
        });
}

