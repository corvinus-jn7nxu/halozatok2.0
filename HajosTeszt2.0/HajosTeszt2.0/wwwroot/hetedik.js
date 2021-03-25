window.onload = letöltés()
var kérdések
var aktiv_kérdés = 0
var helyes_válasz

function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data))
    let válasz1 = document.getElementById("válasz1")
    let válasz2 = document.getElementById("válasz2")
    let válasz3 = document.getElementById("válasz3")
}

function letöltésBefejeződött(d) {
    console.log("sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(aktiv_kérdés);

}

function kérdésMegjelenítés(kérdés) {

    let ide_kérdes = document.getElementById("kérdés_szöveg");
    ide_kérdes.innerHTML = kérdések[kérdés].questionText
    //let válasz1 = document.getElementById("válasz1")
    válasz1.innerHTML = kérdések[kérdés].answer1
    //let válasz2 = document.getElementById("válasz2")
    válasz2.innerHTML = kérdések[kérdés].answer2
    //let válasz3 = document.getElementById("válasz3")
    válasz3.innerHTML = kérdések[kérdés].answer3
    let kép = document.getElementById("kép1")
    kép.src = `https://szoft1.comeback.hu/hajo/${kérdések[kérdés].image}`
    helyes_válasz = kérdések[kérdés].correctAnswer
    válasz1.style.backgroundColor = "brown"
    válasz2.style.backgroundColor = "brown"
    válasz3.style.backgroundColor = "brown"

}

function előre_katt() {

    if (aktiv_kérdés == 2) {
        aktiv_kérdés = 0
        kérdésMegjelenítés(aktiv_kérdés)
    }
    else {
        aktiv_kérdés = aktiv_kérdés + 1
        kérdésMegjelenítés(aktiv_kérdés)
    }
}
document.getElementById("előre").onclick = előre_katt;


function vissza_katt() {
    if (aktiv_kérdés == 0) {
        aktiv_kérdés = 2
        kérdésMegjelenítés(aktiv_kérdés)
    }
    else {
        aktiv_kérdés = aktiv_kérdés - 1
        kérdésMegjelenítés(aktiv_kérdés)
    }
}
document.getElementById("vissza").onclick = vissza_katt;

function szinez() {
    //let válasz1 = document.getElementById("válasz1")
    //let válasz2 = document.getElementById("válasz2")
    //let válasz3 = document.getElementById("válasz3")

    
    if (helyes_válasz == 1) {
        console.log("asd")
        //let válasz1 = document.getElementById("válasz1")
        válasz1.style.backgroundColor = "green"
       // let válasz2 = document.getElementById("válasz2")
        válasz2.style.backgroundColor = "red"
       // let válasz3 = document.getElementById("válasz3")
        válasz3.style.backgroundColor = "red"
    }
    if (helyes_válasz == 2) {
       // let válasz1 = document.getElementById("válasz1")
        válasz1.style.backgroundColor = "red"
       // let válasz2 = document.getElementById("válasz2")
        válasz2.style.backgroundColor = "green"
       // let válasz3 = document.getElementById("válasz3")
        válasz3.style.backgroundColor = "red"
    }
    else {
      //  let válasz1 = document.getElementById("válasz1")
        válasz1.style.backgroundColor = "red"
       // let válasz2 = document.getElementById("válasz2")
        válasz2.style.backgroundColor = "red"
       // let válasz3 = document.getElementById("válasz3")
        válasz3.style.backgroundColor = "green"
    }
   

}

document.getElementById("válasz1").onclick = szinez;
document.getElementById("válasz2").onclick = szinez;
document.getElementById("válasz3").onclick = szinez;
