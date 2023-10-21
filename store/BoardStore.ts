import { getTodosGroupedByColumn } from '@/actions/getTodosGroupedByColumns';
import { create } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;

    newTaskInput: string;
    setNewTaskInput: (input: string) => void;

    newTaskType: TypedColumn;
    setNewTaskType: (columnId: TypedColumn) => void;

    image: File | null;
    setImage: (image: File | null) => void;
    
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async () => {
        const board = await getTodosGroupedByColumn();
        set({ board });
    },

    setBoardState: (board: Board) => set({ board }),

    newTaskInput: '', 
    setNewTaskInput: (input: string) => set({newTaskInput: input}),

    newTaskType: 'todo',
    setNewTaskType: (columnId: TypedColumn) => set({newTaskType: columnId}),

    image: null,
    setImage: (image: File | null) => set({image: image}),

}))