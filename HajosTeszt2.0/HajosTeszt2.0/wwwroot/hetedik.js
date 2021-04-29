window.onload = function () {
    init()
    let válasz1 = document.getElementById("válasz1")
    let válasz2 = document.getElementById("válasz2")
    let válasz3 = document.getElementById("válasz3")

    //fetch('/questions/' + aktiv_kérdés)
    //    .then(response => {

    //        if (!response.ok) return

    //        return response.json()


    //    })
    //    .then(data => kérdésMegjelenítés(data)
    //    );
}

var kérdések
var aktiv_kérdés = 1
var helyes_válasz
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image == "") { }
    else {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }
    helyes_válasz = kérdés.correctAnswer
}


function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}


function letöltésBefejeződött(d) {
    console.log("sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(aktiv_kérdés);

}

function előre() {
    vissza_szinez()
    if (hotList[displayedQuestion].goodAnswers == 3) {
        displayedQuestion++;
        if (displayedQuestion == hotList.Count) {
            return;
        }
        //if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
        else {
            kérdésMegjelenítés()
        }

    }



}

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

function szinez(megoldas) {
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
    if (megoldas == helyes_válasz) {
        hotList[displayedQuestion].goodAnswers++;
    }

}
//var timeoutHandler;
//timeoutHandler = setTimeout(előre, 3000);
//function előre() {
//    clearTimeout(timeoutHandler)
//    displayedQuestion++;
//    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
//    kérdésMegjelenítés()
//}

