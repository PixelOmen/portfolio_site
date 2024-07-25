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
    <header className="sm:mb-6 mt-2">
      <div className={`text-3xl sm:text-4xl flex gap-4 font-normal fadeInDown ${className}`}>
        
        <div className="text-blue-700">
          {prefix}
        </div>


        {asFunction ? (
          <>
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
      <div className={`text-pink-400 text-xl sm:text-4xl flex gap-4 font-normal fadeInDown ${className}`}>
      {"}"}
      </div>
    </header>
    </>
  )
}
