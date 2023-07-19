import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentFormComponent } from './agent/agent-form/agent-form.component';
import { AgentListComponent } from './agent/agent-list/agent-list.component';
import { ProprietaireFormComponent } from './proprietaire/proprietaire-form/proprietaire-form.component';
import { ProprietaireListComponent } from './proprietaire/proprietaire-list/proprietaire-list.component';
import { DomaineListComponent } from './domaine/domaine-list/domaine-list.component';
import { ParcelleAppartementFormComponent } from './parcelle-appartement/parcelle-appartement-form/parcelle-appartement-form.component';
import { ParcelleAppartementListComponent } from './parcelle-appartement/parcelle-appartement-list/parcelle-appartement-list.component';
import { DetailsParcelleAppartementFormComponent } from './details-parcelle-artement/details-parcelle-appartement-form/details-parcelle-appartement-form.component';
import { DetailsParcelleAppartementListComponent } from './details-parcelle-artement/details-parcelle-appartement-list/details-parcelle-appartement-list.component';
import { ContratFormComponent } from './contrat/contrat-form/contrat-form.component';
import { ContratListComponent } from './contrat/contrat-list/contrat-list.component';
import { ClientFormComponent } from './client/client-form/client-form.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { PaiementFormComponent } from './paiement/paiement-form/paiement-form.component';
import { PaiementListComponent } from './paiement/paiement-list/paiement-list.component';
import { ReferenceComponent } from './reference/reference.component';
import { VilleFormComponent } from './ville/ville-form/ville-form.component';
import { VilleListComponent } from './ville/ville-list/ville-list.component';
import { CommuneFormComponent } from './commune/commune-form/commune-form.component';
import { CommuneListComponent } from './commune/commune-list/commune-list.component';
import { QuartierFormComponent } from './quartier/quartier-form/quartier-form.component';
import { QuartierListComponent } from './quartier/quartier-list/quartier-list.component';
import { ModePaiementFormComponent } from './mode-paiement/mode-paiement-form/mode-paiement-form.component';
import { ModePaiementListComponent } from './mode-paiement/mode-paiement-list/mode-paiement-list.component';
import { ImmobilierRoutes } from './immobilier-app.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { FeatherModule } from 'angular-feather';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContratDetailComponent } from './contrat-detail/contrat-detail/contrat-detail.component';
import { HabitationImageComponent } from './habitation-image/habitation-image/habitation-image.component';
import { ProffessionListComponent } from './proffession/proffession-list/proffession-list.component';
import { ProffessionFormComponent } from './proffession/proffession-form/proffession-form.component';
import { DomaineDetailsComponent } from './domaine/domaine-details/domaine-details.component';
import { MaterielFormComponent } from './materiel/materiel-form/materiel-form.component';
import { MaterielListComponent } from './materiel/materiel-list/materiel-list.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    AgentFormComponent,
    AgentListComponent,
    ProprietaireFormComponent,
    ProprietaireListComponent,
    DomaineListComponent,
    ParcelleAppartementFormComponent,
    ParcelleAppartementListComponent,
    DetailsParcelleAppartementFormComponent,
    DetailsParcelleAppartementListComponent,
    ContratFormComponent,
    ContratListComponent,
    ClientFormComponent,
    ClientListComponent,
    PaiementFormComponent,
    PaiementListComponent,
    ReferenceComponent,
    VilleFormComponent,
    VilleListComponent,
    CommuneFormComponent,
    CommuneListComponent,
    QuartierFormComponent,
    QuartierListComponent,
    ModePaiementFormComponent,
    ModePaiementListComponent,
    ContratDetailComponent,
    HabitationImageComponent,
    ProffessionListComponent,
    ProffessionFormComponent,
    DomaineDetailsComponent,
    MaterielFormComponent,
    MaterielListComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ImmobilierRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NotifierModule,
    FeatherModule,
    NgxDatatableModule

  ]
})
export class ImmobilierAppModule { }
