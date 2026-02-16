import IconifyIcon from "@/components/wrappers/IconifyIcon";
const Hero = () => {
  return <section id="home" className="relative overflow-hidden pt-[72px] bg-default-950/40 backdrop-blur-3xl">
      <div className="absolute h-14 w-14 bg-primary/10 top-2/3 start-80 -z-1 rounded-2xl rounded-tl-none rounded-br-none animate-[spin_10s_linear_infinite]" />
      <div className="absolute h-14 w-14 bg-primary/20 top-2/3 end-80 -z-1 rounded-full animate-ping" />
      <div className="px-6 pt-20 overflow-hidden" data-aos="fade-up" data-aos-easing="ease" data-aos-duration={800}>
        <div className="relative">
          <div className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-default-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0">
            <svg viewBox="0 0 1026 1026" fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full animate-spin-slow">
              <path className="stroke-white/10" d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z" strokeOpacity="0.7" />
              <path d="M513 1025C230.23 1025 1 795.77 1 513" stroke="url(#:S2:-gradient-1)" strokeLinecap="round" />
              <defs>
                <linearGradient id=":S2:-gradient-1" x1={1} y1={513} x2={1} y2={1025} gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7c3aed" />
                  <stop offset={1} stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
            <svg viewBox="0 0 1026 1026" fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full animate-spin-reverse-slower">
              <path className="stroke-white/10" d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z" strokeOpacity="0.7" />
              <path d="M913 513c0 220.914-179.086 400-400 400" stroke="url(#:S2:-gradient-2)" strokeLinecap="round" />
              <defs>
                <linearGradient id=":S2:-gradient-2" x1={913} y1={513} x2={913} y2={913} gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7c3aed" />
                  <stop offset={1} stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="container">
            <div className="py-14 text-center relative">
              <div className="flex justify-center">
                <div className="max-w-2xl">
                  <h2 className="md:text-6xl/tight text-5xl text-default-100 font-semibold mb-6">Make short videos From long ones instantly</h2>
                  <p className="text-base text-default-200 font-medium px-5">At Video Podcast Creators, we&apos;re a collective of creative visionaries who believe in the art of visual storytelling. Our mission is to captivate, educate, and inspire audiences worldwide</p>
                  <div className="backdrop-blur-2xl bg-white/10 rounded-md max-w-xl mx-auto">
                    <form className="w-full flex items-center justify-between mt-7 ">
                      <input type="email" name="email" id="email" className="w-full p-4 border-0 focus:outline-none focus:ring-0 text-sm text-white placeholder:text-white bg-transparent" placeholder="Enter Your Email" autoComplete="off" />
                      <button className="py-2 px-6 me-2 border-0 text-white font-semibold text-sm rounded-md backdrop-blur-2xl bg-primary hover:bg-primary-hover hover:text-white transition-all duration-500">
                        <div className="flex items-center justify-center gap-1">
                          <span>Submit</span>
                        </div>
                      </button>
                    </form>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                    <button className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300">Get start free
                      <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 border border-white/10 text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300">More Tools <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-default-400 mt-5">Get 75 mins of upload for free every month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;