import md5 from "md5"

export const API_BASE_URL = "http://localhost:3000/api"
export const NEXT = "next"
export const PREVIOUS = "previous"
export const AUTHOR_EMAIL = "ryoto.noguchi@gmail.com"
export const GRAVATAR_API_URL = "https://www.gravatar.com/avatar"
export const EMAIL_HASH = md5(AUTHOR_EMAIL.toLowerCase().trim())
export const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""
export const USER_ID = "dXNlcjox"
