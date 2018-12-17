import Tone from 'tone';
import { generateId } from '../../helpers'
/**
 * Creates two arrays, one holding the note objects for all currently selected notes, and the other 
 * holding the note objects for all currently unselected notes. Returns both of the arrays as properties
 * on an object. 
 * @param {array} currentlySelectedNotes - an array of ids for the currently selected notes.
 * @param {array} allSectionNotes - the full array of notes for the section in question, including both
 * the selected and unselected notes.
 * @returns {object} - an object with the two generated arrays attached as properties. 
 */
export const createSelectedAndUnselectedNoteArrays = (optionsObject) => {
    const { currentlySelectedNotes, allSectionNotes } = optionsObject;
    // We want to return an object with two properties - selectedNotes will be an array of all selected
    // notes, and unselectedNotes will be an array of all unselectedNotes.
    // First we can check if there actually are any selected notes, and if there aren't then we can just
    // return all of the notes in the unselectedNotes array, and return an empty array for the selectedNotes
    // array. 
    if (!currentlySelectedNotes.length) {
        return {
            selectedNotes: [],
            unselectedNotes: [ ...allSectionNotes ]
        };
    }
    // however if there are currentlySelectedNotes, then we have to loop through all of the notes in this
    // section and sort them into selected and unselected notes before returning them. 
    let selectedNotes = [];
    let unselectedNotes = [];
    for (let note of allSectionNotes) {
        if (currentlySelectedNotes.includes(note._id)) {
            selectedNotes.push(note);
        } else {
            unselectedNotes.push(note);
        }
    }
    return {
        selectedNotes,
        unselectedNotes
    };
};

/**
 * Given a BBS string, determine the amount of whole bars present in the time described by the string
 * and return this value as an integer.
 * @param {string} transportPositionString - the BBS string to query
 * @return {number} - the whole bars as an integer.
 */
export const getWholeBarsFromString = (transportPositionString) => {
    const splitString= transportPositionString.split(':');
    return parseInt(splitString[0]);
};


/**
 * Given a BBS string, reduce the string down on floating point number which is the total value of the 
 * bars, beats and sixteenths, all in terms of sixteenths. 
 * @param {string} transportPositionString - the BBS string to query.
 * @return {number} - the amount of sixteenths as a floating point number - if it doesn't come to a
 * discrete amount of sixteenths it will return parts of sixteenths as well.
 */
export const transportPositionStringToSixteenths = (transportPositionString) => {
    const splitString= transportPositionString.split(':');
    const asSixteenths = parseInt(splitString[0])*16 + 
                        parseInt(splitString[1])*4 +
                        parseFloat(splitString[2]);
    return asSixteenths;
};

/**
 * Works out the next x position that the seeker line needs to be rendered to. Only used by the 
 * getTransportPosition() function.
 * @param {string} sectionStart - the start property of the current section
 * @param {number} sectionBars - the numberOfBars property of the current section
 * @param {string} currentTransportPosition - string representing the current transport position
 * @return {object} - an object containing the information needed for the next render. 
 */
export const getTransportLineAttrs = (optionsObject) => {
    const { 
        sectionStart, 
        sectionBars, 
        currentTransportPosition 
    } = optionsObject;
    // verify whether current transport position is within this section. If not, return some value
    // for xPos (unimportant in this case), and return 0 for strokeWidth.
    // If it is in this section, return 2 for strokeWidth and return a precise xPos.
    //const currentTransportPosition = Tone.Transport.position;
    const sectionStartBar = getWholeBarsFromString(sectionStart);
    const sectionEndBar = sectionStartBar + sectionBars;
    const currentTransportBar = getWholeBarsFromString(currentTransportPosition);
    if (currentTransportBar < sectionStartBar || currentTransportBar > sectionEndBar) {
        return {
            xPos: -96,
            strokeWidth: 0
        };
    } else {
        const sectionStartAsSixteenths = transportPositionStringToSixteenths(sectionStart);
        const currentPositionAsSixteenths = transportPositionStringToSixteenths(currentTransportPosition);
        const diff = currentPositionAsSixteenths - sectionStartAsSixteenths;
        const diffToXPos = (diff * 24);
        return {
            xPos: diffToXPos,
            strokeWidth: 2
        };
    }
};


/**
 * Programmaticaly create an array of all of the pitches ranging from C0 to B8.
 * @return {array} - the array of pitches.
 */
