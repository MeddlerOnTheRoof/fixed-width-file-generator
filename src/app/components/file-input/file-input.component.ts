import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field';
import { FileFormatService } from '../../services/file-format.service';
import { debug } from 'util';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})

export class FileInputComponent implements OnInit {
  private fields: InputField[];
  private lines: string[] = new Array<string>();
  private fileName: string;

  constructor(private fileFormatService: FileFormatService) { }
  
  public ngOnInit(): void {
      let fields = this.fileFormatService.getFormat();

      this.fields = fields.map((field: Field): InputField => {
        let inputField = new InputField();

        inputField.id = field.id;
        inputField.length = field.length;
        inputField.name = field.name;
        inputField.required = field.required;
        inputField.dataTypeId = field.dataTypeId;
        inputField.fieldName = this.getFieldName(field.name);

        if(field.dataTypeId === 2) {
          // number, need to set max attribute on input to be a number with 9 for each place value
          // for as many place values as the property length

          inputField.numberLength = Number(new Array(field.length + 1).join('9'));
        }

        return inputField;
      });

      console.log('- fields formmated for user input -');
      console.log(this.fields);
  }

  private saveLine(): void {
    let newLine = "";

    this.fields.forEach((field: InputField): void => {
      let fieldValueAsStr = "";
      
      switch(field.dataTypeId) {
        case 1:
        case 2:
          fieldValueAsStr = field.userInput ? field.userInput : "";
          break;
        case 3:
          fieldValueAsStr = field.userInput ? 'T' : 'F';
          break;
        case 4:
          // converting it into something digestable for c#
          if(field.userInput) {
            let year = field.userInput.substr(0, 4);
            let month = field.userInput.substr(5, 2);
            let day = field.userInput.substr(8, 2);
  
            fieldValueAsStr = month + day + year;
          } else {
            fieldValueAsStr = "";
          }
          break;
      }

      newLine += fieldValueAsStr;

      if(fieldValueAsStr.length < field.length) {
        let charsToAdd = field.length - fieldValueAsStr.length;

        newLine += new Array(charsToAdd + 1).join(' ');
      }

      field.userInput = undefined;
    });

    this.lines.push(newLine);
  }

  private disableSubmission(): boolean {
    return !this.fields.filter((field: InputField): boolean => {
      return field.required && field.dataTypeId != 3; // booleans are always filled out so required is bullshit
    }).every((field: InputField): boolean => {
      return !!field.userInput;
    });
  }

  private getFieldName(name: string): string {
    let fieldName = name.charAt(0).toLowerCase();

    fieldName = fieldName.replace(' ', '');

    return fieldName;
  }

  private download(): void {
    let sliceSize = 512;
    let byteCharacters = this.lines.join('\r\n');
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, {type: 'text/plain'});
    let options = {type: "text/plain"} as ObjectURLOptions;
    let link = document.createElement("a");
    link.download = this.fileName;
    link.href = window.URL.createObjectURL(blob, options);
    link.click();
  }
}

class InputField extends Field {
  fieldName: string;
  numberLength: number;
  userInput: string;
}
