
class Animals{
	constructor (params){

	this.aniName = params.aniName;
	this.aniFood = params.aniFood;
	this.aniSize = params.aniSize;
	this.aniAttract = params.aniAttract;
	this.aniCost = this.aniAttract * 1000;
	this.aniPlace = params.aniPlace;
	this.aniPlaceId = params.aniPlaceId;
	this.aniEncId = params.aniEncId;
	this.aniId = params.aniId;
	this.aniTiers = params.aniTiers;

	baseAnimalList.push(this);

	}

	getInstance(){
		let baseIdentifier = availableList.length;
		return baseIdentifier = new Animals({
			aniName: this.aniName,
			aniFood: this.aniFood,
			aniSize: this.aniSize,
			aniAttract: this.aniAttract,
			aniTiers: this.aniTiers,
			aniEncId: this.aniEncId});
	}

	buyAnimal(){
		if(v.money >= this.aniCost){
			holdingPenList.push(this);
			v.money = v.money - this.aniCost;
			this.moveAnimal('holdingPen');
		} else {
			updateLogs("Not enough money");
		}
	}

	moveAnimal(newPlace, newPlaceId, noRem){

		this.aniPlace = newPlace;

		if(newPlaceId != undefined){
			newPlace = newPlace + newPlaceId;
			this.aniPlaceId = newPlaceId;	
		}

		let costTxt ='';
		if(newPlace == 'Market'){												
			costTxt = '<br>Cost : ' + this.aniCost;							
		}
		if(noRem == true){

		} else {
			let divToRemove = document.getElementById("Div" + this.aniId);		
			divToRemove.remove();
		}	
												

		let newDiv = document.createElement("div");
		newDiv.id = "Div" + this.aniId;						
		newDiv.classList.add('marketDivCss');	

		let newSpan = document.createElement("span");
		let str = this.aniName + '<br>' + 'Size : ' + this.aniSize +
			'<br>Attractivity : ' + this.aniAttract +
			costTxt;
		newSpan.insertAdjacentHTML( 'beforeend', str );

		newDiv.appendChild(newSpan);

		if (newPlace == 'Market'){
			let id = this.aniId;
			let btBuyAni = document.createElement("button");
			btBuyAni.id = "Bt" + this.aniId;
			btBuyAni.classList.add('btBuyAni');
			btBuyAni.textContent = "Buy";
			btBuyAni.addEventListener("click", function () {buyAnimalWrapper(id);});
			newDiv.appendChild(btBuyAni);
		}

		let node = document.getElementById(newPlace);
		node.appendChild(newDiv);
		repopulateDropdownList();	
	}
}

function renewMarket(){
	if(v.reputation >= v.renewMrktCost){
		v.reputation = v.reputation - v.renewMrktCost;
		generateMarketList();
		for (let ani of availableList){
			moveAnimalWrapper(ani.aniId, ani.aniPlace, ani.aniPlaceId, false);
		}	
	} else {
		updateLogs("Not enough reputation")
	}
}

function moveAnimalWrapper(id, newPlace, newPlaceId, noRem){
	for(let ani of availableList){
		if(ani.aniId == id){
			ani.moveAnimal(newPlace, newPlaceId, noRem);
		}
	}
}

function buyAnimalWrapper(id){
	for(let ani of availableList){
		if(ani.aniId == id){
			ani.buyAnimal();
		}
	}
	v.marketCurrentCount = v.marketCurrentCount - 1;
}

function updateTiers(){
	for(let ani of baseAnimalList){
		if(ani.aniTiers <= v.animalTiers){
			eligibleList.push(ani);
		}
	}
}

function generateMarketList(){

	// Select random animals to add to the market list
	let aniToAdd = v.marketMaxCapacity - v.marketCurrentCount;

	if (aniToAdd > 0){			
														// If there are empty slots in the market
		for(i = 0; i < aniToAdd; i++){

			let randomElement = Math.floor(Math.random() * eligibleList.length); 					// Select a random number in the base animal list
			let currentAnimal = eligibleList[randomElement].getInstance();							// Initialise the random animal
			availableList.push(currentAnimal);														// Add the animal to the list of available animal

			currentAnimal.aniId = availableList.length -1;											// Initialise the Id to be the same as the animal's index in the list
			currentAnimal.aniPlace = 'Market';														// Change the place to market

			v.marketCurrentCount = v.marketCurrentCount + 1;										// Add 1 to the number of animals in the market
			moveAnimalWrapper(currentAnimal.aniId, currentAnimal.aniPlace, null, true);
		}
	}
};



function initializeAni() {
    for (let ani of loadedAniList) {
	    availableList.push(new Animals({
	        aniAttract: ani.aniAttract,
			aniCost: ani.aniCost,
			aniFood: ani.aniFood,
			aniId: ani.aniId,
			aniName: ani.aniName,
			aniPlace: ani.aniPlace,
			aniPlaceId: ani.aniPlaceId,
			aniSize: ani.aniSize,
			aniTiers: ani.aniTiers
		    }))
	}
	for (let ani of availableList){
		if(ani.aniPlace != 'Market'){
			moveAnimalWrapper(ani.aniId, ani.aniPlace, ani.aniPlaceId, true);	
		}

	}	
}




var loadedAniList = [];
var eligibleList = [];		// List of all animals eligible for the market, depending on the current tier
var baseAnimalList = [];	// List of all animals from the initial pool, 1 animal of each type only
var availableList = [];		// List of all animals bought or buyable. Used mainly to attribute unique ID
var holdingPenList = [];	// List of all animals currently in the holding pen



const fox = new Animals({
	aniName: "Fox",
	aniFood: "Carnivora",
	aniSize: "Small",
	aniTiers: 2,
	aniAttract: 3});

const sheep = new Animals({
	aniName: "Sheep",
	aniFood: "Herbivora",
	aniSize: "Medium",
	aniTiers: 1,
	aniAttract: 1});

const horse = new Animals({
	aniName: "Horse",
	aniFood: "Herbivora",
	aniSize: "Medium",
	aniTiers: 1,
	aniAttract: 1});

const deer = new Animals({
	aniName: "Deer",
	aniFood: "Herbivora",
	aniSize: "Medium",
	aniTiers: 2,
	aniAttract: 2});

const wolf = new Animals({
	aniName: "Wolf",
	aniFood: "Carnivora",
	aniSize: "Medium",
	aniTiers: 3,
	aniAttract: 4});

const cow = new Animals({
	aniName: "Cow",
	aniFood: "Herbivora",
	aniSize: "Medium",
	aniTiers: 1,
	aniAttract: 1});

const blackBear = new Animals({
	aniName: "Black bear",
	aniFood: "Carnivora",
	aniSize: "Medium",
	aniTiers: 4,
	aniAttract: 6});

