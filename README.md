# Company Data Miner

## About

This program works by making a GET request to the URL provided to retrieve the data. Once the data is retrieve, the user can query the data to get a list of matching companies. 

Supported queries include:
'locate', 'find_before', 'find_after', 'find_companies_between_size', and 'find_type'. Each query can only take a single parameter.

Parameter details:

- 'locate': takes in a city, state, or country as a parameter.
- 'find_before' & 'find_after': take in a year and are inclusive
- 'find_companies_between_size': takes in the following possible options: ['1-10', '11-50', '51-200', '201-500', '501-1,000', '1,001-5,000', '5,001-10,000', '10,001+']
- 'find_type': takes in the following possible options: [’N/A’,
 'Aerospace and Defense',
 'Business & Legal Services',
 'Data/Technology',
 'Education',
 'Energy',
 'Environment & Weather',
 'Finance & Investment',
 'Food & Agriculture',
 'Geospatial/Mapping',
 'Governance',
 'Healthcare',
 'Housing/Real Estate',
 'Insurance',
 'Lifestyle & Consumer',
 'Media',
 'Research & Consulting',
 'Scientific Research',
 'Transportation']`

## Example queries
Input:

`>  find_type Education`

Output:

 `[ 'Alltuition',
  'BetterLesson',
  'Cappex',
  'College Board',
  'ConnectEDU',
  'eScholar LLC.',
  'GreatSchools',
  'How\'s My Offer?',
  'Junyo',
  'KidAdmit, Inc.' ]`

`Number of companies: 10 `

## Usage & Requirements
To run the program, use "node dataMiner.js".

When you are done running your queries, exit with CTRL+C.

To run the included tests, use "node test.js". Note: The test will then accept any input similarly to running the program itself. Use CTRL+C to exit the test.

This project requires Node.js.

## Implementation Details

The querying works by visiting each company object in the data set, looking at the relevant attribute based on the query time, and making a comparison to determine if the current company should be included in the returned set. I chose to build it in this way mainly due to the time constraints, however, some improvements to this solution would be to transform the data set into new objects, which would be particularly suited for the 'find_companies_between_size' and 'find_type' queries. This improved solution would create a new hash table, with the possible options as the keys and the matching companies in a list as the value. This would require more pre-processing time but would allow for faster querying, especially if the data set was very large.