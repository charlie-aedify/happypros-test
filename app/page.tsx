'use client'

import { useState } from 'react'
import ChatInterface from '@/components/ChatInterface'
import { Wrench, MessageCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wrench className="w-12 h-12 text-primary-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
              Handyman AI Assistant
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your AI-powered customer service chatbot. Get instant responses to customer inquiries 24/7.
          </p>
        </header>

        {/* Chat Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <ChatInterface />
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <MessageCircle className="w-10 h-10 text-primary-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">24/7 Availability</h3>
            <p className="text-gray-600 dark:text-gray-300">Never miss a customer inquiry, even after hours</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <Wrench className="w-10 h-10 text-primary-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Service Knowledge</h3>
            <p className="text-gray-600 dark:text-gray-300">Trained on handyman services, pricing, and scheduling</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <MessageCircle className="w-10 h-10 text-primary-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Lead Capture</h3>
            <p className="text-gray-600 dark:text-gray-300">Automatically collect contact info and job details</p>
          </div>
        </div>
      </div>
    </main>
  )
}
