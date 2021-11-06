import { Local } from './local';
import { Parceiro } from './parceiro';

export interface Eventos {
    id: number,
    nome: string,
    detalhes: string,
    data: string,
    hora: string,
    duracao: number,
    local: Local,
    parceiros: Parceiro[],
    valorIngresso: number,
    imagem64: string
}
