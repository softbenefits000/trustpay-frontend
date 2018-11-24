<template>
    <div>
        <trustpay-navigation></trustpay-navigation>
        <section>
	<div class="container full-height">
		<div class="row row-margin top-margin-60">
			<div class="col-sm-2 col-md-2"></div>
			<div class="col-sm-8 col-md-8 col-12">
				<div class="card">
					<ul class="nav nav-tabs nav-justified" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" href="#buyer" role="tab" data-toggle="tab">Buyer</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#seller" role="tab" data-toggle="tab">Seller</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#marketplace" role="tab" data-toggle="tab">Marketplace Admin</a>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="buyer">
                            <br />
			          			<h4><strong><strong>Login to TrustPay (Buyer)</strong></strong></h4>
									<div class="alert buyer-alert alert-danger d-none">
									    <a class="close alert-close" aria-label="close" v-on:click="hideAlert">&times;</a>
									    <span class="alert-message-content"></span>
									</div>
									<div class="form-group">
										<label for="buyer_email"><small>Please Enter Your Email Address*</small></label>
										<input type="email" v-model="buyer_email" id="buyer_email" class="form-control" required="required">
									</div>
									<div class="form-group">
										<label for="buyer_password"><small>Please Enter Your Password*</small></label>

										<input type="password" v-model="buyer_password" id="buyer_password" class="form-control" required="required">
										<router-link to="/forgot"><p class="float-right"><em><small>Forgot password</small></em></p></router-link>
									</div>
									
									<div class="form-group">
										<input type="submit" name="button" :value="loginMsg" class="btn btn-dark-blue form-control" v-on:click="buyerLogin" :disabled="isSending">
									</div>
									<hr />
									<p class="text-center"><router-link to="/signup" class="text-info">Register an account</router-link></p>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="seller">
                            <br />
                            <h4><strong><strong>Login to TrustPay (Seller)</strong></strong></h4>
                            <div class="alert seller-alert alert-danger d-none">
                                <a class="close alert-close" aria-label="close" v-on:click="hideAlert">&times;</a>
                                <span class="seller-alert-message-content"></span>
                            </div>

                            <div class="form-group">
                                <label for="seller_email"><small>Please Enter Your Email Address*</small></label>
                                <input type="email" v-model="seller_email" id="seller_email" class="form-control" required="required">
                            </div>
                            <div class="form-group">
                                <label for="seller_password"><small>Please Enter Your Password*</small></label>

                                <input type="password" v-model="seller_password" id="seller_password" class="form-control" required="required">
                                <router-link to="/forgot"><p class="float-right"><em><small>Forgot password</small></em></p></router-link>
                            </div>
                            
                            <div class="form-group">
                                <input type="submit" name="button" :value="loginMsg" class="btn btn-dark-blue form-control btn-seller-login" v-on:click="sellerLogin" :disabled="isSending"/>
                            </div>
                            <hr />
                            <p class="text-center"><router-link to="/signup" class="text-info">Register an account</router-link></p>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="marketplace">
                            <br />
                            <h4><strong><strong>Login to TrustPay (Marketplace Admin)</strong></strong></h4>
                            <div class="form-group">
                                <label for="email"><small>Please Enter Your Email Address*</small></label>
                                <input type="email" name="email" id="email" class="form-control" required="required">
                            </div>
                            <div class="form-group">
                                <label for="password"><small>Please Enter Your Password*</small></label>

                                <input type="password" name="password" id="password" class="form-control" required="required">
                                <router-link to="/forgot"><p class="float-right"><em><small>Forgot password</small></em></p></router-link>
                            </div>
                            
                            <div class="form-group">
                                <input type="submit" name="button" value="Login" class="btn btn-dark-blue form-control" :disabled="isSending">
                            </div>
                            <hr />
                            <p class="text-center"><router-link to="/signup" class="text-info">Register an account</router-link></p>
                        </div>
                    </div>
				</div>
			</div>
			<div class="col-sm-2 col-md-2"></div>
		</div>

	</div>
	
</section>
    </div>
</template>


