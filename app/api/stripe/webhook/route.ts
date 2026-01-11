import { NextRequest, NextResponse } from 'next/server';
import { handleWebhookEvent } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    const result = await handleWebhookEvent(body, signature);

    // Handle different event types
    switch (result.type) {
      case 'checkout_completed':
        // In a real app, you would:
        // 1. Look up the user by email or create a new user
        // 2. Update their subscription status in your database
        // 3. Send a welcome email
        console.log('Checkout completed:', {
          customerId: result.customerId,
          planType: result.planType,
        });
        break;

      case 'subscription_canceled':
        // In a real app, you would:
        // 1. Update the user's subscription status
        // 2. Send a cancellation confirmation email
        console.log('Subscription canceled:', {
          customerId: result.customerId,
        });
        break;

      default:
        // Log other events for debugging
        console.log('Unhandled webhook event:', result.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
