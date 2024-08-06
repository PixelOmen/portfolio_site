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
      className={`group bg-gray-700 transition-all duration-500 rounded-lg text-white ${className}`}
    >
      <div className="bg-[#EF8275] group-hover:bg-[#ec7264] hover:-translate-y-1 active:translate-y-0 active:duration-75 px-3 py-2 transition-all duration-500 rounded-lg">
        {title}
      </div>
    </button>
  )
}
