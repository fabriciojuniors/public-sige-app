import { Eventos } from "./evento";
import { Usuario } from "./usuario";

export interface Ingresso {
    id: number,
    evento: Eventos,
    cpf: string,
    nome: string,
    usuario: Usuario,
    statusIngresso: string
}
