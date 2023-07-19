import { Component, Host, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from 'src/models/agent';
import { Commune } from 'src/models/Commune';
import { Domaine } from 'src/models/domaine';
import { Proprietaire } from 'src/models/proprietaire';
import { Quartier } from 'src/models/Quartier';
import { Ville } from 'src/models/ville';
import { AgentService } from 'src/services/agent.service';
import { CommuneService } from 'src/services/commune.service';
import { DomaineService } from 'src/services/domaine.service';
import { ProprietaireService } from 'src/services/proprietaire.service';
import { QuartierService } from 'src/services/quartier.service';
import { VilleService } from 'src/services/ville.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-domaine-list',
  templateUrl: './domaine-list.component.html',
  styleUrls: ['./domaine-list.component.scss']
})
export class DomaineListComponent implements OnInit {
  @Input() childProperty:Proprietaire;
  domaine = new Domaine();
  domaineList:Domaine[];
  sortDomaineList:Domaine[] = [];
  filteragent:Domaine[] = [];
  cfilterDomaine:Domaine[] = [];
  isBtnAdd:boolean = false;
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  villeDetail: Domaine |null=null;
  totalLengthOfCollection: number=0;
  parentProperty = new Proprietaire();
  domaineProperty = new Domaine();

  domaineForm: UntypedFormGroup = Object.create(null);
  isButtonActive: boolean;

  dataStatut: [string];
  dataType : [string];
  dataTypeAnonce : [string];
  dataVille:Ville[];
  dataCommunes: Commune[];
  dataQuartier: Quartier[];
  dataAgent: Agent[];
  dataProprietaire: Proprietaire[];

  edit: any;
  isDisplay:boolean = false;
  submitted: boolean;


  constructor(private modalService: NgbModal, private domaineService:DomaineService,
    private fb:UntypedFormBuilder, private villeService:VilleService,
    private communeService:CommuneService,private quartierService:QuartierService,
    private agentService:AgentService,private proprietaireService:ProprietaireService) {
    this.filteragent = this.domaineList;
    this.cfilterDomaine = this.domaineList;
    this.sortDomaineList = this.domaineList;
    //this.totalLengthOfCollection = this.cfilterDomaine.length;
  }

 

  ngOnInit() {
    this.parentProperty = this.childProperty;
    this.getDomaines()
    this.domaineForm = this.fb.group({
      libelle: ['', Validators.required],
      longitude: [''],
      lattitude: [''],
      type: ['', Validators.required],
      ville: ['', Validators.required],
      commune: ['', Validators.required],
      uuidQuartier: ['', Validators.required],
      statutDomaine: ['', Validators.required],
      typeAnonce: ['', Validators.required],
      uuidAgent: ['', Validators.required],
      uuidProprietaire: [''],
    })
    //this.initialisation(this.domaine)
    this.getVilles()
    this.getAgents()
    this.comboStatut();
    this.comboType();
    this.comboTypeAnonce();
    this.getProprietaire()
  }

  getDomaines(){
    this.domaineService.getDomaines(this.childProperty.uuid).subscribe( res => {
      console.log(res)
      this.cfilterDomaine = res
      this.totalLengthOfCollection = res.length
    });
  }

 
/** Consomation des enum back*/
  comboStatut(){
    this.domaineService.statutAnonceDomaine().subscribe(res => this.dataStatut = res);
  }
  comboType(){
    this.domaineService.typeDomaine().subscribe(res => this.dataType = res);
  }
  comboTypeAnonce(){
    this.domaineService.typeAnonce().subscribe(res => this.dataTypeAnonce = res);
  }
  //Searching..........
  _searchTerm: string='';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filteragent = this.filter(val);
  }

  filter(v: string) {
    return this.domaineList.filter(
      x => x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
      || x.type?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
      || x.statutDomaine?.toLowerCase().indexOf(v.toLowerCase()) !== -1
      || x.typeAnonce?.toLowerCase().indexOf(v.toLowerCase()) !== -1
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
    this.cfilterDomaine = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterDomaine.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfilterDomaine.filter(
        (x) =>
          x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
        || x.type?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.typeAnonce?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
         || x.ville?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.statutDomaine?.toLowerCase().indexOf(v.toLowerCase()) !== -1  
      );
    } else {
      this.getDomaines();
      return this.cfilterDomaine;
    }
   
  }


