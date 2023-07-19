import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Quartier } from 'src/models/Quartier';
import { QuartierService } from 'src/services/quartier.service';
import { VilleService } from 'src/services/ville.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quartier-list',
  templateUrl: './quartier-list.component.html',
  styleUrls: ['./quartier-list.component.scss']
})
export class QuartierListComponent implements OnInit {

  quartierList:Quartier[];
  sortQuartierList:Quartier[] = [];
  filtreQuartier:Quartier[] = [];
  cfiltreQuartierList:Quartier[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  communeDetail: Quartier |null=null;
  totalLengthOfCollection: number=0;



  
  


  constructor(private modalService: NgbModal, private quartierService:QuartierService) {
    this.filtreQuartier = this.quartierList;
    this.cfiltreQuartierList = this.quartierList;
    this.sortQuartierList = this.quartierList;
    //this.totalLengthOfCollection = this.cfiltreCommuneList.length;
  }

  parentProperty = new Quartier();

  ngOnInit() {
    
    this.getQuartiers()
  }

  getQuartiers(){
    this.quartierService.getQuartiers().subscribe( res => {
      console.log(res)
      this.cfiltreQuartierList = res
      this.totalLengthOfCollection = res.length
    });
  }

  // onSort({ column, direction }: SortEvent) {
  //   this.headers.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });

   // sorting commune

    // if (direction === '') {
    //   this.sortCommuneList = this.communeList;
    //   this.cfiltreCommuneList= this.communeList;
    // } else {
    //   // // //this.sortCommuneList = [...this.communeList].sort((a, b) => {
    //   // // //  const res = compare(a[column] ,b?[column]);
    //   // // //  return direction === 'asc' ? res : -res;
    //   // // //});
    //   // // //this.cfiltreCommuneList = [...this.communeList].sort((a, b) => {
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
    this.filtreQuartier = this.filter(val);
  }

  filter(v: string) {
    return this.quartierList.filter(x => x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
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
    this.cfiltreQuartierList = this.cfilter(val);
    this.totalLengthOfCollection = this.cfiltreQuartierList.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfiltreQuartierList.filter(
        (x) =>
          x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
          || x.commune?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
          || x.ville?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
          
      );
    } else {
      this.getQuartiers();
      return this.cfiltreQuartierList;
    }
   
  }





  openModal(targetModal:NgbModal, quartier:any) {
    
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (quartier == null) {
      this.editAddLabel = 'Enregistrement'
      this.parentProperty = new Quartier()
    }

    if (quartier != null) {
      this.communeDetail = quartier;
      this.editAddLabel = 'Modification'
      this.parentProperty = quartier;
     
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
        this.quartierService.deleteQuartier(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getQuartiers()
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
