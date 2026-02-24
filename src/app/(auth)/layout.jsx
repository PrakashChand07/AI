"use client";
import { useEffect } from "react";
const AuthLayout = ({
  children
}) => {
  useEffect(() => {
    document.body.classList.add('bg-slate-900', 'relative', 'h-full');
    return () => {
      document.body.classList.remove('bg-slate-900', 'relative', 'h-full');
    };
  }, []);
  return <>
      <section className="flex items-center py-6 px-0 lg:p-10 w-full lg:h-screen">
        <div className="container">
          {children}
        </div>
      </section>
      <footer className="2xl:fixed bottom-0 start-0 end-0 py-3">

      </footer>
    </>;
};
export default AuthLayout;