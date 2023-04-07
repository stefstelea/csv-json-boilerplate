/**
 * Node Script: CSV to JSON and back.
 * ------------------------------------------------------------------------------
 * A boilerplate for parsing and modifying CSV data.
 *
 * - Parses a CSV file that you input
 * - Modifies the CSV to a JSON object
 * - You run ES6 functions to modify data
 * - Output modified object to a new CSV file
 *
 * Modify to suit your needs.
 */

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser');
const fs = require('fs');

const inputCsvJson = [];
let modifiedCsvJson = [];

/**
 * Global config.
 */
const config = {
  inputFile: './input/hevydata.csv',
  outputFile: './output/hevy-good.csv',
};

/**
 * CSV configuration - more found in csvWriter docs.
 *
 * id: Title of the column from the input CSV
 * title: title of column in output, where input data will be mapped to.
 *
 * Each header ID needs to match the CSV header title text and can be reordered.
 */
const csvWriter = createCsvWriter({
  path: config.outputFile,
  header: [
    {
      id: 'Date',
      title: 'Date'
    },
    {
      id: 'Workout Name',
      title: 'Workout Name'
    },
    {
      id: 'Duration',
      title: 'Duration'
    },
    {
      id: 'Exercise Name',
      title: 'Exercise Name'
    },
    {
      id: 'Set Order',
      title: 'Set Order'
    },
    {
      id: 'Weight',
      title: 'Weight'
    },
    {
      id: 'Reps',
      title: 'Reps'
    },
    {
      id: 'Distance',
      title: 'Distance'
    },
    {
      id: 'Seconds',
      title: 'Seconds'
    },
    {
      id: 'Notes',
      title: 'Notes'
    },
    {
      id: 'Workout Notes',
      title: 'Workout Notes'
    },
    {
      id: 'RPE',
      title: 'RPE'
    },
  ],
  alwaysQuote: true,
});

/**
 * Initialise script.
 */
function init() {
  console.log('Initiating...');
  console.log(`Preparing to parse CSV file... ${config.inputFile}`);

  fs.createReadStream(config.inputFile)
    .pipe(csv())
    .on('data', (data) => inputCsvJson.push(data))
    .on('end', () => {
      modifiedCsvJson = inputCsvJson

      console.log('...Done');

      initFunctions();
    });
}

/**
 * Execute functions once data is available.
 */
function initFunctions() {
  console.log('Initiating script functionality...');

  modifyTimestamp();

  /**
   * Once everything is finished, write to file.
   */
  writeDataToFile();
}

/**
 * Function that will modify the timestamp for each workout
 */
function modifyTimestamp() {
  console.log('Matching timestamp for each workout filtered by date');

  modifiedCsvJson = modifiedCsvJson.map((item) => {
    const itemKey = 'Date'
    item[itemKey] = item[itemKey].replace(/ .*/, ' 12:00:00');

    return item
  })

  console.log('...Done');
}


/**
 * Write all modified data to its own CSV file.
 */
function writeDataToFile() {
  console.log(`Writing data to a file...`);

  csvWriter.writeRecords(modifiedCsvJson)
    .then(() => {
      console.log('The CSV file was written successfully!')

      console.log('...Finished!');
    });
}

init();
