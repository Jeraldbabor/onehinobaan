import { Link } from '@inertiajs/react';
import { Cookie, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed right-6 bottom-6 z-[100] w-full max-w-[420px] p-4 sm:p-0">
            <div className="group relative animate-in duration-700 slide-in-from-bottom-10 zoom-in-95 fade-in">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-75 blur transition duration-500 group-hover:opacity-100" />

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300">
                    {/* Decorative Gradient Sparkle */}
                    <div className="absolute -top-10 -right-10 size-40 rounded-full bg-blue-500/10 blur-[60px]" />
                    <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-indigo-500/10 blur-[60px]" />

                    <div className="relative flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400">
                                    <Cookie className="size-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold tracking-tight text-white">
                                        Cookie Settings
                                    </span>
                                    <span className="text-[10px] font-medium tracking-wider text-blue-400/80 uppercase">
                                        Privacy First
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-white"
                                aria-label="Close"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg leading-tight font-semibold text-slate-100">
                                We value your digital privacy
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-400">
                                We use cookies to enhance your experience and
                                analyze our traffic. By clicking "Accept All",
                                you consent to our use of cookies. View our{' '}
                                <Link
                                    href="/cookies"
                                    className="font-medium text-white underline decoration-blue-500/50 underline-offset-4 transition-all hover:decoration-blue-500"
                                >
                                    Cookie Policy
                                </Link>
                                .
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleAccept}
                                size="lg"
                                className="h-12 flex-1 border-none bg-white px-6 font-bold text-slate-900 shadow-xl transition-all hover:bg-slate-200 active:scale-[0.98]"
                            >
                                Accept All
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsVisible(false)}
                                className="h-12 flex-1 border-white/10 bg-white/5 font-semibold text-slate-200 shadow-lg transition-all hover:bg-white/10 hover:text-white"
                            >
                                Decline
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
