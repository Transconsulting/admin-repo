import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profession } from 'src/models/proffession';
import { ProffessionService } from 'src/services/proffession.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proffession-list',
  templateUrl: './proffession-list.component.html',
  styleUrls: ['./proffession-list.component.scss']
})
export class ProffessionListComponent implements OnInit {

  professionList:Profession[];
  sortprofessionList:Profession[] = [];
  filterprofession:Profession[] = [];
  cfilterprofession:Profession[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  professionDetail: Profession |null=null;
  totalLengthOfCollection: number=0;



  
  


  constructor(private modalService: NgbModal, private proffessionService:ProffessionService) {
    this.filterprofession = this.professionList;
    this.cfilterprofession = this.professionList;
    this.sortprofessionList = this.professionList;
    //this.totalLengthOfCollection = this.cfilterville.length;
  }

  parentProperty = new Profession();

  ngOnInit() {
    
    this.getProfessions()
  }

  getProfessions(){
    this.proffessionService.getProfessions().subscribe( res => {
      console.log(res)
      this.cfilterprofession = res
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
    this.filterprofession = this.filter(val);
  }

  filter(v: string) {
    return this.professionList.filter(
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
    this.cfilterprofession = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterprofession.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfilterprofession.filter(
        (x) =>
          x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 

          
      );
    } else {
      this.getProfessions();
      return this.cfilterprofession;
    }
   
  }





  openModal(targetModal:NgbModal, profession:any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (profession == null) {
      this.editAddLabel = 'Enregistrement'
      this.parentProperty = new Profession()
    }

    if(profession != null){
      this.professionDetail = profession;
      this.editAddLabel = 'Modification'
      this.parentProperty = profession;
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
        this.proffessionService.deleteProfession(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getProfessions()
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
