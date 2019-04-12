export const categoryTypes = {
    global: 'global',
    composer: 'composer',
    pianoRoll: 'pianoRoll'
};

export const globalShortcutsData = {
    data: [
        {
            shortcut: 'Alt + 1',
            action: 'Switch to the cursor tool'
        },
        {
            shortcut: 'Alt + 2',
            action: 'Switch to the pencil tool'
        },
        {
            shortcut: 'Alt + 3',
            action: 'Switch to the selection tool'
        },
        {
            shortcut: 'Ctrl + z',
            action: 'Undo action'
        },
        {
            shortcut: 'Ctrl + x',
            action: 'Redo action'
        }
    ]
};

export const composerShortcutsData = {
    data: [
        {
            shortcut: 'Delete',
            action: 'Delete currently selected sections',
        },
        {
            shortcut: 'Ctrl + C',
            action: 'Copy currently selected sections',
        },
        {
            shortcut: 'Ctrl + v',
            action: 'Paste copied sections',
        },
        {
            shortcut: 'Ctrl + d',
            action: 'Deselect all currently selected sections',
        },
        {
            shortcut: 'Ctrl + left click',
            action: 'Add or remove one section to / from the current selection whilst preserving the rest of the selection',
        }
    ]
};

export const pianoRollShortcutsData = {
    data: [
        {
            shortcut: 'Delete',
            action: 'Delete currently selected notes',
        },
        {
            shortcut: 'Ctrl + C',
            action: 'Copy currently selected notes',
        },
        {
            shortcut: 'Ctrl + v',
            action: 'Paste copied notes',
        },
        {
            shortcut: 'Ctrl + d',
            action: 'Deselect all currently selected notes',
        },
        {
            shortcut: 'Ctrl + left click',
            action: 'Add or remove one note to / from the current selection whilst preserving the rest of the selection',
        }
    ]
};

export const pianoRollWithSelectedNotesShortcutsData = {
    caption: 'Manipulate selected notes (must have one or more notes selected): ',
    data: [
        {
            shortcut: 'Up arrow',
            action: 'Shift all selected notes up by one semitone',
        },
        {
            shortcut: 'Down arrow',
            action: 'Shift all selected notes down by one semitone',
        },
        {
            shortcut: 'Left arrow',
            action: 'Shift all selected notes back by the current quantize value',
        },
        {
            shortcut: 'Right arrow',
            action: 'Shift all selected notes forwards by the current quantize value',
        }
    ]
};