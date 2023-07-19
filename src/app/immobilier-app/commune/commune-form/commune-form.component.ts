import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Commune } from 'src/models/Commune';
import { Ville } from 'src/models/ville';
import { CommuneService } from 'src/services/commune.service';
import { VilleService } from 'src/services/ville.service';
import Swal from 'sweetalert2';
import { CommuneListComponent } from '../commune-list/commune-list.component';

@Component({
  selector: 'app-commune-form',
  templateUrl: './commune-form.component.html',
  styleUrls: ['./commune-form.component.scss']
})
export class CommuneFormComponent implements OnInit {


  @Input() childProperty:Commune;
  commune = new Commune()
  communeForm: UntypedFormGroup=Object.create(null);
  communeListComponentEditor:CommuneListComponent
  isButtonActive: boolean;
   villes: Ville[]; 
  submitted: boolean;
  constructor(private fb: UntypedFormBuilder, @Host() communeListComponentEditor:CommuneListComponent,
 private communeService:CommuneService,private villeService:VilleService) { 
       this.communeListComponentEditor = communeListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.communeForm = this.fb.group({
      libelle: ['', Validators.required],
      uuidVile: ['', Validators.required],
    })
    console.log(this.childProperty.uuid)
    this.initialisation()
     this.getVilles()
  }

   getVilles(){
     this.villeService.getVilles().subscribe(data => this.villes = data)
  }


  initialisation(): void{
    if(this.childProperty.uuid !==undefined){
      this.displayCommune(this.childProperty)
      this.edit = true;
      this.communeForm.disable();
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayCommune(this.commune)
      this.edit = false;
    }
  }


  displayCommune(commune:Commune){
    this.commune = commune;
    this.communeForm.patchValue({
      libelle: commune.libelle,
      uuidVile: commune.uuidVile,
    });
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
      libelle: { required: 'commune est obligatoire.' },
      uuidVile: { required: 'ville est obligatoire.' },
    }
  
    formsErrors = {
    }

  onSubmit() {
    this.submitted = true
    console.log(this.edit+""+this.communeForm.value)
    const p = { ...this.commune, ...this.communeForm.value };
    if(this.communeForm.valid){
      if(!this.edit){
      
        this.communeService.addCommune(p).subscribe((res) => {
          if(res.code === 200){
            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() =>{ 
             this.communeListComponentEditor.getCommunes()
             this.communeListComponentEditor.closeBtnClick()
           })
          }else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() =>{ 
             this.communeListComponentEditor.getCommunes()
             this.communeListComponentEditor.closeBtnClick()
             this.communeForm.reset();
           })
          }

        },
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Enregistrement Echoué',
         showConfirmButton: true
       }))
     }else{
       this.communeService.updateCommune(p).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'Modification effectuer',
           showConfirmButton: true
         }).then(() => {
          this.communeListComponentEditor.getCommunes()
          this.communeListComponentEditor.closeBtnClick()
          this.communeForm.reset();
        })
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
    this.communeForm.enable()
    this.isButtonActive = true;
  }


}
