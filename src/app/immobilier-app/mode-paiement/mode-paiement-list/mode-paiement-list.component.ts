import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModePayement } from 'src/models/ModePayement';
import { ModePayementService } from 'src/services/mode-payement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mode-paiement-list',
  templateUrl: './mode-paiement-list.component.html',
  styleUrls: ['./mode-paiement-list.component.scss']
})
export class ModePaiementListComponent implements OnInit {

  modepayementList:ModePayement[];
  courtModepayementList:ModePayement[];
  filtreModepayement:ModePayement[];
  cfiltreModepayement:ModePayement[];
  page=1;
  pageSize=2;
  
  editAjoutLabelle:String = "Edit";
  modepayementDetail : ModePayement | null=null;
  longueurCollection: number=0;

  constructor(private modalService:NgbModal,
    private modepayementSerice:ModePayementService) { 
      this.filtreModepayement = this.modepayementList;
      this.courtModepayementList = this.modepayementList;
      this.cfiltreModepayement = this.modepayementList;
      //this.longueurCollection = this.cfiltreModepayement.length;
    }

    parentPropriete = new ModePayement();

  ngOnInit(): void {
    this.getModepayements()
  }

  getModepayements(){
    this.modepayementSerice.getModepayements().subscribe( res => {
        console.log(res);
        this.cfiltreModepayement = res;
        this.longueurCollection = res.length;
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


//        Methode de recherche
  _rechercherTerm:String = '';
  get rechercheTerm(): String{
      return this._rechercherTerm;
  }

  set rechercheTerm(rech:String){
    this._rechercherTerm = rech;
    this.filtreModepayement = this.filtre(rech);
  }

  filtre(val:String){
    return this.filtreModepayement.filter(
      x => x.libelle?.toLowerCase().indexOf(val.toLowerCase()) !== -1);
  }

  //...........

  cpage = 1;
  cpageSize = 10;
  _cRechercheTerm: String = '';
  get cRechercheTerm():String{
    return this._cRechercheTerm;
  }

  set cRechercheTerm(cRech:String){
    this._cRechercheTerm = cRech;
    this.cfiltreModepayement = this.cFiltre(cRech);
    this.longueurCollection = this.cfiltreModepayement.length;
  }

  cFiltre(v:String){
    return this.cfiltreModepayement.filter(
      x => x.libelle?.toLocaleLowerCase().indexOf(v.toLocaleLowerCase()) !== -1);
  }

  
  cfilter(v: string) {
    if (v != "") {
      return this.cfiltreModepayement.filter(
        (x) =>
          x.libelle?.toLowerCase().indexOf(v.toLowerCase()) !== -1 

          
      );
    } else {
      this.getModepayements();
      return this.cfiltreModepayement;
    }
   
  }
  

  openModal(targetModal:NgbModal, modepayement:any){
    this.modalService.open(targetModal, {
        centered:true,
        backdrop: 'static'
    })
    if(modepayement == null){
          this.editAjoutLabelle = 'Enregistrement'
          this.parentPropriete = new ModePayement();
    }
    if(modepayement != null){
      this.modepayementDetail = modepayement;
      this.editAjoutLabelle = 'Modification'
      this.parentPropriete = modepayement;
    }
  }

  fermerBtnClick(){
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  supprimer(uuid: string): void {
   
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
        this.modepayementSerice.deleteModepayement(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getModepayements()
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
 