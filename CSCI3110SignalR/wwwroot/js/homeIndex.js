'use strict';

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
            populateWithRandomNumber(incoming.data);
        });
}

function populateWithRandomNumber(number) {
    const ulRandomNumbers = document.querySelector("#ulRandomNumbers");
    const li = document.createElement("li");
    li.textContent = String(number);
    ulRandomNumbers.appendChild(li);
}


