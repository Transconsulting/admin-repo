import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contrat } from 'src/models/contrat';
import { ContratDetail } from 'src/models/ContratDetail';
import { Domaine } from 'src/models/domaine';
import { Habitation } from 'src/models/Habitation';
import { Proprietaire } from 'src/models/proprietaire';
import { ContratDetailService } from 'src/services/contrat-detail.service';
import { ContratService } from 'src/services/contrat.service';
import { DomaineService } from 'src/services/domaine.service';
import { HabitationService } from 'src/services/habitation.service';
import { ProprietaireService } from 'src/services/proprietaire.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-contrat-detail',
  templateUrl: './contrat-detail.component.html',
  styleUrls: ['./contrat-detail.component.scss']
})
export class ContratDetailComponent implements OnInit {

  @Input() childProperty:Contrat;
  habitation = new Habitation();
  contratDetail = new ContratDetail();
  contratDetailList:ContratDetail[];
  sortContratDetailList:ContratDetail[] = [];
  filtercontrat:ContratDetail[] = [];
  cfilterContratDetail:ContratDetail[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  contratDetailDetail: ContratDetail |null=null;
  totalLengthOfCollection: number=0;
  parentProperty = new Contrat();
  contratDetailProperty = new ContratDetail();

  contratDetailForm: UntypedFormGroup = Object.create(null);
  contratDetailListComponentEditor:ContratDetailComponent
  isButtonActive: boolean;
  dataProprietaire:Proprietaire[];
  dataStatut: Domaine[];
  dataHabitationDomaine: any;
  dataContrat: Contrat[];
  edit: any;
  isDisplay:boolean;
  isHidden:boolean;

  

  constructor(private modalService: NgbModal, private contratDetailService:ContratDetailService,
    private fb:UntypedFormBuilder, private proprietaireService:ProprietaireService,
    private domaineService:DomaineService,private habitationService:HabitationService,
    private contratService:ContratService) {
    this.filtercontrat = this.contratDetailList;
    this.cfilterContratDetail = this.contratDetailList;
    this.sortContratDetailList = this.contratDetailList;
    //this.totalLengthOfCollection = this.cfilterContratDetail.length;
  }

 

  ngOnInit() {
    this.parentProperty = this.childProperty;
    this.getContratDetails()
    this.contratDetailForm = this.fb.group({
      uuidproprietaire : [''],
      domaine: [''],
      uuidContrat: [''],
      uuidParcelApp: ['', Validators.required],
      debut: ['', Validators.required],
      fin: ['', Validators.required],
      prixLoyer: ['', Validators.required],
      caution: ['', Validators.required],
      avance: ['', Validators.required],
      agence: ['', Validators.required],
      avance_string: ['', Validators.required],
    })
    this.initialisation(this.contratDetail)
    this.getProprietaire();
    this.isDisplay = false;
  }

  getContratDetails(){
    this.contratDetailService.getContratDetailleByContrat(this.childProperty.uuid).subscribe( res => {
      console.log(this.childProperty.uuid)
      this.cfilterContratDetail = res
      this.totalLengthOfCollection = res.length
    });
  }
/**Liste de tous les proprietaire de domaine */
  getProprietaire(){
    this.proprietaireService.getProprietaires().subscribe(res => this.dataProprietaire = res)
  }
 
  getDomaineByStatutAndProprietaire(proprietaire:any){
    console.log("uuidProprietaire ://"+proprietaire)
   
    this.domaineService.getDomaineByStatut(proprietaire).subscribe(res =>{
      this.dataStatut = res
      console.log(res)
    } )
  
   }
  /**Liste de toutes les Habotation disponible(Statut ANONNCE) par domaine */
  getHabitationByStatut(domaine:String){
   
    this.dataStatut.find(res => {
      console.log(this.dataStatut)
      if(res.libelle === domaine){
        console.log("qqqq"+res.libelle+" "+res.uuid )
         this.domaineService.getHabitationByStatutAndDomaine(res.uuid).subscribe(res => {
          this.dataHabitationDomaine = res
          console.log("qqqq"+this.dataHabitationDomaine)
         })
      }
    })
    this.onDisplayInput(domaine)
  }
 
  //Searching..........
  _searchTerm: string='';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filtercontrat = this.filter(val);
  }

