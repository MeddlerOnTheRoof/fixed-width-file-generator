import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Field } from '../../models/field';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataType, _dataTypes } from '../../models/data-type';

@Component({
  selector: 'field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.css']
})

export class FieldDetailComponent implements OnInit {
    @Output() private closeModalEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() private submissionEmitter: EventEmitter<Field> = new EventEmitter<Field>();
    private dataTypes: DataType[] = _dataTypes.slice();
    private lengthReadonly: boolean = false;
    
    @Input() private field: Field = new Field();

    public ngOnInit(): void { }

    private closeModal(): void {
        this.closeModalEmitter.emit(null);
    }

    private selectDataType(dataTypeId: number): void {
        switch(Number(dataTypeId)) {
            case 3:
                this.field.length = 1;
                this.lengthReadonly = true;
                break;
            case 4:
                this.field.length = 8;
                this.lengthReadonly = true;
                break;
            case 1:
            case 2:
                this.field.length = undefined;
                this.lengthReadonly = false;
                break;
        }

        this.field.dataTypeId = dataTypeId;
    }

    private submit(): void {
        this.field.dataTypeId = Number(this.field.dataTypeId);

        this.submissionEmitter.emit(Object.assign(new Field(),this.field));
    }
}
