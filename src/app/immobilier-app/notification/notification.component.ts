import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from 'src/models/agent';
import { AgentService } from 'src/services/agent.service';
import { NotificationService } from 'src/services/notification.service';
import Swal from 'sweetalert2';
import { Subscription, timer } from 'rxjs';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  agentList:Agent[];
  sortagentList:Agent[] = [];
  filteragent:Agent[] = [];
  cfilterAgent:Agent[] = [];
  page = 1;
  pageSize = 2;

subscription : Subscription;

  editAddLabel: string = 'Edit';
  villeDetail: Agent |null=null;
  totalLengthOfCollection: number=0;
  notification: Object;
  


  constructor(private notificationService: NotificationService,private modalService: NgbModal, private agentService:AgentService) {
    this.filteragent = this.agentList;
    this.cfilterAgent = this.agentList;
    this.sortagentList = this.agentList;
    //this.totalLengthOfCollection = this.cfilterAgent.length;
  }

  parentProperty = new Agent();

  ngOnInit() {
    
    // this.getAgents()
    this.subscription= timer(0 , 3000).subscribe(res =>{
      this.getAllNotification();
    });


  }

  getAgents(){
    this.agentService.getAgents().subscribe( res => {
      this.cfilterAgent = res
      this.totalLengthOfCollection = res.length
    });
  }

  getNotification(){
    this.notificationService.getInteresse()
      .subscribe(data=>{
        this.notification= data
        console.log(this.notification)
      })
  }

  getAllNotification(){
    this.notificationService.getAllNotification()
      .subscribe(data=>{
        this.notification= data
      })
  }

 
  //Searching..........
  _searchTerm: string='';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filteragent = this.filter(val);
  }

  filter(v: string) {
    if(v !=""){
      return this.cfilterAgent.filter (x => x.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.prenoms?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
      || x.tel?.toLowerCase().indexOf(v.toLowerCase()) !== -1   
      || x.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1  
      || x.type?.toLowerCase().indexOf(v.toLowerCase()) !== -1);//|| x.profession?.toLowerCase().indexOf(v.toLowerCase()) !== -1
    }
    // return this.agentList.filter(
    //   x => x.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.prenoms?.toLowerCase().indexOf(v.toLowerCase()) !== -1 
    //   || x.tel?.toLowerCase().indexOf(v.toLowerCase()) !== -1    
    //   || x.type?.toLowerCase().indexOf(v.toLowerCase()) !== -1 );//|| x.profession?.toLowerCase().indexOf(v.toLowerCase()) !== -1
      
  }

  
  //complete example................
  cpage = 1;
  cpageSize = 20;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfilterAgent = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterAgent.length;
  }

  cfilter(v: string) {
    if (v != "") {
      return this.cfilterAgent.filter(
        (x) =>
          x.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.prenoms?.toLowerCase().indexOf(v.toLowerCase()) !== -1
      );
    } else {
      this.getAgents();
      return this.cfilterAgent;
    }
   
  }





  openModal(targetModal:NgbModal, agent:any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size:"lg"
    });

    if (agent == null) {
      this.editAddLabel = 'Enregistrement'
      this.parentProperty = new Agent()
    }

    if(agent != null){
      this.villeDetail = agent;
      this.editAddLabel = 'Modification'
      this.parentProperty = agent;
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
        this.agentService.deleteAgent(uuid).then(()=>  {
          swalWithBootstrapButtons.fire(
            'Suppression !',
            'Suppression effectuer avec success.',
            'success'
          )
          this.getAgents()
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
