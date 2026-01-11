import { FileText, Mail } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service - Nudge',
  description: 'Terms of Service for Nudge ADHD Productivity App',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 rounded-xl">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-500">Last updated: January 2025</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Welcome to Nudge. By using our app, you agree to these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing or using Nudge, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the app.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-6">
              Nudge is an ADHD-friendly productivity app designed to help users manage tasks with less overwhelm. Features include task management, focus timers, and productivity tools designed with neurodivergent users in mind.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must notify us immediately of any unauthorized access</li>
              <li>You may not share your account credentials with others</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Acceptable Use</h2>
            <p className="text-gray-600 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Use automated systems to access the service without permission</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Subscription & Payments</h2>
            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Free Tier</h3>
            <p className="text-gray-600 mb-4">
              Nudge offers a free tier with core functionality. No payment is required for basic features.
            </p>
            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Pro Subscription</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Pro features require a paid subscription</li>
              <li>Subscriptions are billed annually or as a one-time lifetime purchase</li>
              <li>Prices are listed in USD and may vary by region</li>
              <li>Subscriptions auto-renew unless cancelled before the renewal date</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Refund Policy</h2>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-6">
              <p className="text-purple-800">
                <strong>30-Day Money-Back Guarantee:</strong> If you&apos;re not satisfied with Nudge Pro, contact us within 30 days of purchase for a full refund. No questions asked.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600 mb-6">
              Nudge and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws. Your task data remains yours.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-600 mb-6">
              Nudge is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free. Nudge is a productivity tool, not medical advice. Consult healthcare professionals for ADHD treatment.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Termination</h2>
            <p className="text-gray-600 mb-6">
              We may terminate or suspend your account at any time for violations of these terms. You may delete your account at any time through the app settings.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or in-app notification. Continued use after changes constitutes acceptance.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">12. Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These terms shall be governed by the laws of the State of Delaware, United States, without regard to conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">13. Contact Us</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">
                    Questions about these Terms? Contact us:
                  </p>
                  <a href="mailto:legal@nudge.app" className="text-purple-600 hover:text-purple-700 font-medium">
                    legal@nudge.app
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
