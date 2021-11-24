/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '464500c0dbb3dc8d354812a5fc714bb4&units=metric';
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const btn = document.getElementById('generate');
const country = document.getElementById('country');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


btn.addEventListener('click', () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.value}&zip=${zip.value}&appid=${apiKey}`
    try {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                postData('putInfo', { 
                    temp: data.main.temp,
                    feel: data.main.feels_like,
                    urFeeling: feelings.value,
                    date: newDate, 
                    zip: zip.value, })
            });
            getData('/all');
    } catch (error) {
        console.log('Weather API error: ', error);
    }

})




// Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log("Hello", newData);
        return newData
    } catch (error) {
        console.log('Error on posting: ', error);
    }
}

//Async GET

const getData = async (url='') => {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = 'Temperatura (F): ' + Math.round(allData[0].temp) + 'degrees';
        document.getElementById('content').innerHTML ='Feels like: ' + allData[0].feel;
        document.getElementById("date").innerHTML ='Date: ' + allData[0].date;
        document.getElementById("urFeelings").innerHTML ='Your feeling: ' + allData[0].urFeeling;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}