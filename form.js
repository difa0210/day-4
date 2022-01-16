// alert("Welcome");
// document.writeln("Hallo Batch");
// console.log("Selamat Siang");

// let gelas = "Kopi"

// console.log(gelas);

// var piring = "nasi"
// var piring = "nasi"

// let gelas = "Kopi"
// gelas = "Susu"

// const Mangkok = "Mie Ayam"
// Mangkok = "Bakso"

// console.log();

// let firstName = "Difa"
// let lastName = "Hafidzuddin"
// let age = 20

// console.log(" Nama saya "+ firstname +" nama belakang saya "+ lastname +" usia saya "+ age);

// function getData(day, year){
//     console.log(firstName);
//     console.log(lastName);
//     console.log(age);
//     console.log(day);
//     console.log(year);
// }
// getData("Jumat", 2021);

// function penjumlahan(bil1, bil2) {
//     let result = bil1 + bil2;

//     console.log(result);
// }
// penjumlahan(50,20);

// function submitData(){
//     alert("Thank You");
// }

    // if (document.getElementById("input-programming").checked &&
    //     document.getElementById("input-football").checked &&
    //     document.getElementById("input-sleep").checked) {
    //     console.log(document.getElementById("input-programming").value,
    //                 document.getElementById("input-football").value,
    //                 document.getElementById("input-sleep").value)
    // } else if (document.getElementById("input-programming").checked) {
    //     console.log(document.getElementById("input-programming").value);
    // } else if (document.getElementById("input-football").checked) {
    //     console.log(document.getElementById("input-football").value);
    // } else if (document.getElementById("input-sleep").checked) {
    //     console.log(document.getElementById("input-sleep").value);
    // } else if (document.getElementById("input-programming").checked && document.getElementById("input-football").checked) {
    //     console.log(document.getElementById("input-programming").value, document.getElementById("input-football").value)
    // } else if (document.getElementById("input-programming").checked && document.getElementById("input-sleep").checked) {
    //     console.log(document.getElementById("input-programming").value, document.getElementById("input-sleep").value)
    // } else if (document.getElementById("input-football").checked && document.getElementById("input-sleep").checked) {
    //     console.log(document.getElementById("input-football").value, document.getElementById("input-sleep").value)
    // }

function submitData(){
    let name = document.getElementById("input-name").value
    let email = document.getElementById("input-email").value
    let number = document.getElementById("input-number").value
    let subject = document.getElementById("input-subject").value
    let message = document.getElementById("input-message").value
    let skillprogramming = document.getElementById("input-programming").checked
    let skillfootball = document.getElementById("input-football").checked
    let skillsleep = document.getElementById("input-sleep").checked
    
    if (name=="") {
    return alert("Please input your name")
    } else if (email=="") {
    return alert("Please input your email")
    } else if (number=="") {
    return alert("Please input your phone number")
    } else if (subject=="") {
    return alert("Please input your subject")
    } else if (message=="") {
    return alert("Please input your messages")
    } else if (skillprogramming == "" && skillfootball == "" && skillsleep == "") {
    return alert ("Please input your skill")
    }
    if (skillprogramming) { skillprogramming =
        document.getElementById("input-programming").value
    } else {skillprogramming = ""
    } 
    if (skillfootball) { skillfootball =
        document.getElementById("input-football").value
    } else {skillfootball = ""
    } 
    if (skillsleep) { skillsleep =
        document.getElementById("input-sleep").value
    } else {skillsleep = ""
    }

    console.log(name);
    console.log(email);
    console.log(number);
    console.log(subject);
    console.log(message);
    console.log(skillprogramming);
    console.log(skillfootball);
    console.log(skillsleep);

    let emailReceiver = "difahafidzuddin0210@gmail.com"
    let a = document.createElement("a")

    a.href = `mailto: ${emailReceiver}? subject&body=Halo nama saya ${name}, ${message}, lalu ini nomor telepon saya ${number}, dan keahlian yang saya bisa adalah ${skillprogramming} ${skillfootball} ${skillsleep}`
    a.click()

    let dataObject = {
        name: name,
        email: email,
        number: number,
        subject: subject,
        message: message,
        skillprogramming: skillprogramming,
        skillfootball: skillfootball,
        skillsleep: skillsleep
    }

console.log(dataObject);
}