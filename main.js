
var v = {

  //Ressources
  money: 20000,
  moneyPerSec: 0,
  moneyGainsList: [['Entries', 0]],

  reputation: 0,
  reputPerSec: 0,
  reputGainsList: [],

  enclosureBonus: 0,
  attractivity: 0,
  attracAni: 0,

  entryPrice: 1,
  entryPriceCoef: 0,
  entryPriceExp: 1.5,
  parcMaxCapacity: 20,

  animalTiers: 1,

  visitorsPerSec: 0,

  parcMaxCapacity: 20,

  marketMaxCapacity: 4,
  marketCurrentCount: 0,
  renewMrktCost: 1000,

  //Enclosure costs
  enclosureCost: [['Small', 5000], ['Medium', 10000], ['Large', 50000]],

  firstGame : true,

  timeMultiplier : 1,

  daysElapsed: 0,

  logsList : [],

  selectedSize: '',

}

options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};


var currentDay = new Date("01/01/2000");
var dateString = "dateDuJour";

var modeTest = "no";



/* ----- LAUNCH ----- */



function initialize() {
    document.body.style.zoom = 0.7;

    // Déserialise la sauvegarde
	if (localStorage.getItem("ArkSave") !== null) {
        v.firstGame = false;
		loadGame();
		currentDay.setDate(currentDay.getDate() + v.daysElapsed);
	} 

    //Initialise l'affichage des valeurs
    document.getElementById("money").innerHTML = v.money;
    document.getElementById("reputation").innerHTML = v.reputation;
    document.getElementById("entryPrice").value = v.entryPrice;

    updateTiers();
    initializeEnc();
    initializeAni();

    if(availableList.length == 0){      // If no animals exists, generate a free market list of animals to buy
        generateMarketList();
    }
}

window.onload = initialize();


/* ----- DISPLAY TABS ----- */

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
/*----- RESOURCES -----*/


/*----- PARC -----*/



/*----- ANIMALS -----*/



/* ----- MOTEUR VROOM VROOM ----- */

// Money

function calcMoney(){

    // Calculate the money gained per second
    v.moneyPerSec = v.visitorsPerSec * v.entryPrice;

    // Update the HTML with the ressource generated by second :
    document.getElementById("moneyPerSec").innerHTML = numberFormating(v.moneyPerSec, 0);
}

function updateMoney(){
    // Add money gain per sec to the total money amount
    v.money = v.money + v.moneyPerSec * v.timeMultiplier;  
    document.getElementById("money").innerHTML = numberFormating(v.money, 0);
}


// Reputation

function calcReput(){

    // Add reputation gain per sec to the total money amount    
    v.reputation = v.reputation + v.reputPerSec * v.timeMultiplier;

    // Update the HTML with the ressource generated by second :
    document.getElementById("reputPerSec").innerHTML = numberFormating(v.reputPerSec, 0); 

}

function updateReput(){

    // Update the reputation gained per second
    v.reputPerSec = v.visitorsPerSec;
    document.getElementById("reputation").innerHTML = numberFormating(v.reputation, 0);
}

// Visitors

function calcVisitors(){

    v.entryPriceCoef = 1 / Math.pow(v.entryPrice, v.entryPriceExp); // We apply a degressiv multiplier
    v.visitorsPerSec = v.attractivity * v.entryPriceCoef;

    v.visitorsPerSec = Math.floor(v.visitorsPerSec);                // To avoid maxing the entry price for only 1 visitor, we round down
    if(v.attractivity > v.parcMaxCapacity){                         // Update the reputation gained per second
        v.visitorsPerSec = v.parcMaxCapacity
    } 

    // Update the HTML with the ressource generated by second :
    document.getElementById("visitorsPerSec").innerHTML = numberFormating(v.visitorsPerSec, 0); 
}

function updateVisitors(){

}


// Attractivity

function calcAttractivity(){

    let attraGainsList = [];

    // Reset attractivity
    v.attractivity = 0;
    v.attracAni = 0;
    
    // Sum the attractivity of all animals in the zoo
    for(let ani of availableList){
        if(ani.aniPlace == 'enclosure'){
            v.attracAni += ani.aniAttract;
        }
    }

    v.attractivity = v.attracAni;

    // Update the HTML with the ressource generated by second :
    document.getElementById("attractivity").innerHTML = numberFormating(v.attractivity, 0); 
}

function updateAttractivity(){

}



// Generic functions

function numberFormating(value, decimals){
	var output = Math.round(value * 1e12) / 1e12;
	output = output.toFixed(decimals);
	return output;
}

function updateLogs(newLogString) {
    log = "";
    v.logsList.push(newLogString + '<br>');
    for (let i = v.logsList.length - 1; i >= 0; i--) {
        log += v.logsList[i];
    }
    document.getElementById("logsDisplay").innerHTML = log;
}

function rollChances(){
	roll = Math.floor((Math.random() * 100) + 1);
	return roll;
}


/* ----- EVENTS CHECKER -----*/

function chgCostSpan(){
    let select = document.getElementById("encSizeSelector");
    v.selectedSize = select.options[select.selectedIndex].value;
    let encCost = 0;
    for(let [key, value] of v.enclosureCost){
        if(key == v.selectedSize){
            encCost = value;
        }
    }
    document.getElementById('encCost').innerHTML = encCost;
}

function chgEntryPrice(){
    let input = document.getElementById("entryPrice");
    v.entryPrice = input.value;
}


function addDay(){
  v.daysElapsed = v.daysElapsed + 1;
  currentDay.setDate(currentDay.getDate() + 1);
  dateString = currentDay.getDate() + " / " + (currentDay.getMonth() + 1) + " / " + currentDay.getFullYear();
  document.getElementById("dateJour").innerHTML = dateString;
}

function saveGame(){
	localStorage.setItem("ArkSave",JSON.stringify(v));
    localStorage.setItem("ArkSaveAniList", JSON.stringify(availableList));
    localStorage.setItem("ArkSaveEncList", JSON.stringify(enclosureList));
}


function loadGame(){
	v = JSON.parse(localStorage.getItem("ArkSave"));
    loadedAniList = JSON.parse(localStorage.getItem("ArkSaveAniList"));
    loadedEncList = JSON.parse(localStorage.getItem("ArkSaveEncList"));
}

function deleteSave(){
	localStorage.removeItem("ArkSave");
    localStorage.removeItem("ArkSaveAniList");
    localStorage.removeItem("ArkSaveEncList");
    location.reload();
}


/* ----- UPDATES -----*/



function activateTestMode(){
	if(modeTest == "no"){
		v.timeMultiplier = 1000;
		modeTest = "yes"
	} else {
		v.timeMultiplier = 1;
		modeTest = "no"
	}
}


window.setInterval(function timeDay() {             // Fired once every second to update values
    addDay();
    updateMoney();
    updateReput();

}, 1000);

window.setInterval(function timeDay() {             // Fired once every 0.2 second to update the calcs
    addDay();

    calcMoney();
    calcReput();
    calcVisitors();
    calcAttractivity();

    updTt();


}, 200);

window.setInterval(function timeDay(){
	saveGame();
}, 60000);
