import Tone from 'tone';
import { generateId } from '../../helpers'
import { 
    findOverlapAlongAxis,
    getWholeBarsFromString,
    transportPositionStringToSixteenths
} from '../../sharedUtils';
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
 * @param {number} sectionBars - the numberOfBars property of this section
 * @param {number} canvasWidth - the width of the canvas
 * @param {number} canvasGridHeight - the height of the grid section of the canvas
 * @param {number} currentQuantizeValue- the current quantize value for the piano roll component
 * @return {array} - the array of grid line objects.
 */
export const createGridLinesArray = (optionsObject) => {
    const { 
        sectionBars, 
        currentQuantizeValue,
        canvasWidth,
        canvasGridHeight
    } = optionsObject;

    const linesArray = [];
    let strokeWidth = 2;
    let escapeHatch = 0;
    let currPos = 0;
    const quantizeInterval = Tone.Ticks(currentQuantizeValue) / 2;
    const maxPos = sectionBars * 384;

    while (currPos <= maxPos && escapeHatch < 1000) {
        if (currPos % 384 === 0) {
            strokeWidth = 2;
        } else if (currPos % 96 === 0) {
            strokeWidth = 1;
        } else {
            strokeWidth = 0.5;
        }
        linesArray.push({
            points: [currPos, 0, currPos, canvasGridHeight],
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
            const doesOverlap = findOverlapAlongAxis({
                elementALowerBound: startOfNoteToCheck,
                elementAUpperBound: endOfNoteToCheck,
                elementBLowerBound: startOfCurrentNote,
                elementBUpperBound: endOfCurrentNote
            });
            if (doesOverlap) {
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
export const calculateNoteInfo = (optionsObject) => {
    const { 
        x, 
        y, 
        pitchesArray, 
        currentQuantizeValue,
        noteDuration 
    } = optionsObject;
    let currQuantizeAsTicks = Tone.Time(currentQuantizeValue).toTicks();
    let rowClicked = Math.floor(y / 16);
    let adjustedX = x - (x%(currQuantizeAsTicks/2));
    let adjustedY = y - (y % 16);
    let xPosAsBBS = Tone.Ticks(x*2-(x*2%currQuantizeAsTicks)).toBarsBeatsSixteenths();
    const noteInfo = {
        pitch: pitchesArray[rowClicked],
        time: xPosAsBBS,
        duration: noteDuration,
        velocity: 1,
        _id: generateId(),
        x: adjustedX,
        y: adjustedY,
        width: Tone.Time(noteDuration).toTicks() / 2
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
 * @param {array} newNoteIds - note ids to be added to the state
 * @param {array} oldNoteIds - note ids to be removed from the state
 * @returns {array} - the new array of selected note ids after all addition and removal has
 * been performed
 */
export const swapSelectedNoteIds = (optionsObject) => {
    const { selectedNotesState, newNoteIds, oldNoteIds } = optionsObject
    return [
        ...selectedNotesState.filter(id => !oldNoteIds.includes(id)),
        ...newNoteIds
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

/**
 * Given the four bounds of a selection area, and all of the current notes in the section, determines 
 * which of those notes falls within / overlaps with the selection.
 * @param {number} verticalSelectionBound1 - one vertical bound of the selection
 * @param {number} verticalSelectionBound2 - the other vertical bound of the selection
 * @param {number} horizontalSelectionBound1 - one horizontal bound of the selection
 * @param {number} horizontalSelectionBound2 - the other horizontal bound of the selection
 * @param {array} allNotes - an array of note objects for all notes in this section
 * @returns {array} - an array comprised of the ids of all the notes that overlapped with the selection 
 */
export const getNoteIdsForSelectionRange = (optionsObject) => {
    const { 
        verticalSelectionBound1,
        verticalSelectionBound2,
        horizontalSelectionBound1,
        horizontalSelectionBound2,
        allNotes, 
    } = optionsObject;

    // first determine which bounds are which
    const selectionLeft = Math.min(horizontalSelectionBound1, horizontalSelectionBound2);
    const selectionRight = Math.max(horizontalSelectionBound1, horizontalSelectionBound2);
    const selectionTop = Math.min(verticalSelectionBound1, verticalSelectionBound2);
    const selectionBottom = Math.max(verticalSelectionBound1, verticalSelectionBound2);

    const selectedNoteIds = allNotes.filter(note => {
        const {x, y, width } = note;
        const noteLeft =  x;
        const noteRight = x + width;
        const noteTop = y;
        const noteBottom = y + 16;
        const isInVerticalRange = findOverlapAlongAxis({
            elementALowerBound: noteTop,
            elementAUpperBound: noteBottom,
            elementBLowerBound: selectionTop,
            elementBUpperBound: selectionBottom
        });
        const isInHorizontalRange = findOverlapAlongAxis({
            elementALowerBound: noteLeft,
            elementAUpperBound: noteRight,
            elementBLowerBound: selectionLeft,
            elementBUpperBound: selectionRight
        });
        return isInVerticalRange && isInHorizontalRange;
    })
    .map(noteObject => noteObject._id);

    return selectedNoteIds;
};

/**
 * Given the information about a pair of mouseDown and mouseUp events that occurred, determine the duration
 * of the note that was 'drawn' with these events. 
 * @param {number} downX - previously captured x coord of the mouseDown event, already adjusted for any scrolling
 * @param {number} upX - previously captured y coord of the mouseDown event, already adjusted for any scrolling
 * @param {number} rawUpX - the raw x coord from the mouseUp event, not yet adjusted for anything
 * @param {number} scrolledX - how far the canvas layer was scrolled on the x axis when the mouseUp event occurred
 * @param {string} currentQuantizeValue - the current quantize value from state
 */
export const getNoteDurationFromPencilOperation = (optionsObject) => {
    const { 
        downX, 
        downY,
        rawUpX,
        scrolledX,
        currentQuantizeValue
    } = optionsObject;

    // adjust mouseUp x coord for scrolling
    const upXWithScroll = rawUpX - scrolledX;
    // convert current quantize value to Ticks
    const currQuantizeAsTicks = Tone.Time(currentQuantizeValue).toTicks();
    // roll back downX to the previous whole interval, determined by the current quantize level.
    const rolledBackDownX = downX - (downX%(currQuantizeAsTicks/2));
    // convert this rolled back value into Ticks
    const downXAsTicks = Tone.Ticks(rolledBackDownX*2-(rolledBackDownX*2%currQuantizeAsTicks));
    // convert upXWithScroll into Ticks
    const upXAsTicks = Tone.Ticks(upXWithScroll*2);
    // If the Tick value we end up with based on downXAsTicks and upXAsTicks is less than our current
    // quantize value as Ticks, then just use the quantize value instead. 
    const noteDurationAsTicks = Math.max(
        Tone.Ticks(upXAsTicks-downXAsTicks).quantize(currentQuantizeValue),
        currQuantizeAsTicks
    );
    // Whichever Ticks based value we got, convert into bars beats and sixteenths.
    const noteDurationAsBBS = Tone.Ticks(noteDurationAsTicks).toBarsBeatsSixteenths();
    return noteDurationAsBBS;
};


/**
 * Generates a new note object to be used in a paste operation, derived from the note that was copied, as
 * well as the current transport time. Will return the note object if successfull, or null if unsuccessfull. 
 * @param {object} noteToPaste - object containing the data for the note to be pasted
 * @param {number} currTransportPos - a Tick based value for the current transport position
 * @param {number} earliestNoteTime - a Tick based value for the earliest time value of any
 * of the notes being pasted
 * @param {array} allNotes - array of note objects for all of the notes currently in this section
 * @param {string} sectionStart - the start property for the current section
 * @param {number} sectionBars - the numberOfBars property for the current section
 * @returns {object} - the generated note object.
 */
export const generateNoteObjectForPasting = (optionsObject) => {
    const { 
        noteToPaste,
        currTransportPos,
        earliestNoteTime,
        allNotes,
        sectionStart,
        sectionBars 
    } = optionsObject;

    // calculate the delta between earliestNoteTime and the time value for this particular note
    const deltaTicks = Tone.Ticks(noteToPaste.time) - earliestNoteTime;
    // derive the start and end of the 'paste area' for this note from the other pieces of information
    // we already know
    const pasteAreaStartAsTicks = currTransportPos + deltaTicks;
    const pasteAreaEndAsTicks = pasteAreaStartAsTicks + Tone.Ticks(noteToPaste.duration);

    // check that it is within range of this section. First grab the start and end of the section
    // as ticks, then compare with the start and end of the paste area. If either the start or the
    // end of the paste area don't fall into the interval between the start and end of the section,
    // then paste operation is disallowed.
    const sectionStartAsTicks = Tone.Ticks(sectionStart).toTicks();
    const sectionEndAsTicks = sectionStartAsTicks + (768 * sectionBars); 
    
    if (pasteAreaStartAsTicks < sectionStartAsTicks || pasteAreaEndAsTicks > sectionEndAsTicks) {
        return null;
    }

    // construct a new note object based on the note that was copied and the current transport time
    const newNoteObject = {
        pitch: noteToPaste.pitch,
        time: Tone.Ticks(pasteAreaStartAsTicks).toBarsBeatsSixteenths(),
        duration: noteToPaste.duration,
        velocity: noteToPaste.velocity,
        _id: generateId(),
        x: (pasteAreaStartAsTicks-sectionStartAsTicks) / 2,
        y: noteToPaste.y,
        width: noteToPaste.width
    }
    // ensure that the note doesn't clash with any other notes present.
    const noteIsValid = isValidNote({
        noteToCheck: newNoteObject,
        allSectionNotes: allNotes
    });
    return noteIsValid ? newNoteObject : null;
}

/**
 * Creates an array of data structures that is required when trying to step a chord up or down
 * through its inversions.
 * @param {array} currentlySelectedNotes - an array of ids for the currently selected notes
 * @param {array} allNotes - an array of note objects for all notes currently in the section
 * @param {array} pitchesArray - an array of strings representing all available pitches  
 * @param {boolean} shouldSortPitchesAscending - whether the array produced should be sorted in ascending
 * or descending order.
 * @returns {array} - an array of objects each with two properties - a note object as one property, and then
 * the position of that note objects pitch within pitchesArray as the other property. 
 */
export const getSortedNoteDataStructs = (optionsObject) => {
    const { 
        currentlySelectedNotes, 
        allNotes,
        pitchesArray,
        shouldSortPitchesAscending
    } = optionsObject;

    const orderedSelection = currentlySelectedNotes.map(noteId => {
        const noteObject = allNotes.find(note => note._id === noteId);
        const pitchIndex = pitchesArray.findIndex(pitchString => pitchString === noteObject.pitch);
        return {
            noteObject,
            pitchIndex
        }
    })
    .sort((noteA, noteB) => {
        return shouldSortPitchesAscending ? 
               noteB.pitchIndex - noteA.pitchIndex : 
               noteA.pitchIndex - noteB.pitchIndex;
    });

    return orderedSelection;
};

/**
 * Used when stepping a chord up or down through its inversions, finds the first available pitch that's 
 * part of that chord and is also free that the note being operated on can be moved into. 
 * @param {array} orderedSelection - an array of objects, should be returned from the 
 * getSortedNoteDataStructs function
 * @param {boolean} shouldTraversePitchesAscending - whether the function should upwards or downwards through
 * the pitches of the chord
 * @param {number} pitchesArrayLength - the lenght of the pitches array
 * @returns {number} - either returns the index of the new pitch if a suitable pitch is found, or returns null
 * if no pitch was found. 
 */
export const getFirstAvailablePitchInChord = (optionsObject) => {
    const { 
        orderedSelection,
        shouldTraversePitchesAscending,
        pitchesArrayLength
    } = optionsObject;

    for (let note of orderedSelection) {
        let candidatePitchIndex = shouldTraversePitchesAscending ? 
                                  note.pitchIndex - 12 :
                                  note.pitchIndex + 12;
        const pitchIndexTaken = orderedSelection.find(el => el.pitchIndex === candidatePitchIndex);
        if (!pitchIndexTaken && candidatePitchIndex >= 0 && candidatePitchIndex < pitchesArrayLength) {
            return candidatePitchIndex;
        }
    }
    return null;
};