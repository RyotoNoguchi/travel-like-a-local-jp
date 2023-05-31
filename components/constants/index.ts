import md5 from "md5"

export const NEXT = "next"
export const PREVIOUS = "previous"
export const AUTHOR_EMAIL = "ryoto.noguchi@gmail.com"
export const GRAVATAR_API_URL = "https://www.gravatar.com/avatar"
export const EMAIL_HASH = md5(AUTHOR_EMAIL.toLowerCase().trim())
export const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""
export const DEEPL_API_KEY = process.env.DEEPL_API_KEY ?? ""
export const USER_ID = "dXNlcjox"
export const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"
export const INSTAGRAM_POST = "https://www.instagram.com/p/Cgq5P6grK5d/"
export const INTRODUCTION_IN_JP =
  "みなさん、こんにちは！渡鳥旅人です。\r\n日本で外国人観光客向けに英語とフランス語が話せるツアーガイドとして働いていました。\r\n今はソフトウェアエンジニアとして働きながら、日本全国を飛び回って渡り鳥のごとく毎月違う地方に滞在しています。\r\nこのブログでは日本の地方に長く滞在することで、どこを訪れ、何をし、誰に会うか、といった記事を投稿しています！"
export const FIRST_NAME_IN_JP = "旅人"
export const LAST_NAME_IN_JP = "渡鳥"
export const HERO_IMAGE_PC = "/img/pc-hero.webp"
export const HERO_IMAGE_SP = "/img/sp-hero.webp"
export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
