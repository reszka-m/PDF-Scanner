import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  myForm: FormGroup;
  pdfObj = null;
  photoPreview = null;
  logoData = null;
  croppedImage = null;
  worker: Tesseract.Worker;
  workerReady = false;
  image = 'assets/ocrTestImage1.png';
  ocrResult = '';
  captureProgress = 0;
  photoForOCR = null;
  
  constructor(
    private fb: FormBuilder,
    private plt: Platform,
    private http: HttpClient,
    private fileOpener: FileOpener) {
      this.loadWorker();
    }

  ngOnInit() {
      this.myForm = this.fb.group({
        showLogo: true,
        from: 'Michał',
        to: 'Mateusz',
        text: 'Add text...',
        pdfFileName: 'Add file name...',
      });
      this.loadLocalAssetToBase64();
  }

  async loadWorker() {
    this.worker = createWorker({
      logger: progress => {
        console.log(progress);
        if (progress.status == 'recognizing text') {
          this.captureProgress = parseInt('' + progress.progress * 100);
        }
      }
    });
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    console.log('Worker loading has finnished');
    this.workerReady = true;
  }

  async recognizeImage() {
    try {
      const result = await this.worker.recognize(this.photoForOCR);
      console.log(result);
      this.ocrResult = result.data.text;
    } catch (err) {
      console.error(err);
    }
  }

  loadLocalAssetToBase64() {
    this.http.get('./assets/testImage1.png', { responseType: 'blob' }).subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.logoData = reader.result;
      }
      reader.readAsDataURL(res);
    });
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      console.log('image');
  
      this.photoPreview = `data:image/jpeg;base64,${image.base64String}`;
    } catch (err) {
       console.error(err);
    }
  }

  async takePictureForOCR() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
  
      this.photoForOCR = `data:image/jpeg;base64,${image.base64String}`;
    } catch (err) {
       console.error(err);
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  createPdf() {
    const formValue = this.myForm.value;
    const image = this.croppedImage ? {image: this.croppedImage, width: 300} : {};

    let logo = {};
    if (formValue.showLogo) {
      logo = { image: this.logoData, width: 50 };
    }

    const docDefinition = {
      watermark: { text: 'PDF-Scanner', color: 'blue', opacity: 0.2, bold: true },
      content: [
        {
          columns: [
            logo,
            {
              text: new Date().toTimeString(),
              alignment: 'right'
            }
          ]
        },
        { text: 'REMINDER', style: 'header' },
        {
          columns: [
            {
              width: '50%',
              text: 'From',
              style: 'subheader'
            },
            {
              width: '50%',
              text: 'To',
              style: 'subheader'
            }
          ]
        },
        {
          columns: [
            {
              width: '50%',
              text: formValue.from
            },
            {
              width: '50%',
              text: formValue.to
            }
          ]
        },
        image,
        { text: formValue.text, margin: [0, 20, 0, 0] },
        { text: this.ocrResult, margin: [0, 20, 0, 0] },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBase64(async (data) => {
        try {
          let path = `pdf/${this.myForm.value.pdfFileName ?this.myForm.value.pdfFileName : 'myfile'}_${Date.now()}.pdf`;

          const result = await Filesystem.writeFile({
            path,
            data,
            directory: FilesystemDirectory.Documents,
            recursive: true
          });
          this.fileOpener.open(`${result.uri}`, 'application/pdf');
        } catch (e) {
          console.error('Unable to write file', e);
        }
      });
    } else {
      this.pdfObj.download();
    }
  }

}
