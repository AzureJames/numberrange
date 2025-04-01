async function fetcher (url) {
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

let outputs = document.getElementById("outputs");
let thoutputs = document.getElementById("tbhead");
let tboutputs = document.getElementById("tbbody");

let outputsNormed = document.getElementById("outputsNormed");
let thoutputsNormed = document.getElementById("tbheadNormed");
let tboutputsNormed = document.getElementById("tbbodyNormed");

let afternoon = document.getElementById("afternoon");
let night = document.getElementById("night");
let totalCount = document.getElementById("totalCount");
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

let pss = document.getElementById("pss"); 


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



    //if (pss.value % 197930 == 81 && pss.value !== 198011) {
    outputs.innerHTML = "";
    thoutputs.innerHTML = "";
    tboutputs.innerHTML = "";
    outputsNormed.innerHTML = "";
    thoutputsNormed.innerHTML = "";
    tboutputsNormed.innerHTML = "";
    console.log("hi");
    //submitForm.prevenspanefault();
    firstRegDay = startForm.value-1; 
    lastRegDay = endForm.value;
    console.log(firstRegDay,lastRegDay);




    for(var q = firstRegDay; q < lastRegDay; q++){ 
      //console.log(data[i].midday_winning_numbers);
      if(q == firstRegDay){outputs.innerHTML += "<p>Number of days: </p>" +  lastRegDay + "<p>Latest time: " + regularData[0].draw_date.substring(0,10) + " Newest day+evening numbers: " + regularData[q].midday_daily + " "+ regularData[q].evening_daily + "</p>";}
      console.log(regularData.length);
      stringy = toString(regularData[q].midday_daily);
      if (afternoon.checked == true) {
        if (regularData[q].midday_daily.length == 1) {
          colOne.push("0"); //ARRAYS FROM THE RAW DATA
          colTwo.push("0");
          colThree.push(regularData[q].midday_daily[0]); }
        if (regularData[q].midday_daily.length == 2) {
          colOne.push("0"); //ARRAYS FROM THE RAW DATA
          colTwo.push(regularData[q].midday_daily[0]);
          colThree.push(regularData[q].midday_daily[1]); }
        if (regularData[q].midday_daily.length == 3) {
          colOne.push(regularData[q].midday_daily[0]); //ARRAYS FROM THE RAW DATA
          colTwo.push(regularData[q].midday_daily[1]);
          colThree.push(regularData[q].midday_daily[2]); }
      }
      if (night.checked == true) {
        if (regularData[q].evening_daily.length == 1) {
            colOne.push("0"); //ARRAYS FROM THE RAW DATA0
          colTwo.push("0");
          colThree.push(regularData[q].evening_daily[2]); }
        if (regularData[q].evening_daily.length == 2) {
            colOne.push("0"); //ARRAYS FROM THE RAW DATA0
          colTwo.push(regularData[q].evening_daily[0]);
          colThree.push(regularData[q].evening_daily[1]); }
        if (regularData[q].evening_daily.length == 3) {
          colOne.push(regularData[q].evening_daily[0]); //ARRAYS FROM THE RAW DATA0
          colTwo.push(regularData[q].evening_daily[1]);
          colThree.push(regularData[q].evening_daily[2]); }
      }
      if(q == lastRegDay-1){outputs.innerHTML += "<p>Oldest time: " + regularData[q].draw_date.substring(0,10) + " Oldest day+evening numbers: " + regularData[q].midday_daily + " " +  regularData[q].evening_daily + "</p>";}
    }
    colOne = Array.from(colOne, v => v === undefined ? '0' : v);
    colTwo = Array.from(colTwo, v => v === undefined ? '0' : v);
    colThree = Array.from(colThree, v => v === undefined ? '0' : v);
    
console.log(colOne);
console.log(colTwo);
console.log(colThree);
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

    //DISPLAY STANDARD OUTPUT

    thoutputs.innerHTML += "<tr><th>Number: Col 1: Col 2: Col 3: Sum:<th></tr>";

    totalCount.innerHTML += colOne.length
      totalCount.innerHTML += " "
    totalCount.innerHTML += colTwo.length
      totalCount.innerHTML += " "
    totalCount.innerHTML += colThree.length



      for(let i=0;i<= 9 ; i++){ //loop a digit and calculate occurence by column 3 times
        // outputs.innerHTML += "<p>" + colOne[i] + " #" + i + "</p>";
        tboutputs.innerHTML += "<p>";
        tboutputs.innerHTML += "<span style='color:purple' > " + i + " </span>";
        tboutputs.innerHTML += "<span> " + occurenceOf[i] + " </span>";
        tboutputs.innerHTML += "<span> " + occurenceOfCol2[i] +  " </span>";
        tboutputs.innerHTML += "<span> " + occurenceOfCol3[i] + " </span>";
        var sum = occurenceOf[i] + occurenceOfCol2[i] + occurenceOfCol3[i];
        tboutputs.innerHTML += "<b style='color:purple' > " + sum + " </b>";
        tboutputs.innerHTML += "</p>";
      }

      


    //DISPLAY NORMED OUTPUT AROUND 2.5 OF THE MEAN
    
    thoutputsNormed.innerHTML += "<h2>Normed around 10% of the center</h2>";
    thoutputsNormed.innerHTML += "<tr><th>Number: Col 1: Col 2: Col 3: Sum:<th></tr>";

    totalCount.innerHTML += colOne.length
      totalCount.innerHTML += " "
    totalCount.innerHTML += colTwo.length
      totalCount.innerHTML += " "
    totalCount.innerHTML += colThree.length

    //Calculate array means
    let averageCol1 = 0;
    let averageCol2 = 0;
    let averageCol3 = 0;
    let allowedRange = 0;
    
    for (let num of occurenceOf){ averageCol1 += num; }
    averageCol1 /= occurenceOf.length;
    for (let num of occurenceOfCol2){ averageCol2 += num; }
    averageCol2 /= occurenceOfCol2.length;
    for (let num of occurenceOfCol3){ averageCol3 += num; }
    averageCol3 /= occurenceOfCol3.length;

    allowedRange = (averageCol1 + averageCol2 + averageCol3) / 3;
    allowedRange = allowedRange * .11; //around 11% in either direction

      for(let i=0;i<= 9 ; i++){ //loop a digit and calculate occurence by column 3 times
        // DISPLAY BLANK IF NOT WITHIN 2.5 OF THAT MEAN 
        tboutputsNormed.innerHTML += "<p>";
        tboutputsNormed.innerHTML += "<span style='color:purple' > " + i + " </span>";
        if (occurenceOf[i] > averageCol1 - allowedRange && occurenceOf[i] < averageCol1 + allowedRange){tboutputsNormed.innerHTML += "<span> " + occurenceOf[i] + " </span>";}
        else {tboutputsNormed.innerHTML += "<span>__ </span>";}

        if (occurenceOfCol2[i] > averageCol2 - allowedRange && occurenceOfCol2[i] < averageCol2 + allowedRange){tboutputsNormed.innerHTML += "<span> " + occurenceOfCol2[i] + " </span>";}
        else {tboutputsNormed.innerHTML += "<span>__ </span>";}
        
        if (occurenceOfCol3[i] > averageCol3 - allowedRange && occurenceOfCol3[i] < averageCol3 + allowedRange){tboutputsNormed.innerHTML += "<span> " + occurenceOfCol3[i] + " </span>";}
        else {tboutputsNormed.innerHTML += "<span>__ </span>";}
      //  tboutputsNormed.innerHTML += "<span> " + occurenceOfCol2[i] +  " </span>";
    //    tboutputsNormed.innerHTML += "<span> " + occurenceOfCol3[i] + " </span>";
        var sum = occurenceOf[i] + occurenceOfCol2[i] + occurenceOfCol3[i];
        tboutputsNormed.innerHTML += "<b style='color:purple' > " + sum + " </b>";
        tboutputsNormed.innerHTML += "</p>";
      }

     

  });

