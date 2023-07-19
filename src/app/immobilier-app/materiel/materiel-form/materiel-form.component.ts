import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Materiel } from 'src/models/materiel';
import { MaterielService } from 'src/services/materiel.service';
import Swal from 'sweetalert2';
import { MaterielListComponent } from '../materiel-list/materiel-list.component';

@Component({
  selector: 'app-materiel-form',
  templateUrl: './materiel-form.component.html',
  styleUrls: ['./materiel-form.component.scss']
})
export class MaterielFormComponent implements OnInit {

  @Input() childProperty:Materiel;
  materiel = new Materiel()
  materielForm: UntypedFormGroup = Object.create(null);
  materielListComponentEditor:MaterielListComponent
  isButtonActive: boolean;
  submitted:boolean;
  constructor(private fb:UntypedFormBuilder, 
    @Host() materielListComponentEditor:MaterielListComponent,
 private materielService:MaterielService){ 
    this.materielListComponentEditor = materielListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.materielForm = this.fb.group({
      libelle: ['', Validators.required],
      prix: [0, Validators.required],
      photo1: ['', Validators.required],
      photo2: ['', Validators.required],
      photo3: ['', Validators.required],
    })
    console.log(this.childProperty.uuid)
    this.initialisation()
  }


  initialisation(){
    if(this.childProperty.uuid !==undefined){
      this.displayMateriel(this.childProperty)
      this.edit = true;
      this.materielForm.disable();
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayMateriel(this.materiel)
      this.edit = false;
    }
  }


  displayMateriel(materiel:Materiel){
    this.materiel = this.materiel;
    this.materielForm.patchValue({
      libelle: this.materiel.libelle,
      prix: this.materiel.prix,
      photo1: this.materiel.photo1,
      photo2: this.materiel.photo2,
      photo3: this.materiel.photo3,
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
      libelle: { required: 'libelle est obligatoire.' },
      prix: { required: 'prix est obligatoire.' },
      photo1: { required: 'photo est obligatoire.' },
    photo2: { required: 'photo est obligatoire.' },
    photo3: { required: 'photo est obligatoire.' },
    }
  
    formsErrors = {
    }

  onSubmit() {
    this.submitted = true
    if(this.materielForm.valid){

      console.log(this.edit+""+this.materielForm.value)
      const p = { ...this.materiel, ...this.materielForm.value };
      if(!this.edit){
        
         this.materielService.addMateriel(p).subscribe((res) => {
          console.log(res)
          if (res.code === 200){

            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() => {
              this.materielListComponentEditor.getMateriels()
              this.materielListComponentEditor.closeBtnClick()
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() => {
              this.materielListComponentEditor.getMateriels()
              this.materielListComponentEditor.closeBtnClick()
            })
          }
          
         
         },
         (error:any) =>  Swal.fire({
          icon: 'error',
          title: 'Enregistrement Echoué',
          showConfirmButton: true
        }))
      }else{
        this.materielService.updateMateriel(p).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Modification effectuer',
            showConfirmButton: true
          }).then(() =>{ 
            this.materielListComponentEditor.getMateriels()
            this.materielListComponentEditor.closeBtnClick()
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
    this.materielForm.enable()
    this.isButtonActive = true;
  }

}
