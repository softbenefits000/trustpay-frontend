<template>
    <div>
        <trustpay-navigation></trustpay-navigation>
        <section>
            <div class="container full-height">
                <div class="row row-margin top-margin-60">
                    <div class="col-sm-2 col-md-2"></div>
                    <div class="col-sm-8 col-md-8 col-12">
                        <div class="card">
                            <div id="buyer">
                                <br />
                                <h4><strong><strong>Sign up to TrustPay (Buyer)</strong></strong></h4>
                                <div class="alert buyer-alert alert-danger d-none">
                                    <a class="close alert-close" aria-label="close" v-on:click="hideAlert">&times;</a>
                                    <span class="alert-message-content"></span>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="name"><small>Please Enter Your First Name*</small></label>
                                            <input type="text" v-model="buyer_first_name" class="form-control" required="required" minlength="3">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group"><label><small>Please Enter Your Last Name*</small></label>
                                            <input type="text" v-model="buyer_last_name" class="form-control" required="required" minlength="3">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="email"><small>Please Enter Your Email Address*</small></label>
                                            <input type="email" v-model="buyer_email" class="form-control"  :readonly="'true'">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="phone"><small>Please Enter Your Phone Number*</small></label>
                                            <input type="text" v-model="buyer_phone" class="form-control" :readonly="'true'" maxlength="14">
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="password"><small>Please Select A Password*</small></label>

                                            <input type="password" v-model="buyer_password" class="form-control" required="required">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="password_confirmation"><small>Please Confirm Your Password*</small></label>

                                            <input type="password" v-model="buyer_password_confirmation" class="form-control" required="required">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="pin"><small>Please Select A 4 digit Pin*</small></label>

                                            <input type="password" v-model="buyer_pin" class="form-control" required="required" maxlength="4">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="pin_confirmation"><small>Please Confirm Your Pin*</small></label>

                                            <input type="password" v-model="buyer_pin_confirmation"  class="form-control" required="required" maxlength="4">
                                        </div>
                                    </div>
                                </div>
                                <!--<div class="g-recaptcha" data-sitekey="6LeupmUUAAAAAHp1P_V85fzkWxWd0xh3VL_cqKkS" data-callback="buyerRecaptchaCallback"></div>-->
                                <vue-recaptcha class="g-recaptcha-div" sitekey="6LeupmUUAAAAAHp1P_V85fzkWxWd0xh3VL_cqKkS" @verify="buyerRecaptchaCallback"></vue-recaptcha>
                                <input type="submit" name="button" :value="registerMsg" class="btn btn-dark-blue form-control btn-customer-register" v-on:click="buyerRegister" disabled="disabled"/>
                                <br /><br />
                                <p class="text-center"><small>By registering you agree to TrustPay's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a> .</small></p>
                                
                                <hr />
                                <p class="text-center"><router-link to="/login" class="text-info">Already have an account? Log in</router-link></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2 col-md-2"></div>
                </div>
                <br /><br /><br /><br />
            </div>
            
        </section>
    </div>
</template>


