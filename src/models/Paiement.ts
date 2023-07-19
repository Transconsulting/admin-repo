import { Reponse } from "./reponse";

export class Paiement extends Reponse{
 code:number;
 titre:string;
 description:string;
 statut:string;
 uuid:string;
 montant:number;
 datePaiement:string;
 reference:string;
 uuidContrat:string;
 uuidModePaiement:string;
}