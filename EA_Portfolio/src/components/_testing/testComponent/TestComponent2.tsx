
interface TestComponent2Props {
    className?: string
    closeMask?: () => void
}

export default function TestComponent2({ className, closeMask }: TestComponent2Props) {
  return (
    <div className={`border-2 border-red-500 ${className}`}>
        <h1>Test Component 2</h1>
        <button onClick={closeMask}>Close</button>
    </div>
  )
}
