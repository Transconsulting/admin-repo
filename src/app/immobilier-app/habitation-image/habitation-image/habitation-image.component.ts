import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Habitation } from 'src/models/Habitation';
import { HabitationImage } from 'src/models/HabitationImage';
import { HabitationImageService } from 'src/services/habitation-image.service';
import { UploadFileService } from 'src/services/upload-file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habitation-image',
  templateUrl: './habitation-image.component.html',
  styleUrls: ['./habitation-image.component.scss']
})
export class HabitationImageComponent implements OnInit {
  
  fileToUpload: File | null = null;
  @Input() childProperty:Habitation;
  habitationImage = new HabitationImage();
  habitationDetailList:HabitationImage[];
  sortHabitationImageList:HabitationImage[] = [];
  filteragent:HabitationImage[] = [];
  cfilterHabitationImage:HabitationImage[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  habitationDetailDetail: HabitationImage |null=null;
  totalLengthOfCollection: number=0;
  parentProperty = new Habitation();
  habitationDetailProperty = new HabitationImage();

  habitationImageForm: UntypedFormGroup = Object.create(null);
  isButtonActive: boolean;
  // dataQuartier: Quartier[];
  // dataAgent: Agent[];
  edit: any;
  isDisplay:boolean;
  FileId: any;
  dataImages: HabitationImage[];
  submitted: boolean;


  constructor(private modalService: NgbModal, private habitationImageService:HabitationImageService,private fb:UntypedFormBuilder,
    private fileUploadService:UploadFileService) {
    this.filteragent = this.habitationDetailList;
    this.cfilterHabitationImage = this.habitationDetailList;
    this.sortHabitationImageList = this.habitationDetailList;
    //this.totalLengthOfCollection = this.cfilterHabitationImage.length;
  }

 

  ngOnInit() {
    this.parentProperty = this.childProperty;
    this.getHabitationImages();
    this.habitationImageForm = this.fb.group({
      uuidImage: ['',Validators.required],
      uuidParcelleAppartement: [''],
    })
    this.initialisation(this.habitationImage)
   // this.getAgents()
    this.isDisplay = false;
  }

  getHabitationImages(){
    this.habitationImageService.getHabitationImagele(this.childProperty.uuid).subscribe( res => {
      console.log(res)
      this.dataImages = res;
      this.cfilterHabitationImage = res
      this.totalLengthOfCollection = res.length
    });
  }

 
  //Searching..........
  _searchTerm: string='';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filteragent = this.filter(val);
  }

  filter(v: string) {
    return this.habitationDetailList.filter(
      x => x.libelleImage?.toLowerCase().indexOf(v.toLowerCase()) !== -1  );
      
  }

  
  //complete example................
  cpage = 1;
  cpageSize = 4;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfilterHabitationImage = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterHabitationImage.length;
  }

  cfilter(v: string) {
    return this.habitationDetailList.filter (x => x.libelleImage?.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
  }


  // openModal(targetModal:NgbModal, agent:any) {
  //   this.modalService.open(targetModal, {
  //     centered: true,
  //     backdrop: 'static',
  //     size:"lg"
  //   });

  //   if (agent == null) {
  //     this.editAddLabel = 'Enregistrement'
  //     //this.parentProperty = new HabitationImage()
  //   }

  //   if(agent != null){
  //     this.villeDetail = agent;
  //     this.editAddLabel = 'Modification'
  //     this.parentProperty = agent;
  //   }

  // }

remplirFormulaire(habitationImage:HabitationImage){
  this.habitationDetailProperty = habitationImage;
 // this.initialisation();
}



  closeBtnClick() {
    this.modalService.dismissAll()
    this.ngOnInit();
  }

  delete(uuid: string): void {
   console.log(uuid)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous supprimez?',
      text: "Impposible de restaurer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.habitationImageService.deleteHabitationImage(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getHabitationImages()
        })
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Suppression',
          'Suppression annuler',
          'error'
        )
      }
    })
  }






  initialisation(habitationImage:HabitationImage){
    if(this.habitationImage.uuid !==undefined){
    
      this.displayHabitationImage(habitationImage)
      this.edit = true;
     this.habitationImageForm.disable();
     this.isDisplay = true
    }
     if(this.habitationImage.uuid === undefined){
          this.displayHabitationImage(habitationImage)
          this.edit = false;
         }
  }


  displayHabitationImage(habitationImage:HabitationImage){
    this.habitationImage = habitationImage;
    console.log(HabitationImage)
    this.habitationImageForm.patchValue({
      uuidImage: habitationImage.uuidImage,
      uuidParcelleAppartement: this.childProperty.uuid,
    });

    console.log(this.habitationImageForm.value)
  }

    //Model........................
    logValidationErrors(group: UntypedFormGroup) {
      // Object.keys(group.controls).forEach((key: string) => {
      //   const ac = group.get(key);
  
      //   this.formsErrors[key] = '';
      //   if (ac && !ac.valid && (ac.touched || ac.dirty)) {
      //     const message = this.ValidationMessage[key];
      //     for (const errorKey in ac.errors) {
      //       if (errorKey) {
      //         this.formsErrors[key] += message[errorKey] + '    ';
      //       }
      //     }
      //   }
      //   if (ac instanceof FormGroup) {
      //     this.logValidationErrors(ac)
      //   }
      // })
    }
  
    ValidationMessage = {
      uuidParcelleAppartement: { required: 'Libelle est obligatoire.' },
      uuidImage: { required: 'size est obligatoire.' },
    }
  
    formsErrors = {
    }

  onSubmit() {
    this.submitted = true;
    console.log(this.habitationImageForm.value)
    const p = { ...this.habitationImage, ...this.habitationImageForm.value };
    p.uuidParcelleAppartement = this.childProperty.uuid;
    console.log(p)
    if(this.habitationImageForm.valid){
      if(!this.edit){
      
        this.habitationImageService.addHabitationImage(p).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'Enregistrement effectuer',
           showConfirmButton: true
         }).then(() => {
          this.getHabitationImages()
          this.isDisplay = false;
         })
        },
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Enregistrement Echoué',
         showConfirmButton: true
       }))
     }else{
       this.habitationImageService.updateHabitationImage(p).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'Modification effectuer',
           showConfirmButton: true
         }).then(() => this.getHabitationImages())
        },
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Modification Echoué',
         showConfirmButton: true
       }))
      
     }
    }
      
  }

  onActive(){
    this.habitationImageForm.enable()
    this.isButtonActive = true;
  }

  onDisplay(){
    this.isDisplay = true;
    //this.isDisplay = !this.isDisplay
  }


  uploadFile(event:any){
    if(event.target.files && event.target.files[0]){
      this.fileToUpload = event.target.files[0];
      var reader = new FileReader();
      this.fileUploadService.SaveFile(this.fileToUpload).subscribe((data) => {
          this.FileId = data["uuid"];
          console.log(this.FileId)
          this.habitationImageForm.patchValue({
            uuidImage: this.FileId
          });
      })
    }
  }
}
