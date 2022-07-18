
class Enclosure{
	constructor (params){

	this.encId = params.encId;
	this.encAnimal = "none";	
	this.encSize = params.encSize;
	this.encCurrentAni = 0;
	this.encMaxAni = 2;

	let encTxt = "";
	if(this.encSize == 'Small'){
		this.encCssClass = 'enclosureSmall';
		encTxt = "Small Enclosure";
	} else if(this.encSize =='Medium'){
		this.encCssClass = 'enclosureMedium';
		encTxt = "Medium Enclosure";
	} else {
		this.encCssClass = 'enclosureLarge';
		encTxt = "Large Enclosure";
	};

	this.encDiv = document.createElement("div");
	this.encDiv.classList.add(this.encCssClass);
	this.encDiv.textContent = encTxt;
	this.encDiv.id = 'enclosure' + this.encId;

	let br = document.createElement("br");
	this.encDiv.appendChild(br);

	this.dropDown = document.createElement("select");
	this.dropDown.id = "dd" + this.encId;
	this.dropDown.classList.add("dropDownCss");

	for(let i = 0; i < availableList.length; i++){
		if(availableList[i].aniPlace == 'holdingPen' && this.encSize == availableList[i].aniSize){
		    let opt = document.createElement('option');
		    opt.innerHTML = availableList[i].aniName;
		    opt.text = availableList[i].aniName;
		    opt.value = availableList[i].aniId;
		    this.dropDown.appendChild(opt);
		}
	}
	this.encDiv.appendChild(this.dropDown);

	this.btAdd = document.createElement("button");
	this.btAdd.classList.add('btAddAnimalCss');
	this.btAdd.textContent = "Add";
	let ddId = this.dropDown.id;
	let enId = this.encId;
	this.btAdd.addEventListener("click", function () {isThereRoom(getSelectedValue(ddId), 'enclosure', enId);});
	this.encDiv.appendChild(this.btAdd);
 
	let node = document.getElementById("enclosureDiv");
    node.appendChild(this.encDiv);

	}

	appendEncDiv(){
		let node = document.getElementById("enclosureDiv");
    	node.appendChild(this.encDiv);
	};
}


function isThereRoom(aniId, newPlace, id){
	let enc = enclosureList[id];
	if(enc.encMaxAni > enc.encCurrentAni){
		enc.encCurrentAni++;
		moveAnimalWrapper(aniId, newPlace, id);
	} else {
		updateLogs('No more room in this enclosure');
		return false;
	}
}


function getSelectedValue(ddId){
	if(document.getElementById(ddId).selectedIndex != -1){
		let endValue = document.getElementById(ddId).options[document.getElementById(ddId).selectedIndex].value;
		return endValue;
	}
}

function repopulateDropdownList(){
	for(let y = 0; y < enclosureList.length; y++){					// Loop through the list of the enclosures
		let enc = enclosureList[y];									// Init. the current enclosure
		let options = enc.dropDown.options;							// Initialize the options (the list of values in the dropDown)	

		for(let i = options.length-1; i >=0 ; i--){					// Reverse loop through the options of the current dropDown 
			enc.dropDown.removeChild(options[i]);					// Remove the options of the dropDown
		}

		for(let z = 0; z < availableList.length; z++){
			if(availableList[z].aniPlace == 'holdingPen' && enc.encSize == availableList[z].aniSize){
			    let opt = document.createElement('option');
			    opt.innerHTML = availableList[z].aniName;
			    opt.text = availableList[z].aniName;
			    opt.value = availableList[z].aniId;
			    enc.dropDown.appendChild(opt);
			}
		}
	}
}

function createEnclosure(){

	let enclosureId = enclosureList.length;
	let select = document.getElementById("encSizeSelector");
	let enclosureSize = select.options[select.selectedIndex].value;
	let encCost = 0;
	for(let [key, value] of v.enclosureCost){
		if(key == enclosureSize){
			encCost = value;
		}
	}

	if(v.money >= encCost){
		v.money = v.money - encCost;
		let id = enclosureList.length;

		enclosureList[id] = new Enclosure({
		encId: enclosureId,
		encSize: enclosureSize});
	} else {
		updateLogs('Not enough money');
	}


};


function initializeEnc() {
    for (let enc of loadedEncList) {
        enclosureList.push(new Enclosure({
            encId: enc.encId,
            encSize: enc.encSize
        }))
    }
}

function constructator(id, size){
	enclosureList[enclosureList.length] = new Enclosure({
	encId: id,
	encSize: size});
}

var enclosureList = [];
var loadedEncList = [];
