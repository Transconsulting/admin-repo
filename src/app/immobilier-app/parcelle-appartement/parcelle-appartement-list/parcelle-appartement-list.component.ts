import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Habitation } from 'src/models/Habitation';
import { Proprietaire } from 'src/models/proprietaire';
import { HabitationService } from 'src/services/habitation.service';
import { ProprietaireService } from 'src/services/proprietaire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parcelle-appartement-list',
  templateUrl: './parcelle-appartement-list.component.html',
  styleUrls: ['./parcelle-appartement-list.component.scss']
})
export class ParcelleAppartementListComponent implements OnInit {

  habitationList:Habitation[];
  sorthabitationList:Habitation[] = [];
  filterhabitation:Habitation[] = [];
  cfilterhabitation:Habitation[] = [];
  page = 1;
  pageSize = 2;

  isHide:boolean;

  editAddLabel: string = 'Edit';
  habitationDetail: Habitation |null=null;
  totalLengthOfCollection: number=0;
  


  constructor(private modalService: NgbModal, private habitationService:HabitationService,) {
    this.filterhabitation = this.habitationList;
    this.cfilterhabitation = this.habitationList;
    this.sorthabitationList = this.habitationList;
    //this.totalLengthOfCollection = this.cfilterhabitation.length;
  }

  parentProperty = new Habitation();

  ngOnInit() { 
    this.getHabitations();
  }

  getHabitations(){
    this.habitationService.getHabitations().subscribe( res => {
      console.log(res)
      this.cfilterhabitation = res
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
    this.filterhabitation = this.filter(val);
  }

  filter(v: string) {
    return this.habitationList.filter(
      x => x.numero?.toLowerCase().indexOf(v.toLowerCase()) !== -1);     
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
    this.cfilterhabitation = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterhabitation.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfilterhabitation.filter(
        (x) =>
          x.numero?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
      );
    } else {
      this.getHabitations();
      return this.cfilterhabitation;
    }
   
  }





  openModal(targetModal:NgbModal, habitation:any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size:"xl"
    });

    if (habitation == null) {
      this.editAddLabel = 'Enregistrement'
      this.isHide = true;
      this.parentProperty = new Habitation()
    }

    if(habitation != null){
      this.habitationDetail = habitation;
      this.editAddLabel = 'Modification'
      this.isHide = false;
      this.parentProperty = habitation;
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
        this.habitationService.deleteHabitation(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getHabitations()
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
