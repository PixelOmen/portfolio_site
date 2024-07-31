interface TerminalProps {
  header?: string
  content: string
  className?: string
}

export default function Terminal({
  header,
  content,
  className = ''
}: TerminalProps ) {

  header = header ? header : 'Emmanuel@Acosta: ~';

  content = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quos beatae minus alias eos veritatis, rerum, distinctio voluptates dolorum illo ad exercitationem, quibusdam officia. Unde et doloremque incidunt sed deserunt!";
  
  return (
    <div className={`mb-4 w-full ${className}`}>
      <div className="bg-gradient-to-b from-[#524f48] via-[#3e3d39] to-[#3e3d39] rounded-lg text-gray-200 text-sm">
        <div className="relative w-full flex p-2">
          <header className="absolute left-[50%] -translate-x-[50%]">
            {header}
          </header>
          <div className="flex ml-auto gap-1 pr-1">
            <div className="border-[1px] border-black rounded-full px-2 pt-[1px] text-black bg-gradient-to-b from-[#82817c] to-[#64635e]">
              &minus;
            </div>
            <div className="border-[1px] border-black rounded-full px-2 text-black bg-gradient-to-b from-[#82817c] to-[#64635e]">
              <div className="-translate-y-[1px]">&#9633;</div>
            </div>
            <div className="border-[1px] border-black rounded-full px-2 pt-[1px] text-black bg-gradient-to-b from-[#ef7d52] to-[#de4f1b]">
              &times;
            </div>
          </div>
        </div>
        <div className="ml-6 pb-2 flex gap-4">
          {['File', 'Edit', 'View', 'Search', 'Terminal', 'Help'].map((item, index) => {
            return (
              <div key={index}>{item}</div>
            )
          })}
        </div>
        <div className="bg-gray-900 w-full font-sourcecode p-2 text-lg">
          <div className="text-[#26e026]">
            {header}$
            <span className="ml-4 text-gray-100">{content}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
