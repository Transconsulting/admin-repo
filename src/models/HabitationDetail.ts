import { Reponse } from "./reponse";

export class HabitationDetail extends Reponse{
    uuid:string;
    libelle:string;
    size:string;
    statut:string;
    surface:string;
    uuidParcelleAppartemnt:string; 
    numeroParcelleAppartement:string;
}