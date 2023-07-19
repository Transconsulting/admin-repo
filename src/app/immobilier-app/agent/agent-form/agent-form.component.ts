import { Component, Host, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/models/agent';
import { Commune } from 'src/models/Commune';
import { Profession } from 'src/models/proffession';
import { Quartier } from 'src/models/Quartier';
import { Ville } from 'src/models/ville';
import { AgentService } from 'src/services/agent.service';
import { CommuneService } from 'src/services/commune.service';
import { DomaineService } from 'src/services/domaine.service';
import { ProffessionService } from 'src/services/proffession.service';
import { QuartierService } from 'src/services/quartier.service';
import { VilleService } from 'src/services/ville.service';
import Swal from 'sweetalert2';

import { AgentListComponent } from '../agent-list/agent-list.component';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent implements OnInit {

  @Input() childProperty:Agent;
  agent = new Agent()
  agentForm: UntypedFormGroup = Object.create(null);
  agentListComponentEditor:AgentListComponent
  isButtonActive: boolean;

  dataProfession:Profession[];
  dataVille: Ville[];
  dataCommune: Commune[];
  dataQuartier: Quartier[];
  dataType: [string];
  submitted: boolean;

  constructor(private fb:UntypedFormBuilder,@Host() agentListComponentEditor:AgentListComponent,
  private agentService:AgentService,private villeService:VilleService,
  private communeService:CommuneService,private quartierService:QuartierService,
  private professionService:ProffessionService){ 
    this.agentListComponentEditor = agentListComponentEditor;
  }
  edit:boolean;
  ngOnInit(): void {
    this.agentForm = this.fb.group({
      nom: ['', Validators.required],
      prenoms: ['', Validators.required],
      tel: ['', Validators.required],
      uuidProfession: ['', Validators.required],
      type: ['', Validators.required],
      ville: ['', Validators.required],
      commune: ['', Validators.required],
      uuidQuartier: ['', Validators.required],
    })
    console.log("uuid :"+this.childProperty.uuid)
    this.initialisation()
    this.getVilles();
    this.comboType();
    this.getProfession();
  }

  comboType(){this.agentService.typeAgent().subscribe(res => this.dataType = res); }
  getProfession(){this.professionService.getProfessions().subscribe(res => this.dataProfession = res);}
  getVilles(){this.villeService.getVilles().subscribe(res => this.dataVille = res);}
  getCommunes(ville:any){
   this.dataVille.find( res => {
     if(res.libelle === ville){
       this.communeService.getCommunesByVille(res.uuid).subscribe(res =>{
        this.dataCommune = res
       })}})
  }
  getQuartier(commune:String){
    this.dataCommune.find(res => {
      if(res.libelle === commune){
         this.quartierService.getQuartierByCommune(res.uuid).subscribe(res => {
          this.dataQuartier = res
         })}
    })  
  }
  initialisation(){
    if(this.childProperty.uuid !==undefined){
    // this.agentForm.value.ville = this.childProperty.ville
    this.villeService.getVilles().subscribe(res => {
      res.find(res => {
        if(res.libelle === this.childProperty.ville){
          this.communeService.getCommunesByVille(res.uuid).subscribe(res =>{
           this.dataCommune = res
          
          })}
      })
    })
   this.communeService.getCommunes().subscribe(res => {
    res.find(res => {
      if(res.libelle === this.childProperty.commune){
        this.quartierService.getQuartierByCommune(res.uuid).subscribe(res => {
          this.dataQuartier = res
          this.agentForm.value.uuidQuartier = res[0].uuid;
           console.log(res[0].uuid)
           this.agentForm.patchValue({
            uuidQuartier:res[0].uuid,
          });
         })
      }
    })
   })
    this.displayAgent(this.childProperty)
    this.edit = true;
    this.agentForm.disable();
     
    } 
    if(this.childProperty.uuid ===undefined){
      this.displayAgent(this.agent)
      this.edit = false;
    }
  }


  displayAgent(agent:Agent){
    this.agent = agent;
    this.agentForm.patchValue({
      nom: agent.nom,
      prenoms: agent.prenoms,
      tel: agent.tel,
      uuidProfession: agent.uuidProfession,
      type: agent.type,
      ville:agent.ville,
      commune:agent.commune,
      uuidQuartier:agent.uuidQuartier,
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
      profession: { required: 'Profession est obligatoire.' },
      type: { required: 'Type est obligatoire.' },
    }
  
    formsErrors = {
    }

  onSubmit() {
    this.submitted = true;
    console.log(this.edit+""+this.agentForm.value)
    const p = { ...this.agent, ...this.agentForm.value };
    if(this.agentForm.valid){
      if(!this.edit){
        console.log("AddAgent :...")
         this.agentService.addAgent(p).subscribe((res) => {
          if (res.code === 200){
            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() => {
              this.agentListComponentEditor.getAgents()
              this.agentListComponentEditor.closeBtnClick()
              this.agentForm.reset()
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() => {
              this.agentListComponentEditor.getAgents()
              this.agentListComponentEditor.closeBtnClick()
              this.agentForm.reset()
            })
          }

         },
         (error:any) =>  Swal.fire({
          icon: 'error',
          title: 'Enregistrement Echoué',
          showConfirmButton: true
        }))
      }else{
        console.log("UpdateAgent :...")
        this.agentService.updateAgent(p).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Modification effectuer',
            showConfirmButton: true
          }).then(() => {
            this.agentListComponentEditor.getAgents()
            this.agentListComponentEditor.closeBtnClick()
            this.agentForm.reset()
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
    this.agentForm.enable()
    this.isButtonActive = true;
  }


}
