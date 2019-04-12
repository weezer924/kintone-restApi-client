import { Component } from '@angular/core';
import { HttpService } from './service/http.service';
import { JsonConverter } from './service/jsonConvert.service';
import { SampleModel } from './models/sample.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-http';

  constructor(
    private httpService: HttpService,
    private jsonConverter: JsonConverter
  ) {
    this.loadData();
  }

  // Get data from kintone
  // KINTONE APP ID is needed
  // Use jsonConverter put data in your model
  public loadData() {
    const query = 'order by name asc';
    this.httpService.httpGetRecordsByQuery('YOUR KINTONE APP ID', query).subscribe(result => {
      const records: Array<object> = result['records'];

      if (records.length !== 0) {
        for (const record of records) {
          const data: SampleModel = new SampleModel();
          this.jsonConverter.jsonParseToModel(data, record);
        }
      }
    });
  }

  // If you change same value in your model
  // Use this function to update kintone data
  public updateData = (sample: SampleModel): Observable<object> => {
    const jsonRecordOne: object = new Object();
    this.jsonConverter.modelToJsonObject(sample, jsonRecordOne);

    return this.httpService.httpPutRecordOne(
      'YOUR KINTONE APP ID',
      'YOUR RECORD ID',
      jsonRecordOne
    );
  }
}
