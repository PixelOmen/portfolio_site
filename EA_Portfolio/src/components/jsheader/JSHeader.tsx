interface JSHeaderProps {
  title: string;
  prefix?: string;
  asFunction?: boolean;
  functionParams?: string[];
  children?: React.ReactNode
}

export default function JSHeader({
  title,
  prefix = 'var',
  asFunction = false,
  functionParams = [],
  children
}: JSHeaderProps ) {
  return (
    <>
    <header className="mb-6">
      <div className="text-4xl flex gap-4 text-center font-roboto font-bold fadeInDown text-gray-200">
        
        <div className="text-sky-800">
          {prefix}
        </div>


        {asFunction ? (
          <>
          <span className="font-normal">
            <span className="text-yellow-200 brightness-90">
              {title}
            </span>
            <span className="font-medium text-pink-400">
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
          <div className="text-green-400 brightness-90 font-normal">
            {title}
          </div>
          <div className="font-medium">
            =
          </div>          
          </>
        )}


        <div className="text-pink-400 font-normal">
          {"{"}
        </div>
      </div>
    </header>

    {children}

    <header>
      <div className="text-pink-400 font-roboto text-4xl mt-6">
      {"}"}
      </div>
    </header>
    </>
  )
}
