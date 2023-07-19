import { Reponse } from "./reponse";

export class HabitationImage extends Reponse{
    code: number;
    titre:string;
    description:string;
    statut:string;
    uuid:string;
    uuidParcelleAppartement:string;
    uuidImage:string;
    libelleImage: string
}