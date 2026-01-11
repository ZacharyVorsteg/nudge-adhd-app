import { Shield, Lock, Eye, Trash2, Mail } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy - Nudge',
  description: 'Privacy Policy for Nudge ADHD Productivity App',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-500">Last updated: January 2025</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              At Nudge, we believe your productivity data is deeply personal. This Privacy Policy explains how we collect, use, and protect your information.
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-purple-900 mb-2">Privacy-First Design</h3>
                  <p className="text-purple-800">Your task data stays on your device by default. We only sync what you explicitly choose to sync.</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Account Information</h3>
            <p className="text-gray-600 mb-4">When you create an account, we collect:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Email address</li>
              <li>Name (optional)</li>
              <li>Password (encrypted)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Usage Data</h3>
            <p className="text-gray-600 mb-4">We collect anonymized usage data to improve the app:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Feature usage patterns (anonymized)</li>
              <li>App performance metrics</li>
              <li>Crash reports</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Payment Information</h3>
            <p className="text-gray-600 mb-6">
              Payment processing is handled by Stripe. We never store your credit card information directly. Stripe&apos;s privacy policy applies to payment data.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>To provide and maintain the Nudge service</li>
              <li>To process payments and manage subscriptions</li>
              <li>To send important service updates</li>
              <li>To improve our app based on usage patterns</li>
              <li>To respond to support requests</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Data Storage & Security</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <Eye className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">
                    Your task data is stored locally on your device by default. If you enable cloud sync, data is encrypted in transit and at rest using industry-standard AES-256 encryption.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Data Sharing</h2>
            <p className="text-gray-600 mb-4">We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Service providers:</strong> Stripe (payments), cloud hosting providers</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Access & Export</h4>
                <p className="text-sm text-gray-600">Request a copy of all your data at any time</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Deletion</h4>
                <p className="text-sm text-gray-600">Request complete deletion of your account and data</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Correction</h4>
                <p className="text-sm text-gray-600">Update or correct your personal information</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Portability</h4>
                <p className="text-sm text-gray-600">Export your data in a standard format</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Data Retention</h2>
            <p className="text-gray-600 mb-6">
              We retain your account data for as long as your account is active. Upon account deletion, we remove your personal data within 30 days, except where retention is required by law.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Children&apos;s Privacy</h2>
            <p className="text-gray-600 mb-6">
              Nudge is not intended for children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Contact Us</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">
                    If you have questions about this Privacy Policy, please contact us:
                  </p>
                  <a href="mailto:privacy@nudge.app" className="text-purple-600 hover:text-purple-700 font-medium">
                    privacy@nudge.app
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a href="/" className="text-purple-600 hover:text-purple-700 font-medium">
              ← Back to Nudge
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
