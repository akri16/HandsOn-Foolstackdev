/*
Add
Remove
List
Read
*/

const fsP = require('fs').promises;
const chalk = require('chalk');
const yargs = require('yargs');

async function readFromDB() {
    const data = await fsP.readFile('./app/db.json').catch((err) => {
        console.log("Error reading file from disk:", err);
        return [];
    });
    
    try {
        const notes = JSON.parse(data);
        return notes;
    } catch (err) {
        console.err("Error parsing JSON string:", err);
        return [];
    }
}

async function writeToDB(data) {
    await fsP.writeFile('./app/db.json', JSON.stringify(data)).catch((err) => {
        console.log("Error reading file from disk:", err);
        return;
    });
}

yargs.command({
    command: 'add',
    describe: 'Add Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Notes Body',
            demandOption: true,
            type: 'string'
        }
    },
    
    async handler(argv) {
        const data = await readFromDB();
        
        if (data.find((note) => note.title === argv.title)) {
            console.log(chalk.red(`The title ${argv.title} already exists`));
            return;
        }
        
        data.push({
            title: argv.title,
            body: argv.body
        });
        
        writeToDB(data);
        console.log(chalk.green("New Note Created!"));
    }
}).command({
    command: 'remove',
    describe: 'Remove Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    
    async handler(argv) {
        const data = await readFromDB();
        const note = data.find((note) => note.title === argv.title);
        
        if (!note) {
            console.log(chalk.red(`The title ${argv.title} is not found in the DB`));
            return;
        }
        
        data = data.filter(() => {
            note.title !== argv.title;
        });
        
        writeToDB(data);
        console.log(chalk.green("Note Removed"));
    }
}).command({
    command: 'list',
    describe: 'List Notes',
    
    async handler(argv) {
        const notes = await readFromDB();
        console.log(chalk.green.bold("The notes in the DB are: "));

        notes.forEach(note => {
            console.log(chalk.white.italic(note.title));
        });
    }
}).command({
    command: 'read',
    describe: 'Read Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    
    async handler(argv) {
        const data = await readFromDB();
        const note = data.find((note) => note.title == argv.title);
        
        if (!note) {
            console.log(chalk.red(`The title ${argv.title} is not found in the DB`));
            return;
        }

        console.log(note.body);
    }
}).argv;
