import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  constructor() { }

  async ngOnInit() {

    const stripe = await loadStripe('pk_test_JYdiYD82MAZv5rHS6by6mKTn');
    const elements = stripe.elements();

    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
    cardElement.on('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error){
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', event => {
      event.preventDefault();
      stripe.createToken(cardElement).then(result => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log('Token acquired!');
          console.log(result.token);
          console.log(result.token.id);
        }
      });
    });
  }
}
