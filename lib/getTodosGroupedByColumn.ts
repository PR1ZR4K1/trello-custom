import { supabase } from "@/supabase"

export const getTodosGroupedByColumn = async () => {
    const { data, error } = await supabase.from('todos').select('*')

        if (error || !data) {
        console.error(error)
        return undefined;
    }

    const columns = data.reduce((acc, todo) => {

        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            });
        }

        acc.get(todo.status)!.todos.push({
            id: todo.id,
            created_at:  todo.created_at,
            title: todo.title,
            status: todo.status,

            // get image if it exists on table
            ...(todo.image && { image: JSON.parse(todo.image) })
        })

        return acc;

    }, new Map<TypedColumn, Column>)

    // if columns don't have inprogress, todo, and done, add them with empty todos

    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: [],
            });
        }
    }

    // sort columns by columnTypes

// Explicitly type the sorted entries
    const sortedEntries = Array.from(columns.entries() as [TypedColumn, Column][])
        .sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]));


    const sortedColumns = new Map<TypedColumn, Column>(sortedEntries);


    const board: Board = {
        columns: sortedColumns
    }

    return board;
};