export const createPitchesArray = () => {
    const onlyNotes = ['B', 'A#', 'A','G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];
    const onlyOctaves = ['8', '7', '6', '5', '4', '3', '2', '1', '0'];
    let pitchesArray = [];
    for (let octave of onlyOctaves) {
        for (let note of onlyNotes) {
            pitchesArray.push(note + octave);
        }
    }
    return pitchesArray;
};


/**
 * Programatically creates an array of objects describing each individual grid line required by the
 * component, such that when it comes to rendering the component can simply map over this array and
 * construct a <Line/> component from each object in the array. 
 * @param {number} canvasWidth - the width of the canvas
 * @param {number} currentQuantizeValueAsTicks - the current quantize value for the piano roll, converted
 * into Ticks
 * @return {array} - the array of grid line objects.
 */
export const createGridLinesArray = (optionsObject) => {
    const { canvasWidth, currentQuantizeValueAsTicks } = optionsObject;
    let linesArray = [];
    let strokeWidth = 2;
    let escapeHatch = 0;
    let currPos = 0;
    //let quantizeInterval = Tone.Time(this.state.quantize).toTicks() / 2;
    let quantizeInterval = currentQuantizeValueAsTicks / 2;

    while(currPos <= canvasWidth && escapeHatch < 1000) {
        if (currPos % 384 === 0) {
            strokeWidth = 2;
        } else if (currPos % 96 === 0) {
            strokeWidth = 1;
        } else {
            strokeWidth = 0.5;
        }
        linesArray.push({
            points: [currPos, 0, currPos, 1728],
            strokeWidth: strokeWidth
        });
        currPos += quantizeInterval;
        escapeHatch++;
    }

    // create horizontal lines
    for (let j = 0; j <= 108; j++) {
        linesArray.push({
            points: [0, j*16, canvasWidth, j*16],
            strokeWidth: 1
        });
    }

    return linesArray;
}

/**
 * Given a new note, noteToCheck, check this note against all other notes with the same pitch in this
 * section, if this note overlaps any of those notes then it is invalid and the function returns false,
 * if no such note is found then the new note is valid and the function returns true.
 * @param {Object} noteToCheck - the note object for the new note to check.
 * @param {array} allSectionNotes - an array of all of the notes in the current section.
 * @returns {Boolean} - true if note is valid, false if note is invalid.
 */
export const isValidNote = (optionsObject) => {
    const { noteToCheck, allSectionNotes } = optionsObject;
    const startOfNoteToCheck = Tone.Time(noteToCheck.time).toTicks();
    const endOfNoteToCheck = startOfNoteToCheck + Tone.Time(noteToCheck.duration).toTicks() - 1;
    for (let currentNote of allSectionNotes) {
        if (noteToCheck.pitch === currentNote.pitch) {
            const startOfCurrentNote = Tone.Time(currentNote.time).toTicks();
            const endOfCurrentNote = startOfCurrentNote + Tone.Time(currentNote.duration).toTicks() - 1;
            if (
                (startOfNoteToCheck >= startOfCurrentNote && startOfNoteToCheck <= endOfCurrentNote) ||
                (endOfNoteToCheck >= startOfCurrentNote && endOfNoteToCheck <= endOfCurrentNote) ||
                (startOfCurrentNote >= startOfNoteToCheck && startOfCurrentNote <= endOfNoteToCheck) ||
                (endOfCurrentNote >= startOfNoteToCheck && endOfCurrentNote <= endOfNoteToCheck)
            ) {
                // console.log(`
                //     new note start: ${startOfNoteToCheck}
                //     new note end: ${endOfNoteToCheck}
                //     current note start: ${startOfCurrentNote}
                //     current note end: ${endOfCurrentNote}
                // `);
                return false;
            }
        }
    }
    return true;
};


/**
 * Given an x and y position for a click event that has occurred, performs the calculations required
 * to create a note object corresponding to the x and y values supplied as arguments.
 * @param {number} x - x position of the click event
 * @param {number} y - y position of the click event
 * @param {array} pitchesArray - an array of all pitches possible in the piano roll component
 * @param {string} currentQuantizeValue - the current quantize value for this section
 * @param {string} currentDurationValue - the current duration value for this section
 * @return {object} - the generated note object. 
 */
// could be pure, possibly move to utils
export const calculateNoteInfo = (optionsObject) => {
    const { 
        x, 
        y, 
        pitchesArray, 
        currentQuantizeValue,
        currentDurationValue 
    } = optionsObject;
    let currQuantizeAsTicks = Tone.Time(currentQuantizeValue).toTicks();
    let rowClicked = Math.floor(y / 16);
    let adjustedX = x - (x%(currQuantizeAsTicks/2));
    let adjustedY = y - (y % 16);
    let xPosAsBBS = Tone.Ticks(x*2-(x*2%currQuantizeAsTicks)).toBarsBeatsSixteenths();
    const durationAsBBS = Tone.Time(currentDurationValue).toBarsBeatsSixteenths();
    const noteInfo = {
        pitch: pitchesArray[rowClicked],
        time: xPosAsBBS,
        duration: durationAsBBS,
        velocity: 1,
        _id: generateId(),
        x: adjustedX,
        y: adjustedY,
        width: Tone.Time(durationAsBBS).toTicks() / 2
    };
    return noteInfo;
};

/**
 * Programmaticaly creates an array of objects representing the bar numbers that should appear in the 
 * transport area of the canvas, such that when the component renders it can simply map over the array
 * and create a <Text/> component from each object in the array.
 * @param {string} sectionStart - the start value for the current section
 * @param {number} sectionBars - the numberOfBars value for the current section 
 * @returns {array} - array containing the bar number objects.
 */
export const createTransportBarNumbersArray = (optionsObject) => {
    const { sectionStart, sectionBars } = optionsObject;
    let arr = [];
    const start = parseInt(sectionStart.split(':')[0]);
    for (let i = 0; i < sectionBars; i++) {
        arr.push({
            barNumber: start + i,
            xPos: i * 384
        });
    }
    return arr;
};

/**
 * Generate a new selection of notes with some or all of the old notes removed, and some
 * new notes added.
 * @param {array} selectedNotesState - the starting array of selected note ids
 * @param {array} newIds - ids to be added to the state
 * @param {array} oldIds - ids to be removed from the state
 * @returns {array} - the new array of selected note ids after all addition and removal has
 * been performed
 */
export const swapSelectedNoteIds = (optionsObject) => {
    const { selectedNotesState, newIds, oldIds } = optionsObject
    return [
        ...selectedNotesState.filter(id => !oldIds.includes(id)),
        ...newIds
    ];
};


/**
 * Takes in a note object and returns a new note object, with the pitch increased by one semitone.
 * @param {array} pitchesArray - array of all pitches possible in the piano roll
 * @param {object} originalNote - the original note object
 * @returns {object} - the new note object
 */
export const shiftPitchUp = (pitchesArray) => (originalNote) => {
    const newY = Math.max(originalNote.y - 16, 0);
    const newPitch = pitchesArray[newY/16];
    return {
        ...originalNote, 
        y: newY,
        pitch: newPitch,
        _id: generateId()
    };
};

/**
 * Takes in a note object and returns a new note object, with the pitch decreased by one semitone.
 * @param {array} pitchesArray - array of all pitches possible in the piano roll
 * @param {object} originalNote - the original note object
 * @returns {object} - the new note object
 */
export const shiftPitchDown = (pitchesArray) => (originalNote) => {
    const newY = Math.min(originalNote.y + 16, 1712);
    const newPitch = pitchesArray[newY/16];
    return {
        ...originalNote, 
        y: newY,
        pitch: newPitch,
        _id: generateId()
    };
};


/**
 * Takes in a note object and returns a new note object, with the time decreased by the current quantize
 * interval. Partial application is used to give this function the same footprint as its sibling functions
 * to allow easier use within the main mutateSelection function.
 * @param {number} currentQuantizeAsTicks - the current quantize value converted to ticks
 * @param {number} sectionStartAsTicks - the sections start value converted to ticks
 * @param {object} originalNote - the original note object
 * @returns {object} - the new note object
 */
export const shiftTimeBackwards = (optionsObject) => (originalNote) => {
    const { currentQuantizeAsTicks, sectionStartAsTicks } = optionsObject;
    const oldTimeAsTicks = Tone.Ticks(originalNote.time);
    const newTimeAsTicks = Math.max(Tone.Ticks(oldTimeAsTicks - currentQuantizeAsTicks), sectionStartAsTicks);
    const newTimeAsBBS = Tone.Ticks(newTimeAsTicks).toBarsBeatsSixteenths();
    const newX = Math.max(originalNote.x - (currentQuantizeAsTicks / 2), 0);
    return {
        ...originalNote,
        x: newX,
        time: newTimeAsBBS,
        _id: generateId()
    };
};

/**
 * Takes in a note object and returns a new note object, with the time increased by the current quantize
 * interval. Partial application is used to give this function the same footprint as its sibling functions
 * to allow easier use within the main mutateSelection function.
 * @param {number} currentQuantizeAsTicks - the current quantize value converted to ticks
 * @param {number} sectionEndAsTicks - the time that the section ends converted to ticks
 * @param {object} originalNote - the original note object
 * @returns {object} - the new note object
 */
export const shiftTimeForwards = (optionsObject) => (originalNote) => {
    const { currentQuantizeAsTicks, sectionEndAsTicks } = optionsObject;
    const oldTimeAsTicks = Tone.Ticks(originalNote.time);
    const lastLegalPosition = sectionEndAsTicks - Tone.Ticks(originalNote.duration);
    const newTimeAsTicks = Math.min(Tone.Ticks(oldTimeAsTicks + currentQuantizeAsTicks), lastLegalPosition);
    const newTimeAsBBS = Tone.Ticks(newTimeAsTicks).toBarsBeatsSixteenths();
    const newX = newTimeAsTicks / 2;
    return {
        ...originalNote,
        x: newX,
        time: newTimeAsBBS,
        _id: generateId()
    };
}