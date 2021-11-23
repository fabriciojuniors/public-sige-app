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
    geraCertificado: boolean
    classificacaoIndicativa : ClassificacaoIndicativa
}

export enum ClassificacaoIndicativa {
    L,
    DEZ,
    DOZE,
    QUATORZE,
    DEZESSEIS,
    DEZOITO,
}
