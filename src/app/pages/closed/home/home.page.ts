import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from '@aws-amplify/auth';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  apiGateway = 'https://0tmjrphch5.execute-api.ap-northeast-1.amazonaws.com/stripeTestApiStage';
  card = null;
  httpOptions = null;

  PUBLIC_KEY = 'pk_test_JYdiYD82MAZv5rHS6by6mKTn';
  DOMAIN = window.location.hostname;
  PLAN_ID = 'price_1HQSFCAaZtYZzHLQg6xUA0V6';

  constructor(
    private amplifyService: AmplifyService,
    private http: HttpClient
  ) {
    Auth.currentSession()
      .then((session) => {
        this.setAuthorization(session.getIdToken().payload['cognito:username']);
      }).catch((err) => {
        console.log(err);
      });

    this.httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', ''),
      body: {}
    };
  }

  async paymentIntent() {

    const stripe = await loadStripe(this.PUBLIC_KEY);
    const elements = stripe.elements({});
    const cardElement = elements.create('card', {});

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

    paymentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      stripe.createToken(cardElement).then((result) => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log('Token acquired!');
          console.log(result.token);
          console.log(result.token.id);

          this.http.post(this.apiGateway, this.httpOptions )
            .subscribe( async (res) => {

              const response = JSON.stringify(res);
              const json = JSON.parse(response);
              const body = JSON.parse(json.body);

              console.log('client_secret: ' + body.client_secret);

              stripe.confirmCardPayment(body.client_secret, {
                payment_method: {
                  card: { token: result.token.id },
                  billing_details: {
                    name: 'leafhub.'
                  }
                }
              }).then((paymentIntent) => {
                console.log('paymentIntent: ' + JSON.stringify(paymentIntent));
              }).catch((error) => {
                console.log('error: ' + JSON.stringify(error));
              });
            });
        }
      });
    });


  }

  async redirectToCheckout() {
    try {
      const stripe = await loadStripe(this.PUBLIC_KEY);
      stripe.redirectToCheckout({
        mode: 'payment',
        lineItems: [{price: this.PLAN_ID, quantity: 1}],
        successUrl: 'https://' + this.DOMAIN ,
        cancelUrl: 'https://' + this.DOMAIN
      })
      .then(this.handleResult);
    } catch (error) {
      this.errorHandler(error);
    }
  }

  private handleResult(result) {
    console.log('Result: -> ', result);
  }

  private errorHandler(err) {
    console.log('Error: -> ', err);
    return Promise.reject(err.message || err);
  }

  public setAuthorization(token: string = null): void {
    if (!token) {
      return;
    }
    const bearerToken = `Bearer ${token}`;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', bearerToken);
  }

  onSignOutButtonClicked() {
    this.amplifyService.auth().signOut();
  }
}
