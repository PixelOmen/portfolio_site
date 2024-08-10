interface DemoLinkProps {
  displayText: string;
  url: string;
  newTab?: boolean;
  className?: string;
}

export default function DemoLink({
  displayText,
  url,
  newTab = true,
  className = ''
}: DemoLinkProps ) {
  return (
      <a
        className={`text-[#EF8275] underline ml-2 font-bold ${className}`}
        href={url}
        target={newTab ? "_blank" : "_self"}
      >
        {displayText}
      </a>
  )
}
