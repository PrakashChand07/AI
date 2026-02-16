import { currency } from "@/common/constants";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { cn } from "@/helpers/cn";
import { pricingPlans } from "../data";
const PricingCard = ({
  plan
}) => {
  const {
    features,
    name,
    price,
    isPopular
  } = plan;
  return <div data-aos="zoom-in" data-aos-easing="ease" data-aos-duration={1000}>
      <div className="bg-slate-950/40 rounded-xl hover:-translate-y-2 transition-all duration-500">
        <div className="border border-white/10 rounded-xl">
          <div className="p-6">
            <h5 className="text-base font-medium text-primary">{name}</h5>
            <p className="relative text-5xl font-normal tracking-tight text-white mt-5">
              {currency}{price}<sub className="text-lg font-normal text-default-200">/mo</sub></p>
            <p className="text-default-300 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className={cn("flex items-center justify-center gap-2 border w-full text-white py-2 px-6 mt-6 rounded-lg hover:bg-primary-hover transition-all duration-300", isPopular ? 'bg-primary border-primary' : 'border-white/10')}>Get started <IconifyIcon icon="lucide:move-right" className="h-5 w-5" /></button>
            <hr className="my-5 border-dashed border-white/10" />
            <ul role="list" className="mt-3 text-sm text-default-700">
              {features.map((feature, idx) => <li className="flex items-center gap-2 py-2" key={idx}>
                  <IconifyIcon icon="lucide:check" className="inline-block h-5 w-5 me-1 text-primary" />
                  <span className="text-default-50">{feature}</span>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>;
};
const Pricing = () => {
  return <section id="price" className="py-14">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-medium capitalize text-white mb-4">We&apos;ve got a plan that&apos;s perfect for you</h2>
            <p className="text-sm text-default-200 font-medium">Start working with Tailwindcss It allows you to compose complex designs <br /> by combining and customizing utility classes..</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="text-base font-medium text-default-200">Monthly</span>
              <label htmlFor="pricing-input" className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="pricing-input" className="sr-only peer" />
                <span className="w-11 h-4 bg-default-700 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-default-950 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:border-default-950 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:ring-2 after:ring-offset-2 after:ring-offset-default-950 after:ring-primary after:bg-primary" />
              </label>
              <span className="text-base font-medium text-default-200">Yearly</span>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {pricingPlans.map((plan, idx) => <PricingCard plan={plan} key={idx} />)}
        </div>
      </div>
    </section>;
};
export default Pricing;