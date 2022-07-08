
class Animals{
	constructor (params){

	this.aniName = params.aniName;
	this.aniFood = params.aniFood;
	this.aniSize = params.aniSize;
	this.aniAttract = params.aniAttract;
	this.aniPlace = 'none';
	this.aniId = params.aniId;

	baseAnimalList.push(this);

	}

	getInstance(){
		let baseIdentifier = availableList.length;
		updateLogs(baseIdentifier);
		return baseIdentifier = new Animals({
			aniName: "Fox",
			aniFood: "Carnivora",
			aniSize: "Small",
			aniAttract: 3});
		}
}


function getInstance(){

}

function generateMarketList(){

	// Select random animals to add to the market list
	let aniToAdd = v.marketMaxCapacity - v.marketCurrentCount;

	if (aniToAdd > 0){			
														// If there are empty slots in the market
		for(i = 0; i < aniToAdd; i++){

			let randomElement = Math.floor(Math.random() * baseAnimalList.length); 					// Select a random number in the base animal list

			availableList.push(baseAnimalList[randomElement].getInstance());						// Add the animal to the list of available animal

			availableList[availableList.length - 1].aniId = availableList.length;					// Initialise the Id
			availableList[availableList.length - 1].aniPlace = 'Market';							// Change the place to market

			// Create the required Div in the market screen
			v.marketCurrentCount = v.marketCurrentCount + 1;										// Add 1 to the number of animals in the market
			let marketDiv = document.createElement("div");
			marketDiv.id = "Div" + availableList[availableList.length - 1].aniId;								
			marketDiv.classList.add('marketCssDiv');

			let marketSpan = document.createElement	("span");
			marketSpan.textContent = availableList[i].aniName;
			marketDiv.appendChild(marketSpan);		

			let currentAniId = availableList[i].aniId;
			let btBuyAni = document.createElement("button");
			btBuyAni.id = "Bt" + currentAniId;
			btBuyAni.classList.add('btBuyAni');
			btBuyAni.textContent = "Buy";
			// btBuyAni.onclick = function() { moveAnimal(currentAniId, 'Animals'); };
			btBuyAni.addEventListener("click", function () {moveAnimal(currentAniId, 'Animals');});	

			marketDiv.appendChild(btBuyAni);

	    	let node = document.getElementById("Market");
	    	node.appendChild(marketDiv);


		} 
	}
};


function moveAnimal(id, newPlace){

	for(i = 0; i < availableList.length; i++){

		if(availableList[i].aniId === id){
			let divToRemove = document.getElementById("Div" + availableList[i].aniId);

			updateLogs("We are in the loop");
			
			divToRemove.remove();

			let newDiv = document.createElement("div");
			newDiv.id = availableList[i].aniId;						
			newDiv.classList.add('marketCssDiv');								

			let newSpan = document.createElement("span");
			newSpan.textContent = availableList[i].aniName;
			newDiv.appendChild(newSpan);

			let node = document.getElementById(newPlace);
			node.appendChild(newDiv);
		} 
	}	
	updateLogs("---+---");
};


var loadedList = [];
var baseAnimalList = [];	// List of all animals from the initial pool, 1 animal of each type only
var availableList = [];		// List of all animals bought or buyable. Used mainly to attribute unique ID



const fox = new Animals({
	aniName: "Fox",
	aniFood: "Carnivora",
	aniSize: "Small",
	aniAttract: 3});

const sheep = new Animals({
	aniName: "Sheep",
	aniFood: "Herbivora",
	aniSize: "Medium",
	aniAttract: 1});

const horse = new Animals({
	aniName: "Horse",
	aniFood: "Herbivora",
	aniSize: "Medium",
	aniAttract: 1});

const deer = new Animals({
	aniName: "Deer",
	aniFood: "Herbivora",
	aniSize: "Medium",
	aniAttract: 2});

const wolf = new Animals({
	aniName: "Wolf",
	aniFood: "Carnivora",
	aniSize: "Medium",
	aniAttract: 4});

const cow = new Animals({
	aniName: "Cow",
	aniFood: "Herbivora",
	aniSize: "Medium",
	aniAttract: 1});

const blackBear = new Animals({
	aniName: "Black bear",
	aniFood: "Carnivora",
	aniSize: "Medium",
	aniAttract: 6});
