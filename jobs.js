class Job{
	constructor (params){

	this.Name = params.Name;
	this.DailyCost = params.DailyCost;
	this.CountTotal = 0;
	this.Unemployed = 0;
	this.TaskCount = 0;
	this.TaskMax = 1;
	this.ResearchCount = 0;
	this.ResearchMax = 1;
	this.ResearchValue = 1;
	this.TotalCost = 0;
	this.SpanBase = params.SpanBase;


	jobsList.push(this);

	}

	updateCounts(){
		let employed = this.ResearchCount + this.TaskCount;
		this.Unemployed = this.CountTotal - employed;

		if(this.Unemployed < 0){
			if(this.TaskCount > 0){
				this.TaskCount = this.TaskCount -1;
			} else if(this.ResearchCount > 0){
				this.ResearchCount = this.ResearchCount -1;
			}
			employed = this.ResearchCount + this.TaskCount;
			this.Unemployed = this.CountTotal - employed;		
		}

		let spanTskCur = this.SpanBase + 'TsCr'; 
		let spanTskMax = this.SpanBase + 'TsMax';
		let spanResCur = this.SpanBase + 'RsCr';
		let spanResMax = this.SpanBase + 'RsMax';
		let spanUnp = this.SpanBase + 'UnpCr';

		document.getElementById(spanUnp).innerHTML = this.Unemployed;
		document.getElementById(spanTskCur).innerHTML = this.TaskCount;
		document.getElementById(spanTskMax).innerHTML = this.TaskMax;
		document.getElementById(spanResCur).innerHTML = this.ResearchCount;
		document.getElementById(spanResMax).innerHTML = this.ResearchMax;	
	}

	calcResearch(){
		switch(this.Name){
			case 'Caretaker':
			v.animalCareRPPerSec = this.ResearchCount * this.ResearchValue;
			document.getElementById('researchCarePerSec').innerHTML = v.animalCareRPPerSec;
			break;
    	}
    }

   	calcTotalCost(){
   		this.TotalCost = this.CountTotal * this.DailyCost;
    }


	addResearchJob(){
		if(this.Unemployed >0){
			this.Unemployed--;
			this.ResearchCount++;
			this.calcResearch();
			this.updateCounts();
		}
	}

	addTaskJob(){
		if(this.Unemployed >0){
			this.Unemployed--;
			this.TaskCount++;
			this.updateCounts();
		}
	}

	remResearchJob(){
		if(this.ResearchCount >0){
			this.Unemployed++;
			this.ResearchCount--;
			this.calcResearch();			
			this.updateCounts();
		}
	}

	remTaskJob(){
		if(this.TaskCount >0){
			this.Unemployed++;
			this.TaskCount--;
			this.updateCounts();
		}
	}
}

function initializeStaff(){
	if(loadedJobList.length > 0){
		for(let i = 0; i < loadedJobList.length; i++){						// The job list being hardcoded (no instance generation) it's always in the same order, so we can use a for i loop and use the index as reference in both the loaded and the current list
			jobsList[i].DailyCost = loadedJobList[i].DailyCost;
			jobsList[i].CountTotal = loadedJobList[i].CountTotal;
			jobsList[i].Unemployed = loadedJobList[i].Unemployed;
			jobsList[i].TaskCount = loadedJobList[i].TaskCount;
			jobsList[i].TaskMax = loadedJobList[i].TaskMax;
			jobsList[i].ResearchCount = loadedJobList[i].ResearchCount;
			jobsList[i].ResearchMax = loadedJobList[i].ResearchMax;
			jobsList[i].ResearchValue = loadedJobList[i].ResearchValue;
			jobsList[i].TotalCost = loadedJobList[i].TotalCost;
			jobsList[i].SpanBase = loadedJobList[i].SpanBase;
		}
	}
	for(let emp of jobsList){
		emp.updateCounts();
		emp.calcResearch();
	}
}

function changeJobWrp(sign, type){
	for(let emp of jobsList){
		if(sign == '+' && type == 'Research'){
			emp.addResearchJob();
		} else if(sign == '-' && type == 'Research'){
			emp.remResearchJob();
		} else if(sign == '+' && type == 'Task'){
			emp.addTaskJob();
		} else if(sign == '-' && type == 'Task'){
			emp.remTaskJob();
		}
	}
}

function recruitJobWrp(name){
	for(let job of jobsList){
		if(job.Name == name){
			job.CountTotal = job.CountTotal +1;
			job.updateCounts();
			calcJobsCost();
			return;
		}
	}
}

function fireJobWrp(name){
	for(let job of jobsList){
		if(job.Name == name && job.CountTotal > 0){
			job.CountTotal = job.CountTotal -1;
			job.updateCounts();
			calcJobsCost();
			return;
		} else if (job.Name == name && job.CountTotal == 0){
			updateLogs("There is no one to fire.")
		}
	}	
}

function calcJobsCost(){
	v.moneyJobsCost = 0;
	for(let jobs of jobsList){
		jobs.calcTotalCost();
		v.moneyJobsCost = v.moneyJobsCost + jobs.TotalCost;
	}
}



var loadedJobList = [];
var jobsList = [];

const Caretaker = new Job({
	Name: "Caretaker",
	DailyCost: 5,
	SpanBase: "care"
});

// const Marketing = new Employes({
// 	Job: "Marketing",
// 	DailyCost: 10,
// 	SpanBase: "mark"
// });