// Variables
const image = document.getElementById("image");
const statusDisplay = document.getElementById("status");
const bgColor= document.getElementById("main");

function setColor(){
    bgColor.classList.add("online");
}


async function connectionStatus(){
    try{
        const fetchResult = await fetch('https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/440px-Lenna_%28test_image%29.png?time=' + (new Date()).getTime());
        image.src = "./images/online.png"
        setColor();
        return fetchResult.status >= 200 && fetchResult.status < 300;
    }catch (error){
       // console.log(error);
       statusDisplay.textContent = "OOPS!! Your Internet Connection is Down";
       image.src = "./images/offline.png";
       bgColor.classList.remove("online");

    }
}

// Monitor the connection
setInterval(async () =>{
    const result = await connectionStatus();
    if(result){
        statusDisplay.textContent = "You are Online","Connection Looks Good";
        setColor();
    }
}, 9000);

// Check Connection WHEN THE PAGE LOADS
window.addEventListener("load", async (event) => {
if( connectionStatus()){
    statusDisplay.textContent = "Online"
}else{
    statusDisplay.textContent = "Offline"
}

});