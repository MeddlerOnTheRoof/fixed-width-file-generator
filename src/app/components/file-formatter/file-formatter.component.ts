import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field';
import { DataType, _dataTypes } from '../../models/data-type';
import { FileFormatService } from '../../services/file-format.service';

@Component({
  selector: 'file-formatter',
  templateUrl: './file-formatter.component.html',
  styleUrls: ['./file-formatter.component.css']
})

export class FileFormatterComponent implements OnInit {
  private fields: Field[] = new Array<Field>();
  private dataTypes: DataType[] = _dataTypes.slice();
  private showFieldDetail: boolean = false;
  private field: Field;

  constructor(private fileFormatService: FileFormatService) { }

  public ngOnInit(): void {
    this.fields = this.fileFormatService.getFormat();
  }

  private getTypeName(dataTypeId: number): string {
    let dataType = this.dataTypes.find((dataType: DataType): boolean => { return dataType.id === dataTypeId; });
    
    return dataType ? dataType.name : "";
  }

  private editField(fieldId: number): void {
    let existingField = this.fields.find((field: Field): boolean => { return field.id == fieldId; });

    this.field = existingField ? existingField : new Field();

    if(!this.field.id)
      this.field.id = this.fields.length + 1;

    this.showFieldDetail = true;
  }

  private submit(): void {
    this.fileFormatService.saveFormat(this.fields.slice());
  }

  private onDetailSubmission(field: Field): void {
    this.fields[field.id - 1] = Object.assign(new Field(), field);

    this.onCloseModal();
  }

  private onCloseModal(): void {
    this.showFieldDetail = false;
  }
}
