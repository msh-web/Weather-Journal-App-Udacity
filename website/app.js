             
            
                   /////* Global Variables */////

// Key varible to return the data successfully from the external API.
const apiKey = "e66a1737b494a18104cccb44a4c2b976";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();
const button = document.querySelector("#generate");

               ////////////////////////////////////////////

// Fetching the data by post method and putting them in the post's body(holding the data).
async function addData(name, feelings, temp, country){
    await fetch('/addData', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
    },
        body: JSON.stringify({
              name: name,
              date: newDate,
              temp: temp,
              feelings: feelings, 
              country: country,
        })
    })
}
  
                      //////////////////////////////////////
/*
 - This part of code to add event for the button when clicking it to:
     * Get the values of (Zip Code & feelings) that the user wrote them.
*/
button.addEventListener('click', async () =>{
    const zipCode = document.getElementById("zip").value;
    const feelings = document.querySelector("#feelings").value;
// Declaring these variables to put the data which we will get in them.
    const myDate = document.getElementById("date");
    const myTemp = document.getElementById("temp");
    const myContent = document.getElementById("content");
    const myName = document.getElementById("name");
    const myCountry = document.getElementById("country");
// Two if statments to remind the user what data are missing!
if(zipCode===""){
   alert("Enter the zip code, please!")
};
if(!feelings){
    alert("Enter your feelings, please!")
 };
// Feching the Url-after providing it with Zip Code and Key- is used to make a POST to.
try { 
    const Url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${apiKey}&units=metric`;
    const response = await fetch(Url)
// This code for making the data readable.
    const readable = await response.json()
/* 
    Testing if the user write valid zip code and
    if zip code invalid a small message will appeare tell them
    and disappeare after 3 seconds.
*/
if (readable.cod != 200){
    err.innerHTML = readable.message;
        setTimeout( ()=>
        err.innerHTML = '', 3000)      
}else{console.log(readable)}
   
//Here I choosed some data to appeare in the console as an array.
    const temp = readable.main.temp
    const name = readable.name
    const country = readable.sys.country
    console.log([temp, name, country]);
// callback function to access these four data.
    await addData(name, feelings, temp, country);

        //////////////////////////////////////////////////////

// Updating all data and allow them to appeare to the user.
const finalRes = await fetch('/getData')
// Again this code for making the data readable.
const dataReadable = await finalRes.json()
// Printing all data in the console for testing.
console.log(dataReadable);
/*
     Useing innerHTML property to add the data dynamically which returned by the app route
     and putting some styles for label words. 
*/   
    myDate.innerHTML = `<b style="color:red;font-size:26px">Date: </b>${newDate}`;
    myTemp.innerHTML = `<b style="color:green;font-size:26px">Temp: </b>${temp} &deg;C `;// deg;C for making the tempreture with celsius.
    myContent.innerHTML = `<b style="color:blue;font-size:26px">Feeling: </b>${feelings}`;
    myName.innerHTML = `<b style="color:orange;font-size:26px">The area name: </b>${name}`;
    myCountry.innerHTML = `<b style="color:purple;font-size:26px">This system is applied within the: </b>${country}`;
} catch(err){console.log(err);}// Catching the error if any.
});

                   ////////////////////////////////////


        
   
