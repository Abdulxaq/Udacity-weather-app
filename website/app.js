/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '464500c0dbb3dc8d354812a5fc714bb4&units=metric';
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const btn = document.getElementById('generate');
const country = document.getElementById('country');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();



btn.addEventListener('click', () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.value}&zip=${zip.value}&appid=${apiKey}`
    try {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                postData('/addData', { 
                    temperature: data.main.temp,
                    feelings: feelings.value,
                    date: newDate, 
                }).then(()=>{
                    updateUI();
                })
            });
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
        return(newData);
    } catch (error) {
        console.log('Error on posting: ', error);
    }
}

//Update UI

const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json()
        document.getElementById('temp').innerHTML = 'Temperatura : ' + Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML ='Feels like: ' + allData.content;
        document.getElementById("date").innerHTML ='Date: ' + allData.date;
    }
    catch (error) {
        console.log("error", error);
    }
}