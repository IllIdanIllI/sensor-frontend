import { SensorResponse } from './../_models/response/sensor-response';
import { SensorModifyComponent } from './../sensor-modify/sensor-modify.component';
import { MatDialog } from '@angular/material';
import { PaginationDto } from './../_models/pagination-dto';
import { Roles } from './../_models/role';
import { AuthenticationService } from './../_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { SensorService } from './../_services/sensor.service';
import { Sensor } from './../_models/sensor';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'sensor-table',
  templateUrl: './sensor-table.component.html'
})
export class SensorTableComponent implements OnInit {
  private sensors: Sensor[] = [];
  private pageAmount: number;
  private pages: number[];
  private currentPage: number = 1;
  private role: string;


  constructor(private service: SensorService,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    public dialog: MatDialog) { }

  addSensor(): void {
    const dialogRef = this.dialog.open(SensorModifyComponent, {
      data: { sensor: new SensorResponse(), isAdding: true },
      autoFocus: false,
      maxHeight: '80vh',
      width: '30vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.addSensor(result);
        window.location.reload();;
      }
    });
  }

  openDialogUpdate(commonSensor: Sensor): void {
    let sensor: SensorResponse = this.mapSensorToResponse(commonSensor);
    const dialogRef = this.dialog.open(SensorModifyComponent, {
      data: { sensor: sensor, isAdding: false },
      autoFocus: false,
      maxHeight: '80vh',
      width: '30vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.service.updateSensor(commonSensor.id, result);
        window.location.reload();
      }
    })
  }

  private mapSensorToResponse(sensor: Sensor): SensorResponse {
    let range: string[] = sensor.range.split("-");
    let rangeFrom = range[0];
    let rangeTo = range[1];
    let response = new SensorResponse(
      sensor.id, sensor.name, sensor.model,
      rangeFrom, rangeTo, sensor.location,
      sensor.unit, sensor.type, sensor.description
    );
    return response;
  }

  ngOnInit() {
    this.loadPages();
    this.role = this.auth.getRole();
  }

  loadPages(event?: Event) {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params.page || 1
    });
    this.service.getSensorList(this.currentPage - 1, environment.RECORDS_PAGE_LIMIT)
      .subscribe(response => {
        this.sensors = (<PaginationDto>response).entities;
        this.pageAmount = (<PaginationDto>response).pageAmount;
        this.pages = Array(this.pageAmount).fill(0).map((x, i) => ++i);
      });
  }

  deleteSensor(id: string) {
    console.log(id);
    this.service.deleteSensor(id);
    window.location.reload();
  }

  searchByCriteria(event: Event) {
    const phrase: string = event.target["value"];
    if (phrase) {
      this.route.queryParams.subscribe(params => {
        this.currentPage = params.page || 1
      });
      this.service.searchByCriteria(phrase, this.currentPage - 1, environment.RECORDS_PAGE_LIMIT)
        .subscribe(response => {
          this.sensors = (<PaginationDto>response).entities;
          this.pageAmount = (<PaginationDto>response).pageAmount;
          this.pages = Array(this.pageAmount).fill(0).map((x, i) => ++i);
        });
    } else {
      this.loadPages();
    }

  }

  isAdmin() {
    return this.role == Roles.ADMINISTRATOR
  }

  getSensors() {
    return this.sensors;
  }

}
