interface IsAgreeType {
  isAgreeTermsUseisAgreeTermsUse: boolean;
  isAgreeCollectingUsingPersonalInformation: boolean;
  isAgreeMarketing: boolean;
}

export interface DefaultUser {
  nickname: string;
  favoriteSports?: string;
}

export interface JoinActionBody extends IsAgreeType, DefaultUser {
  username?: string;
  password?: string;
  emailAuthNum?: string;
}

export interface KakaoActionBody extends IsAgreeType, DefaultUser {}

export interface MailCheckActionProps {
  username: string;
  emailAuthNum: string;
}
