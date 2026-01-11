import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { handleWebhookEvent } from '@/lib/stripe';

// Create admin client with service role for webhook operations
function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

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
    const supabase = createAdminClient();

    // Handle different event types
    switch (result.type) {
      case 'checkout_completed': {
        if (result.customerEmail && result.planType) {
          // Find user by email and update subscription
          const { error } = await supabase
            .from('users')
            .update({
              stripe_customer_id: result.customerId,
              is_pro: true,
              pro_type: result.planType,
              subscription_status: 'active',
            })
            .eq('email', result.customerEmail);

          if (error) {
            // User might not exist yet - create if possible
            // This is handled by the trigger on auth.users
          }
        }
        break;
      }

      case 'subscription_canceled': {
        if (result.customerId) {
          // Find user by Stripe customer ID and downgrade
          await supabase
            .from('users')
            .update({
              is_pro: false,
              subscription_status: 'canceled',
            })
            .eq('stripe_customer_id', result.customerId);
        }
        break;
      }

      default:
        // Unhandled event types are ignored
        break;
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
