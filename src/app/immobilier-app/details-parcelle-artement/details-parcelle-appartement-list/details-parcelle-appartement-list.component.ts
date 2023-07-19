import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Domaine } from 'src/models/domaine';
import { Habitation } from 'src/models/Habitation';
import { HabitationDetail } from 'src/models/HabitationDetail';
import { Proprietaire } from 'src/models/proprietaire';
import { DomaineService } from 'src/services/domaine.service';
import { HabitationDetailService } from 'src/services/habitation-detail.service';
import { ProprietaireService } from 'src/services/proprietaire.service';
import Swal from 'sweetalert2';
import { ParcelleAppartementListComponent } from '../../parcelle-appartement/parcelle-appartement-list/parcelle-appartement-list.component';

@Component({
  selector: 'app-details-parcelle-appartement-list',
  templateUrl: './details-parcelle-appartement-list.component.html',
  styleUrls: ['./details-parcelle-appartement-list.component.scss']
})
export class DetailsParcelleAppartementListComponent implements OnInit {

  @Input() childProperty:Habitation;
  habitationDetail = new HabitationDetail();
  habitationDetailList:HabitationDetail[];
  sortHabitationDetailList:HabitationDetail[] = [];
  filteragent:HabitationDetail[] = [];
  cfilterHabitationDetail:HabitationDetail[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  habitationDetailDetail: HabitationDetail |null=null;
  totalLengthOfCollection: number=0;
  parentProperty = new Habitation();
  habitationDetailProperty = new HabitationDetail();

  habitationDetailForm: UntypedFormGroup = Object.create(null);
  habitationDetailListComponentEditor:DetailsParcelleAppartementListComponent
  isButtonActive: boolean;
  dataProprietaire:Proprietaire[];
  dataDomaine: Domaine[];
  // dataQuartier: Quartier[];
  // dataAgent: Agent[];
  edit: any;
  isDisplay:boolean;
  submitted: boolean;
  dataSatatus: any;


  constructor(private modalService: NgbModal, private habitationDetailService:HabitationDetailService,private fb:UntypedFormBuilder, 
    private proprietaireService:ProprietaireService,private domaineService:DomaineService) {
    this.filteragent = this.habitationDetailList;
    this.cfilterHabitationDetail = this.habitationDetailList;
    this.sortHabitationDetailList = this.habitationDetailList;
    //this.totalLengthOfCollection = this.cfilterHabitationDetail.length;
  }

 

  ngOnInit() {
    this.parentProperty = this.childProperty;
    this.getHabitationDetails();
    this.habitationDetailForm = this.fb.group({
      libelle: ['', Validators.required],
      size: ['', Validators.required],
      surface: ['', Validators.required],
      uuidParcelleAppartemnt: [''],
    })
    this.initialisation(this.habitationDetail)
    this.getProprietaire()
   // this.getAgents()
    this.isDisplay = false;

  }

  getHabitationDetails(){
    this.habitationDetailService.getHabitationDetaille(this.childProperty.uuid).subscribe( res => {
      console.log(res)
      this.cfilterHabitationDetail = res
      this.totalLengthOfCollection = res.length
    });
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
    return this.habitationDetailList.filter(
      x => x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1  );
      
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
    this.cfilterHabitationDetail = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterHabitationDetail.length;
  }

  cfilter(v: string) {
    return this.habitationDetailList.filter (x => x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
  }


  // openModal(targetModal:NgbModal, agent:any) {
  //   this.modalService.open(targetModal, {
  //     centered: true,
  //     backdrop: 'static',
  //     size:"lg"
  //   });

  //   if (agent == null) {
  //     this.editAddLabel = 'Enregistrement'
  //     //this.parentProperty = new HabitationDetail()
  //   }

  //   if(agent != null){
  //     this.villeDetail = agent;
  //     this.editAddLabel = 'Modification'
  //     this.parentProperty = agent;
  //   }

  // }

remplirFormulaire(habitationDetail:HabitationDetail){
  this.habitationDetailProperty = habitationDetail;
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
        this.habitationDetailService.deleteHabitationDetail(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getHabitationDetails()
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



  getProprietaire(){
    this.proprietaireService.getProprietaires().subscribe(res => this.dataProprietaire = res)
  }



  initialisation(habitationDetail:HabitationDetail){
    if(this.habitationDetail.uuid !==undefined){
      this.onDisplay()
      this.displayHabitationDetail(habitationDetail)
      this.edit = true;
     this.habitationDetailForm.disable();
    }
     if(this.habitationDetail.uuid === undefined){
          this.displayHabitationDetail(habitationDetail)
          this.edit = false;
         }
  }


  displayHabitationDetail(habitationDetail:HabitationDetail){
    this.habitationDetail = habitationDetail;
    console.log(HabitationDetail)
    this.habitationDetailForm.patchValue({
      libelle: habitationDetail.libelle,
      size: habitationDetail.size,
      surface: habitationDetail.surface, 
      uuidParcelleAppartemnt:this.childProperty.uuid, 
    });

    console.log(this.habitationDetailForm.value)
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
      size: { required: 'size est obligatoire.' },
      surface: { required: 'surface est obligatoire.' },
      proprietaire: { required: 'proprietaire est obligatoire.' },
      uuidHabitation: { required: 'habitation est obligatoire.' },

    }
  
    formsErrors = {
    }

  onSubmit() {
    this.submitted = true;
    console.log(this.habitationDetailForm.value)
    const p = { ...this.habitationDetail, ...this.habitationDetailForm.value };
    p.uuidParcelleAppartemnt = this.childProperty.uuid;
    console.log(this.childProperty.uuid)
    if(this.habitationDetailForm.valid){
      if(!this.edit){
      
        this.habitationDetailService.addHabitationDetail(p).subscribe((res) => {
          if (res.code === 200){
            Swal.fire({
              icon: 'success',
              title: 'Enregistrement effectuer',
              showConfirmButton: true
            }).then(() => {
              this.getHabitationDetails();
              this.habitationDetailForm.reset();
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: res.description,
              showConfirmButton: true
            }).then(() => {
              this.getHabitationDetails();
              this.habitationDetailForm.reset();
            })
          }
         
        },
        (error:any) =>  Swal.fire({
         icon: 'error',
         title: 'Enregistrement Echoué',
         showConfirmButton: true
       }))
     }else{
       this.habitationDetailService.updateHabitationDetail(p).subscribe((res) => {
         Swal.fire({
           icon: 'success',
           title: 'Modification effectuer',
           showConfirmButton: true
         }).then(() =>{
          this.getHabitationDetails();
          this.habitationDetailForm.reset();
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
    this.habitationDetailForm.enable()
    this.isButtonActive = true;
  }

  onDisplay(){
    this.isDisplay = true;
    //this.isDisplay = !this.isDisplay
  }
}
