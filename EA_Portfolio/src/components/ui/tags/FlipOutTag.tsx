interface FlipOutTagProps {
  content: string;
  className?: string;
}

export default function FlipOutTag( {content, className}: FlipOutTagProps ) {
  return (
    <div className={`overflow-hidden px-2 py-1 ${className}`}>
      <div className="casc-bounceDown py-1 px-2 rounded-lg text-sm sm:text-base bg-[#EF8275] text-white">
        {content}
      </div>
    </div>
  )
}
