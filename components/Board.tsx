"use client"

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';


function Board() {

    const [board, getBoard, setBoardState] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState,
    ]);

    useEffect(() => {
        getBoard();
    }, [getBoard]);

    console.log("Let's gooo no sleep", board)

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        
        // handle column drag
        if (type==="column") {
            const entries = Array.from(board.columns.entries());
            // grabbing the starting index of the removed column 
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangedColumns = new Map(entries);

            // update the board state

            setBoardState({
                // this says keep the board state, but change the columns since that is the only thing that changes
                ...board, columns: rearrangedColumns
            })
        }
    };

    return (    
      // the entire area where drag and drop events will be recorded
      <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* the area where we have our three column boards ie: todo, inProgress, done */}
          <Droppable droppableId="board" direction='horizontal' type='column'>
              {(provided) => (
                <div
                  className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                  {...provided.droppableProps}
                  ref={provided.innerRef}   
                >
                    
                {/* // get array from my board object which should have three items
                // mapping through key value pairs to get id, column */}
                    {Array.from(board.columns.entries()).map(([id, column], index) => (
                        <Column
                            key={id} 
                            id={id} 
                            todos={column.todos} 
                            index={index}
                        />
                    ))}
                </div>
            )}
          </Droppable>
      </DragDropContext>    
      );
}

export default Board