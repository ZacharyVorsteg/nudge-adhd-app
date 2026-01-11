'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-4 pb-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Nudge
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm">
              ADHD-friendly productivity. One thing at a time, with zero shame.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-warm-500 fill-current" /> for ADHD brains
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/app" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  Open App
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:hello@nudge.app" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Nudge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
