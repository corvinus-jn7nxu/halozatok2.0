window.onload = function ()
{ console.log("start")

    var faktorialisR = (n) => {
        if (n === 0 || n === 1) {
            return 1 
        } else {
            return n * faktorialisR(n - 1)
        }
    }

    for (let sor = 0; sor < 10; sor++) {
        let ujdiv = document.createElement("div")
        ujdiv.classList.add("sor")
        //ujdiv.innerText = faktorialisR(i);
        document.getElementById("eredmenyDiv").appendChild(ujdiv)
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            let ujdiv2 = document.createElement("div")
            ujdiv2.classList.add("elem")
            let r = 245 - (faktorialisR(sor)) / (faktorialisR(oszlop) * faktorialisR((sor - oszlop)))
            let g = 81 - (faktorialisR(sor)) / (faktorialisR(oszlop) * faktorialisR((sor - oszlop)))
            let b = 108 - (faktorialisR(sor)) / (faktorialisR(oszlop) * faktorialisR((sor - oszlop)))
            ujdiv2.style.backgroundColor = "rgb(" + r  +","+ g +"," + b+ ")";
            ujdiv2.innerHTML = (faktorialisR(sor)) / (faktorialisR(oszlop) * faktorialisR((sor-oszlop)))
            ujdiv.appendChild(ujdiv2)

        }
    }




}
