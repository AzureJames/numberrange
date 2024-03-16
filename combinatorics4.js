let col1 = document.getElementById("col1");
let col2 = document.getElementById("col2");
let col3 = document.getElementById("col3");
let outputs = document.getElementById("outputs");
let thoutputs = document.getElementById("tbhead");
let tboutputs = document.getElementById("tbbody");
let submitForm= document.getElementById("submit"); 



submitForm.addEventListener("click", () => {
    // console.log(col1.value)
    // console.log(col1.value[0])
    // tboutputs.innerHTML += col1

    let resultString1 = ""
    let resultString2 = ""
    let resultString3 = ""
    let resultString4 = ""
    let counter = 0
    tboutputs.innerHTML = ""

    for(let i=0; i<10; i++) { //ten letters of length are checked
        if (col1.value[i] > -1 &&  col1.value[i] < 10) { //if is number
            //resultString1 += col1.value[i] //add to resultstring1

            for(let j=0; j<10; j++) { //ten letters of length are checked
                if (col2.value[j] > -1 &&  col2.value[j] < 10) { //if is number
                    //resultString1 += col2.value[j] //add to resultstring1


                    for(let k=0; k<10; k++) { //ten letters of length are checked in COL 3
                        if (col3.value[k] > -1 &&  col3.value[k] < 10) { //if is number


                            for(let l=0; l<10; l++) { //ten letters of length are checked in COL 3
                                if (col4.value[l] > -1 &&  col4.value[l] < 10) { //if is number
                                        resultString1 += col1.value[i] + col2.value[j] + col3.value[k] + col4.value[l] + " " //add to resultstring1
                                        resultString1 += " \n "
                                        counter++
                                }
                            }

                        }
                    }

                }
            }


        }

    }
    tboutputs.innerHTML += resultString1; //display results
    tboutputs.innerHTML += " \n(combos: " + counter + ")"

});

