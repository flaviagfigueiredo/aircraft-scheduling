/**
 * Move elements from a list to another
 *
 * @param {*} source Source from where it item was dragged
 * @param {*} destination Destination of where it dropped
 * @param {*} droppableSource Id from the source list and index of the item
 * @param {*} droppableDestination Id from the destination list and index of the slot
 * 
 * @return {*} 
 * 
 */
export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = [ ...source ];
    const destinationClone = [ ...destination ];

    const [ removed ] = sourceClone.splice(droppableSource.index, 1);

    destinationClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destinationClone;

    return result;
};

/**
 *  Reorder the draggable elements in the list
 *
 * @param {*} result Result from the drag action
 * @param {*} set Set function
 */
export const reorder = (result, set) => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    set((flights) => {
      const flightsClone = [...flights];
      const [removed] = flightsClone.splice(startIndex, 1);
      flightsClone.splice(endIndex, 0, removed);
      return flightsClone;
    });
  }

