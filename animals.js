
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
		return baseIdentifier = new Animals({
			aniName: this.aniName,
			aniFood: this.aniFood,
			aniSize: this.aniSize,
			aniAttract: this.aniAttract});
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
			let currentAnimal = baseAnimalList[randomElement].getInstance();						// Initialise the random animal
			availableList.push(currentAnimal);														// Add the animal to the list of available animal

			currentAnimal.aniId = availableList.length;												// Initialise the Id
			currentAnimal.aniPlace = 'Market';														// Change the place to market

			v.marketCurrentCount = v.marketCurrentCount + 1;										// Add 1 to the number of animals in the market

			// Create the required Div in the market screen

			let marketDiv = document.createElement("div");
			marketDiv.id = "Div" + currentAnimal.aniId;								
			marketDiv.classList.add('marketDivCss');

			let marketSpan = document.createElement	("span");
			let str = currentAnimal.aniName + '<br>' + 'Size : ' + currentAnimal.aniSize +
				'<br>Attractivity : ' + currentAnimal.aniAttract;

			marketSpan.insertAdjacentHTML( 'beforeend', str );

			// marketSpan.classList.add('aniNameCss');
			marketDiv.appendChild(marketSpan);		

			let btBuyAni = document.createElement("button");
			btBuyAni.id = "Bt" + currentAnimal.aniId;
			btBuyAni.classList.add('btBuyAni');
			btBuyAni.textContent = "Buy";
			btBuyAni.addEventListener("click", function () {moveAnimal(currentAnimal.aniId, 'holdingPen');});	

			marketDiv.appendChild(btBuyAni);

	    	let node = document.getElementById("Market");
	    	node.appendChild(marketDiv);

		} 
	}
};


function moveAnimal(id, newPlace, newPlaceId){

	for(i = 0; i < availableList.length; i++){
		if(availableList[i].aniId == id){
			let currentAnimal = availableList[i];

			currentAnimal.aniPlace = newPlace;

			if(newPlace == 'holdingPen'){
				holdingPenList.push(currentAnimal);

			} else if(newPlace == 'enclosure'){
				newPlace = newPlace + newPlaceId;
			}

			let divToRemove = document.getElementById("Div" + currentAnimal.aniId);
			divToRemove.remove();


			let newDiv = document.createElement("div");
			newDiv.id = "Div" + currentAnimal.aniId;						
			newDiv.classList.add('marketDivCss');								

			let newSpan = document.createElement("span");
			let str = currentAnimal.aniName + '<br>' + 'Size : ' + currentAnimal.aniSize +
				'<br>Attractivity : ' + currentAnimal.aniAttract;
			newSpan.insertAdjacentHTML( 'beforeend', str );

			newDiv.appendChild(newSpan);

			let node = document.getElementById(newPlace);
			node.appendChild(newDiv);
		} 
	}
	repopulateDropdownList();	
};




var loadedAniList = [];
var baseAnimalList = [];	// List of all animals from the initial pool, 1 animal of each type only
var availableList = [];		// List of all animals bought or buyable. Used mainly to attribute unique ID
var holdingPenList = [];	// List of all animals currently in the holding pen



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
