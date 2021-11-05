import { Cartao } from "./cartao";

export interface Usuario {
    id: number,
	cpf: string,
	nome: string,
	sexo: string,
	nascimento: string,
	telefone: string,
	endereco: {
		id: number,
		rua: string,
		numero:number,
		uf:string,
		cidade:string,
		complemento:string,
		cep:string
	},
	cartoes: Cartao[],
	nivel: string,
	email: string,
	senha: string
}
