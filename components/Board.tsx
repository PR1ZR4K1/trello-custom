"use client"

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import Column from './Column';
import { updateDatabaseRows } from '@/actions/updateDatabaseRows';
import { revalidatePath } from 'next/cache';


function Board() {

    const [board, getBoard, setBoardState] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState,
    ]);

    useEffect(() => {
        getBoard();
    }, [getBoard]);

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;


        // dropped outside the list
        if (!destination) {
            return;
        }

        // this is the object that is held by {index: 1, droppableId: '1'} 
        // source refers to where the element was picked up from and destination is where the element was dropped onto

        const entries = Array.from(board.columns.entries())

        // handle column drag
        if (type==="column") {

            // grabbing and removing the column object that was picked up 
            const [removed] = entries.splice(source.index, 1);

            // placing the removed column into the index that it was dropped at
            entries.splice(destination.index, 0, removed);

            // create new mapped object with our entries
            const rearrangedColumns = new Map(entries);

            // update the board state
            setBoardState({
                // this says keep the board state, but change the columns since that is the only thing that changes
                // this makes it so that a minimal amount of rendering takes place
                ...board, columns: rearrangedColumns
            })

            // updateDatabaseColumns(board);
        } else if ( type==="card" ) {

            // {index: 1, droppableId: '1'}

            // source.droppableId the id or index of the column where the element was picked up from
            // source.index the id or index of the row where the element was picked up

            // splice/remove the location of where the row had existed ie: index
            // splice to insert row to new location: destination.index

            const source_column_name: string = entries[parseInt(source.droppableId)][0]
            const destination_column_name: string = entries[parseInt(destination.droppableId)][0]

            // grabs the array of todos from the specified column
            const source_array: Todo[] = entries[parseInt(source.droppableId)][1].todos

            // grabs the array of todos from the specified column
            const destination_array: Todo[] = entries[parseInt(destination.droppableId)][1].todos

            // if the source and destination are the same, do nothing
            if (source_array === destination_array && source.index === destination.index) return;

            // removes the row from the array
            const [removed]: Todo[] = source_array.splice(source.index, 1)

            // insert row at specified index 
            destination_array.splice(destination.index, 0, removed)

            // create new mapped object with our entries
            const rearranged_columns: Map<TypedColumn, Column> = new Map(entries);

            // check if the card that was moved actually moved to a different column 
            if (source_column_name !== destination_column_name)
            {
                // console.log("tried to move")
                // if it was moved to a different column then update the database
                updateDatabaseRows(entries[parseInt(destination.droppableId)][0], removed.created_at)
            }

            // update the board state
            setBoardState({
                ...board, columns: rearranged_columns
            })

            // getBoard()
         }
    };

    return (    
      // the entire area where drag and drop events will be recorded
      <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* the area where we have our three column boards ie: todo, inProgress, done */}
          <Droppable droppableId="board" direction='horizontal' type='column'>
              {(provided, snapshot) => (
                <div
                  className={`
                        grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl px-16 lg:px-0 md:mx-auto 
                        ${snapshot.isDraggingOver ? 'opacity-70' : ''}
                  `}
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