<script>
//const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            buyer_email: "",
            buyer_password: "",
            seller_email: "",
            seller_password: "",
            isSending: false,
            loginMsg: 'Login',
            endpoint: 'http://18.208.164.251/api'
        };
    },
    methods:{
        sellerLogin: function(){

            this.loginMsg = 'Sending ...';
            this.isSending = true;
            var result = this.validateSellerCredentials();

            if(result == "error"){
                this.loginMsg = 'Login';
                this.isSending = false;
                return;
            }

            //attempt to login
            this.$http.post( this.endpoint +'/seller/login', 
                    {
                        "email" : this.seller_email.trim(),
                        "password" : this.seller_password,
                    }
                )
                .then(
                    response => { //success
                        return response.json();
                    }, 
                    response => { //error
                        return response.json();
                    }
            ).then(
                data => { 
                    console.log(data); 

                    //show error message in alert box - user is not logged in
                    
                    if(data.status == "error" && data.message == "invalid_credentials"){
                        
                        this.showSellerTabAlert('Invalid Credentials');

                    }else if(data.status == "success" && data.message == "login_successful"){

                        //start session and redirect to dashboard here - user is logged in 
                        this.$session.start();
                        this.$session.set('trustpayauthtoken', data.data.token);
                        this.$session.set('stanbic_trustpay_user_role', 'seller');

                        this.$http.get(this.endpoint +'/seller/account', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
                        .then( 
                            response => { //success
                                return response.json();
                            }, 
                            response => { //error
                                
                                console.log("err");
                                console.log(response);

                                return response.json();
                            }
                        )
                        .then(user => { 
                            console.log("User details");
                            console.log(user);
                            if(user.status == "success" && user.message == "seller_details"){
                                
                                //if user is not verified, take to verification page
                                if(user.data.verified == 0){
                                    this.$router.push('/myescrow/verify');
                                }else{
                                    this.$router.push('/myescrow/welcome');
                                }
                                
                            }else{
                                this.$session.destroy();
                                this.$router.push('/login');
                            }
                            
                            }
                        );    
    

                        //Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
                        //this.$router.push('/myescrow/welcome');

                    }else{

                        //did not login for other reason. Some things we may not have prepared for.
                        //this.showSellerTabAlert('Something went wrong. Could not login at this time.');
                        this.showSellerTabAlert(data.message);

                    }
                    
                    this.isSending = false;
                    this.loginMsg = 'Login';
                    
                }
            );

        },
        buyerLogin: function () {
            this.loginMsg = 'Sending ...';
            this.isSending = true;
            var result = this.validateBuyerCredentials();

            if(result == "error"){
                this.loginMsg = 'Login';
                this.isSending = false;
                return;
            }

            //attempt to login
            this.$http.post( this.endpoint +'/customer/login', 
                            {
                                "email" : this.buyer_email.trim(),
				                "password" : this.buyer_password,
                            }
                        )
                        .then(
                            response => { //success
                                console.log(response);
                                return response.json();
                            }, 
                            response => { //error
                                console.log(response);
                                return response.json();
                            }
                    ).then(
                        data => { 
                            console.log(data); 

                            //show error message in alert box - user is not logged in
                            if(data.status == "error" && data.message == "invalid_credentials"){
                                
                                this.showBuyerTabAlert('Invalid Credentials');

                            }else if(data.status == "success" && data.message == "login_successful"){

                                //start session and redirect to dashboard here - user is logged in 
                                this.$session.start();
                                this.$session.set('trustpayauthtoken', data.data.token);
                                this.$session.set('stanbic_trustpay_user_role', 'buyer');
                                //Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token
                                this.$router.push('/myescrow/welcome');

                            }else{

                                //did not login for other reason. Some things we may not have prepared for.
                                //this.showBuyerTabAlert('Something went wrong. Could not login at this time.');
                                this.showBuyerTabAlert(data.message);

                            }
                            this.loginMsg = 'Login';
                            this.isSending = false;
                        }
                    );

        },
        hideAlert: function(){
            $(".alert").addClass("d-none");
        },
        showBuyerTabAlert: function(message){

            $(".alert").addClass("d-none");
            $(".buyer-alert").removeClass("alert-success").addClass("alert-danger");
            $(".buyer-alert").removeClass("d-none");
            $(".alert-message-content").text(message);

        },
        showSellerTabAlert: function(message){

            $(".alert").addClass("d-none");
            $(".seller-alert").removeClass("alert-success").addClass("alert-danger");
            $(".seller-alert").removeClass("d-none");
            $(".seller-alert-message-content").text(message);

        },
        validateEmail: function(email){

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        return re.test(String(email).toLowerCase());

        },
        validateBuyerCredentials: function(){
            //validate email address on client side
            if( ! this.validateEmail(this.buyer_email.trim()) ) {

                this.showBuyerTabAlert('The email must be of the valid format');
                return "error";
            }

            //validate password on client side
            if(this.buyer_password.trim() == ""){

                this.showBuyerTabAlert('The password should be at least six characters');
                return "error";

            }
        },
        validateSellerCredentials: function(){
            //validate email address on client side
            if( ! this.validateEmail(this.seller_email.trim()) ) {
                this.showSellerTabAlert('The email must be of the valid format');
                return "error";
            }

            //validate password on client side
            if(this.seller_password.trim() == ""){

                this.showSellerTabAlert('The password should be at least six characters');
                return "error";

            }
        }
    },
    beforeCreate: function () {
        
        if (this.$session.exists()) {
            this.$router.push('/myescrow/welcome');
        }

    }
}
</script>



<style type="text/css">

section{
	background: #F7FCFC;
}
.alert-close{cursor: pointer;}
.card{
	margin-top: 80px;
}
label{
	font-weight: 300;
	padding: 0px;
	font-family: 'Alegreya Sans', sans-serif;
}
input.btn-dark-blue:disabled, input.btn-dark-blue.disabled{
    background-color: gray !important;
    border-color: gray !important;
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



