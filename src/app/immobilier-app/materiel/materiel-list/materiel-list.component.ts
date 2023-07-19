import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Materiel } from 'src/models/materiel';
import { MaterielService } from 'src/services/materiel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materiel-list',
  templateUrl: './materiel-list.component.html',
  styleUrls: ['./materiel-list.component.scss']
})
export class MaterielListComponent implements OnInit {

  materielList:Materiel[];
  sortmaterielList:Materiel[] = [];
  filtermateriel:Materiel[] = [];
  cfiltermateriel:Materiel[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  materielDetail: Materiel |null=null;
  totalLengthOfCollection: number=0;



  
  


  constructor(private modalService: NgbModal, private materielService:MaterielService) {
    this.filtermateriel = this.materielList;
    this.cfiltermateriel = this.materielList;
    this.sortmaterielList = this.materielList;
    //this.totalLengthOfCollection = this.cfilterville.length;
  }

  parentProperty = new Materiel();

  ngOnInit() {
    
    this.getMateriels()
  }

  getMateriels(){
    this.materielService.getMateriels().subscribe( res => {
      console.log(res)
      this.cfiltermateriel = res
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
    this.filtermateriel = this.filter(val);
  }

  filter(v: string) {
    return this.materielList.filter(
      x => x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||x.photo1?.toLowerCase().indexOf(v.toLowerCase()) !== -1
     || x.photo2?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.photo3?.toLowerCase().indexOf(v.toLowerCase()) !== -1) ;
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
    this.cfiltermateriel = this.cfilter(val);
    this.totalLengthOfCollection = this.cfiltermateriel.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfiltermateriel.filter(
        (x) =>
          x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
        || x.photo1?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.photo2?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
         || x.photo3?.toLowerCase().indexOf(v.toLowerCase()) !== -1  
      );
    } else {
      this.getMateriels();
      return this.cfiltermateriel;
    }
   
  }





  openModal(targetModal:NgbModal, mateirel:any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (mateirel == null) {
      this.editAddLabel = 'Enregistrement'
      this.parentProperty = new Materiel()
    }

    if(this.materielDetail != null){
      this.materielDetail = mateirel;
      this.editAddLabel = 'Modification'
      this.parentProperty = mateirel;
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
        this.materielService.deleteMateriel(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getMateriels()
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
