import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class HttpService {

  private apiUrl = ''; // YOUR KINTONE API URL
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'x-api-key': '' // YOUR KINTONE API KEY
    });
  }

  public httpGetRecordOne(app: string, id: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('app', app);
    httpParams = httpParams.append('id', id);

    const httpOptions = {
      headers: this.headers,
      params: httpParams
    };
    return this.http.get(this.apiUrl, httpOptions);
  }

  public httpGetRecords(app: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('app', app);
    httpParams = httpParams.append('totalCount', 'true');

    const httpOptions = {
      headers: this.headers,
      params: httpParams
    };
    return this.http.get(this.apiUrl, httpOptions);
  }

  public httpGetTodayRecords(app: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('app', app);
    httpParams = httpParams.append('query', 'date=TODAY()');

    const httpOptions = {
      headers: this.headers,
      params: httpParams
    };
    return this.http.get(this.apiUrl, httpOptions);
  }

  public httpGetRecordsByQuery(app: string, query: string, fields?: Array<string>) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('app', app);
    httpParams = httpParams.append('query', query);
    httpParams = httpParams.append('totalCount', 'true');

    if (fields && fields.length > 0) {
      fields.forEach(field => httpParams = httpParams.append('fields', JSON.stringify(fields)));
    }

    const httpOptions = {
      headers: this.headers,
      params: httpParams
    };
    return this.http.get(this.apiUrl, httpOptions);
  }

  public httpGetFile(fileKey: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('file', 'true');
    httpParams = httpParams.append('fileKey', fileKey);

    const httpOptions = {
      headers: this.headers,
      params: httpParams
    };
    return this.http.get(this.apiUrl, httpOptions);
  }

  public httpPutRecordOne(app: string, id: string, record: object) {
    const httpOptions = {
      headers: this.headers
    };
    const revision = record['$revision'] ? record['$revision']['value'] : null;
    const jsonData = {
      app,
      id,
      revision,
      record
    };
    return this.http.put(this.apiUrl, jsonData, httpOptions);
  }

  public httpPutRecords(app: string, records: object) {
    const httpOptions = {
      headers: this.headers
    };

    const jsonData = {
      app,
      records
    };
    return this.http.put(this.apiUrl, jsonData, httpOptions);
  }

  public httpPostRecordOne(app: string, record: object) {

    const httpOptions = {
      headers: this.headers
    };

    const jsonData = {
      app,
      record
    };
    return this.http.post(this.apiUrl, jsonData, httpOptions);
  }

  public httpPostRecords(app: string, records: object) {
    const httpOptions = {
      headers: this.headers
    };

    const jsonData = {
      app,
      records
    };
    return this.http.post(this.apiUrl, jsonData, httpOptions);
  }

  public httpPostFile(base64: string) {
    const jsonData = {
      file: 'true',
      base64,
    };

    const httpOptions = {
      headers: this.headers
    };
    return this.http.post(this.apiUrl, jsonData, httpOptions);
  }

  public httpDeleteRecord(app: string, ids: Array<string>) {
    const jsonData = {
      app,
      ids
    };

    const httpOptions = {
      headers: this.headers,
      body: jsonData
    };
    return this.http.delete(this.apiUrl, httpOptions);
  }
}
