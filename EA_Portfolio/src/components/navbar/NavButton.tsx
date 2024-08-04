import styles from './navbar.module.css'

interface NavButtonProps {
    title: string;
    clickCallback: (e: React.MouseEvent) => void;
}

export default function NavButton({ title, clickCallback }: NavButtonProps) {
  return (
    <div className='max-w-max'>
      <a href="" onClick={clickCallback} className={`relative ${styles.navLinks}`}>
          {title}
      </a>
    </div>
  )
}
