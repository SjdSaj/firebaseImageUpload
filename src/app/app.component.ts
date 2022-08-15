import { Component } from '@angular/core';
import { Storage,ref, uploadBytesResumable, getDownloadURL} from '@angular/fire/storage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  file : any ;
  fileUrl = new Array;


  show(){
    console.log(this.fileUrl.map((a)=>{ return a}));
  }

  change(event:any){
    this.file = event.target.files;
    console.log('file set');
  }

  async upload(){
    console.log('clicked');

    for(let i=0;i<this.file.length;i++){
      const storageRef = ref(this.storage, this.file[i].name);
      const uploadTask = uploadBytesResumable(storageRef, this.file[i]);


      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async() => {
          // Upload completed successfully, now we can get the download URL
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.fileUrl.push(downloadURL);
          });
        }

      )
    }
    function abc(){
      console.log('insert function');
    }
    abc();
    

  }


  constructor(private storage:Storage){}


  title = 'app';
}
