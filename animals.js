
class Animals{
	constructor (params){

	this.Name = params.Name;
	this.Food = params.Food;
	this.Size = params.Size;
	this.Attract = params.Attract;
	this.HerdMulti = params.HerdMulti;
	this.MaxHerd = params.MaxHerd;
	this.Cost = this.Attract * 1000;
	this.CostType = params.CostType;
	this.Place = params.Place;
	this.PlaceId = params.PlaceId;
	this.EncId = params.EncId;
	this.Id = params.Id;
	this.Tiers = params.Tiers;
	this.Space = params.Space;
	this.MaxAge = params.MaxAge;
	this.BirthDay = params.BirthDay;
	this.Health = 100;
	this.HealtLossChance = params.HealtLossChance; // Expressed in %
	this.Alive = false;
	
	let HerdMulti = this.HerdMulti;
	let Name = this.Name;
		if(HerdMulti != undefined){
			herdMultiplier.push({Name, HerdMulti});		// A dictionnary of herd multiplier is maintained for calc reasons
			baseAnimalList.push(this);
		}
	}

	getInstance(){
		let baseIdentifier = availableList.length;
		let costType = '';
		if(this.Tiers == 1){							// Only Tiers 1 animals can be bought with money, so when we create the animal instance we select with which currency he can be bought.
			costType = 'money';
		} else {
			costType = 'reputation';
		}
		this.CostType = costType;

		return baseIdentifier = new Animals({
			Name: this.Name,
			Food: this.Food,
			Size: this.Size,
			Attract: this.Attract,
			CostType: this.CostType,
			Tiers: this.Tiers,
			Space: this.Space,
			MaxAge: this.MaxAge,
			EncId: this.EncId,
			Health: this.Health,
			HealtLossChance: this.HealtLossChance,
			Alive: true});
	}

	updateAge(){
		let spanId = 'aniAge' + this.Id;
		let aniSpan = document.getElementById(spanId);
		let currentAge = Math.ceil((v.daysElapsed - this.BirthDay) / 365);
		if(currentAge > this.MaxAge){												// Code to manage the death of animals
			this.killAnimal('old age.');
		}
		if(aniSpan != undefined){
			aniSpan.innerHTML = currentAge;
		}
	}

	killAnimal(why){
		this.moveAnimal('graveyard');	
		this.Alive = false;										
		updateLogs('Your ' + this.Name + ' died of ' + why);
		let aniSpan = document.getElementById(spanId);							// Update the age of death for the graveyard 
		aniSpan.innerHTML = currentAge;											
		if(v.isVisiblegraveyard == false){										// Change the variable to show the graveyard tab from now on
			v.isVisiblegraveyard = true;
		}
	}

	buyAnimal(){
		if(this.CostType == 'money'){
			if(v.money >= this.Cost){
				this.BirthDay = v.daysElapsed;
				holdingPenList.push(this);
				v.money = v.money - this.Cost;
				this.moveAnimal('holdingPen');
			} else {
				updateLogs("Not enough money");
			}
		} else if (this.CostType == 'reputation'){
			if(v.reputation >= this.Cost){
				this.BirthDay = v.daysElapsed;
				holdingPenList.push(this);
				v.reputation = v.reputation - this.Cost;
				this.moveAnimal('holdingPen');
			} else {
				updateLogs("Not enough money");
			}
		}
		this.Alive = true;
	}

	calcHealth(){
		let roll = rollChances();
		if(roll <= this.HealtLossChance){
			this.Health = this.Health -1;
			let spanId = "aniHealth" + this.Id;
			document.getElementById(spanId).innerHTML = this.Health;
		}
		if(this.Health <= 0){
			this.killAnimal('bad health.');
		}
	}
	
