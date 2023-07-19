import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Client } from 'src/models/client';
import { Contrat } from 'src/models/contrat';
import { ClientService } from 'src/services/client.service';
import { ContratService } from 'src/services/contrat.service';
import Swal from 'sweetalert2';
import { ContratListComponent } from '../contrat-list/contrat-list.component';

@Component({
  selector: 'app-contrat-form',
  templateUrl: './contrat-form.component.html',
  styleUrls: ['./contrat-form.component.scss']
})
export class ContratFormComponent implements OnInit {

  @Input() childProperty:Contrat;
  contrat = new Contrat()
  contratForm: UntypedFormGroup = Object.create(null);
  contratListComponentEditor:ContratListComponent

  isButtonActive: boolean;
  dataTypeContrat:[string];
   dataClient: Client[];
  clientListComponentEditor: ContratListComponent;
  submitted: boolean;

  constructor(private fb:UntypedFormBuilder, 
    @Host() contratListComponentEditor:ContratListComponent,
 private contratService:ContratService,private clientService:ClientService){ 
    this.contratListComponentEditor = contratListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.contratForm = this.fb.group({
      reglePaiement: ['', Validators.required],
      typeContrat:  ['', Validators.required],
      uuidClient: ['', Validators.required],
    })
    console.log("uuid :...."+this.childProperty.uuid);
    this.initialisation();
    this.getClients();
    this. comobTypeContrat();
  }


  getClients(){
    this.clientService.getClients().subscribe(res => this.dataClient = res)
  }

  comobTypeContrat(){
    this.contratService.getTypeContrat().subscribe(res => this.dataTypeContrat = res);
  }

  initialisation(){
    if(this.childProperty.uuid !==undefined){
      this.displayContrat(this.childProperty)
      this.edit = true;
      this.contratForm.disable();
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayContrat(this.contrat)
      this.edit = false;
    }
  }
  // contrat(contrat: any) {
  //   throw new Error('Method not implemented.');
  // }


  displayContrat(contrat:Contrat){
    this.contrat = contrat;
    this.contratForm.patchValue({
      reglePaiement: contrat.reglePaiement,
      client: contrat.client,
      typeContrat: contrat.typeContrat,
      uuidClient: contrat.uuidClient     
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
      montant: { required: 'montant est obligatoire.' },
      payer: { required: 'payer est obligatoire.' },
      reglePaiement: { required: 'reglePaiement est obligatoire.' },


    }
  
    formsErrors = {
    }

  onSubmit() {
  this.submitted = true

    const p = { ...this.contrat, ...this.contratForm.value };
    if(this.contratForm.valid){
      if(!this.edit){
        console.log(p)
         this.contratService.addContrat(p).subscribe((res) => {
          if (res.code === 200){
            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() => {
              this.contratListComponentEditor.getContrats();
              this.contratForm.reset()
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() => this.contratListComponentEditor.getContrats())
          }
          
          
         },
         (error:any) =>  Swal.fire({
          icon: 'error',
          title: 'Enregistrement Echoué',
          showConfirmButton: true
        }))
      }else{
        this.contratService.updateContrat(p).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Modification effectuer',
            showConfirmButton: true
          }).then(() => {
            this.contratListComponentEditor.getContrats();
            this.contratForm.reset()
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
    this.contratForm.enable()
    this.isButtonActive = true;
  }

  

}
