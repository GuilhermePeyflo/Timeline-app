// Remover do disco e colocar em um local descente
export const folderFiles = "../../uploads/"


// Váriaveis de ambiente

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

if (!GITHUB_CLIENT_ID){
    throw new Error("Variavel GITHUB_CLIENT_ID não encontrada no ambiente")
}

if (!GITHUB_CLIENT_SECRET){
    throw new Error("Variavel GITHUB_CLIENT_SECRET não encontrada no ambiente")
}