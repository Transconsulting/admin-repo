import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from 'src/_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private readonly _fileNameUrl: string = `${environment.url_backend}` + `/upload`;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  SaveFile(file: File): Observable<File> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    return this.http.post<File>(this._fileNameUrl, formData, {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data'
      })
    })
      ;
  }
}
