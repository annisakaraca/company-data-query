const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});
var companyData;

var url = 'https://s3-us-west-2.amazonaws.com/bain-coding-challenge/data.json';

var makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      response.setEncoding('utf8');
      let rawData = ''
      response.on('data', (d) => {
        rawData += d;
      });
      response.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (e) {
          reject(e.message);
        }
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
  })
}

makeRequest(url)
.then((data) => {
  companyData = data;
  rl.prompt();
  rl.on('line', (input) => {
    var searchType = input.split(' ')[0];
    var query = input.split(' ')[1];
    var results;
    switch(searchType) {
      case 'locate':
        results = locate(data, query);
        break;
      case 'find_before':
        results = findBefore(data, query);
        break;
      case 'find_after':
        results = findAfter(data, query);
        break;
      case 'find_companies_between_size':
        results = findSize(data, query);
        break;
      case 'find_type':
        results = findType(data, query);
        break;
      default:
        results = [];
        console.log('Incorrect search type');
    }
    
    console.log(results);
    console.log(`Number of companies: ${results.length}`);
  })

})

var locate = (data, query) => {
  return data.reduce((acc, curr) => {
    if (curr.city === query || curr.state === query || curr.country === query){
      acc.push(curr.company_name);
    }
    return acc;
  }, []);
}

var findBefore = (data, query) => {
  return data.reduce((acc, curr) => {
    if (curr.year_founded && curr.year_founded <= query){
      acc.push(curr.company_name);
    }
    return acc;
  }, []);
}

var findAfter = (data, query) => {
  return data.reduce((acc, curr) => {
    if (curr.year_founded && curr.year_founded >= query){
      acc.push(curr.company_name);
    }
    return acc;
  }, []);
}

var findSize = (data, query) => {
  return data.reduce((acc, curr) => {
    if (curr.full_time_employees === query){
      acc.push(curr.company_name);
    }
    return acc;
  }, []);
}

var findType = (data, query) => {
  return data.reduce((acc, curr) => {
    if (curr.company_category === query){
      acc.push(curr.company_name);
    }
    return acc;
  }, []);
}

module.exports.locate = locate;
module.exports.findBefore = findBefore;
module.exports.findAfter = findAfter;
module.exports.findSize = findSize;
module.exports.findType = findType;
module.exports.makeRequest = makeRequest;
