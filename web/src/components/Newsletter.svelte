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
	.content {
		max-width: 76rem;
		margin-left: auto;
		margin-right: auto;
	}
	form {
		display: block;
		margin: 50px auto;
		width: 60%;
		position: relative;
		overflow: hidden;
		background-color: #F6F6F2;
		border-radius: 5px;
		padding: 50px;
		background-color: #fff;
		background-size: 100% 1em;
	}	
	div.mce-responses {
		color: var(--primary);
		padding: 0em .5em 0em .5em;
		overflow: hidden;
		width: 90%;
		clear: both;
	}
	input {
		border: 1px solid #ABB0B2;
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 3px;
	}
	input[type="email"] {
		margin: 0;
		color: #999;
		padding: 15px !important;
		text-align: center;
		width: 100% !important;
		outline: none;
		/* border: .5px dashed var(--gray); */
		border-radius: 7px;
		box-shadow: 0 0 1px var(--gray);
		font-size: 14px;
		background-color: #fff;
	}
	input[type="email"]::-webkit-input-placeholder {
		color: var(--gray);
	}
	input[type="email"]:-moz-placeholder {
		color: var(--gray);
	}
	input[type="email"]::-moz-placeholder {
		color: var(--gray);
	}
	input[type="email"]:-ms-input-placeholder {
		color: var(--gray);
	}
	input[type="submit"] {
		margin: 0.25em 0 ;
		background-color: #83B3DB;
		color: #fff;
		padding: 16px !important;
		text-align: center;
		width: 100%;
		outline: none;
		border: 0;
		text-transform: uppercase;
		font-size: 13px;
		cursor: pointer;
		-webkit-transition: .1s all ease-in-out;
		-moz-transition: .1s all ease-in-out;
		-o-transition: .1s all ease-in-out;
		transition: .1s all ease-in-out;
	}
	input[type="submit"]:hover {
		background-color: #F29B91;
		box-shadow: 0px 0px 0px 1px #F29B91;
	}
</style>

<svelte:head>
<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback" async defer></script>	
</svelte:head>

<div class="wrapper">
	<div class="content">
	<h3>Stay current with all things happening at Grace Baptist Church of Blue Bell</h3>
	<form 
	  name="mc-embedded-subscribe-form"
	  on:submit|preventDefault="{handleSubmit}"
	>
		<input on:input="{(e)=> showErr ? showErr=false : false}" on:click="{(e)=> showErr ? showErr=false : false}" bind:value={email} type="email" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="please enter your email address">
		<input type="submit" value="Subscribe" name="subscribe" class="button">
		{#if false}
		  <div id="captcha" class="g-recaptcha" data-sitekey="{recaptchaApi}" data-callback="onloadCallback"/>
		{/if}
		{#if subscribed}
		  <div class="mce-responses">
			<h3 transition:fade="{{duration: 2000, delay: 500}}">{email}, Thanks For Signing Up!</h3>
		  </div>
		{/if}
		{#if showErr}
		<div class="mce-responses">
			<span><p transition:fade>{`${msg}`}</p></span>
		</div>
		{/if}		
	  </form>
  	</div>
</div>
