// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDj_tyBwFotRQgHNCMg6huOrPgHRlgxP6A",
   authDomain: "sana-translation.firebaseapp.com",
   projectId: "sana-translation",
   storageBucket: "sana-translation.appspot.com",
   messagingSenderId: "403048547770",
   appId: "1:403048547770:web:fca1ff917c42dc5d3c8983"
 };




  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Reference contactInfo collection
let contactInfo = firebase.database().ref("infos");

// listen for a submit

document.querySelector(".contact-form").addEventListener("submit",submitForm);

function submitForm(e){
  e.preventDefault();


//   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;


 saveContactInfo(name,email,message);

 document.querySelector(".contact-form").reset()
sendEmail(name, email, message);
  }

  // Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

newContactInfo.set({
name: name,
email: email,
message: message,

});
retrieveInfos();
}


// Retrive Infos
function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);

}

function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++){
    let infoData = keys[i];
    let name = info[infoData].name;
    let email = info[infoData].email;
    let message = info[infoData].message;
    console.log(name, email, message);
  }
}


retrieveInfos();


//Send Email Info

function sendEmail(name, email, message) {
  Email.send({
    Host:"smtp.gmail.com",
    Username:"sakthinagaselvam@gmail.com",
    Password:"uvghpsnbzljbqfec",
    To:"s.nagaselvam@hotmail.com",
    From:"sakthinagaselvam@gmail.com",
    Subject:`${name} send you a message`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,
  }).then((message) => alert("mail sent successfully"))
}
