import * as auth from "./auth";

function pathname(url: string = window.location.href): string {
  return new URL(url).pathname.slice(1); // remove leading '/'
}

export default function handleRoutes(sectionMap: Map<string, React.RefObject<HTMLDivElement>>) {
  const currentPath = pathname();
  if (!currentPath) return;
  if (currentPath == pathname(auth.GOOGLE_REDIRECT_URI)) {
    auth.checkForGoogleRedirect()
      .then(err => {
        // some error handling maybe
        if (err) {
          console.error(err.errorString, err.axiosError);
        }
      });
    return;
  }
  const section = sectionMap.get(currentPath);
  if (!section) return;
  if (!section.current) {
    console.error('No ref in handleRoute');
    return;
  }
  setTimeout(() => {
    section.current?.scrollIntoView({ behavior: 'smooth' });
  }, 1000);
}