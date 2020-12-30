<script>
    import {loadStripe} from '@stripe/stripe-js';
    import { apiEndpoint, stripePK } from '../utils/util'
    import { onMount } from 'svelte';

    let stripe = null;
    let card = null;
    let fullname;
    let email;
    let amount

    onMount(async () => {
        stripe = await loadStripe(stripePK);

        var elements = await stripe.elements();
        card = await elements.create('card');
        // mount the card to the dom
        card.mount("#card-element");

        card.on('change', ({error}) => {
        let displayError = document.getElementById('card-errors');
        if (error) {
            displayError.textContent = error.message;
        } else {
            displayError.textContent = '';
        }
        });
    });

    async function handlePayment() {
        // code to charge the card. Call
        const secret = await getPaymentIntent()
        // now that you mounted the stripe credit card Elment. Collect credit
        // card details and submit it to stripe to process the payment using
        // their api confirmCardPayment

        console.log(JSON.stringify(secret));

        stripe.confirmCardPayment(secret, {
            payment_method: {
                // the stripe card element has the credit card data
                card: card,
                billing_details: {
                    name: fullname,
                    email: email
                }
            }
        }).then(function(result) {
            if (result.error) {
                console.log(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // update db, send emails to customer and admin...etc
                    console.log('Success');
                }
            }
        });
    }

    async function getPaymentIntent(){
        var response = await fetch(`${apiEndpoint}payment?name=${fullname}&email=${email}&amount=${amount}`, {
            method: 'POST'})
        .then(function(response) {
            return response.json();
        }).then(function(responseJson) {
            var clientSecret = responseJson.client_secret;
            return clientSecret;
        });

        return response;
    }
</script>

<form on:submit|preventDefault={handlePayment}>
    <div class="form-row inline">
        <div class="col">
          <label for="name">
            Name
          </label>
          <input bind:value={fullname}  id="name" name="name" placeholder="Jenny Rosen" required/>
        </div>
        <div class="col">
          <label for="email">
            Email Address
          </label>
          <input bind:value={email}  id="email" name="email" type="email" placeholder="jenny.rosen@example.com" required/>
        </div>
        <div class="col">
            <label for="amount">
              Amount
            </label>
            <input bind:value={amount} id="amount" name="amount" type="number" min="0.01" step="0.01" max="2500" required/>
        </div>
    </div>
    <div class="form-row inline">
        <div class="col">
            <div id="card-element">
                <!-- Elements will create input elements here -->
            </div>
        </div>

        <!-- We'll put the error messages in this element -->
        <div id="card-errors" role="alert"></div>

        <button id="submit">Pay </button>
    </div>
</form>