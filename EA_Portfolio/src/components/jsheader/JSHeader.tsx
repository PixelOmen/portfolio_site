interface JSHeaderProps {
  title: string;
  prefix?: string;
  children?: React.ReactNode
}

export default function JSHeader({
  title,
  prefix = 'var',
  children
}: JSHeaderProps ) {
  return (
    <>
    <header className="mb-6">
      <div className="text-4xl flex gap-4 text-center font-roboto font-bold fadeInDown text-gray-200">
        <div className="text-blue-700">
          {prefix}
        </div>
        <div className="text-green-400 brightness-90 font-normal">
          {title}
        </div>
        <div className="font-medium">
          =
        </div>
        <div className="text-yellow-400 font-normal">
          {"{"}
        </div>
      </div>
    </header>

    {children}

    <header>
      <div className="text-yellow-400 font-roboto text-4xl mt-6">
      {"}"}
      </div>
    </header>
    </>
  )
}
