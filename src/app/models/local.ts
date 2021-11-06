export interface Local {
    id: number,
    nome: string,
    informacoesAdicionais: string,
    endereco: {
      id: number,
      rua: string,
      numero: string,
      uf: string,
      cidade: string,
      complemento: string,
      cep: string
    },
    capacidade: number,
    telefone: string
}
