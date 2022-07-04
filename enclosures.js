
class Enclosure{
	constructor (params){

	this.encId = params.encId;
	this.encAnimal = params.encAnimal;	

	var encSizeSelec = document.getElementById('encSizeSelector');
	this.encSize = encSizeSelec.value;

	if(this.encSize == 'small'){
		this.encCssClass = 'enclosureSmall';
	} else if(this.encSize =='medium'){
		this.encCssClass = 'enclosureMedium';
	} else {
		this.encCssClass = 'enclosureLarge';
	};

	enclosureList.push(this);

	let encDiv = document.createElement("span");
	encDiv.classList.add(this.encCssClass);
	encDiv.textContent = 'ICI';

    let node = document.getElementById("enclosureDiv");
    node.appendChild(encDiv);

	updateLogs(enclosureList.length);

	}
}

function createEnclosure(size){
	let enclosureId = enclosureList.length + 1;

	const newEnc = new Enclosure({
	encId: enclosureId,
	encSize: size});
};


function displayEnclosure(size){
	

};

var loadedList = [];
var enclosureList = [];

