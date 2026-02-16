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
        <div className="fixed bottom-6 right-6 z-[100] w-full max-w-[420px] p-4 sm:p-0">
            <div className="group relative animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-700">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur opacity-75 group-hover:opacity-100 transition duration-500" />

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300">
                    {/* Decorative Gradient Sparkle */}
                    <div className="absolute -right-10 -top-10 size-40 rounded-full bg-blue-500/10 blur-[60px]" />
                    <div className="absolute -left-10 -bottom-10 size-40 rounded-full bg-indigo-500/10 blur-[60px]" />

                    <div className="relative flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 border border-blue-400/20">
                                    <Cookie className="size-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold tracking-tight text-white">Cookie Settings</span>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-blue-400/80">Privacy First</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="rounded-full p-1.5 text-slate-500 hover:bg-white/5 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold leading-tight text-slate-100">
                                We value your digital privacy
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-400">
                                We use cookies to enhance your experience and analyze our traffic.
                                By clicking "Accept All", you consent to our use of cookies.
                                View our{' '}
                                <Link
                                    href="/cookies"
                                    className="text-white decoration-blue-500/50 underline underline-offset-4 hover:decoration-blue-500 transition-all font-medium"
                                >
                                    Cookie Policy
                                </Link>.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleAccept}
                                size="lg"
                                className="h-12 flex-1 bg-white text-slate-900 font-bold hover:bg-slate-200 shadow-xl border-none px-6 transition-all active:scale-[0.98]"
                            >
                                Accept All
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsVisible(false)}
                                className="h-12 flex-1 border-white/10 bg-white/5 text-slate-200 font-semibold hover:bg-white/10 hover:text-white transition-all shadow-lg"
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
