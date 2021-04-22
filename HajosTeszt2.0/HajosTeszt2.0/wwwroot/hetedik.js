window.onload = function () {
    //fetch('/questions.json')
    //    .then(response => response.json())
    //    .then(data => letöltésBefejeződött(data))
    let válasz1 = document.getElementById("válasz1")
    let válasz2 = document.getElementById("válasz2")
    let válasz3 = document.getElementById("válasz3")
    document.getElementById("előre").onclick = előre_katt;
    document.getElementById("vissza").onclick = vissza_katt;
    document.getElementById("válasz1").onclick = szinez;
    document.getElementById("válasz2").onclick = szinez;
    document.getElementById("válasz3").onclick = szinez;
    

    fetch('/questions/' + aktiv_kérdés)
        .then(response => {

            if(!response.ok) return

            return response.json()
            
            
        })
        .then(data => kérdésMegjelenítés(data)
        );
}

var kérdések
var aktiv_kérdés = 1
var helyes_válasz

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image == "") {    }
    else {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }
    helyes_válasz = kérdés.correctAnswer
}


function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
    
}    


function letöltésBefejeződött(d) {
    console.log("sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(aktiv_kérdés);

}

/*function kérdésMegjelenítés(kérdés) {

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

}*/

function előre_katt() {
    vissza_szinez()
    if (aktiv_kérdés == 820) {
        aktiv_kérdés = 1
        kérdésBetöltés(aktiv_kérdés)
    }
    else {
        aktiv_kérdés = aktiv_kérdés + 1
        kérdésBetöltés(aktiv_kérdés)
    }
}



function vissza_katt() {
    vissza_szinez()
    if (aktiv_kérdés == 1) {
        aktiv_kérdés = 820
        kérdésBetöltés(aktiv_kérdés)
    }
    else {
        aktiv_kérdés = aktiv_kérdés - 1
        kérdésBetöltés(aktiv_kérdés)
    }
}

function vissza_szinez() {
    válasz1.style.backgroundColor = "burlywood"
    válasz2.style.backgroundColor = "burlywood"
    válasz3.style.backgroundColor = "burlywood"
}

function szinez() {
    //let válasz1 = document.getElementById("válasz1")
    //let válasz2 = document.getElementById("válasz2")
    //let válasz3 = document.getElementById("válasz3")

    
    if (helyes_válasz == "1") {
        console.log("első a jó")
        válasz1.style.backgroundColor = "green"
        válasz2.style.backgroundColor = "red"
        válasz3.style.backgroundColor = "red"
    }
    else {
        if (helyes_válasz == "2") {
            console.log("második a jó")
            válasz1.style.backgroundColor = "red"
            válasz2.style.backgroundColor = "green"
            válasz3.style.backgroundColor = "red"
        }
        else {
            console.log("3. a jó")
            válasz1.style.backgroundColor = "red"
            válasz2.style.backgroundColor = "red"
            válasz3.style.backgroundColor = "green"
        }
    }

}


