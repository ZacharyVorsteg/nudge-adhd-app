'use client'

import { useState } from 'react'
import { Mail, MessageCircle, FileText, HelpCircle, Send, CheckCircle } from 'lucide-react'

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to your support system
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-purple-100 rounded-2xl mb-4">
            <HelpCircle className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help?</h1>
          <p className="text-lg text-gray-600">Get support for Nudge - we&apos;re here to help you succeed</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a href="mailto:support@nudge.app" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-3">Get help via email within 24 hours</p>
            <span className="text-purple-600 font-medium text-sm">support@nudge.app</span>
          </a>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">FAQ</h3>
            <p className="text-gray-600 text-sm mb-3">Find answers to common questions</p>
            <a href="#faq" className="text-green-600 font-medium text-sm">View FAQ →</a>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600 text-sm mb-3">Learn how to use Nudge features</p>
            <span className="text-blue-600 font-medium text-sm">Coming soon</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>

          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Question</option>
                  <option value="billing">Billing & Subscription</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Feature Request</option>
                  <option value="account">Account Issues</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          )}
        </div>

        <div id="faq" className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is my data stored locally or in the cloud?</h3>
              <p className="text-gray-600">By default, your tasks are stored locally on your device. You can optionally enable cloud sync with a Pro account.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use Nudge for free?</h3>
              <p className="text-gray-600">Yes! Nudge offers a free tier with core features. Pro features require a subscription.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I cancel my subscription?</h3>
              <p className="text-gray-600">You can cancel anytime from Settings → Subscription. You&apos;ll keep access until the end of your billing period.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is Nudge designed for ADHD?</h3>
              <p className="text-gray-600">Yes! Nudge was built specifically with ADHD users in mind, featuring shame-free design, one task at a time focus, and quick-win systems.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="/" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to Nudge
          </a>
        </div>
      </div>
    </div>
  )
}
