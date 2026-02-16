import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { postGeneratorFeatures } from "../data";
const PostGeneratorCard = ({
  description,
  icon,
  title
}) => {
  return <div className="group p-8 rounded-xl bg-default-950/40 transition-all duration-500 hover:-translate-y-2 hover:bg-primary/40">
      <div className="h-14 w-14 flex items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:bg-white/20 group-hover:text-white">
        <IconifyIcon icon={icon} className="h-9 w-9" />
      </div>
      <h3 className="text-xl font-medium text-default-200 mt-8">{title}</h3>
      <p className="text-base font-normal text-default-300 mt-4">{description}</p>
    </div>;
};
const Generator = () => {
  return <section id="generator" className="py-14">
      <div className="container" data-aos="zoom-in" data-aos-easing="ease" data-aos-duration={1000}>
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-medium capitalize text-white mb-4">Choose Social Media Post Generator</h2>
            <p className="text-sm text-default-200 font-medium">Start working with Tailwindcss It allows you to compose complex designs <br /> by combining and customizing utility classes..</p>
          </div>
        </div>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {postGeneratorFeatures.map((feature, idx) => <PostGeneratorCard {...feature} key={idx} />)}
        </div>
      </div>
    </section>;
};
export default Generator;