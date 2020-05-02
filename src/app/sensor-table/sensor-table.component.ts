import { Roles } from './../_models/role';
import { AuthenticationService } from './../_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { SensorService } from './../_services/sensor.service';
import { Sensor } from './../_models/sensor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sensor-table',
  templateUrl: './sensor-table.component.html'
})
export class SensorTableComponent implements OnInit {
  private sensors: Sensor[] = [];
  private pageAmount: number;
  private pages: number[];
  private currentPage: number = 1;
  private role: string ;


  constructor(private service: SensorService, private route: ActivatedRoute, private auth: AuthenticationService) { }

  ngOnInit() {
    this.loadPages();
    this.role = this.auth.getRole();
  }

  loadPages(event?: Event) {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params.page || 1
    });
    this.service.getSensorList(this.currentPage - 1, 4)
      .subscribe(response => {
        this.sensors = response.entities;
        this.pageAmount = response.pageAmount;
        this.pages = Array(this.pageAmount).fill(0).map((x, i) => ++i);
      });
  }

  deleteSensor(id: string) {
    console.log(id);
    this.service.deleteSensor(id);
    // this.loadPages();
  }

  updateSensor(id: string) {
    console.log(this.sensors.find(sensor=>sensor.id==id))
    this.service.updateSensor(id,(this.sensors.find(sensor=>sensor.id==id)))
  }

  isAdmin(){
    return this.role == Roles.ADMINISTRATOR
  }

  getSensors() {
    return this.sensors;
  }

}
