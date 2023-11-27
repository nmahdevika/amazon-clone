import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';
import { Cart } from './Cart.model';

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe   = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });  
  }

  checkout(cart: Cart) {
    const totalPrice = cart.reduce((acc, item) => {
      return acc + item.price*item.quantity;
    }, 0)

    return this.stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'usd',
      payment_method_types: ['card'],
    })
  }
}
