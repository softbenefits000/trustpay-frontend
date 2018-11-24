<template>
    <div>
        <trustpay-navigation></trustpay-navigation>
        <section>
	<div class="container full-height">
		<div class="row row-margin top-margin-60">
			<div class="col-sm-2 col-md-3"></div>
			<div class="col-sm-8 col-md-6 col-12">
				<div class="card text-center" v-if="!confirmed">
					<!--
						<h3>Your Email has been confirmed!</h3>
						<p>Click <router-link to="/login">here</router-link> to login</p>
					-->
					<h3>Verify your phone number</h3>
					<p>Click on 'Send OTP' to get an OTP sent to your phone. Use this for verification</p>
					<input type="text" class="form-control" v-model="otp" placeholder="Write OTP here"/>
					<span style="font-size: 12px; text-align: left;" class="text-warning" v-if="otpSendFirst">Didn't get Otp? Try Again</span>
					<span style="font-size: 12px; text-align: left;" class="text-danger" v-if="hasError">Input field cannot be empty</span>
					<span style="font-size: 12px; text-align: left;" class="text-danger" v-if="hasOtpSendError">Error. Could not send otp</span>
					<br />
					<div class="form-group">
					<button class="btn btn-primary" v-on:click="sendOtp" :disabled="isDisabled">{{this.sendOtpText}}</button>
					&nbsp;&nbsp;
					<button class="btn btn-primary" v-on:click="submitOtp" :disabled="confirmDisabled">Submit</button>
					</div>
				</div>
				<div class="card text-center" v-else>
					<h3>Your Account has been confirmed!</h3>
					<p>Click <router-link to="/login">here</router-link> to login</p>
				</div>
			</div>
			<div class="col-sm-2 col-md-3"></div>
		</div>

	</div>
	
</section>
    </div>
</template>



<style type="text/css">

section{
	background: #F7FCFC;
}
.card{
	margin-top: 80px;
}
label{
	font-weight: 300;
	padding: 0px;
	font-family: 'Alegreya Sans', sans-serif;
}
.form-control{
		outline: none;

		box-shadow: none;

		-webkit-appearance: none;
	    -moz-appearance: none;
	    -ms-appearance: none;
	    -o-appearance: none;
	}
	.form-group{
		margin-bottom: 25px !important;
	}
	form p a{
		text-decoration: underline;
	}

</style>


<script>
const endpoint = 'http://18.208.164.251/api';

export default {
	data(){
        return{
			otp: "",
			otpSendFirst: false,
			sendOtpText: "Send OTP",
			isDisabled: false,
			confirmDisabled: false,
			confirmed: false,
			hasError: false,
			hasOtpSendError: false
        };
    },
    methods: {
		submitOtp: function(){
			if(this.otp.trim() == "" || this.otp == null){
				this.hasError = true;
				return;
			}
			var confirmOtpEndpoint = endpoint +'/customer/confirmation/'+ this.$route.params.token +'/'+this.otp;

			this.confirmDisabled = true;

			if(this.$route.params.role == "seller"){

				confirmOtpEndpoint = endpoint +'/seller/confirmation/'+ this.$route.params.token +'/'+this.otp;

				this.$http.get(confirmOtpEndpoint)
            	.then( 
					response => { //success
						return response.json();
					}, 
					response => { //error
						return response.json();
					}
				)
				.then(response => { 
					console.log(response);
					if(response.status == "success" && response.message == "seller_verified"){
						this.confirmed = true;
						this.confirmDisabled = false;
					}else{
						this.confirmDisabled = false;
						alert("Error. Could not confirm token")
					}
					
				});

			}
		},
		sendOtp: function(){
			
			this.sendOtpText = "Sending...";
			this.isDisabled = true;

			var sendOtpEndpoint = endpoint +'/customer/sendToken/'+ this.$route.params.token;

			if(this.$route.params.role == "seller"){

				sendOtpEndpoint = endpoint +'/seller/sendToken/'+ this.$route.params.token;

				this.$http.get(sendOtpEndpoint)
            	.then( 
					response => { //success
						return response.json();
					}, 
					response => { //error
						return response.json();
					}
				)
				.then(response => { 
					console.log(response);
					if(response.status == "success" && response.message == "token_generated"){
						this.sendOtpText = "Resend OTP";
						this.hasError = false;
						this.otpSendFirst = true;
						this.isDisabled = false;
					}else{
						this.otpSendFirst = false;
						this.hasOtpSendError = true;
						this.sendOtpText = "Send OTP";
						this.isDisabled = false;
					}
					
				});

			}

			
		},
	},
    beforeCreate: function () {
	/*
	    var userDetailsEndpoint = endpoint +'/customer/confirmation/'+ this.$route.params.token;

        if(this.$route.params.role == "seller"){
            userDetailsEndpoint = endpoint +'/seller/confirmation/'+ this.$route.params.token;
        }

        this.$http.get(userDetailsEndpoint)
            .then( 
                response => { //success
                    return response.json();
                }, 
				response => { //error
					return response.json();
                    //this.$router.push('/login');
                }
            )
            .then(user => { 
				console.log("user details");
				console.log(user);
                if(user.status == "success" && (user.message == "customer_verified" || user.message == "seller_verified")){
                    console.log("stats -- good ");
                }else{
					console.log("stats -- bad");
                    //alert("Error. Could not fetch user at this time");
                    //this.$router.push('/login');
                }
                
                }
            );

    
	
	
	
	*/
	}
}
</script>




