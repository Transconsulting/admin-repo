import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ville } from 'src/models/ville';
import { VilleService } from 'src/services/ville.service';
import Swal from 'sweetalert2';
import { VilleListComponent } from '../ville-list/ville-list.component';

@Component({
  selector: 'app-ville-form',
  templateUrl: './ville-form.component.html',
  styleUrls: ['./ville-form.component.scss']
})
export class VilleFormComponent implements OnInit {
  @Input() childProperty:Ville;
  ville = new Ville()
  villeForm: UntypedFormGroup = Object.create(null);
  villeListComponentEditor:VilleListComponent
  isButtonActive: boolean;
  submitted:boolean;
  constructor(private fb:UntypedFormBuilder, 
    @Host() villeListComponentEditor:VilleListComponent,
 private villeService:VilleService){ 
    this.villeListComponentEditor = villeListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.villeForm = this.fb.group({
      libelle: ['', Validators.required],
    })
    console.log(this.childProperty.uuid)
    this.initialisation()
  }


  initialisation(){
    if(this.childProperty.uuid !==undefined){
      this.displayVille(this.childProperty)
      this.edit = true;
      this.villeForm.disable();
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayVille(this.ville)
      this.edit = false;
    }
  }


  displayVille(ville:Ville){
    this.ville = ville;
    this.villeForm.patchValue({
      libelle: ville.libelle,
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
    }
  
    formsErrors = {
    }

  onSubmit() {
    this.submitted = true
    if(this.villeForm.valid){

      console.log(this.edit+""+this.villeForm.value)
      const p = { ...this.ville, ...this.villeForm.value };
      if(!this.edit){
        
         this.villeService.addVille(p).subscribe((res) => {
          console.log(res)
          if (res.code === 200){

            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() => {
              this.villeListComponentEditor.getVilles()
              this.villeListComponentEditor.closeBtnClick()
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() => {
              this.villeListComponentEditor.getVilles()
              this.villeListComponentEditor.closeBtnClick()
            })
          }
          
         
         },
         (error:any) =>  Swal.fire({
          icon: 'error',
          title: 'Enregistrement Echoué',
          showConfirmButton: true
        }))
      }else{
        this.villeService.updateVille(p).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Modification effectuer',
            showConfirmButton: true
          }).then(() =>{ 
            this.villeListComponentEditor.getVilles()
            this.villeListComponentEditor.closeBtnClick()
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
    this.villeForm.enable()
    this.isButtonActive = true;
  }


}
