const { default: axios } = require("axios");

async function getData(displayData){
    const data =  await axios.get('https://api.github.com/users/xiaotian/repos');
    // console.log(data);
    displayData(data);
    
}



function displayData(data){
    console.log(data);
}

getData(displayData);