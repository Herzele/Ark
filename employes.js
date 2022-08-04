class Employes{
	constructor (params){

	this.Id = params.Id;
	this.Job = params.Job;
	this.DailyCost = params.DailyCost;
	this.ResearchType = params.ResearchType;
	this.ResearchValue = params.ResearchValue;

	}

	getInstance(){
		let baseIdentifier = employesList.length;

		return baseIdentifier = new Employes({
			Id: this.baseIdentifier,
			Job: this.Job,
			DailyCost: this.DailyCost,
			ResearchType: this.ResearchType,
			ResearchValue: this.ResearchValue
			});
	}
}

var employesList = [];



const Caretaker = new Employes({
	Job: "Caretaker",
	DailyCost: 1,
	ResearchType: "animal",
	ResearchValue: 1
});