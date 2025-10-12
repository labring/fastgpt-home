import Link from 'next/link';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  // Note: We can't access params in not-found.tsx, so we'll use English as default
  // The global not-found.tsx will be used for language-specific routes

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <h1 className="text-[120px] sm:text-[160px] font-bold text-primary/10 dark:text-primary/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 sm:w-20 sm:h-20 text-primary/30 dark:text-primary/20 animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium transition-colors"
          >
            <Search className="w-5 h-5" />
            View FAQ
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Need help? Here are some useful links:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link
              href="https://doc.fastgpt.io/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </Link>
            <Link
              href="/price"
              className="text-primary hover:underline"
            >
              Pricing
            </Link>
            <Link
              href="https://github.com/labring/FastGPT"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
