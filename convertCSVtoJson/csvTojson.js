console.log("Convert CSV to Json");
const fs = require('fs');
const csv = require('csv-parser');

function csvToJson(csvFilePath, jsonFilePath) {
    const jsonArray = [];
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            jsonArray.push(row);
        })
        .on('end', () => {
            // Write JSON data to file
            fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 4));
            console.log('CSV file successfully converted to JSON.');
        });
}


const csvFilePath = 'data.csv'; // path to your CSV file
const jsonFilePath = 'data.json'; // path to where you want to save the JSON file
csvToJson(csvFilePath, jsonFilePath);
