interface ActionBtnProps {
  title: string,
  clickCallback: () => void,
  className?: string
}

export default function ActionBtn({
  title,
  clickCallback,
  className = ''
}: ActionBtnProps ) {
  return (
    <button
      onClick={clickCallback}
      className={`bg-[#EF8275] hover:bg-[#ec7264] hover:scale-105 transition-all duration-300 p-3 rounded-lg text-white ${className}`}
    >
      {title}
    </button>
  )
}
