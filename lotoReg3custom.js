async function fetcher (url) {
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

let outputs = document.getElementById("outputs");
// setupCounter(document.querySelector('#counter'));
// const data = await fetcher('https://data.ny.gov/resource/dg63-4siq.json');
// let occur25 = 0;
// for(let i = 0; i < 5; i++){ //197
//   if(data[i].midday_winning_numbers.match("25") !== null){
//     occur25++;
//   }

// }
// console.log(occur25);

//log how many times 25 has been added




//THIS SECTION FOR REGULAR LOTO 
const regularData = await fetcher('https://data.ny.gov/resource/hsys-3def.json');

function createRegOccurencesOf(){
  var occurenceOf = [];

  for (var u = 0; u < 60; ++u) { //amt of lotto #s on card
      occurenceOf[u] = 0;
  }

  return occurenceOf;
}

let startForm= document.getElementById("start"); 
let endForm= document.getElementById("end"); 
let submitForm= document.getElementById("submit"); 


var occurenceOfReg = createRegOccurencesOf(); //0 to 60
var occurenceOfRegCol2 = createRegOccurencesOf(); //0 to 60
var occurenceOfRegCol3 = createRegOccurencesOf(); //0 to 60
//console.log("1stocc",occurenceOf);
var regGroupArray = []; //loto data array
let firstRegDay = 0; //0 is latest
let lastRegDay = 121; //this is also amt of days checked (197?) half the draws
let stringy = "";
let colOne = [];
let colTwo = [];
let colThree = [];
submitForm.addEventListener("click", () => {
  outputs.innerHTML = "";
  console.log("hi");
  //submitForm.preventDefault();
  firstRegDay = startForm.value-1; 
  lastRegDay = endForm.value;
  console.log(firstRegDay,lastRegDay);




  for(var q = firstRegDay; q < lastRegDay; q++){ 
    //console.log(data[i].midday_winning_numbers);
    if(q == firstRegDay){outputs.innerHTML += "<h2>Latest time: " + regularData[0].draw_date + " Num days: " + lastRegDay + "</h2>";}
    console.log(regularData.length);
    stringy = toString(regularData[q].midday_daily);
    colOne.push(regularData[q].midday_daily[0]); //ARRAYS FROM THE RAW DATA
    colTwo.push(regularData[q].midday_daily[1]);
    colThree.push(regularData[q].midday_daily[2]);
    colOne.push(regularData[q].evening_daily[0]); //ARRAYS FROM THE RAW DATA
    colTwo.push(regularData[q].evening_daily[1]);
    colThree.push(regularData[q].evening_daily[2]);
  }
    //console.log("grpAry",regGroupArray);

  

  //TODO: -MAKE 3 ARRAYS AS COLUMNS FIRSTCOL SECONDCOL THIRD WITH 60 INDEXS SET TO 0, IF W=23, && REGGROUPARRAY[0]==W (23), FIRSTCOL[23]++ ((INDEX IS 0BASED))
  //CURRENTLY IT ADDS THINGS UP CORRECTLY IN GENERAL
  //TODO: PAY ATTENTION TO 1ST DAY AND 1ST NIGHT COLS ETC ACCORDING TO ROB
  console.log("OCCURENCES BELOW FOR",q,"LAST DAYS OF REGULARLOTTO DRAWINGS:");
  console.log("Col One:",colOne);
  console.log("Col Two:",colTwo);
  console.log("Col Three:",colThree); //THESE ARE GOOD
  let occurenceOf = [0,0,0,0,0,0,0,0,0,0,0];
  let occurenceOfCol2 = [0,0,0,0,0,0,0,0,0,0,0];
  let occurenceOfCol3 = [0,0,0,0,0,0,0,0,0,0,0];
  for(let j = firstRegDay; j < lastRegDay*2; j++) {  //every day add occurences LASTREGDAY*2 = ACTUAL DAYS INSTEAD OF DRAWINGS
    for(let k = 0; k <= 9; k++) { //digits 1 to 9
    if(
      colOne[j] == k
      ){
      occurenceOf[k]++;
    }
    if(
      colTwo[j] == k
      ){
      occurenceOfCol2[k]++;
    }
    if(
      colThree[j] == k
      ){
      occurenceOfCol3[k]++;
    }
    }
  }

  outputs.innerHTML += "<table><tr>"

  outputs.innerHTML += "<th>Number: <th>";
  outputs.innerHTML += "<th> COL 1: <th>";
  outputs.innerHTML += "<th> COL 2: <th>";
  outputs.innerHTML += "<th> COL 3: <th>";

  outputs.innerHTML += "</tr> <tr>";



    for(let i=0;i<= 9 ; i++){ //loop a digit and calculate occurence by column 3 times
      // outputs.innerHTML += "<p>" + colOne[i] + " #" + i + "</p>";
      outputs.innerHTML += "<tr>";
      outputs.innerHTML += "<td>" + i + "</td>";
      outputs.innerHTML += "<td>" + occurenceOf[i] + " #" + i + "</td>";
      outputs.innerHTML += "<td>" + occurenceOfCol2[i] + " #" + i + "</td>";
      outputs.innerHTML += "<td>" + occurenceOfCol3[i] + " #" + i + "</td>";

      outputs.innerHTML += "</tr>";
    }

    outputs.innerHTML += "</table>";



    outputs.innerHTML += "<h2> COL TWO: </h2>";
    for(let i=0;i<= 9 ; i++){
      // outputs.innerHTML += "<p>" + colOne[i] + " #" + i + "</p>";
      outputs.innerHTML += "<p>" + occurenceOfCol2[i] + " #" + i + "</p>";
    }

    outputs.innerHTML += "<h2> COL THREE: </h2>";
    for(let i=0;i<= 9 ; i++){
      // outputs.innerHTML += "<p>" + colOne[i] + " #" + i + "</p>";
      outputs.innerHTML += "<p>" + occurenceOfCol3[i] + " #" + i + "</p>";
    }

    console.log("oc",occurenceOf);

  //   outputs.innerText += " COL TWO: ";
  // for(let i=0;i< 9 ; i++)
  //   outputs.innerText += colTwo[i] + " #" + i;

  //   outputs.innerText += " COL THREE: ";
  // for(let i=0;i< 9 ; i++)
  //   outputs.innerText += colThree[i] + " #" + i;


  // outputs.innerText += occurenceOfReg;
  // outputs.innerHTML += occurenceOfRegCol2;
  // outputs.innerHTML += occurenceOfRegCol3;

});