import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, ModalController } from '@ionic/angular';
import { PayPlanSuccessPage } from '../../../pay-plan-success/pay-plan-success.page';

import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from '@aws-amplify/auth';
import { loadStripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { PayPlanCancelPage } from '@/app/pay-plan-cancel/pay-plan-cancel.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  subApiGateway = 'https://runivwwps5.execute-api.ap-northeast-1.amazonaws.com/subscription';

  httpOptions = null;
  email = 'local@leafhub.me';
  price = 'price_1HPjDaIwodtssiRUflmi6jRb';
  gid = 'gid_local_xxxxxx';
  name = 'leafhub,local';

  PUBLIC_KEY = 'pk_test_51HMwm1IwodtssiRUiAReBUUSSXMqnwVFNcmnt3f4qYfO395RepPKWjChbtEHPn0PelhtCl7u9iQwloPwqbRGmvTr00Vqo1nldi';
  DOMAIN = window.location.hostname;

  constructor(
    public loadingController: LoadingController,
    public modalController: ModalController,
    private amplifyService: AmplifyService,
    private http: HttpClient,
    private router: Router,
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
    this.stripeInitialize();
  }

  async stripeInitialize() {

    const stripe = await loadStripe(this.PUBLIC_KEY);
    const elements = stripe.elements();
    const style = {
      base: {
        iconColor: '#666ee8',
        color: '#31325f',
        fontWeight: '400',
        fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontSize: '15px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#aab7c4',
        },
        ':-webkit-autofill': {
          color: '#666ee8',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#31325f',
        },
      },
    };
    const cardElement = elements.create('card', {style, hidePostalCode: true} );

    cardElement.mount('#card-element');

    cardElement.on('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error){
        displayError.textContent = event.error.message;
        displayError.classList.add('visible');
      } else {
        displayError.classList.remove('visible');
      }
    });

    const paymentForm = document.getElementById('payment-form');

    paymentForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // 1, stripe token
      stripe.createToken(cardElement).then(async (result) => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          return;
        } else {
          // 2, payment method
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
              price: this.price,
              gid: this.gid,
              name: this.name
            };

            // 3, call lambda.
            const loading = await this.loadingController.create({
              message: 'Loading...',
            });
            await loading.present();
            this.http.post(this.subApiGateway, body, this.httpOptions)
              .subscribe(async (res) => {
                const json = JSON.stringify(res);
                const data = JSON.parse(json);
                // tslint:disable-next-line:no-shadowed-variable
                const body = JSON.parse(data.body);
                const status = body.status;
                const client_secret = body.client_secret;

            /*
                lambda:
                  4, create customer(email, invoice setting(payment method))
                  5, create subscription(customer.id, items[{price-id}], latest_invoice.payment_intent)
                  return:
                  - status : subscription.latest_invoice.payment_intent.status
                  - client_secret : subscription.latest_invoice.payment_intent.client_secret
            */

                if (status === 'requires_action') { //
                  // 6, confirm card payment.
                  const { paymentIntent, error } = await stripe.confirmCardPayment(client_secret);
                  if (error) {
                    // Handle error here
                    console.log('There was an issue!');
                    loading.dismiss();
                    this.presentModal();
                  } else if (paymentIntent && paymentIntent.status) {
                    // Handle successful payment here
                    // 7, complate.
                    // return_url : 'https://example.com/return_success_url'
                    console.log('You got the money!');
                    loading.dismiss();
                    this.presentModal();
                  }
                } else {
                  // 7, complate.
                  // return_url : 'https://example.com/return_success_url'
                  console.log('You got the money!');
                  loading.dismiss();
                  this.presentModal();
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: PayPlanSuccessPage,
    });
    return await modal.present();
  }

  cancelClick(page: any) {
    console.log('caceled!');
    this.router.navigate(['/pay-plan-cancel'], {queryParams: {hoge: 1}});
  }
}
