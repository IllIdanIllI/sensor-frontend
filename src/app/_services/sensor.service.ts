import { SensorResponse } from './../_models/response/sensor-response';
import { environment } from './../../environments/environment';
import { Sensor } from './../_models/sensor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  getSensorList(currentPage: number, limit: number) {
    let params: HttpParams = new HttpParams()
      .set("currentPage", currentPage.toString())
      .set("limit", limit.toString());
    return this.http.get(`${environment.HOST_URL}/sensors`, { params: params });
  }

  deleteSensor(id: string) {
    this.http.delete(`${environment.HOST_URL}/sensors/${id}`).toPromise()
  }

  updateSensor(id: string, entity: SensorResponse) {
    return this.http.put(`${environment.HOST_URL}/sensors/${id}`, entity).subscribe(response => console.log(response))
  }

  addSensor( entity: SensorResponse) {
    return this.http.post(`${environment.HOST_URL}/sensors`, entity).subscribe(response => console.log(response))
  }
}
