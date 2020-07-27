import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { googleSheet } from 'src/assets/config';
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {
    setTimeout(() => {
      this.handleClientLoad();
    }, 2000);
  }

  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.init({
      apiKey: googleSheet.API_KEY,
      clientId: googleSheet.CLIENT_ID,
      discoveryDocs: googleSheet.DISCOVERY_DOCS,
      scope: googleSheet.SCOPES
    }).then(function () {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        localStorage.setItem("isLoggedIn", "true");
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
          range: 'Class Data!A2:E',
        }).then(function (response) {
          localStorage.removeItem("spreadsheetData");
          localStorage.setItem("spreadsheetData", JSON.stringify(response.result.values));
        }, function (response) {
          this.appendPre('Error: ' + response.result.error.message);
        });
      } else {
        localStorage.setItem("isLoggedIn", "false");
      }
    }, function (error) {

    });


  }

  getStudentDetails() {
    let data = JSON.parse(localStorage.getItem("spreadsheetData"));
    let studentData: Student[] = [];
    if(data) {
      data.map((item) => {
        let student: Student = {
          StudentName: item[0],
          Gender: item[1],
          ClassLevel: item[2],
          HomeState: item[3],
          Major: item[4]
        }
        studentData.push(student);
      });
    }
    return studentData;
  }
}
