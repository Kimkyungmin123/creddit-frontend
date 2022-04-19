import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

export default NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
    }),
  ],
});
