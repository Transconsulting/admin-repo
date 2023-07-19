import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrat } from 'src/models/contrat';
import { Paiement } from 'src/models/Paiement';
import { ContratService } from 'src/services/contrat.service';
import { ModePayementService } from 'src/services/mode-payement.service';
import { PaiementService } from 'src/services/paiement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paiement-list',
  templateUrl: './paiement-list.component.html',
  styleUrls: ['./paiement-list.component.scss']
})
export class PaiementListComponent implements OnInit {

  @Input() childProperty:Contrat;
  paiement = new Paiement();
  paiementList:Paiement[];
  sortPaiementList:Paiement[] = [];
  filterPaiement:Paiement[] = [];
  cfilterPaiement:Paiement[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  contratDetailDetail: Paiement |null=null;
  totalLengthOfCollection: number=0;
  parentProperty = new Contrat();
  contratDetailProperty = new Paiement();

  paiementForm: UntypedFormGroup = Object.create(null);
  isButtonActive: boolean;
 
  dataHabitationDomaine: any;
  dataContrat: Contrat[];
  edit: any;
  isDisplay:boolean;
  modePaiementData: any;


  constructor(private modalService: NgbModal, private paiementService:PaiementService,
    private fb:UntypedFormBuilder,
    private contratService:ContratService,private modePaiementService:ModePayementService) {
    this.filterPaiement = this.paiementList;
    this.cfilterPaiement = this.paiementList;
    this.sortPaiementList = this.paiementList;
    //this.totalLengthOfCollection = this.cfilterPaiement.length;
  }

 

  ngOnInit() {
    this.parentProperty = this.childProperty;
    this.getPaiements()
    this.paiementForm = this.fb.group({
      montant: ['', Validators.required],
      datePaiement: ['', Validators.required],
      reference: ['', Validators.required],
      uuidContrat: ['', Validators.required],
      uuidModePaiement: ['', Validators.required],
    })
    this.initialisation(this.paiement)
    this.isDisplay = false;
    this.getModePaiement() 
  }

  getPaiements(){
    this.paiementService.getPaiementleByContrat(this.childProperty.uuid).subscribe( res => {
      console.log(this.childProperty.uuid)
      this.cfilterPaiement = res
      this.totalLengthOfCollection = res.length
    });
  }

  getModePaiement(){
    this.modePaiementService.getModepayements().subscribe(res => this.modePaiementData = res)
  }
  

 
  //Searching..........
  _searchTerm: string='';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterPaiement = this.filter(val);
  }

  filter(v: string) {
    return this.paiementList.filter(
      x => x.reference?.toLowerCase().indexOf(v.toLowerCase()) !== -1
    );
      
  }

  
  //complete example................
  cpage = 1;
  cpageSize = 10;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfilterPaiement = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterPaiement.length;
  }

  cfilter(v: string) {
    return this.paiementList.filter (x => 
      x => x.avance?.toLowerCase().indexOf(v.toLowerCase()) !== -1
      ||  x.avance?.toLowerCase().indexOf(v.toLowerCase()) !== -1  );
  }

  remplirFormulaire(paiement:Paiement){
    this.contratDetailProperty = paiement;
  // this.initialisation();
  }



  closeBtnClick() {
    this.modalService.dismissAll()
    this.ngOnInit();
  }

  delete(uuid: string): void {
   
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous supprimez?',
      text: "Impposible de restaurer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.paiementService.deletePaiement(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getPaiements()
        })
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Suppression',
          'Suppression annuler',
          'error'
        )
      }
    })
  }

  initialisation(paiement:Paiement){
    if(this.paiement.uuid !==undefined){
      this.onDisplay()
      this.displayPaiement(paiement)
      this.edit = true;
    this.paiementForm.disable();
    }
     if(this.paiement.uuid === undefined){
           //this.onDisplay()
          this.displayPaiement(paiement)
          this.edit = false;
         }
  }


  displayPaiement(paiement:Paiement){
    this.paiement = paiement;
    console.log(Paiement)
    this.paiementForm.patchValue({
      montant: paiement.montant,
      datePaiement: paiement.datePaiement,
      reference: paiement.reference,
      uuidContrat: this.childProperty.uuid,
      uuidModePaiement: paiement.uuidModePaiement,
       
    });

    console.log("Form ...",this.paiementForm.value)
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
      dateDebut: { required: 'Date debut est obligatoire.' },
      dateFin: { required: 'date Fin est obligatoire.' },
      prixLoyer: { required: 'prix Loyer est obligatoire.' },
      caution: { required: 'caution est obligatoire.' },
      avance: { required: 'caution est obligatoire.' },
      agence: { required: 'caution est obligatoire.' },
      uuidHabitation: { required: 'habitation est obligatoire.' },
    }
  
    formsErrors = {
    }

  onSubmit() {
    console.log("FormCntratDetai :",this.paiementForm.value)
    const p = { ...this.paiement, ...this.paiementForm.value };
    p.uuidContrat = this.childProperty.uuid;
    console.log("uuidContrat:..."+this.childProperty.uuid)
    if(!this.edit){
      
       this.paiementService.addPaiement(p).subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistrement effectuer',
          showConfirmButton: true
        }).then(() => {
          this.getPaiements();
          this.paiementForm.reset()
        })
       },
       (error:any) =>  Swal.fire({
        icon: 'error',
        title: 'Enregistrement Echoué',
        showConfirmButton: true
      }))
    }else{
      this.paiementService.updatePaiement(p).subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Modification effectuer',
          showConfirmButton: true
        }).then(() =>{
          this.getPaiements();
          this.paiementForm.reset()
        })
       },
       (error:any) =>  Swal.fire({
        icon: 'error',
        title: 'Modification Echoué',
        showConfirmButton: true
      }))
     
    }
      
  }

  onActive(){
    this.paiementForm.enable()
    this.isButtonActive = true;
  }

  onDisplay(){
    this.isDisplay = true;
    //this.isDisplay = !this.isDisplay
  }

}
