interface DemoErrorProps {
  error: string;
}

export default function DemoError( { error }: DemoErrorProps ) {
  return (
    <div className="min-h-6 mt-1 text-center text-red-500 rounded-lg animate-pulse transition-all duration-200">
      {error}
    </div>
  )
}
