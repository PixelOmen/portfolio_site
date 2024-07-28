interface JSHeaderProps {
  title: string;
  prefix?: string;
  asFunction?: boolean;
  functionParams?: string[];
  className?: string;
  children?: React.ReactNode
}

export default function JSHeader({
  title,
  prefix = 'var',
  asFunction = false,
  functionParams = [],
  className = '',
  children
}: JSHeaderProps ) {
  return (
    <>
    <header className="">
      <div className={`text-3xl sm:text-4xl font-sourcecode flex gap-4 font-normal fadeInDown ${className}`}>
        
        {asFunction ? (
          <>
          <div className="text-[#368cd6] max-[450px]:hidden ">
            {prefix}
          </div>
          <span className="">
            <span className="text-yellow-200 brightness-90">
              {title}
            </span>
            <span className="text-pink-400">
              {"("}
              {functionParams.map((param, index) => {
                return (
                  <span key={index} className="text-sky-300">
                    {param}
                    {index < functionParams.length - 1 && (
                      <span className="text-slate-300">
                        {", "}
                      </span>
                    )}
                  </span>
                )
              })}
              {")"}
            </span>
          </span>
          </>
        ) : (
          <>
          <div className="text-[#368cd6]">
            {prefix}
          </div>          
          <div className="text-green-400 brightness-90">
            {title}
          </div>
          <div className="">
            =
          </div>          
          </>
        )}


        <div className="text-pink-400">
          {"{"}
        </div>
      </div>
    </header>

    {children}

    <header>
      <div className={`text-pink-400 font-sourcecode text-3xl sm:text-4xl flex gap-4 font-normal fadeInDown ${className}`}>
      {"}"}
      </div>
    </header>
    </>
  )
}
