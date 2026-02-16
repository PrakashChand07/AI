import IconifyIcon from "@/components/wrappers/IconifyIcon";
import Image from "next/image";
import avatar1 from '@/assets/images/avatars/img-1.png';
import avatar2 from '@/assets/images/avatars/img-2.png';
import avatar3 from '@/assets/images/avatars/img-3.png';
const ActionBox = () => {
  return <section className="py-14">
      <div className="container" data-aos="zoom-out" data-aos-easing="ease" data-aos-duration={1000}>
        <div className="p-6 rounded-xl bg-default-950/40">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-shrink">
              <div className="flex -space-x-2">
                <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-default-950 bg-white" src={avatar1} alt="Image Description" />
                <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-default-950 bg-white" src={avatar2} alt="Image Description" />
                <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-default-950 bg-white" src={avatar3} alt="Image Description" />
                <button className="h-10 w-10 font-medium text-primarys rounded-full bg-white">80+</button>
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-default-200">Join our AI experts communiy</h3>
              <p className="w-3/4 text-base font-medium text-default-300 mt-5">Meet and learn from 80+ creators &amp; companies who share how thay use AI to create better content at lightning speed.</p>
            </div>
            <div className="flex-shrink">
              <button className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300">Join
                <IconifyIcon icon="lucide:move-right" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ActionBox;