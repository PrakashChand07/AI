import { currentYear } from '@/common/constants';
import Link from 'next/link';
import React from 'react';
const Footer = () => {
  return <div className="border-t border-white/10 py-6">
      <div className="container lg:px-20 flex flex-wrap justify-center items-center gap-4 h-full md:justify-between text-center md:text-start">
        <p className="text-base font-medium text-default-400">
        {currentYear}  © WebAi - <Link href="">Design &amp; Crafted&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" data-lucide="heart" className="lucide lucide-heart inline h-4 w-4 text-red-500 fill-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
            &nbsp;by Coderthemes</Link>
        </p>
        <p className="text-base font-medium text-default-400">
          <Link href="">Terms Conditions &amp; Policy</Link>
        </p>
      </div>
    </div>;
};
export default Footer;