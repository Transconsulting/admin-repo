import { Reponse } from "./reponse";

export class Contrat extends Reponse{
    uuid: string;
    montant: number;
    payer: number;
    reglePaiement: string;
    uuidClient: string;
    client:string;
    telephoneClient:string;
    typeContrat:string;
}