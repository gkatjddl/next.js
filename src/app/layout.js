import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LoginBtn from "./components/LoginBtn/LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nextjs앱",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);
  console.log('로그인정보:',session);

  return (
    <html lang="ko">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">Board</Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
          <LoginBtn login={session}/>
        </div>
        {children}
      </body>
    </html>
  );
}

// 소셜로그인 설정
// npm install next-auth
// pages 폴더 안에 api 폴더 안에 auth 폴더 생성하고
// [...nextauth].js 파일을 생성
// [] : dynamic route (동적 URL) : 각 소셜로그인에서 제공하는 경로를 넣을 것임(구글,깃허브,페이스북 등.. 다 다르게 제공)