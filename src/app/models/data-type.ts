export class DataType {
    id: number;
    name: string;
}

// this would be removed and put into some repository
export const _dataTypes: DataType[] = [
    { id: 1, name: "String" },
    { id: 2, name: "Number" },
    { id: 3, name: "Boolean" },
    { id: 4, name: "Date" }
]
