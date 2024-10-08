export type BitlyErrorType = 
  | "INVALID_ARG_LONG_URL"
  | "INVALID_ARG_DOMAIN"
  | "INVALID_ARG_BITLINK"
  | "FORBIDDEN"
  | "ALREADY_A_BITLY_LINK"
  | "KEYWORD_OVERRIDES_LIMIT_EXCEEDED"
  | "OVERRIDE_ALREADY_EXISTS"
  | "INVALID_ARG_GROUP_GUID"
  | "TOO_MANY_TAGS_PER_GROUP"
  | "TOO_MANY_TAGS_PER_BITLINK";

export type shortedLink = {
    link: string
}