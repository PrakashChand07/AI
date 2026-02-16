const Background2 = () => {
  return <div>
      <div className="fixed top-0 -z-10">
        <div className="blur-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40" />
      </div>
      <div className="fixed top-0 end-0 -z-10">
        <div className="blur-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40" />
      </div>
      <div className="fixed inset-0 flex items-center justify-center -z-10">
        <div className="blur-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40" />
      </div>
      <div className="fixed bottom-0 start-0 -z-10">
        <div className="blur-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40" />
      </div>
      <div className="fixed bottom-0 end-0 -z-10">
        <div className="blur-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40" />
      </div>
    </div>;
};
export default Background2;