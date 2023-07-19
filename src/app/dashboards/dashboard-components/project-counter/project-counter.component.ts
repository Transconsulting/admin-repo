import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from 'src/services/statistique.service';
@Component({
  selector: 'app-project-counter',
  templateUrl: './project-counter.component.html'
})
export class ProjectCounterComponent implements OnInit {
  agentTotal: any;
  clientTotal: any;
  proprietaireTotal: any;


  constructor(private statistiqueService:StatistiqueService) {}

  ngOnInit(): void {
     this.statistiqueService.getAgentTotal().then(res => this.agentTotal = res)
     this.statistiqueService.getClientTotal().subscribe(res => this.clientTotal = res)
     this.statistiqueService.getProprietaireTotal().subscribe(res => this.proprietaireTotal = res)
     console.log(this.agentTotal)
  }
}
