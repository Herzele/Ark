
class Animals{
	constructor (params){

	this.Name = params.Name;
	this.Food = params.Food;
	this.Size = params.Size;
	this.Attract = params.Attract;
	this.Cost = this.Attract * 1000;
	this.Place = params.Place;
	this.PlaceId = params.PlaceId;
	this.EncId = params.EncId;
	this.Id = params.Id;
	this.Tiers = params.Tiers;
	this.Space = params.Space;
	this.MaxAge = params.MaxAge;
	this.MaxAgeDays = this.MaxAge * 365;
	this.BirthDay = params.BirthDay;
	baseAnimalList.push(this);

	}

	getInstance(){
		let baseIdentifier = availableList.length;
		return baseIdentifier = new Animals({
			Name: this.Name,
			Food: this.Food,
			Size: this.Size,
			Attract: this.Attract,
			Tiers: this.Tiers,
			Space: this.Space,
			MaxAge: this.MaxAge,
			MaxAgeDays: this.MaxAgeDays,
			BirthDay: v.daysElapsed,		
			EncId: this.EncId});
	}

	buyAnimal(){
		if(v.money >= this.Cost){
			holdingPenList.push(this);
			v.money = v.money - this.Cost;
			this.moveAnimal('holdingPen');
		} else {
			updateLogs("Not enough money");
		}
	}

	moveAnimal(newPlace, newPlaceId, noRem){

		this.Place = newPlace;

		if(newPlaceId != undefined){
			newPlace = newPlace + newPlaceId;
			this.PlaceId = newPlaceId;	
		}

		let costTxt ='';
		if(newPlace == 'Market'){												
			costTxt = '<br>Cost : ' + this.Cost;							
		}
		if(noRem == true){

		} else {
			let divToRemove = document.getElementById("Div" + this.Id);		
			divToRemove.remove();
		}										

		let newDiv = document.createElement("div");
		newDiv.id = "Div" + this.Id;						
		newDiv.classList.add('marketDivCss');	

		let newSpan = document.createElement("span");
		let str = this.Name + '<br>' + 'Size : ' + this.Size +
			'<br>Attractivity : ' + this.Attract +
			costTxt;
		newSpan.insertAdjacentHTML( 'beforeend', str );

		newDiv.appendChild(newSpan);

		if (newPlace == 'Market'){
			let id = this.Id;
			let btBuyAni = document.createElement("button");
			btBuyAni.id = "Bt" + this.Id;
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
			moveAnimalWrapper(ani.Id, ani.Place, ani.PlaceId, false);
		}	
	} else {
		updateLogs("Not enough reputation")
	}
}

function moveAnimalWrapper(id, newPlace, newPlaceId, noRem){
	for(let ani of availableList){
		if(ani.Id == id){
			ani.moveAnimal(newPlace, newPlaceId, noRem);
		}
	}
}

function buyAnimalWrapper(id){
	for(let ani of availableList){
		if(ani.Id == id){
			ani.buyAnimal();
		}
	}
	v.marketCurrentCount = v.marketCurrentCount - 1;
}

function updateTiers(){
	for(let ani of baseAnimalList){
		if(ani.Tiers <= v.animalTiers){
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

			currentAnimal.Id = availableList.length -1;												// Initialise the Id to be the same as the animal's index in the list
			currentAnimal.Place = 'Market';															// Change the place to market

			v.marketCurrentCount = v.marketCurrentCount + 1;										// Add 1 to the number of animals in the market
			moveAnimalWrapper(currentAnimal.Id, currentAnimal.Place, null, true);
		}
	}
};



function initializeAni() {
    for (let ani of loadedAniList) {
	    availableList.push(new Animals({
	        Attract: ani.Attract,
			Cost: ani.Cost,
			Food: ani.Food,
			Id: ani.Id,
			Name: ani.Name,
			Place: ani.Place,
			PlaceId: ani.PlaceId,
			Size: ani.Size,
			Tiers: ani.Tiers,
			Space: ani.Space,
			MaxAge: MaxAge,
			MaxAgeDays: MaxAgeDays,
			BirthDay: BirthDay
		    }))
	}
	for (let ani of availableList){
		moveAnimalWrapper(ani.Id, ani.Place, ani.PlaceId, true);	
	}	
}


var loadedAniList = [];
var eligibleList = [];		// List of all animals eligible for the market, depending on the current tier
var baseAnimalList = [];	// List of all animals from the initial pool, 1 animal of each type only
var availableList = [];		// List of all animals bought or buyable. Used mainly to attribute unique ID
var holdingPenList = [];	// List of all animals currently in the holding pen


/* ------ ANIMALS ------*/

/* TIER 1*/

const sheep = new Animals({
	Name: "Sheep",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 1,
	Space: 2,
	MaxAge: 12,	
	Attract: 1});

const horse = new Animals({
	Name: "Horse",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 1,
	Space: 2,	
	MaxAge: 27,		
	Attract: 1});

const cow = new Animals({
	Name: "Cow",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 1,
	Space: 2,	
	MaxAge: 20,		
	Attract: 1});

const Rabbit = new Animals({
	Name: "Rabbit",
	Food: "Herbivora",
	Size: "Small",
	Tiers: 1,
	Space: 1,
	MaxAge: 9,		
	Attract: 1});

const Chicken = new Animals({
	Name: "Chicken",
	Food: "Herbivora",
	Size: "Small",
	Tiers: 1,
	Space: 1,
	MaxAge: 7,			
	Attract: 1});

const Duck = new Animals({
	Name: "Duck",
	Food: "Herbivora",
	Size: "Small",
	Tiers: 1,
	Space: 1,		
	MaxAge: 10,	
	Attract: 1});

const Pig = new Animals({
	Name: "Pig",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 1,
	Space: 2,	
	MaxAge: 17,		
	Attract: 1});

/* TIER 2*/

const fox = new Animals({
	Name: "Fox",
	Food: "Carnivora",
	Size: "Small",
	Tiers: 2,
	Space: 1,		
	MaxAge: 12,	
	Attract: 3});

const deer = new Animals({
	Name: "Deer",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 2,
	Space: 2,	
	MaxAge: 6,		
	Attract: 2});

/* TIER 3*/

const wolf = new Animals({
	Name: "Wolf",
	Food: "Carnivora",
	Size: "Medium",
	Tiers: 3,
	Space: 2,		
	MaxAge: 13,	
	Attract: 4});

/* TIER 4*/

const blackBear = new Animals({
	Name: "Black bear",
	Food: "Carnivora",
	Size: "Medium",
	Tiers: 4,
	Space: 3,	
	MaxAge: 30,		
	Attract: 6});