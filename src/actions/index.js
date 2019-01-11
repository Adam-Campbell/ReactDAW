export * from './sectionActions';
export * from './playerActions';
export * from './channelActions';
export * from './playerActions';
export * from './instrumentActions';
export * from './effectActions';
export * from './windowActions';
export * from './persistenceActions';
export * from './modalActions';
export * from './compositionActions';

export const updateDial = (newValue) => ({
    type: 'UPDATE_DIAL',
    payload: {
        newValue
    }
})