import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Profession } from 'src/models/proffession';
import { ProffessionService } from 'src/services/proffession.service';
import Swal from 'sweetalert2';
import { ProffessionListComponent } from '../proffession-list/proffession-list.component';

@Component({
  selector: 'app-proffession-form',
  templateUrl: './proffession-form.component.html',
  styleUrls: ['./proffession-form.component.scss']
})
export class ProffessionFormComponent implements OnInit {

  @Input() childProperty:Profession;
  profession = new Profession()
  professionForm: UntypedFormGroup = Object.create(null);
  professionListComponentEditor:ProffessionListComponent
  isButtonActive: boolean;
  submitted: boolean;
  constructor(private fb:UntypedFormBuilder, 
    @Host() proffessionListComponentEditor:ProffessionListComponent,
 private proffessionService:ProffessionService){ 
    this.professionListComponentEditor = proffessionListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.professionForm = this.fb.group({
      libelle: ['', Validators.required],
    })
    console.log(this.childProperty.uuid)
    this.initialisation()
  }


  initialisation(){
    if(this.childProperty.uuid !==undefined){
      this.displayProffession(this.childProperty)
      this.edit = true;
      this.professionForm.disable();
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayProffession(this.profession)
      this.edit = false;
    }
  }


  displayProffession(proffession:Profession){
    this.profession = proffession;
    this.professionForm.patchValue({
      libelle: proffession.libelle,
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
    this.submitted = true;
    console.log(this.edit+""+this.professionForm.value)
    const p = { ...this.profession, ...this.professionForm.value };
    
    if(this.professionForm.valid){
      if(!this.edit){
      
        this.proffessionService.addProfession(p).subscribe((res) => {
          console.log(res)
          if (res.code === 200){
            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() =>{
              this.professionListComponentEditor.getProfessions()
              this.professionListComponentEditor.closeBtnClick()
             })
          }else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() =>{
              this.professionListComponentEditor.getProfessions()
              this.professionListComponentEditor.closeBtnClick()
             })
          }
         
        },
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Enregistrement Echoué',
         showConfirmButton: true
       }))
     }else{
       this.proffessionService.updateProfession(p).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'Modification effectuer',
           showConfirmButton: true
         }).then(() => {
          this.professionListComponentEditor.getProfessions()
          this.professionListComponentEditor.closeBtnClick()
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
    this.professionForm.enable()
    this.isButtonActive = true;
  }


}