	moveAnimal(newPlace, newPlaceId, noRem){

		let oldPlace = this.Place;												// Store the place before the changes
		if(oldPlace == 'enclosure' && noRem != true){							// When the animal go from Enclosure -> Holding Pen
			let currentEnc = enclosureList[this.PlaceId];
			currentEnc.CurrentSpace = currentEnc.CurrentSpace - this.Space;		// Update the occupied space value of the enclosure by removing the animal

			let span = 'spanCurrent' + this.PlaceId;
			document.getElementById(span).innerHTML = currentEnc.CurrentSpace;
			let aniToRem = undefined;
			for(let i = 0; i < currentEnc.Animal.length; i++){
				if(currentEnc.Animal[i].Id == this.Id){
					currentEnc.Animal.splice(i, 1);								// Remove the animal from the enclosure list
					i--;
				}
			}
			currentEnc.calcAttract();

		}

		this.Place = newPlace;

		if(newPlaceId != undefined && newPlace == 'enclosure'){			// The newPlaceId is defined solely for the enclosures, so if it's defined, we use it to create the div
			this.PlaceId = newPlaceId;	
		}

		if(noRem != true){
			let divToRemove = document.getElementById("Div" + this.Id);		
			divToRemove.remove();
		}

		// This block manage the counts display for each animal place

		let oldPlaceCt = oldPlace + 'Ct';
		let newPlaceCt = newPlace + 'Ct';
		switch(oldPlace){
			case 'holdingPen':
				v.holdingPenCt --;
				document.getElementById(oldPlaceCt).innerHTML = v.holdingPenCt;
				break;
			case 'market':
				v.marketCt --;
				document.getElementById(oldPlaceCt).innerHTML = v.marketCt;				
				break;	
		}			

		switch(newPlace){
			case 'holdingPen':
				v.holdingPenCt ++;
				document.getElementById(newPlaceCt).innerHTML = v.holdingPenCt;
				break;
			case 'market':
				v.marketCt ++;
				document.getElementById(newPlaceCt).innerHTML = v.marketCt;
				break;
			case 'graveyard':
				v.graveyardCt ++;
				document.getElementById(newPlaceCt).innerHTML = v.graveyardCt;
				break;
		}		

		this.generateDiv();
		repopulateDropdownList();
	}

	generateDiv(){
		let placeDiv = this.Place;
		let costTxt ='';														// Initialize conditionnal string
		if(this.Place == 'market'){												
			costTxt = '<br>Cost : ' + this.Cost + ' ' + this.CostType;							
		} else {
			costTxt = "<br>Age : <span id='aniAge" + this.Id + "'</span>";
		}

		let newDiv = document.createElement("div");
		newDiv.id = "Div" + this.Id;						
		newDiv.classList.add('marketDivCss');	

		let newSpan = document.createElement("span");
		let str = "<span class='aniName'>" + this.Name + "</span> <br>" +
			'Attractivity : ' + this.Attract +
			"<br>Health : <span id='aniHealth" + this.Id + "'>" + this.Health + " </span>" +
			costTxt;
		newSpan.insertAdjacentHTML( 'beforeend', str );
		newDiv.appendChild(newSpan);

		if (this.Place == 'market'){
			let id = this.Id;
			let btBuyAni = document.createElement("button");
			btBuyAni.id = "Bt" + this.Id;
			btBuyAni.classList.add('btBuyAni');
			btBuyAni.textContent = "Buy";
			btBuyAni.addEventListener("click", function () {buyAnimalWrapper(id);});
			newDiv.appendChild(btBuyAni);
		}

		if (this.Place == 'enclosure' && this.PlaceId != undefined){
			let id = this.Id;
			let btRemove = document.createElement("button");
			btRemove.id = "Bt" + this.Id;
			btRemove.classList.add('btBuyAni');
			btRemove.textContent = "Remove";
			btRemove.addEventListener("click", function () {moveAnimalWrapper(id, 'holdingPen');});
			newDiv.appendChild(btRemove);
			enclosureList[this.PlaceId].Animal.push(this);
			enclosureList[this.PlaceId].calcAttract();
			placeDiv = this.Place + this.PlaceId;
		}

		let node = document.getElementById(placeDiv);
		node.appendChild(newDiv);
		}
}


