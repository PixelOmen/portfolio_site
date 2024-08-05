import styles from './navbar.module.css'

interface NavButtonProps {
    title: string;
    clickCallback: (e: React.MouseEvent) => void;
    className?: string;
}

export default function NavButton({ title, clickCallback, className = '' }: NavButtonProps) {
  return (
    <div className='max-w-max'>
      <a href="" onClick={clickCallback} className={`relative ${styles.navLinks} ${className}`}>
          {title}
      </a>
    </div>
  )
}
