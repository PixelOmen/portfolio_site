import styles from './scrollIcon.module.css'

export default function ScrollIcon() {
  return (
    <div
      className='h-12 w-6 border-2 rounded-2xl flex justify-center items-center border-gray-500'
    >
      <div className={`h-2 w-2 rounded-xl bg-gray-500 ${styles.scrollWheel}`}>
      </div>
    </div>
  )
}
