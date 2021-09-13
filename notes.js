const chalk = require('chalk');
const fs = require('fs');

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)

        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title already taken!'))
    }

}

const removeNote = (title) => {
    const notes = loadNotes()

    const updateNotes = notes.filter((note) => note.title !== title)

    if (updateNotes.length === notes.length) {
        console.log(chalk.red.inverse('No Note Found!'))
    } else {
        saveNotes(updateNotes)
        console.log(chalk.green.inverse('Note removed!'))
    }

}

const listNotes = () => {
    console.log(chalk.inverse('Your Notes'))
    loadNotes().forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