<script>
const endpoint = 'http://18.208.164.251/api';
import VueRecaptcha from 'vue-recaptcha';
export default {
    data(){
        return{
            buyer_first_name: "",
            buyer_last_name: "",
            buyer_email: this.$route.params.email,
            buyer_phone: this.$route.params.phone,
            buyer_password: "",
            buyer_password_confirmation: "",
            buyer_pin: "",
            buyer_pin_confirmation: "",

            isSending: false,
            registerMsg: 'Sign up'
        };
    },
    components: { VueRecaptcha },
    methods:{
        buyerRegister: function(){

            this.registerMsg = "Sending ...";
            $('#buyer input[type="submit"]').attr('disabled', 'disabled');

            var status = this.validateBuyerCredentials();
            if(status == "error") {
                this.registerMsg = "Sign up";
                $('#buyer input[type="submit"]').removeAttr('disabled');
                return;
            }
            //attempt to register
            this.$http.post( endpoint +'/customer/register', 
                    {
                        "firstname": this.buyer_first_name,
                        "lastname": this.buyer_last_name,
                        "phone_number": this.buyer_phone,
                        "email": this.buyer_email,
                        "password": this.buyer_password,
                        "password_confirmation": this.buyer_password_confirmation,
                        "PIN": this.buyer_pin,
                        "ip_address": "192.168.88.46",
                        "device_type": "iPhone",
                        "device_version": "10.4"
                    }
                )
                .then(
                    response => { //success
                        return response.json();
                    }, 
                    response => { //error
                    console.log(response);
                        return response.json();
                    }
            ).then(
                data => { 
                    console.log(data); 

                    if(data["status"] == "success" && data["message"] == "customer_registered"){
                        //show success message
                        this.showBuyerTabSuccessAlert('A verification email has been sent to you. Please confirm your email address to be able to login');
                        
                        //clear fields
                        this.buyer_first_name = "";
                        this.buyer_last_name = "";
                        this.buyer_birthday = "";
                        this.buyer_phone = "";
                        this.buyer_email = "";
                        this.buyer_password = "";
                        this.buyer_password_confirmation = "";
                        this.buyer_pin = "";
                        this.buyer_pin_confirmation = "";

                    }else{
                        //show error message
                        //this.showBuyerTabErrorAlert('Something went wrong. Cannot register at this time');
                        this.showBuyerTabErrorAlert(data["message"]);

                        //clear password and pin fields
                        this.buyer_password = "";
                        this.buyer_password_confirmation = "";
                        this.buyer_pin = "";
                        this.buyer_pin_confirmation = "";
                    }

                    this.registerMsg = "Sign up";
                    $('#buyer input[type="submit"]').removeAttr('disabled');
                    
                }
            );

        },
        buyerRecaptchaCallback: function(){
            $('#buyer input[type="submit"]').removeAttr('disabled');
        },
        hideAlert: function(){
            $(".alert").addClass("d-none");
        },
        showBuyerTabErrorAlert: function(message){

            $(".alert").addClass("d-none");
            $(".buyer-alert").removeClass("alert-success").addClass("alert-danger");
            $(".buyer-alert").removeClass("d-none");
            $(".alert-message-content").text(message);

        },
        showBuyerTabSuccessAlert: function(message){

            $(".alert").addClass("d-none");
            $(".buyer-alert").removeClass("alert-danger").addClass("alert-success");
            $(".buyer-alert").removeClass("d-none");
            $(".alert-message-content").text(message);

        },
        validateEmail: function(email){

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        return re.test(String(email).toLowerCase());

        },
        validateBuyerCredentials: function(){

            //validate first name on client side
            if( this.buyer_first_name.trim() == "" || this.buyer_first_name.trim().length < 3){
                this.showBuyerTabErrorAlert("The first name must be at least 3 characters");
                return "error";
            }

            //validate last name on client side
            if( this.buyer_last_name.trim() == "" || this.buyer_last_name.trim().length < 3){
                this.showBuyerTabErrorAlert("The last name must be at least 3 characters");
                return "error";
            }

            //validate email address on client side
            if( ! this.validateEmail(this.buyer_email.trim()) ) {
                this.showBuyerTabErrorAlert("The email must be of the valid format");
                return "error";
            }

            //validate phone number on client side
            if(this.buyer_phone.trim() == "" ){
                this.showBuyerTabErrorAlert("The phone number is required");
                return "error";
            }

            //validate password on client side
            if(this.buyer_password == "" || this.buyer_password.length < 6){
                this.showBuyerTabErrorAlert("The password should be at least six characters");
                return "error";
            }

            //validate password confirmation on client side
            if(this.buyer_password_confirmation != this.buyer_password){
                this.showBuyerTabErrorAlert("The password confirmation is not the same");
                return "error";
            }

            //validate pin on client side
            if(this.buyer_pin.trim() == "" || this.buyer_pin.length != 4 || isNaN(this.buyer_pin)){
                this.showBuyerTabErrorAlert("The pin should be exactly four numbers");
                return "error";
            }

            //validate pin confirmation on client side
            if(this.buyer_pin_confirmation != this.buyer_pin){
                this.showBuyerTabErrorAlert("The pin confirmation is not the same");
                return "error";
            }
        
        }
    },
    beforeCreate: function () {
        this.$http.get(endpoint + '/customer', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                    //console.log(response);
                }, 
                response => { //error
                return response;
                }
            )
            .then(user => { 
                //console.log(user); 
                if(user.status == "success" && user.message == "customer_details"){
                    this.$router.push('/myescrow/welcome');
                }  
                }
            );
    }
}
</script>



<style type="text/css">
.alert-close{cursor: pointer;}
.g-recaptcha-div > div {
        display: block;
        margin: 0 auto;
    }
    .g-recaptcha-div{margin-bottom: 20px;}
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