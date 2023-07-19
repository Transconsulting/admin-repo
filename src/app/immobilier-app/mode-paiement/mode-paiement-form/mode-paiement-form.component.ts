import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModePayement } from 'src/models/ModePayement';
import { ModePayementService } from 'src/services/mode-payement.service';
import Swal from 'sweetalert2';
import { ModePaiementListComponent } from '../mode-paiement-list/mode-paiement-list.component';

@Component({
  selector: 'app-mode-paiement-form',
  templateUrl: './mode-paiement-form.component.html',
  styleUrls: ['./mode-paiement-form.component.scss']
})
export class ModePaiementFormComponent implements OnInit {
@Input() proprieteFille:ModePayement;
  modepayement = new ModePayement();
  modepayementForm: UntypedFormGroup = Object.create(null);
  modepayementListEditer : ModePaiementListComponent
  isButtonActive : boolean;
  submitted: boolean;
  constructor(private SK:UntypedFormBuilder,
   @Host() modepayementListEditer:ModePaiementListComponent,
   private modepayementService:ModePayementService) {
      this.modepayementListEditer = modepayementListEditer
    }
    edit:boolean
  ngOnInit(): void {  
    this.modepayementForm=this.SK.group({
      libelle: ['',Validators.required],
    })
    this.initialisation();
  }

  initialisation(){
    if(this.proprieteFille.uuid !== undefined){
      this.displayModepayement(this.proprieteFille)
      this.edit=true
      this.modepayementForm.disable();
    }
    if(this.proprieteFille.uuid === undefined){
      this.displayModepayement(this.modepayement)
      this.edit=false
    }
  }

  displayModepayement(modepayement:ModePayement){
    this.modepayement=modepayement;
    this.modepayementForm.patchValue({
      libelle: modepayement.libelle,
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

  
  formsErrors = {
  }

  messageValidation = {
    libelle: { required: 'Libelle est obligatoire'},
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.edit+""+this.modepayementForm.value)
    const p = { ...this.modepayement, ...this.modepayementForm.value };
    
    if(this.modepayementForm.valid){
      if(!this.edit){
      
        this.modepayementService.ajoutModepayement(p).subscribe((res) => {
          if (res.code === 200){
            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() => {
             this.modepayementListEditer.getModepayements()
             this.modepayementListEditer.fermerBtnClick()
           })
          }else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() => {
             this.modepayementListEditer.getModepayements()
             this.modepayementListEditer.fermerBtnClick()
           })
          }
         
        },
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Enregistrement Echoué',
         showConfirmButton: true
       }))
     }else{
       this.modepayementService.modifierModepayement(p).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'Modification effectuer',
           showConfirmButton: true
         }).then(() => {
          this.modepayementListEditer.getModepayements()
          this.modepayementListEditer.fermerBtnClick()
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
    this.modepayementForm.enable();
    this.isButtonActive = true;
  }
}
