import { cloneDeep } from 'lodash';

/**
 * Takes the normalized state from redux and converts it into a tree structure resembling the class
 * hierarchy within the audio engine. This allows all of the updating that follows to be more intuitive.
 * @param {object} state - the normalized redux state 
 * @returns {object} - the state transformed into a tree structure.
 */
export const normalizedStateToTree = (originalState) => {
    const state = cloneDeep(originalState);
    let tree = {};
    // copy playerInfo to tree
    tree.playerInfo = { ...state.playerInfo };
    // loop over the channels
    tree.channels = state.channels.map(channel => {
        return {
            id: channel.id,
            instrument: state.instruments[channel.instrumentId],
            effects: channel.effectIds.map(effectId => state.effects[effectId]),
            sections: channel.sectionIds.map(sectionId => state.sections[sectionId]),
            volume: channel.volume,
            isMuted: channel.isMuted,
            isSolo: channel.isSolo,
            pan: channel.pan
        }
    });
    return tree;
}