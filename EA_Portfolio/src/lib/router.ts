import * as auth from "./auth";

export default function handleRoute(sectionMap: Map<string, React.RefObject<HTMLDivElement>>) {
    const currentPath = pathname();
    if (!currentPath) return;
    if (currentPath == pathname(auth.GOOGLE_REDIRECT_URI)) {
        auth.checkForGoogleRedirect();
        return;
    }
    switch (currentPath) {
        case 'demo':
            demo(sectionMap.get('demos')!);
            break;
        default:
            return;
    }
}

function pathname(url: string = window.location.href): string {
    return new URL(url).pathname.slice(1);
}

function demo(demoref: React.RefObject<HTMLDivElement>) {
    if (!demoref.current) {
        console.error('No demo ref in handleRoute');
    }
    demoref.current?.scrollIntoView({ behavior: 'smooth' });
}