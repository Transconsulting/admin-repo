import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'src/app/table/ngtable/ngtable';
import { SortEvent } from 'src/app/table/ngtable/ngtable.component';
import { TableService } from 'src/app/table/ngtable/ngtable.service';
import { Ville } from 'src/models/ville';
import { VilleService } from 'src/services/ville.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ville-list',
  templateUrl: './ville-list.component.html',
  styleUrls: ['./ville-list.component.scss']
})
export class VilleListComponent implements OnInit {

  villeList:Ville[];
  sortvilleList:Ville[] = [];
  filterville:Ville[] = [];
  cfilterville:Ville[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  villeDetail: Ville |null=null;
  totalLengthOfCollection: number=0;



  
  


  constructor(private modalService: NgbModal, private villeService:VilleService) {
    this.filterville = this.villeList;
    this.cfilterville = this.villeList;
    this.sortvilleList = this.villeList;
    //this.totalLengthOfCollection = this.cfilterville.length;
  }

  parentProperty = new Ville();

  ngOnInit() {
    
    this.getVilles()
  }

  getVilles(){
    this.villeService.getVilles().subscribe( res => {
      console.log(res)
      this.cfilterville = res
      this.totalLengthOfCollection = res.length
    });
  }

  // onSort({ column, direction }: SortEvent) {
  //   this.headers.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });

   // sorting ville

    // if (direction === '') {
    //   this.sortvilleList = this.villeList;
    //   this.cfilterville= this.villeList;
    // } else {
    //   // // //this.sortvilleList = [...this.villeList].sort((a, b) => {
    //   // // //  const res = compare(a[column] ,b?[column]);
    //   // // //  return direction === 'asc' ? res : -res;
    //   // // //});
    //   // // //this.cfilterville = [...this.villeList].sort((a, b) => {
    //   // // //  const res = compare(a[column], b[column]);
    //   // // //  return direction === 'asc' ? res : -res;
    //   }  // // //);

    // }
  // // //}


  //Searching..........
  _searchTerm: string='';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterville = this.filter(val);
  }

  filter(v: string) {
    return this.villeList.filter(
      x => x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
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
    this.cfilterville = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterville.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfilterville.filter(
        (x) =>
          x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 

          
      );
    } else {
      this.getVilles();
      return this.cfilterville;
    }
   
  }





  openModal(targetModal:NgbModal, ville:any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (ville == null) {
      this.editAddLabel = 'Enregistrement'
      this.parentProperty = new Ville()
    }

    if(ville != null){
      this.villeDetail = ville;
      this.editAddLabel = 'Modification'
      this.parentProperty = ville;
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
        this.villeService.deleteVille(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getVilles()
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
