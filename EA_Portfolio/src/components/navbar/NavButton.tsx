import styles from './navbar.module.css'

interface NavButtonProps {
    title: string;
    clickCallback: (e: React.MouseEvent) => void;
}

export default function NavButton({ title, clickCallback }: NavButtonProps) {
  return (
    <a href="" onClick={clickCallback} className={styles.navLinks}>
        {title}
    </a>
  )
}