function renewMarket(){
	if(v.reputation >= v.renewMrktCost){
		v.reputation = v.reputation - v.renewMrktCost;
		let aniAdded = generateMarketList();
		for(let i = availableList.length - 1; i <= aniAdded; i--){	// We reverse loop the list to move only the newly created animals
			let aniId = availableList[i].Id;
			let aniPlace = availableList[i].Place;
			let aniPlaceId = availableList[i].PlaceId;
			moveAnimalWrapper(aniId, aniPlace, aniPlaceId, false);

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
	let aniToAdd = v.marketMaxCapacity - v.marketCt;

	if (aniToAdd > 0){																				// If there are empty slots in the market												
		for(i = 0; i < aniToAdd; i++){
			let randomElement = Math.floor(Math.random() * eligibleList.length); 					// Select a random number in the base animal list
			let currentAnimal = eligibleList[randomElement].getInstance();							// Initialise the random animal
			availableList.push(currentAnimal);														// Add the animal to the list of available animal

			currentAnimal.Id = availableList.length -1;												// Initialise the Id to be the same as the animal's index in the list
			currentAnimal.Place = 'market';															// Change the place to market

			v.marketCt = v.marketCt + 1;															// Add 1 to the number of animals in the market
			moveAnimalWrapper(currentAnimal.Id, currentAnimal.Place, null, true);
		}
	}
	return aniToAdd;
};

function updateAgesWrapper(){
	for(let ani of availableList){
		if(ani.Place != 'graveyard'){
			ani.updateAge();
		}
	}
}

function updateHealth(){
	for(let ani of availableList){
		if(ani.Alive){
			ani.calcHealth();
		}
	}
}


function initializeAni() {
    for (let ani of loadedAniList) {
	    availableList.push(new Animals({
	        Attract: ani.Attract,
	        CostType: ani.CostType,
			Cost: ani.Cost,
			Food: ani.Food,
			Id: ani.Id,
			Name: ani.Name,
			Place: ani.Place,
			PlaceId: ani.PlaceId,
			Size: ani.Size,
			Tiers: ani.Tiers,
			Space: ani.Space,
			MaxAge: ani.MaxAge,
			BirthDay: ani.BirthDay,
			Health: ani.Health,
			HealtLossChance: ani.HealtLossChance,
			Alive: ani.Alive
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
var herdMultiplier = [];	// Dictionnary of herd muliplier by animal

/* ------ ANIMALS ------*/

/* TEST TIER*/
const Dwarf = new Animals({
	Name: "Dwarf",
	Food: "Herbivora",
	Size: "Small",
	Tiers: 1,
	Space: 1,
	MaxAge: 3000,	
	Attract: 1,
	HerdMulti: 1,
	MaxHerd: 5,
	HealtLossChance: 0});

/* TIER 1*/

const sheep = new Animals({
	Name: "Sheep",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 1,
	Space: 2,
	MaxAge: 12,	
	Attract: 1,
	HerdMulti: 1,
	MaxHerd: 5,
	HealtLossChance: 1});

const horse = new Animals({
	Name: "Horse",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 1,
	Space: 2,	
	MaxAge: 27,		
	Attract: 1,
	HerdMulti: 1,
	MaxHerd: 2,
	HealtLossChance: 1});

const cow = new Animals({
	Name: "Cow",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 1,
	Space: 2,	
	MaxAge: 20,		
	Attract: 1,
	HerdMulti: 1,
	MaxHerd: 2,
	HealtLossChance: 1});

const Rabbit = new Animals({
	Name: "Rabbit",
	Food: "Herbivora",
	Size: "Small",
	Tiers: 1,
	Space: 1,
	MaxAge: 9,		
	Attract: 1,
	HerdMulti: 1.02,
	MaxHerd: 2,
	HealtLossChance: 1});

const Chicken = new Animals({
	Name: "Chicken",
	Food: "Herbivora",
	Size: "Small",
	Tiers: 1,
	Space: 1,
	MaxAge: 7,			
	Attract: 1,
	HerdMulti: 1.02,
	MaxHerd: 2,
	HealtLossChance: 1});

const Duck = new Animals({
	Name: "Duck",
	Food: "Herbivora",
	Size: "Small",
	Tiers: 1,
	Space: 1,		
	MaxAge: 10,	
	Attract: 1,
	HerdMulti: 1.05,
	MaxHerd: 5,
	HealtLossChance: 1});

const Pig = new Animals({
	Name: "Pig",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 1,
	Space: 2,	
	MaxAge: 17,		
	Attract: 1,
	HerdMulti: 1,
	MaxHerd: 2,
	HealtLossChance: 1});

/* TIER 2*/

const fox = new Animals({
	Name: "Fox",
	Food: "Carnivora",
	Size: "Small",
	Tiers: 2,
	Space: 1,		
	MaxAge: 12,	
	Attract: 3,
	HerdMulti: 1,
	MaxHerd: 2,
	HerdMulti: 1,
	MaxHerd: 2,
	HealtLossChance: 1});

const deer = new Animals({
	Name: "Deer",
	Food: "Herbivora",
	Size: "Medium",
	Tiers: 2,
	Space: 2,	
	MaxAge: 6,
	Attract: 2,
	HerdMulti: 1.05,
	MaxHerd: 5,
	HealtLossChance: 1});

/* TIER 3*/

const wolf = new Animals({
	Name: "Wolf",
	Food: "Carnivora",
	Size: "Medium",
	Tiers: 3,
	Space: 2,		
	MaxAge: 13,	
	Attract: 4,
	HerdMulti: 1.1,
	MaxHerd: 5});

/* TIER 4*/

const blackBear = new Animals({
	Name: "Black bear",
	Food: "Carnivora",
	Size: "Medium",
	Tiers: 4,
	Space: 3,	
	MaxAge: 30,		
	Attract: 6,
	HerdMulti: 1.2,
	MaxHerd: 3});