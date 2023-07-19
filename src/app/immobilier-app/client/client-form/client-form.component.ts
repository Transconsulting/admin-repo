import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Client } from 'src/models/client';
import { Contrat } from 'src/models/contrat';
import { ClientService } from 'src/services/client.service';
import { ContratService } from 'src/services/contrat.service';
import Swal from 'sweetalert2';
import { ClientListComponent } from '../client-list/client-list.component';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  @Input() childProperty:Client;
  Client = new Client()
  clientForm: UntypedFormGroup = Object.create(null);
  cleintListComponentEditor:ClientListComponent
  isButtonActive: boolean;
   dataContrat: Contrat[];
  clientListComponentEditor: ClientListComponent;
  submitted: boolean;
  constructor(private fb:UntypedFormBuilder, 
    @Host() clientListComponentEditor:ClientListComponent,
 private clientService:ClientService,private contratService:ContratService){ 
    this.clientListComponentEditor = clientListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      etatCivil: ['', Validators.required],
      nombreEnfant: ['', Validators.required],
    })
    console.log(this.childProperty.uuid)
    this.initialisation()
    this.getContrats()
  }


  getContrats(){
    this.contratService.getContrats().subscribe(res => this.dataContrat = res)
  }


  initialisation(){
    if(this.childProperty.uuid !==undefined){
      this.displayClient(this.childProperty)
      this.edit = true;
      this.clientForm.disable();
    } 
    
    if(this.childProperty.uuid ===undefined){
      this.displayClient(this.Client)
      this.edit = false;
    }
  }
  client(Client: any) {
    throw new Error('Method not implemented.');
  }


  displayClient(client:Client){
    this.Client = client;
    this.clientForm.patchValue({
      nom: client.nom,
      prenom: client.prenom,
      telephone: client.telephone,
      etatCivil: client.etatCivil,
      nombreEnfant: client.nombreEnfant,
      contrat: client.contrat,
     
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
      prenom: { required: 'Prenoms est obligatoire.' },
      telephone: { required: 'Telephone est obligatoire.' },
      etatCivil: { required: 'EtatCivil est obligatoire.' },
      nombreEnfant: { required: 'NombreEnfant est obligatoire.' },
    }
  
    formsErrors = {
    }

  onSubmit() {
   this.submitted = true;
    const p = { ...this.client, ...this.clientForm.value };
    console.log(this.clientForm.valid)
   if(this.clientForm.valid){
    if(!this.edit){
      console.log(p)
       this.clientService.addClient(p).subscribe((res) => {
        console.log(res)
        if(res.code === 200){
          Swal.fire({
            icon: 'success',
            title: 'Enregistrement effectuer',
            showConfirmButton: true
          }).then(() =>{
            this.clientListComponentEditor.getClients();
            this.clientListComponentEditor.closeBtnClick();
            this.clientForm.reset()
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: res.description,
            showConfirmButton: true
          }).then(() =>{
            this.clientListComponentEditor.getClients();
            this.clientListComponentEditor.closeBtnClick();
            this.clientForm.reset()
          })
        }
        
       },
       (error:any) =>  Swal.fire({
        icon: 'error',
        title: 'Enregistrement Echoué',
        showConfirmButton: true
      }))
    }else{
      p.uuid = this.childProperty.uuid
      this.clientService.updateClient(p).subscribe((res) => {
        console.log(p)
        Swal.fire({
          icon: 'success',
          title: 'Modification effectuer',
          showConfirmButton: true
        }).then(() => {
          this.clientListComponentEditor.getClients()
          this.clientListComponentEditor.closeBtnClick();
          this.clientForm.reset();
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
    this.clientForm.enable()
    this.isButtonActive = true;
  }


}
