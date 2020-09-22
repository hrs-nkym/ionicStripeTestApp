import { Component } from '@angular/core';
import { AmplifyService } from "aws-amplify-angular";

import { loadStripe } from "@stripe/stripe-js";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import Auth from "@aws-amplify/auth"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  apiGateway: string = 'https://0tmjrphch5.execute-api.ap-northeast-1.amazonaws.com/stripeTestApiStage'

  httpOptions: any = {
    headers: new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", ""),
    body: {}
  }

  constructor(
    private amplifyService: AmplifyService,
    private http: HttpClient
  ) {
    Auth.currentSession()
    .then((session)=>{
      this.setAuthorization(session.getIdToken().payload["cognito:username"]);
    }).catch((err)=>{
      console.log(err); 
    });
  }

  onSignOutButtonClicked() {
    this.amplifyService.auth().signOut();
  }

  httpCall() {
    this.http.get(`${this.apiGateway}`, this.httpOptions).toPromise()
    .then((res) => {
      const response: any = res;
      console.log(response);
      return response;
    }).catch(this.errorHandler);
  }

  async stripePaymentRedirect() {
   const PUBLISHABLE_KEY = 'pk_test_JYdiYD82MAZv5rHS6by6mKTn';
   const DOMAIN = window.location.hostname;
   const SUBSCRIPTION_BASIC_PLAN_ID = 'price_1HQSFCAaZtYZzHLQg6xUA0V6';

   try {
     const stripe = await loadStripe(PUBLISHABLE_KEY);
     stripe.redirectToCheckout({
       mode: 'payment',
       lineItems: [{price: SUBSCRIPTION_BASIC_PLAN_ID, quantity: 1}],
       successUrl: 'https://' + DOMAIN ,
       cancelUrl: 'https://' + DOMAIN
     })
       .then(this.handleResult);
   } catch (error) {
     console.error('checkout() try catch error', error);
   }
 }

 card = null;

 async stripePaymentIntent() {
  const PUBLISHABLE_KEY = 'pk_test_JYdiYD82MAZv5rHS6by6mKTn';
  const DOMAIN = window.location.hostname;
  const SUBSCRIPTION_BASIC_PLAN_ID = 'price_1HQSFCAaZtYZzHLQg6xUA0V6';

  try {
    const stripe = await loadStripe(PUBLISHABLE_KEY);
    const elements = stripe.elements();
    const card = elements.create("card");
    this.card.mount("#card-element");
    this.card.addEventListener('change', () => {
      // const displayError = this.$refs.cardErrors
    });

    stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{price: SUBSCRIPTION_BASIC_PLAN_ID, quantity: 1}],
      successUrl: 'https://' + DOMAIN ,
      cancelUrl: 'https://' + DOMAIN
    })
      .then(this.handleResult);
  } catch (error) {
    console.error('checkout() try catch error', error);
  }
 }

 private errorHandler(err) {
   console.log('Error Occured.', err);
   return Promise.reject(err.message || err);
 }

 private handleResult(result) {
   console.log('handleResult()', result);
 }

 public setAuthorization(token: string = null): void {
  if (!token) {
    return;
  }
  const bearerToken: string = `Bearer ${token}`;
  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', bearerToken);
 }
}
