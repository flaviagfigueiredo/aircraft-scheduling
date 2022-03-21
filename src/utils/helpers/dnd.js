/**
 * Drag and Drop from a list to the other
 *
 * @param {*} source
 * @param {*} destination
 * @param {*} droppableSource
 * @param {*} droppableDestination
 * 
 * @return {*} 
 * 
 */
export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = [ ...source ];
    const destinationClone = [ ...destination ];

    // 
    const [ removed ] = sourceClone.splice(droppableSource.index, 1);

    destinationClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destinationClone;

    return result;
};

