import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Domaine } from 'src/models/domaine';
import { Habitation } from 'src/models/Habitation';
import { Proprietaire } from 'src/models/proprietaire';
import { DomaineService } from 'src/services/domaine.service';
import { HabitationService } from 'src/services/habitation.service';
import { ProprietaireService } from 'src/services/proprietaire.service';
import Swal from 'sweetalert2';
import { ParcelleAppartementListComponent } from '../parcelle-appartement-list/parcelle-appartement-list.component';
import { UploadFileService } from 'src/services/upload-file.service';

@Component({
  selector: 'app-parcelle-appartement-form',
  templateUrl: './parcelle-appartement-form.component.html',
  styleUrls: ['./parcelle-appartement-form.component.scss']
})
export class ParcelleAppartementFormComponent implements OnInit {

  fileToUpload: File | null = null;
  @Input() childProperty:Habitation;
  habitation = new Habitation()
  habitationForm: UntypedFormGroup = Object.create(null);
  habitationListComponentEditor:ParcelleAppartementListComponent
  isButtonActive: boolean;
  dataProprietaire: Proprietaire[]
  dataDomaine: Domaine[];
  dataStatut: [string];
  submitted: boolean;
  isHidden: boolean;
  FileId: any;
  habitationImageForm: UntypedFormGroup = Object.create(null);
  
  constructor(private fb:UntypedFormBuilder, 
    @Host() habitationListComponentEditor:ParcelleAppartementListComponent,
 private habitationService:HabitationService,private domaineService:DomaineService,
 private fileUploadService : UploadFileService,
 private proprietaireService:ProprietaireService){ 
    this.habitationListComponentEditor = habitationListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.habitationForm = this.fb.group({
      numero: ['', Validators.required],
      prix: ['', Validators.required],
      statutDomaine: ['', Validators.required],
      uuidDomaine: ['', Validators.required],
      uuidProprietaire: ['', Validators.required],
      avance: [''],
      caution: [''],
      fraisAgence: ['', Validators.required],
      description : [''],
    })
    console.log(this.childProperty.uuid)
    this.initialisation()
    this.getProprietaire();
    this.combos()
  }


  combos(){
    this.domaineService.statutDomaines().subscribe(res => this.dataStatut = res)
  }


  getDomaines(uuidProprietaire:string){
    this.domaineService.getDomaines(uuidProprietaire).subscribe(res => this.dataDomaine = res)
  }


  initialisation(){
    if(this.childProperty.uuid !==undefined){
      this.getDomaines(this.childProperty.uuidProprietaire)
      this.displayHabitation(this.childProperty)
      this.edit = true;
      this.habitationForm.disable();
   
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayHabitation(this.habitation)
      this.edit = false;
    }
  }


  displayHabitation(habitation:Habitation){
    this.habitation = habitation;
    this.habitationForm.patchValue({
      numero: habitation.numero,
      prix: habitation.prix,
      uuidProprietaire : habitation.uuidProprietaire,
      uuidDomaine: habitation.uuidDomaine,
      statutDomaine: habitation.statutDomaine,
      avance : habitation.avance,
      caution: habitation.caution,
      fraisAgence: habitation.fraisAgence,
      description: habitation.description
     
    });
    console.log('aaaa',this.habitation.domaine)
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
      numero: { required: 'numero est obligatoire.' },
      prix: { required: 'prix est obligatoire.' },
      domaine: { required: 'domaine est obligatoire.' },
      statutDomaine: { required: 'statutDomaine est obligatoire.' },
      avance: { required: 'avance est obligatoire.' },
      caution: { required: 'caution est obligatoire.' },
      fraisAgence: { required: 'frais agence est obligatoire.' },
    }
  
    formsErrors = {
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

  onSubmit() {
   this.submitted = true;
    const p = { ...this.habitation, ...this.habitationForm.value };
  //  if(this.habitationForm.valid){
  //   console.log(this.habitationForm)
  //   if(!this.edit){
  //     console.log(p)
  //      this.habitationService.addHabitation(p).subscribe((res) => {
  //       console.log(res)
  //       if (res.code === 200){
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Enregistrement effectuer',
  //           showConfirmButton: true
  //         }).then(() => {
  //           this.habitationListComponentEditor.getHabitations()
  //           this.habitationForm.reset()
  //         })
  //       }else{
  //         Swal.fire({
  //           icon: 'error',
  //           title: res.description,
  //           showConfirmButton: true
  //         }).then(() =>  {
  //           this.habitationListComponentEditor.getHabitations()
  //           this.habitationListComponentEditor.closeBtnClick();
  //           this.habitationForm.reset()
  //         })
  //       }
        
  //      },
  //      (error:any) =>  Swal.fire({
  //       icon: 'error',
  //       title: 'Enregistrement Echoué',
  //       showConfirmButton: true
  //     }))
  //   }else{
  //     this.habitationService.updateHabitation(p).subscribe((res) => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Modification effectuer',
  //         showConfirmButton: true
  //       }).then(() => {
  //         this.habitationListComponentEditor.getHabitations()
  //         this.habitationListComponentEditor.closeBtnClick();
  //         this.habitationForm.reset()
  //       })
  //      },
  //      (error:any) =>  Swal.fire({
  //       icon: 'error',
  //       title: 'Modification Echoué',
  //       showConfirmButton: true
  //     })) 
  //   }
  //  }
  console.log("ceci est la description",this.habitationForm)
  }

    getProprietaire(){
      this.proprietaireService.getProprietaires().subscribe(res => this.dataProprietaire = res)
    }

  onActive(){
    this.habitationForm.enable()
    this.isButtonActive = true;
  }

  onDisplayInput(domaine: any){
    this.dataDomaine.find((res)=>{
      if (res.uuid===domaine){
        if (res.type==="PARCELLE"){
          this.isHidden=true
        }else{
          console.log(res.type)
          this.isHidden=false
        }
        
      }
    })

    console.log("bintou")
    
  }
}
