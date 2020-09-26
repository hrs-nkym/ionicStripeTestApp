import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from '@aws-amplify/auth';
import { loadStripe, StripeCardElement } from '@stripe/stripe-js';

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
    this.http.get(this.apiGateway)
    .subscribe(async (res) => {
      let json = JSON.stringify(res);
      let _json = JSON.parse(json);
      let j = JSON.parse(_json.body);
      let client_secret = j.client_secret;
      console.log(client_secret);

      let StripeCardElement = '4242424242424242'
      let stripe = await loadStripe(this.PUBLIC_KEY);
      let confirmRes = await stripe.confirmCardPayment(client_secret, {
        // payment_method: {
          // card: document.getElementById('card'),
          // card: {a : a},
          // billing_details: {
          //   // name: res.data.metadata.username,
          // }
        // }
      });

      console.log(confirmRes.paymentIntent.status);
        // if (confirmRes.paymentIntent.status === "succeeded") {
        //   console.log("決済完了");
        // }

    });

    // this.http.get(`${this.apiGateway}`, this.httpOptions).toPromise()
    // .then((res) => {
    //   console.log(JSON.stringify(res));
    // }).catch(this.errorHandler);
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
