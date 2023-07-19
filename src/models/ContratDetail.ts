import { Reponse } from "./reponse";

export class ContratDetail extends Reponse{
    uuid:string;
    debut:Date;
    fin:Date;
    prixLoyer:number;
    caution:number;
    avance:string;
    fraisAgence:number;
    uuidContrat:String;
    uuidParcelApp:String;
    numeroParcelApp:string;
    uuidproprietaire:string;
    uuidDomaine:string;
    domaine:string;
}