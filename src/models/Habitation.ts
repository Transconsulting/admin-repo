import { Reponse } from "./reponse";

export class Habitation extends Reponse{
    uuid:string;
    numero:string;
    prix:number;
    avance:string;
    caution:number;
    fraisAgence:number
    uuidDomaine:string;
    domaine:string;
    statutDomaine:string;
    uuidProprietaire:string;
}