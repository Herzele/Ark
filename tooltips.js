
function updTt(){

  // Ressources
  let strAttra = "<div class='ressTt'><div class='ttName'> <div>Animal</div> </div> <div class='ttValue'> <div>" + v.attracAni + "</div> </div>";
    tipAttra[0].setContent(strAttra);

  let strMoney = "<div class='ressTt'><div class='ttName'> <div>Entry price *</div> <div>Visitors</div> </div> <div class='ttValue'> <div>"
   + v.entryPrice + "</div> <div>" + numberFormating(v.visitorsPerSec, 0) + "</div></div>";
    tipMoney[0].setContent(strMoney);

  let strVisit = "<div class='ressTt'><div class='ttName'> <div>Attractivity *</div> <div>Entry price coef</div> </div> <div class='ttValue'> <div>"
   + v.attractivity + "</div> <div>" + numberFormating(v.entryPriceCoef, 3) * 100 + "%</div></div>";
    tipVisitors[0].setContent(strVisit);

  let strReput = "<div class='ressTt'><div class='ttName'> <div>Visitors</div> </div> <div class='ttValue'> <div>" + numberFormating(v.visitorsPerSec, 0) + "</div></div>";
    tipReput[0].setContent(strReput);

  // Market
  let strRenewMrkt = "Renew the market selection for " + v.renewMrktCost + " reputation";
    renewMrkt[0].setContent(strRenewMrkt);
}


// Ressources

/* -----Description----- */
const tipMoneyDef = tippy('#moneyDiv', {
  content: 'Base money income is Entry price * Visitors per day.',
  placement: 'right',
  allowHTML: true,
});

const tipReputDef = tippy('#reputationDiv', {
  content: 'Base reputation is Parc Attractivity * Visitors per day.',
  placement: 'right',
  allowHTML: true,
});

const tipAttraDef = tippy('#attractivityDiv', {
  content: 'Base attractivity is the sum of the attractivity of all animals in enclosures.',
  placement: 'right',
  allowHTML: true,
});

const tipVisitDef = tippy('#visitorsDiv', {
  content: 'Base visitors is the total attractivity of the parc multiplied by your entry price coefficient. <br> It is capped by your parc maximum capacity.',
  placement: 'right',
  allowHTML: true,
});

/* -----Detail----- */

const tipAttra = tippy('#attractivity', {
  content: '-+-',
  placement: 'right',
  allowHTML: true,
});

const tipMoney = tippy('#moneyPerSec', {
  content: '-+-',
  placement: 'right',
  allowHTML: true,
});

const tipVisitors = tippy('#visitorsPerSec', {
  content: '-+-',
  placement: 'right',
  allowHTML: true,
});

const tipReput = tippy('#reputPerSec', {
  content: '-+-',
  placement: 'right',
  allowHTML: true,
});


// Market

/* -----Description----- */
const renewMrkt = tippy('#renewBt', {
  content: '-+-',
  placement: 'right',
  allowHTML: true,
});


//Pas utilisé pour le moment
function ttDivConstructor(ressource, gainsList){
  let finalDiv = document.createElement("div")
  finalDiv.id = ressource + 'Tt'
  finalDiv.classList.add('ttRessource')

  let gains = document.createElement("div")
  gains.id = ressource + 'Gains'
  gains.classList.add('gains')

  for(let [key, value] of gainsList){
    let newGain = document.createElement("div")
    newGain.innerHTML = key + ' : ' + value;
    gains.appendChild(newGain);
  }

  finalDiv.appendChild(gains);

  return finalDiv;
}