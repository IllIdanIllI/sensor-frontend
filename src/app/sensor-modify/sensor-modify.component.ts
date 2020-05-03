import { SensorTableComponent } from './../sensor-table/sensor-table.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SensorResponse } from './../_models/response/sensor-response';
import { Unit } from './../_models/unit';
import { SensorType } from './../_models/sensor-type';
import { Sensor } from './../_models/sensor';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'sensor-modify',
  templateUrl: './sensor-modify.component.html'
})
export class SensorModifyComponent implements OnInit {

  public ownerForm: FormGroup;
  isAdding: boolean = true;
  sensor: SensorResponse;
  type = SensorType;
  unit = Unit;
  minRangeValue: number = 1;
  maxRangeValue: number = this.minRangeValue + 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SensorTableComponent>) {
    this.isAdding = data["isAdding"]
    console.log(this.isAdding)
    if (!this.isAdding) {
      this.sensor = data["sensor"];
      this.minRangeValue = parseInt(this.sensor.rangeFrom);
      this.maxRangeValue = parseInt(this.sensor.rangeTo);
    }
  }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      model: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      rangeFrom: new FormControl('', [Validators.required]),
      rangeTo: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.maxLength(40)]),
      description: new FormControl('', [Validators.maxLength(200)]),
    });
  }

  onCangeMinRange(event: Event) {
    this.minRangeValue = event.target["value"];
  }

  onCangeMaxRange(event: Event) {
    this.maxRangeValue = event.target["value"];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

}
