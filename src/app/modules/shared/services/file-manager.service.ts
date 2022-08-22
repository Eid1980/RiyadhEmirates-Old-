import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadedFileBase64Model } from '../models/file-manager.model';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(private http: HttpClient) {}

  upload(
    entityId: string,
    entityName: string,
    subEntityName: string,
    files: File[]
  ) {
    const formData = new FormData();
    formData.append('entityId', entityId);
    formData.append('entityName', entityName);
    formData.append('subEntityName', subEntityName);

    Array.from(files).map((file, index) => {
      formData.append('file' + index, file, file.name);
    });

    return this.http.post(`${environment.apiUrl}api/FileManager`, formData);
  }

  changeStatus(fileId: number) {
    return this.http.get(
      `${environment.apiUrl}api/FileManager/ChangeStatus/${fileId}`
    );
  }

  delete(fileId: string) {
    return this.http.delete(`${environment.apiUrl}api/FileManager/${fileId}`);
  }

  deleteByEntityName(entityId: any, entityName: string) {
    entityId = entityId.toString();
    return this.http.post(
      `${environment.apiUrl}api/FileManager/DeleteByEntityName`,
      { entityName: entityName, entityId: entityId }
    );
  }

  download(id: string) {
    this.http
      .get(`${environment.apiUrl}api/FileManager/Download/${id}`)
      .subscribe((res: any) => {
        this.downloadFile(res);
      });
  }

  private downloadFile(res: any) {

    const byteCharacters = atob(res.base64File);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);

    a.download = res.fileName;
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

  getById = (id: string): Observable<UploadedFileBase64Model> => {
    return this.http.get<UploadedFileBase64Model>(`${environment.apiUrl}api/FileManager/GetById/${id}`);
  }
  getByEntityId(entityId: string) {
    return this.http.get(
      `${environment.apiUrl}api/FileManager/GetByEntityId/${entityId}`
    );
  }

  getByEntityName(entityName: string) {
    return this.http.get(
      `${environment.apiUrl}api/FileManager/GetByEntityName/${entityName}`
    );
  }
}
