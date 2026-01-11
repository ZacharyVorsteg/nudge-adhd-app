import Stripe from 'stripe';

// Initialize Stripe only on server side
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
  typescript: true,
});

export const STRIPE_PRICES = {
  lifetime: process.env.STRIPE_PRICE_LIFETIME || 'price_xxx',
  annual: process.env.STRIPE_PRICE_ANNUAL || 'price_xxx',
};

export type PlanType = 'lifetime' | 'annual';

export async function createCheckoutSession(
  planType: PlanType,
  customerId?: string
): Promise<string> {
  const priceId = STRIPE_PRICES[planType];

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: planType === 'annual' ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app?success=true&plan=${planType}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: {
      planType,
    },
  };

  if (customerId) {
    sessionParams.customer = customerId;
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  return session.url || '';
}

export async function createPortalSession(customerId: string): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/app/settings`,
  });
  return session.url;
}

export interface WebhookResult {
  type: string;
  customerId?: string;
  customerEmail?: string;
  planType?: string;
}

export async function handleWebhookEvent(
  body: string,
  signature: string
): Promise<WebhookResult> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      return {
        type: 'checkout_completed',
        customerId: session.customer as string,
        customerEmail: session.customer_email || session.customer_details?.email || undefined,
        planType: session.metadata?.planType,
      };
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      // Get customer email from Stripe
      let customerEmail: string | undefined;
      if (subscription.customer) {
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        if (customer && !customer.deleted && 'email' in customer) {
          customerEmail = customer.email || undefined;
        }
      }
      return {
        type: 'subscription_canceled',
        customerId: subscription.customer as string,
        customerEmail,
      };
    }
    default:
      return { type: event.type };
  }
}
