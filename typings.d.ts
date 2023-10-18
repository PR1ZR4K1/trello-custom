interface Board {

    // for Map<>: consider a list with key and value pairs. below the key is of type TypedColumn
    columns: Map<TypedColumn, Column>
}

// types of our columns
type TypedColumn = "todo" | "inprogress" | "done"

interface Column {
    id: TypedColumn;
    todos: Todo[];
}

interface Todo {
    id: string;
    created_at: string;
    status: TypedColumn;
    title: string;
    image?: Image;
}

interface Image {
    bucketId: string;
    fileId: string;
}