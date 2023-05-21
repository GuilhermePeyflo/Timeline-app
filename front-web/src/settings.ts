
export const signinUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export let DOMAINS = process.env.DOMAINS
if (!DOMAINS){
    throw Error("A env DOMAINS não foi definida. Env necessária para permitir a exibição de conteúdos de outros sites")
}
DOMAINS = JSON.parse(DOMAINS)