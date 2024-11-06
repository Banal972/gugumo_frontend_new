const AGREE_SERVICE: {
  id:
    | 'isAgreeTermsUseisAgreeTermsUse'
    | 'isAgreeCollectingUsingPersonalInformation'
    | 'isAgreeMarketing';
  label: string;
}[] = [
  {
    id: 'isAgreeTermsUseisAgreeTermsUse',
    label: '서비스 이용약관 동의 (필수)',
  },
  {
    id: 'isAgreeCollectingUsingPersonalInformation',
    label: '개인정보 수집 및 이용 동의 (필수)',
  },
  {
    id: 'isAgreeMarketing',
    label: '마케팅 수신 동의 (선택)',
  },
];
export default AGREE_SERVICE;
