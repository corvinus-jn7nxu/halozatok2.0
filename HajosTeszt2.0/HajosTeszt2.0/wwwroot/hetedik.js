window.onload = function() { init(); }

var kérdések
var aktiv_kérdés = 1
var helyes_válasz
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timerHandler;

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    //document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    if (kérdés.image) {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        //document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép1").style.display = "none";
    }
    helyes_válasz = kérdés.correctAnswer
    document.getElementById("col-3 válaszok").style.pointerEvents = "auto";
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
    clearTimeout(timerHandler);
    document.getElementById("col-3 válaszok").style.pointerEvents = "auto";
    vissza_szinez();
    if (hotList[displayedQuestion].goodAnswers == 3) {
        displayedQuestion++;
        kérdésMegjelenítés();

        kérdésBetöltés(nextQuestion, displayedQuestion);
        nextQuestion++;
        }
    
}
function vissza() {
    clearTimeout(timeoutHandler);
    displayedQuestion--;
    if (displayedQuestion == -1) {
        displayedQuestion = questionsInHotList - 1;
    }
    kerdesMegjelenites();
    torles();
    document.getElementById("col-3 válaszok").style.pointerEvents = "auto";
    
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

    document.getElementById("col-3 válaszok").style.pointerEvents = "none";

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

    

    timerHandler = setTimeout(előre, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("DisplayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}


