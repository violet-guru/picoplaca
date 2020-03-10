const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const readPlate = (plateValue) => {
    rl.question('Insert the date (YYYY/MM/DD):', readDate);
}

const readDate = (dateValue) => {
    rl.question('Insert the time (HH:MM):', readTime);
}

const readTime = (timeValue) => {
    rl.close();
}


rl.question('Insert the plate number:', readPlate);