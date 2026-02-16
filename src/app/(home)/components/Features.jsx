import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { features } from "../data";
const FeatureCard = ({
  description,
  icon,
  title
}) => {
  return <div className="bg-default-950/40 backdrop-blur-3xl" data-aos="fade-right" data-aos-easing="ease" data-aos-duration={1000}>
      <div className="sm:p-10 p-8">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-primary/10 text-primary rounded-xl mb-10">
          <IconifyIcon icon={icon} className="h-10 w-10" />
        </div>
        <h2 className="text-2xl text-white font-medium mb-4">{title}</h2>
        <p className="text-base text-default-200 mb-6"> {description}</p>
        <button className="inline-flex items-center justify-center gap-2 border border-white/10 text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300">More Tools <IconifyIcon icon="lucide:move-right" className="h-5 w-5" /></button>
      </div>
    </div>;
};
const Features = () => {
  return <section id="features" className="py-14">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-medium capitalize text-white mb-4">We&apos;re here to support you every step way</h2>
            <p className="text-sm text-default-200 font-medium">Start working with Tailwindcss It allows you to compose complex designs <br /> by combining and customizing utility classes..</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-px overflow-hidden rounded-3xl">
          {features.map((feature, idx) => <FeatureCard {...feature} key={idx} />)}
        </div>
      </div>
    </section>;
};
export default Features;