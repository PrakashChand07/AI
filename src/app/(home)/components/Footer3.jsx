import logo from '@/assets/images/logo.png';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { footerLinks } from '../data';
import Footer from '@/components/Footer';
const Footer3 = () => {
  const socialIcons = ['lucide:facebook', 'lucide:instagram', 'lucide:twitter', 'lucide:linkedin'];
  return <footer className="bg-default-950/40">
      <div className="container">
        <div className="grid lg:grid-cols-9 grid-cols-2 gap-10 lg:gap-16 py-20">
          <div className="lg:col-span-3 sm:col-span-1 col-span-2">
            <Image src={logo} width={124} height={40} className="h-10" alt="logo" />
            <div className="mt-7">
              <h6 className="text-base text-white mb-4">Follow US :</h6>
              <ul className="flex flex-wrap items-center gap-1">
                {socialIcons.map((icon, idx) => <li key={idx}>
                    <Link href="" className="h-10 w-10 inline-flex items-center justify-center border border-white/10 rounded-lg transition-all duration-500 group hover:bg-primary"><IconifyIcon icon={icon} className="h-5 w-5 text-default-300 group-hover:text-white" /></Link>
                  </li>)}
              </ul>
            </div>
          </div>
          {footerLinks.map((item, idx) => <div className="lg:col-span-2 sm:col-span-1 col-span-2" key={idx}>
              <ul className="flex flex-col gap-3">
                <h5 className="xl:text-xl lg:text-lg font-medium text-white mb-2">{item.title}</h5>
                {item.links.map((link, idx) => <li key={idx}>
                    <Link href={link.url ?? ''} className="text-base font-normal text-default-200 hover:text-white transition-all">{link.name}</Link>
                  </li>)}
              </ul>
            </div>)}
        </div>
      </div>
      <Footer />
    </footer>;
};
export default Footer3;