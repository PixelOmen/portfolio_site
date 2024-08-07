interface ActionBtnProps {
  title: string,
  clickCallback: () => void,
  containerClassName?: string,
  btnClassName?: string
}

export default function ActionBtn({
  title,
  clickCallback,
  containerClassName: className = '',
  btnClassName = ''
}: ActionBtnProps ) {
  return (
    <button
      onClick={clickCallback}
      className={`group rounded-xl text-white ${className}`}
    >
      <div className={`bg-[#EF8275] hover:bg-[#f66757] group-hover:scale-105 active:-translate-y-0 active:duration-75 px-3 py-1 transition-all duration-300 rounded-lg ${btnClassName}`}>
        {title}
      </div>
    </button>
  )
}
