import { Component, Host, OnInit } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Proprietaire } from 'src/models/proprietaire';
import { ProprietaireService } from 'src/services/proprietaire.service';
import Swal from 'sweetalert2';
import { DomaineListComponent } from '../../domaine/domaine-list/domaine-list.component';
import { ModePaiementListComponent } from '../../mode-paiement/mode-paiement-list/mode-paiement-list.component';

@Component({
  selector: 'app-proprietaire-list',
  templateUrl: './proprietaire-list.component.html',
  styleUrls: ['./proprietaire-list.component.scss']
})
export class ProprietaireListComponent implements OnInit {

  isHide:boolean;

  proprietraireList:Proprietaire[];
  sortProprietaireList:Proprietaire[] = [];
  filterProprietaire:Proprietaire[] = [];
  cfilterProprietaire:Proprietaire[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  villeDetail: Proprietaire |null=null;
  totalLengthOfCollection: number=0;
  domaineListComponentEditor:DomaineListComponent;


  constructor(private modalService: NgbModal, private proprietaireService:ProprietaireService) {
    this.filterProprietaire = this.proprietraireList;
    this.cfilterProprietaire = this.proprietraireList;
    this.sortProprietaireList = this.proprietraireList;
    //this.totalLengthOfCollection = this.cfilterProprietaire.length;
    //this.domaineListComponentEditor = domaineListComponentEditor;
  }

  parentProperty = new Proprietaire();

  ngOnInit() {
    
    this.getProprietaires()
  }

  getProprietaires(){
    this.proprietaireService.getProprietaires().subscribe( res => {
      console.log(res)
      this.cfilterProprietaire = res
      this.totalLengthOfCollection = res.length
    });
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
 
  //Searching..........
  _searchTerm: string='';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterProprietaire = this.filter(val);
  }

  filter(v: string) {
    return this.proprietraireList.filter(
      x => x.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.prenoms?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
      || x.tel?.toLowerCase().indexOf(v.toLowerCase()) !== -1   || x.ville?.toLowerCase().indexOf(v.toLowerCase()) !== -1);
      
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
    this.cfilterProprietaire = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterProprietaire.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfilterProprietaire.filter(
        (x) =>
          x.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
        || x.prenoms?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.tel?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
         || x.ville?.toLowerCase().indexOf(v.toLowerCase()) !== -1  
      );
    } else {
      this.getProprietaires();
      return this.cfilterProprietaire;
    }
   
  }






  openModal(targetModal:NgbModal, proprietraire:any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size:"xl"
    });

    if (proprietraire == null) {
      this.editAddLabel = 'Enregistrement'
      this.isHide =true;
      this.parentProperty = new Proprietaire()
    }

    if(proprietraire != null){
      this.villeDetail = proprietraire;
      this.editAddLabel = 'Modification'
      this.isHide = false;
      this.parentProperty = proprietraire;
    }

  }

  openModalDomaine(targetModal:NgbModal, proprietraire:any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size:"xl"
    });

    this.parentProperty = proprietraire;

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
        this.proprietaireService.deleteProprietaire(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getProprietaires()
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
