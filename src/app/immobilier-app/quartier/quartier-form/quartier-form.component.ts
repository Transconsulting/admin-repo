import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Commune } from 'src/models/Commune';
import { Quartier } from 'src/models/Quartier';
import { Ville } from 'src/models/ville';
import { CommuneService } from 'src/services/commune.service';
import { QuartierService } from 'src/services/quartier.service';
import { VilleService } from 'src/services/ville.service';
import Swal from 'sweetalert2';
import { QuartierListComponent } from '../quartier-list/quartier-list.component';

@Component({
  selector: 'app-quartier-form',
  templateUrl: './quartier-form.component.html',
  styleUrls: ['./quartier-form.component.scss']
})
export class QuartierFormComponent implements OnInit {

  @Input() childProperty:Quartier;
  quartier = new Quartier()
  quartierForm: UntypedFormGroup=Object.create(null);
  quartierListComponentEditor:QuartierListComponent
  isButtonActive: boolean;
   communes: Commune[]; 
   villes: Ville[]; 
  submitted: boolean;
  constructor(private fb: UntypedFormBuilder, @Host() quartierListComponentEditor:QuartierListComponent,
 private quartierService:QuartierService,private communeService:CommuneService,private villeService:VilleService) { 
       this.quartierListComponentEditor = quartierListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.quartierForm = this.fb.group({
      libelle: ['', Validators.required],
      uuidCommune: ['', Validators.required],
      ville: ['', Validators.required],
    })
    console.log(this.childProperty.uuid)
    this.initialisation()
     this.getCommunes()
    this.getVilles()
  }

   getCommunes(){
     this.communeService.getCommunes().subscribe(data => this.communes = data)
  }

    getVilles(){
      this.villeService.getVilles().subscribe(data => {
        this.villes = data
        console.log(data)
      })
    }

  initialisation(): void{
    if(this.childProperty.uuid !==undefined){
      this.displayQuartier(this.childProperty)
      this.edit = true;
      this.quartierForm.disable();
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayQuartier(this.quartier)
      this.edit = false;
    }
  }


  displayQuartier(quartier:Quartier){
    this.quartier = quartier;
    this.quartierForm.patchValue({
      libelle: quartier.libelle,
      uuidCommune: quartier.uuidCommune,
      ville:quartier.ville
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
      libelle: { required: 'quartier est obligatoire.' },
      uuidCommune: { required: 'commune est obligatoire.' },
      ville: {required : 'ville est obligatoire'},
    }
  
    formsErrors = {
    }

  onSubmit() {
    this.submitted = true;
    console.log(this.edit+""+this.quartierForm.value)
    const p = { ...this.quartier, ...this.quartierForm.value };
   
    if(this.quartierForm.valid){
      if(!this.edit){
      
        this.quartierService.addQuartier(p).subscribe((res) => {
          console.log(res)
          if (res.code === 200){
            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() =>{
              this.quartierListComponentEditor.getQuartiers()
              this.quartierListComponentEditor.closeBtnClick()
             })
          }else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() =>{
              this.quartierListComponentEditor.getQuartiers()
              this.quartierListComponentEditor.closeBtnClick()
             })
          }
        
        },
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Enregistrement Echoué',
         showConfirmButton: true
       }))
     }else{
       this.quartierService.updateQuartier(p).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'Modification effectuer',
           showConfirmButton: true
         }).then(() => {
          this.quartierListComponentEditor.getQuartiers()
          this.quartierListComponentEditor.closeBtnClick()
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
    this.quartierForm.enable()
    this.isButtonActive = true;
  }



}
