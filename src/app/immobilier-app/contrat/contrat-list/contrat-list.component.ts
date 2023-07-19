import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Contrat } from 'src/models/contrat';
import { ContratService } from 'src/services/contrat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contrat-list',
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.scss']
})
export class ContratListComponent implements OnInit {

  contratList:Contrat[];
  sortcontratList:Contrat[] = [];
  filtercontrat:Contrat[] = [];
  cfilterContrat:Contrat[] = [];
  page = 1;
  pageSize = 2;

  isDisplay:boolean
  editAddLabel: string = 'Edit';
  contrat: Contrat |null=null;
  totalLengthOfCollection: number=0;

  isHide:boolean;
  


  constructor(private modalService: NgbModal, private contratService:ContratService) {
    this.filtercontrat = this.contratList;
    this.cfilterContrat = this.contratList;
    this.sortcontratList = this.contratList;
    //this.totalLengthOfCollection = this.cfilterAgent.length;
  }

  parentProperty = new Contrat();

  ngOnInit() {
    this.getContrats()
  }

  currentJustify = 'start';

  active=1;
  activev= "top";

  activeKeep=1;

  activeSelected=1;
  disabled = true;

  
  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  activeDynamic=1;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.activeSelected = 1;
    }
  }


  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }
  
  getContrats(){
    this.contratService.getContrats().subscribe( res => {
    //  console.log(res)
      this.cfilterContrat = res
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
    // this.filtercontrat = this.filter(val);
  }

  // filter(v: string) {
  //   return this.contratList.filter(
  //     x => x.montant?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.payer?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
  //     || x.reglementPaiement?.toLowerCase().indexOf(v.toLowerCase()) !== -1   || x.statut?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
  //      );
      
  // }

  
  //complete example................
  cpage = 1;
  cpageSize = 4;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    // this.cfilterContrat = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterContrat.length;
  }

  // cfilter(v: string) {
  //   return this.contratList.filter (x => x.montant?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.payer?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
  //   || x.reglementPaiement?.toLowerCase().indexOf(v.toLowerCase()) !== -1   || x.statut?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
  //   );
  // }





  openModal(targetModal:NgbModal, contrat:any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size:"lg"
    });

    if (contrat == null) {
      this.editAddLabel = 'Enregistrement'
      this.isHide =true;
      this.parentProperty = new Contrat()
    }

    if(contrat != null){
      this.contrat = contrat;
      this.editAddLabel = 'Modification'
      this.isHide = false;
      this.parentProperty = contrat;
     
    }

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
        this.contratService.deleteContrat(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getContrats()
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

  

}
