export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="display text-[26px] tracking-[0.14em] md:text-[32px]">Backwater</span>
      <span className="script -mt-1.5 ml-10 text-[26px] md:text-[32px]">kumarakom</span>
    </span>
  );
}