  filter(v: string) {
    return this.contratDetailList.filter(
      x => x.avance?.toLowerCase().indexOf(v.toLowerCase()) !== -1
      ||  x.avance?.toLowerCase().indexOf(v.toLowerCase()) !== -1  );
      
  }

  
  //complete example................
  cpage = 1;
  cpageSize = 4;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfilterContratDetail = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterContratDetail.length;
  }

  cfilter(v: string) {
    return this.contratDetailList.filter (x => 
      x => x.avance?.toLowerCase().indexOf(v.toLowerCase()) !== -1
      ||  x.avance?.toLowerCase().indexOf(v.toLowerCase()) !== -1  );
  }

  remplirFormulaire(contratDetail:ContratDetail){
    this.contratDetailProperty = contratDetail;
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
        this.contratDetailService.deleteContratDetail(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getContratDetails()
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

  initialisation(contratDetail:ContratDetail){
    if(this.contratDetail.uuid !==undefined){
      this.onDisplay()
      this.displayContratDetail(contratDetail)
      this.domaineService.getDomaineByStatut(contratDetail.uuidproprietaire).subscribe(res =>{
        this.dataStatut = res
        this.dataStatut.find(res => {
          if(res.libelle === contratDetail.domaine){
            console.log("qqqq"+res.libelle+" "+res.uuid )
             this.domaineService.getHabitationByStatutAndDomaine(res.uuid).subscribe(res => {
              this.dataHabitationDomaine = res
              console.log("qqqq"+this.dataHabitationDomaine)
             })
          }
        })
      } )
      this.edit = true;
    this.contratDetailForm.disable();
    }
     if(this.contratDetail.uuid === undefined){
           //this.onDisplay()
          this.displayContratDetail(contratDetail)
          this.edit = false;
         }
  }


  displayContratDetail(contratDetail:ContratDetail){
    this.contratDetail = contratDetail;
    console.log(ContratDetail)
    this.contratDetailForm.patchValue({
      dateDebut: contratDetail.debut,
      dateFin: contratDetail.fin,
      prixLoyer: contratDetail.prixLoyer,
      caution: contratDetail.caution,
      avance: contratDetail.avance,
      agence: contratDetail.fraisAgence,
      habitation:contratDetail.numeroParcelApp,
      uuidContrat:this.childProperty.uuid,
      uuidproprietaire:contratDetail.uuidproprietaire,
      domaine:contratDetail.domaine,
      uuidParcelApp:contratDetail.uuidParcelApp
       
    });

   
 
    console.log("Form ...",this.contratDetailForm.value)
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
    console.log("FormCntratDetai :",this.contratDetailForm.value)
    const p = { ...this.contratDetail, ...this.contratDetailForm.value };
    p.uuidContrat = this.childProperty.uuid;
    p.prixLoyer = this.habitation.prix;
    p.caution = this.habitation.caution;
    p.fraisAgence = this.habitation.fraisAgence;
    console.log("uuidContrat:..."+this.childProperty.uuid)
    if(!this.edit){
      console.log(p)
       this.contratDetailService.addContratDetail(p).subscribe((res) => {
        console.log(res)
        if (res.code === 200){
          Swal.fire({
            icon: 'success',
            title: 'Enregistrement effectuer',
            showConfirmButton: true
          }).then(() => this.getContratDetails())
        }else{
          if(res.code !== 0){
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() => this.getContratDetails())
          }else{
            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() =>{
              this.getContratDetails()
              this.isDisplay = false;
            })
          }
        }
        
       },
       (error:any) =>  Swal.fire({
        icon: 'error',
        title: 'Enregistrement Echoué',
        showConfirmButton: true
      }))
    }else{
      this.contratDetailService.updateContratDetail(p).subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Modification effectuer',
          showConfirmButton: true
        }).then(() => {
          this.getContratDetails();
          this.isDisplay = false;
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
    this.contratDetailForm.enable()
    this.isButtonActive = true;
  }
 
  onDisplay(){
    this.isDisplay = true;
    //this.isDisplay = !this.isDisplay
  }

  displayInfoHabitation(uuid_habitation:string){
    console.log(uuid_habitation)
      this.habitationService.getHabitation(uuid_habitation).subscribe(res => {
        this.contratDetailForm.patchValue({
          caution: res.caution,
          avance_string: res.avance,
          agence: res.fraisAgence, 
          prixLoyer: res.prix, 
        });
        this.habitation = res;
      })
      
      this.contratDetailForm.controls.caution.disable();
      this.contratDetailForm.controls.avance_string.disable();
      this.contratDetailForm.controls.agence.disable();
      this.contratDetailForm.controls.prixLoyer.disable();
  }

  onDisplayInput(domaine: any){
    this.dataStatut.find((res)=>{
      if (res.libelle===domaine){
        if (res.type==="PARCELLE"){
          this.isHidden=true
        }else{
          console.log(res.type)
          this.isHidden=false
        }
        
      }
    })

    console.log("bintou")
    
  }
  
  }


