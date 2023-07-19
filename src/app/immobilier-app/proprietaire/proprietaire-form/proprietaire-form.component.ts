import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Proprietaire } from 'src/models/proprietaire';
import { Ville } from 'src/models/ville';
import { ProprietaireService } from 'src/services/proprietaire.service';
import { VilleService } from 'src/services/ville.service';
import Swal from 'sweetalert2';
import { ProprietaireListComponent } from '../proprietaire-list/proprietaire-list.component';

@Component({
  selector: 'app-proprietaire-form',
  templateUrl: './proprietaire-form.component.html',
  styleUrls: ['./proprietaire-form.component.scss']
})
export class ProprietaireFormComponent implements OnInit {



  @Input() childProperty:Proprietaire;
  proprietaire = new Proprietaire()
  proprietaireForm: UntypedFormGroup = Object.create(null);
  proprietaireListComponentEditor:ProprietaireListComponent
  isButtonActive: boolean;
  dataVille: Ville[];
  submitted: boolean;
  constructor(private fb:UntypedFormBuilder, 
    @Host() proprietaireListComponentEditor:ProprietaireListComponent,
 private proprietaireService:ProprietaireService,private villeService:VilleService){ 
    this.proprietaireListComponentEditor = proprietaireListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.proprietaireForm = this.fb.group({
      nom: ['', Validators.required],
      prenoms: ['', Validators.required],
      tel: ['', Validators.required],
      ville: ['', Validators.required],
    })
    console.log(this.childProperty.uuid)
    this.initialisation()
    this.getVilles()
  }


  getVilles(){
    this.villeService.getVilles().subscribe(res => this.dataVille = res)
  }


  initialisation(){
    if(this.childProperty.uuid !==undefined){
      this.displayProprietaire(this.childProperty)
      this.edit = true;
      this.proprietaireForm.disable();
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayProprietaire(this.proprietaire)
      this.edit = false;
    }
  }


  displayProprietaire(proprietaire:Proprietaire){
    this.proprietaire = proprietaire;
    this.proprietaireForm.patchValue({
      nom: proprietaire.nom,
      prenoms: proprietaire.prenoms,
      tel: proprietaire.tel,
      ville: proprietaire.ville,
     
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
      nom: { required: 'Nom est obligatoire.' },
      prenoms: { required: 'Prenoms est obligatoire.' },
      telephone: { required: 'Telephone est obligatoire.' },
    }
  
    formsErrors = {
    }

  onSubmit() {
   this.submitted = true;
    const p = { ...this.proprietaire, ...this.proprietaireForm.value };
   if(this.proprietaireForm.valid){
    if(!this.edit){
      console.log(p)
       this.proprietaireService.addProprietaire(p).subscribe((res) => {
        console.log(res)
        if(res.code === 200){
          Swal.fire({
            icon: 'success',
            title: 'Enregistrement effectuer',
            showConfirmButton: true
          }).then(() => this.proprietaireListComponentEditor.getProprietaires())
        }else{
          Swal.fire({
            icon: 'error',
            title: res.description,
            showConfirmButton: true
          }).then(() => this.proprietaireListComponentEditor.getProprietaires())
        }
       
       },
       (error:any) =>  Swal.fire({
        icon: 'error',
        title: 'Enregistrement Echoué',
        showConfirmButton: true
      }))
    }else{
      this.proprietaireService.updateProprietaire(p).subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Modification effectuer',
          showConfirmButton: true
        }).then(() => this.proprietaireListComponentEditor.getProprietaires())
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
    this.proprietaireForm.enable()
    this.isButtonActive = true;
  }


}
