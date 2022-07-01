
class Enclosure{
	constructor (params){

	this.encSize = params.encSize;
	this.encAnimal = params.encAnimal;
	


	enclosureList.push(this);

	}
}

function createEnclosure(size, animal){
	this.size = size;
	this.animal = animal;

	enclosureList.push(this);
	updateLogs('lol');
};

var loadedList = [];
var enclosureList = [];

