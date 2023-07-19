import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Commune } from 'src/models/Commune';
import { CommuneService } from 'src/services/commune.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commune-list',
  templateUrl: './commune-list.component.html',
  styleUrls: ['./commune-list.component.scss']
})
export class CommuneListComponent implements OnInit {

 communeList:Commune[];
  sortCommuneList:Commune[] = [];
  filtreCommune:Commune[] = [];
  cfiltreCommuneList:Commune[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  villeDetail: Commune |null=null;
  totalLengthOfCollection: number=0;



  
  


  constructor(private modalService: NgbModal, private communeService:CommuneService) {
    this.filtreCommune = this.communeList;
    this.cfiltreCommuneList = this.communeList;
    this.sortCommuneList = this.communeList;
    //this.totalLengthOfCollection = this.cfiltreCommuneList.length;
  }

  parentProperty = new Commune();

  ngOnInit() {
    
    this.getCommunes()
  }

  getCommunes(){
    this.communeService.getCommunes().subscribe( res => {
      console.log(res)
      this.cfiltreCommuneList = res
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
    this.filtreCommune = this.filter(val);
  }

  filter(v: string) {
    return this.communeList.filter(x => x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
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
    this.cfiltreCommuneList = this.cfilter(val);
    this.totalLengthOfCollection = this.cfiltreCommuneList.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfiltreCommuneList.filter(
        (x) =>
          x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
          || x.ville?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
          
      );
    } else {
      this.getCommunes();
      return this.cfiltreCommuneList;
    }
   
  }





  openModal(targetModal:NgbModal, commune:any) {
    
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (commune == null) {
      this.editAddLabel = 'Enregistrement'
      this.parentProperty = new Commune()
    }

    if (commune != null) {
      this.villeDetail = commune;
      this.editAddLabel = 'Modification'
      this.parentProperty = commune;
     
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
        this.communeService.deleteCommune(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getCommunes()
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
