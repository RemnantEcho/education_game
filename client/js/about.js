//when i press submit - it essentially adds to the message list details and adds to the DB.

const messageForm = document.querySelector(".msg-form");
messageForm.addEventListener("submit", extractMsg);




let messages =[];

function extractMsg(e) {
    e.preventDefault();
    const firstName = e.target.fname;
    const lastName = e.target.lname;
    const email = e.target.email;
    const msg = e.target.message;
    let message = {
        date: Date.now(),
        fName: document.querySelector("#fname").value,
        lName: document.querySelector("#lname").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value
    }
    
    
    if(e.target.fname.value == "" ||  e.target.lname.value == "" || e.target.email.value == ""|| e.target.message.value == "") {
        alert("Oh, sorry. Please make sure all boxes are filled!")
       } else {
        messages.push(message);
        // displayPlayer(document.querySelector("#personInput").value);
        console.log("Message Data Added", messages);

        // saving to local storage
        //localStorage.setItem("Messages", JSON.stringify(messages))
        
        //let jsonObj =[]
       // jsonObj.push(messages);
        let jsonObj = undefined;

        // define an endpoint in the backend for the data to be sent to.
        // file system reader in the backend
        // write out below function correctly
        // newMessage = req.body
        console.log("This is the messages" + messages);
        console.log(`this is the Json obj: ${jsonObj}`)
        jsonObj = JSON.stringify(messages);
        console.log(`this is the json obj after stringify ${jsonObj}`)
    
        
            const sendMesssage = async (e) => {
                e.preventDefault()
                const options = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },body: jsonObj
            }
          const res =  await fetch('http://localhost:3000/messages',options) 
          if(res.status == 201) { 
          alert("Message sent successfully!")
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        msg.value = "";
        messages.push(message);
          }
        }
    }
}
