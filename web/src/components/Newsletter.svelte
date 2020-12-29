<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition'
	import { apiEndpoint, recaptchaApi } from '../utils/util'

	let email = "";
	let subscribed = false;
    let showErr = false;
    let msg = "";

	onMount(() => {
  		window.onloadCallback = onloadCallback;
	})
	/*
	onDestroy(() => {
  		window.onloadCallback = null;
	})
	*/

	var onloadCallback = function() {
		grecaptcha.render('captcha', {
          'sitekey' : recaptchaApi
        });		
	};

	async function validate() {
		if (email === '') {
			return false
		}

		let valid = false
		await fetch(`${apiEndpoint}validate/email/${email}`)
		.then((response) => response.json().then(res => ({status:response.status, data:res})))
        .then(res => {
            if(res.status == 200){
				//...added
				valid = res.data.valid
			}else{
                //...error
            }
        })
        .catch(err => {
            console.log(`${err}`)
        });
		return valid;
	}

	async function validateCaptcha(response){
		var response = grecaptcha.getResponse();

		if(response.length == 0) { 
			//reCaptcha not verified
			return false;
		}

		const serverResponse = await fetch(`${apiEndpoint}validate/recaptcha?response=${response}`, {
			method: 'POST'})
			.then(res => res.json())
			.catch(err => {
				//error
				return false
			})
		return serverResponse.success
	}
	
	async function addSubscriber(){
		const response = await fetch(`${apiEndpoint}mailchimp/addListMember/c6ace2212d?email=${email}`, {
			method: 'POST'
        }).then((response) => response.json().then(res => ({status:response.status, data:res})))
        .catch(err => {
            console.log(`${err}`)
        });

		return response
	}

	async function handleSubmit(event) {
		// const captcha = await validateCaptcha()
		const captcha = true
		if(!captcha) {
			showErr = true
			msg = `Please verify you are not a robot.`
			return
		}

		const valid = await validate()
		if (valid){
			const res = await addSubscriber()
			.then(res => {
				if(res.status == 201){
					//...added
					subscribed = true
				}else{
					//...error
					showErr = true
					if(res.data.error.text.title === 'Member Exists') {
						msg = `${email} is already subscribed!`
					}else{
						msg = `${email} there was an error.`
					}
				}
			})
			.then(() => {
				if(!subscribed){
					email = ''
				}
			})
			.catch(err => {
            	console.log(`${err}`)
        	});
		} else {
			//...error
			showErr = true
			msg = `${email} is not a valid email address.`
		}
	}
</script>
<style>
	.wrapper {
		clear: left;
		font: 14px Helvetica,Arial,sans-serif;
	}
	/*
	.container {
		background: var(--grey);
	}
	*/
	.content {
		max-width: 76rem;
		margin-left: auto;
		margin-right: auto;
	}
	form {
		display: block;
		position: relative;
		text-align: left;
		padding: 10px 0 10px 3%;
	}	
	.mc-field-group {
		clear: left;
		position: relative;
		width: 96%;
		padding-bottom: 3%;
		min-height: 50px;
	}
	div.mce-responses {
		float: left;
		background-color: var(--red);
		color: var(--white);
		/* top: -1.4em; */
		padding: 0em .5em 0em .5em;
		overflow: hidden;
		width: 90%;
		/* margin: 0 5%; */
		clear: both;
	}
	.mc-field-group input {
		display: block;
		width: 100%;
		padding: 8px 0;
		text-indent: 2%;
	}
	input {
		border: 1px solid #ABB0B2;
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 3px;
	}
	/*
	input:invalid {
		border: 1px solid red;
	}
	*/
	/*
	input:valid {
		border: 1px solid black;
	}
	*/
	.indicates-required {
		text-align: right;
		font-size: 11px;
		margin-right: 4%;
	}
	.button {
		clear: both;
		background-color: var(--primary);
		border: 0 none;
		border-radius: 4px;
		transition: all 0.23s ease-in-out 0s;
		color: var(--white);
		cursor: pointer;
		display: inline-block;
		font-size: 15px;
		font-weight: normal;
		height: 32px;
		line-height: 32px;
		margin: 0 5px 10px 0;
		padding: 0 22px;
		text-align: center;
		text-decoration: none;
		vertical-align: top;
		white-space: nowrap;
		width: auto;
	}
</style>

<svelte:head>
<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback" async defer></script>	
</svelte:head>

<div class="wrapper">
	<div class="content">
	{#if !subscribed}
	<h3>Stay current with all things happening at Grace Baptist Church of Blue Bell</h3>
	<form 
	  name="mc-embedded-subscribe-form"
	  on:submit|preventDefault="{handleSubmit}"
	>
        <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
        <div class="mc-field-group">
          <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span></label>
          <input on:input="{(e)=> showErr ? showErr=false : false}" on:click="{(e)=> showErr ? showErr=false : false}" bind:value={email} type="email" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="you@email.com">
        </div>
        <div>
			{#if showErr}
			<div class="mce-responses">
			  <span><p transition:fade>{`${msg}`}</p></span>
			</div>
			{/if}
			<div id="captcha" class="g-recaptcha" data-sitekey="{recaptchaApi}" data-callback="onloadCallback"/>
			<input type="submit" value="Subscribe" name="subscribe" class="button">
		</div>
		<!--
		<div class="mce-responses">
		  <div class="response {showErr || showSuccess ? ' show' : ''}">
		</div>
		-->
	</form>
	{:else}
	  <h3 transition:fade="{{duration: 2000, delay: 500}}">{email}, Thanks For Signing Up!</h3>
	{/if}
  	</div>
</div>