remplirFormulaire(domaine:Domaine){
  this.domaineProperty = domaine;
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
        this.domaineService.deleteDomaine(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getDomaines()
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

  initialisation(domaine:Domaine){
    if(this.domaine.uuid !== undefined){
      this.isDisplay = true;
      this.edit = true;  
      this.domaineForm.disable();
      this.villeService.getVilles().subscribe(res => {
        res.find(res => {
          if(res.libelle === this.childProperty.ville){
            this.communeService.getCommunesByVille(res.uuid).subscribe(res =>{
             this.dataCommunes = res
            
            })}
        })
      })
     this.communeService.getCommunes().subscribe(res => {
      res.find(res => {
        if(res.libelle === domaine.commune){
          this.quartierService.getQuartierByCommune(res.uuid).subscribe(res => {
            this.dataQuartier = res
           })
        }
      })
     })
      
      this.displayDomaine(domaine)
     
    
     
    } else{
      this.edit = false;
      this.displayDomaine(domaine)
    }
   
   
  }

  displayDomaine(domaine:Domaine){
    this.domaine = domaine;
    //console.log(domaine)
    this.domaineForm.patchValue({
      libelle: domaine.libelle,
      type: domaine.type,
      statutDomaine: domaine.statutDomaine,
      uuidQuartier: domaine.uuidQuartier,
      ville: this.domaine.ville,
      commune: this.domaine.commune,
      typeAnonce: domaine.typeAnonce,
      uuidAgent: domaine.uuidAgent,
      longitude: domaine.longitude,
      lattitude: domaine.lattitude,
    });
  }


   /**La selection des donné normalisée */
   getAgents(){
    this.agentService.getAgents().subscribe(res => this.dataAgent = res)
  }

  getProprietaire(){
    this.proprietaireService.getProprietaires().subscribe(res => this.dataProprietaire = res)
  }

  getVilles(){
    this.villeService.getVilles().subscribe(res => this.dataVille = res);
  }

  getCommunes(ville:any){
   this.dataVille.find( res => {
     if(res.libelle === ville){
       this.communeService.getCommunesByVille(res.uuid).subscribe(res =>{
        this.dataCommunes = res
       })
     }
  })
  //this.communeService.getCommunes().subscribe(res => this.dataCommunes = res);
  }

  getQuartier(commune:String){
    this.dataCommunes.find(res => {
      if(res.libelle === commune){
        console.log("qqqq"+res.libelle+" "+res.uuid )
         this.quartierService.getQuartierByCommune(res.uuid).subscribe(res => {
          this.dataQuartier = res
          console.log("qqqq"+this.dataQuartier)
         })
      }
    })
     
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
      libelle: { required: 'Libelle est obligatoire.' },
      longitude: { required: 'Longitude est obligatoire.' },
      lattitude: { required: 'Laltitude est obligatoire.' },
      type: { required: 'type habitation est obligatoire.' },
      typeAnonce: { required: 'typeAnonce est obligatoire.' },
      uuidQuartier: { required: 'Quartier est obligatoire.' },
      statut: { required: 'Statut est obligatoire.' },
      uuidAgent: { required: 'Agent est obligatoire.' },
      uuidProprietaire: { required: 'Proprietaire est obligatoire.' },

    }
  
    formsErrors = {
    }

  onSubmit() {
    this.submitted =true;
    console.log("DomaineForm....."+this.domaineForm.value)
    const p = { ...this.domaine, ...this.domaineForm.value };
    p.uuidProprietaire = this.childProperty.uuid;
    console.log(this.childProperty.uuid)
    if(this.domaineForm.valid){
      if(!this.edit){
      
        this.domaineService.addDomaine(p).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'Enregistrement effectuer',
           showConfirmButton: true
         }).then(() => {
          this.getDomaines() 
          this.isDisplay = false
        })
        },
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Enregistrement Echoué',
         showConfirmButton: true
       }))
     }else{
       this.domaineService.updateDomaine(p).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'Modification effectuer',
           showConfirmButton: true
         }).then(() => {
          this.getDomaines() 
          this.isDisplay = false
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
    this.domaineForm.enable()
    this.isButtonActive = true;
  }

  onDisplay(){
    this.isDisplay = true;
   console.log(this.isDisplay)
  }

}
