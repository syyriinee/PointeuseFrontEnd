import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { PointageUploadService } from '../../services/pointageUpload.service';
import { NotificationService } from 'src/app/core/services/notification.service';



@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {

  @Input()
  requiredFileType!: string;

  fileName = '';
  uploadProgress!: number;
  uploadSub!: Subscription;

  fileToUpload: File | null = null;
  fullPath!: string;
  checkoutForm = this.formBuilder.group({
    fullPathInput: '',
    nameTableToUpload: ''
  });

  nameTableToUpload!: string;





  constructor(private http: HttpClient, private formBuilder: FormBuilder, private pointageUploadService: PointageUploadService, private notificationService: NotificationService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      console.log("----file---------------");
      console.log(file);
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      const upload$ = this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          finalize(() => this.reset())
        );

      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
      })
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress != null;
    this.uploadSub != null;
  }


  ngOnInit(): void {
  }


  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    //this.fileToUpload = (target.files as FileList)[0];
    console.log(target);
    //const aaa= target.files;
    console.log("----target.webkitdirectory-----");
    //console.log(aaa);
    this.fullPath = target.value;
    console.log("----fullpath-------", this.fullPath);

  }

  onSubmit() {
    console.log("----submit file----");
    const nameTableToUpload = this.checkoutForm.get("nameTableToUpload")?.value;
    const fullPathInput = this.checkoutForm.get("fullPathInput")?.value;
    console.log("---fullPathInput----", fullPathInput);
    console.log("----teble name----", nameTableToUpload);


    if (nameTableToUpload == null) {
      this.notificationService.openSnackBar("Please select table name!");
      return;
    }
    if (fullPathInput == null) {
      this.notificationService.openSnackBar("Please upload DB file!");
      return;
    }
    this.pointageUploadService.uploadFile(fullPathInput, nameTableToUpload).subscribe(
      data => {
        console.log("-----data---------------", data);
        if (data == true) {
          this.notificationService.openSnackBar("Migration DB is succeed.");
        } else {
          this.notificationService.openSnackBar("An error is catched. Please check the cause.");

        }

      },
      error => {
        this.notificationService.openSnackBar("An error is catched.");
      }
    );

  }

  changeTable(e: Event) {
    const target = e.target as HTMLInputElement;

    this.nameTableToUpload = target.value;
  }
}
