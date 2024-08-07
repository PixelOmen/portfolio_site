interface GitHubIconProps {
  height?: string;
  width?: string
  className?: string;
  fillColor?: string;
  strokeColor?: string;
}

export default function GitHubIcon({
  height = '80px',
  width = '80px',
  className = '',
  fillColor = '',
  strokeColor = ''
}: GitHubIconProps) {
  return (
    <svg className={`${className}`} width={width} height={height} viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
      <title>Email</title>
      <path fill={fillColor} stroke={strokeColor} d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z"/>
    </svg>
  )
}