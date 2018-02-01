import { Field } from '../models/field';
import { DataType } from '../models/data-type';

export class FileFormatService {
    private fields: Field[] = new Array<Field>();
    private formatHistory: Field[][] = new Array<Field[]>();

    constructor() { }

    public getFormat(): Field[] {
        let fields = this.fields.slice();

        console.log('- retrieving fields -');
        console.log(fields);

        return fields;
    }

    public saveFormat(newFields: Field[]): void {
        let oldFields = this.fields.slice();

        console.log('- storing history of old fields -');
        console.log(oldFields);

        this.formatHistory.push(oldFields);

        console.log('- saving new fields -');
        console.log(newFields);

        this.fields = newFields.slice();
    }

    public getformatHistory(): Field[][] {
        return this.formatHistory.slice();
    }
}
