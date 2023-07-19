import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/models/client';
import { ClientService } from 'src/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clientList:Client[];
  sortclientList:Client[] = [];
  filterclient:Client[] = [];
  cfilterClient:Client[] = [];
  page = 1;
  pageSize = 2;

  editAddLabel: string = 'Edit';
  contratDetail: Client |null=null;
  totalLengthOfCollection: number=0;
  


  constructor(private modalService: NgbModal, private clientService:ClientService) {
    this.filterclient = this.clientList;
    this.cfilterClient = this.clientList;
    this.sortclientList = this.clientList;
    //this.totalLengthOfCollection = this.cfilterAgent.length;
  }

  parentProperty = new Client();

  ngOnInit() {
    
    this.getClients()
  }

  getClients(){
    this.clientService.getClients().subscribe( res => {
      console.log(res)
      this.cfilterClient = res
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
    this.filterclient = this.filter(val);
  }


  filter(v: string) {
    return this.clientList.filter(
      x => x.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.prenom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
      || x.telephone?.toLowerCase().indexOf(v.toLowerCase()) !== -1   || x.etatCivil?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
      || x.nombreEnfant?.toLowerCase().indexOf(v.toLowerCase()) !== -1 );
      
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
    this.cfilterClient = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterClient.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfilterClient.filter(
        (x) =>
          x.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.telephone?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.prenom?.toLowerCase().indexOf(v.toLowerCase()) !== -1
      );
    } else {
      this.getClients();
      return this.cfilterClient;
    }
   
  }





  openModal(targetModal:NgbModal, client:any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size:"lg"
    });

    if (client == null) {
      this.editAddLabel = 'Enregistrement'
      this.parentProperty = new Client()
    }

    if(client != null){
      this.contratDetail = client;
      this.editAddLabel = 'Modification'
      this.parentProperty = client;
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
        this.clientService.deleteClient(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getClients()
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
