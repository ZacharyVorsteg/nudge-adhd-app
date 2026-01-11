import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, PlanType } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planType, customerId } = body;

    if (!planType || !['lifetime', 'annual'].includes(planType)) {
      return NextResponse.json(
        { error: 'Invalid plan type' },
        { status: 400 }
      );
    }

    const checkoutUrl = await createCheckoutSession(
      planType as PlanType,
      customerId
    );

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
