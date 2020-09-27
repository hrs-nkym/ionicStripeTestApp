import { Component } from '@angular/core';
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

  payApiGateway = 'https://0tmjrphch5.execute-api.ap-northeast-1.amazonaws.com/stripeTestApiStage';
  subApiGateway = 'https://i3y26vlp3i.execute-api.ap-northeast-1.amazonaws.com/sub';

  httpOptions = null;
  email = 'local@leafhub.me';
  price = 'price_1HVWvZAaZtYZzHLQEbAG9oNQ';

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

      stripe.createToken(cardElement).then(async (result) => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          return;
        } else {
          // console.log('Token : ' + result.token.id);

          const resPaymentMethod = await stripe.createPaymentMethod({
            type: 'card',
            card: { token: result.token.id },
            billing_details: {
              email: this.email,
            }
          });

          if (resPaymentMethod.error) {
            console.log(resPaymentMethod.error.message);
          } else {

            const body = {
              payment_method: resPaymentMethod.paymentMethod.id,
              email: this.email,
              price: this.price
            };

            this.http.post(this.subApiGateway, body)
              .subscribe((response) => {
                const res = JSON.stringify(response);
                const json = JSON.parse(res);
                // tslint:disable-next-line:no-shadowed-variable
                const body = JSON.parse(json.body);

                const status = body.status;
                const client_secret = body.client_secret;

                if (status === 'requires_action') {
                  stripe.confirmCardPayment(client_secret).then( async (pay) => {
                    if (pay.error) {
                      console.log('There was an issue!');
                      console.log(pay.error);
                    } else {
                      console.log('You got the money!');
                    }
                  });
                } else {
                  console.log('You got the money!');
                }
              });
          }
        }
      });
    });
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
