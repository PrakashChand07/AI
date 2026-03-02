import { Jost } from "next/font/google";
import AppProviders from "@/components/wrappers/AppProviders";
import logo from '@/assets/images/logo.png';
import { DEFAULT_PAGE_TITLE } from "@/common/constants";
import Image from "next/image";
import 'aos/dist/aos.css';
import "../assets/css/style.css";
import MainFooter from "@/components/MainFooter";
const jostSans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  style: "normal"
});
export const metadata = {
  title: {
    template: '%s | WebAI Nextjs - AI Startup & Technology Landing Page Template',
    default: DEFAULT_PAGE_TITLE
  },
  description: 'Tailwind CSS AI Startup & Technology Saas & AI Software Landing Page Template, ai agency, ai application, ai business, ai, creative ai art, ai it solutions, modern web ai, multipurpose, saas, nft art, nft software, tailwind css.'
};
const splashScreenStyles = `
#splash-screen {
  position: fixed;
  top: 50%;
  left: 50%;
  background: #050505;
  display: flex;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  transition: all 15s linear;
  overflow: hidden;
}

#splash-screen.remove {
  animation: fadeout 0.7s forwards;
  z-index: 0;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
`;
export default function RootLayout({
  children
}) {
  return <html lang="en">
    <head>
      <style suppressHydrationWarning>{splashScreenStyles}</style>
    </head>
    <body className={`${jostSans.className}`}>
      <div id="splash-screen">
        <Image alt="logo-text" src={logo} style={{
          height: '10%',
          width: 'auto'
        }} priority />
      </div>
      <div id="__next_splash">
        <AppProviders>
          {children}
          <MainFooter />
        </AppProviders>
      </div>
    </body>
  </html>;
}