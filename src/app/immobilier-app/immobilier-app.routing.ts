import { Routes } from "@angular/router";
import { AgentListComponent } from "./agent/agent-list/agent-list.component";
import { ClientListComponent } from "./client/client-list/client-list.component";
import { ContratListComponent } from "./contrat/contrat-list/contrat-list.component";
import { ParcelleAppartementListComponent } from "./parcelle-appartement/parcelle-appartement-list/parcelle-appartement-list.component";
import { ProprietaireListComponent } from "./proprietaire/proprietaire-list/proprietaire-list.component";
import { ReferenceComponent } from "./reference/reference.component";
import { MaterielListComponent } from "./materiel/materiel-list/materiel-list.component"
import { NotificationComponent } from "./notification/notification.component";

export const ImmobilierRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'agent',
          component: AgentListComponent,
          data: {
            title: 'Gestion Agents',
            urls: [
              { title: 'Acceuil', url: '/dashboard' },
              { title: 'Acceuil' }
            ]
          }
        },
        {
            path: 'proprietaire',
            component: ProprietaireListComponent,
            data: {
              title: 'Gestion Proprietaires',
              urls: [
                { title: 'Acceuil', url: '/dashboard' },
                { title: 'Acceuil' }
              ]
            }
          },
          {
            path: 'parcelle-appartement',
            component: ParcelleAppartementListComponent,
            data: {
              title: 'Gestion Habitation',
              urls: [
                { title: 'Acceuil', url: '/dashboard' },
                { title: 'Acceuil' }
              ]
            }
          },

          {
            path: 'notification',
            component: NotificationComponent,
            data: {
              title: 'Gestion Notification',
              urls: [
                { title: 'Acceuil', url: '/dashboard' },
                { title: 'Acceuil' }
              ]
            }
          },

          {
            path: 'client',
            component: ClientListComponent,
            data: {
              title: 'Gestion Clients',
              urls: [
                { title: 'Acceuil', url: '/dashboard' },
                { title: 'Acceuil' }
              ]
            }
          },
          {
            path: 'contrat',
            component: ContratListComponent,
            data: {
              title: 'Gestion Contrat',
              urls: [
                { title: 'Acceuil', url: '/dashboard' },
                { title: 'Acceuil' }
              ]
            }
          },
          {
            path: 'reference',
            component: ReferenceComponent,
            data: {
              title: 'Gestion References',
              urls: [
                { title: 'Acceuil', url: '/dashboard' },
                { title: 'Acceuil' }
              ]
            }
          },
          {
            path: 'materiel',
            component: MaterielListComponent,
            data: {
              title: 'Gestion Materiels',
              urls: [
                { title: 'Acceuil', url: '/dashboard' },
                { title: 'Acceuil' }
              ]
            }
          },
        
      ]
    }
  ];
  