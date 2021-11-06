export interface Parceiro {
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
	}
}
