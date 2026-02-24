const Background2 = () => {
  return (
    <div className="fixed inset-0 z-[-10] bg-[#050505] overflow-hidden pointer-events-none w-full h-full">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7080FF]/50 to-transparent" />
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7080FF]/50 to-transparent" />
    </div>
  );
};
export default Background2;