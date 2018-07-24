var dataMiner = require('./dataMiner');
var data = dataMiner.data;

var testFunction = (actual, expected, descriptionOfCorrectBehavior) => {
  if (expected === actual) {
    console.log('Test passed');
  } else {
    console.log(`Test failed: Expected ${expected} to equal ${actual}, ${descriptionOfCorrectBehavior}`);
  }
}
dataMiner.makeRequest('https://s3-us-west-2.amazonaws.com/bain-coding-challenge/data.json')
.then((data) => {
  // test locate
  testFunction(
    dataMiner.locate(data, 'MI').toString(), 
    ["Compendia Bioscience Life Technologies", "FarmLogs", "LOVELAND Technologies", "Munetrix"].toString(), 
    'Function should find companies by location'
  );
  testFunction(
    dataMiner.locate(data, 'NYC').length, 
    0, 
    'Function should not find no companies for an invalid location'
  );

  // test findBefore and findAfter
  testFunction(
    dataMiner.findBefore(data, '1800').length, 
    1, 
    'Function should find companies founded on or before input year'
  );
  testFunction(
    dataMiner.findAfter(data, '2014').length, 
    6, 
    'Function should find companies founded on or after input year'
  );

  // test findSize
  testFunction(
    dataMiner.findSize(data, '501-1,000').toString(),
    ["Accela", "Avalara", "CARFAX", "Charles River Associates", "College Abacus, an ECMC initiative", "Consumer Reports", "Everyday Health", "Healthgrades", "Lending Club","NERA Economic Consulting"].toString(),
    'Function should find companies by current number of full time employees'
  );

  // test findType
  testFunction(
    dataMiner.findType(data, 'Lifestyle & Consumer').length,
    14,
    'Function should find companies by company category'
  );
})
