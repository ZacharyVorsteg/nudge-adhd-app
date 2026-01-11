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
        // TODO: Implement user subscription activation
        // 1. Look up the user by email or create a new user
        // 2. Update their subscription status in database
        // 3. Send a welcome email
        break;

      case 'subscription_canceled':
        // TODO: Implement subscription cancellation
        // 1. Update the user's subscription status
        // 2. Send a cancellation confirmation email
        break;

      default:
        // Unhandled event types are ignored
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
