
class Animals{
	constructor (params){

	this.aniName = params.aniName;
	this.aniFood = params.aniFood;
	this.aniSize = params.aniSize;
	this.aniAttract = params.aniAttract;
	this.aniId = animalList.length + 1;


	animalList.push(this);

	}
}

function generateMarketList(){
	for(i = 0; i < v.maxMarketCapacity; i++){
		let randomElement = Math.floor(Math.random() * animalList.length);
		marketList.push(animalList[randomElement]);
	}
	for(i = 0; i < marketList.length; i++){
		let marketDiv = document.createElement("div");
		marketDiv.classList.add('marketCssDiv');

		let marketSpan = document.createElement	("span");
		marketSpan.textContent = marketList[i].aniName;
		marketDiv.appendChild(marketSpan);

		let buyAniBt = document.createElement("button");
		buyAniBt.classList.add('buyAniBt');
		buyAniBt.textContent = "Buy";

		marketDiv.appendChild(buyAniBt);

    	let node = document.getElementById("Market");
    	node.appendChild(marketDiv);
	}
};


var loadedList = [];
var animalList = [];
var marketList = [];


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
