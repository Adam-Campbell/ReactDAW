/**
 * Takes a BBS formatted string and rounds the 16ths value down to the last whole 16th value, if it is a
 * floating point number. This always rounds down as opposed to just making use of the quantize method on the 
 * Tone.Time object in order to provide a bit more predicitability and to prevent the transport bar display from 
 * skipping ahead of the actual transport position.
 * @param {string} transportPositionString - the BBS formatted string to operate on.
 */
export const formatTransportPosition = (transportPositionString) => {
    const splitted = transportPositionString.split(':');
    const roundedDownSixteenths = Math.floor(parseFloat(splitted[2]));
    return `${splitted[0]}:${splitted[1]}:${roundedDownSixteenths}`;
}