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
                                                <input type="email" v-model="buyer_email" class="form-control" required="required">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="phone"><small>Please Enter Your Phone Number*</small></label>
                                                <input type="text" v-model="buyer_phone" class="form-control" required="required" placeholder="+234xxxxxxxxxx" maxlength="14">
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
                                <div role="tabpanel" class="tab-pane fade" id="seller">
                                    <br />
                                    <h4><strong><strong>Sign up to TrustPay (Seller)</strong></strong></h4>
                                    <div class="alert seller-alert alert-danger d-none">
                                        <a class="close alert-close" aria-label="close" v-on:click="hideAlert">&times;</a>
                                        <span class="seller-alert-message-content"></span>
                                    </div>
                                    <br />
                                    <p class="text-primary">
                                        Your first name, last name and phone number should be the same as it appears on your Bank Verification Number (BVN) account. 
                                        This is to enable flawless verification of your identity at no cost to you. If you enter wrong details and the verification fails, you will be charged a fee of N100 to reverify your account.
                                    </p>
                                    <p>* Indicates mandatory fields</p>
                                    <br />
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="seller_first_name"><small>Please Enter Your First Name*</small></label>
                                                <input type="text" v-model="seller_first_name" id="seller_first_name" class="form-control" required="required">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="seller_last_name"><small>Please Enter Your Last Name*</small></label>
                                                <input type="text" v-model="seller_last_name" class="form-control" required="required">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label><small>Please Enter Your Phone Number*</small></label>
                                                <input type="text" v-model="seller_phone" class="form-control" required="required" placeholder="+234xxxxxxxxxx" maxlength="14">
                                            
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="seller_email"><small>Please Enter Your Email*</small></label>
                                                <input type="text" v-model="seller_email" id="seller_email" class="form-control" required="required">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="seller_password"><small>Please Select A Password*</small></label>

                                                <input type="password" v-model="seller_password" id="seller_password" class="form-control" required="required">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="seller_password_confirmation"><small>Please Confirm Your Password*</small></label>

                                                <input type="password" v-model="seller_password_confirmation" id="seller_password_confirmation" class="form-control" required="required">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="seller_pin"><small>Please Select A 4 digit Pin*</small></label>

                                                <input type="password" v-model="seller_pin" id="seller_pin" class="form-control" required="required">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="seller_pin_confirmation"><small>Please Confirm Your Pin*</small></label>

                                                <input type="password" v-model="seller_pin_confirmation" id="seller_pin_confirmation" class="form-control" required="required">
                                            </div>
                                        </div>
                                    </div>
                                    <!--<div class="g-recaptcha" data-sitekey="6LeupmUUAAAAAHp1P_V85fzkWxWd0xh3VL_cqKkS" data-callback="sellerRecaptchaCallback"></div>-->
                                    <vue-recaptcha class="g-recaptcha-div" sitekey="6LeupmUUAAAAAHp1P_V85fzkWxWd0xh3VL_cqKkS" @verify="sellerRecaptchaCallback"></vue-recaptcha>

                                    <input type="submit" name="button" :value="registerMsg" class="btn btn-dark-blue btn-seller-register form-control" v-on:click="sellerRegister" disabled="disabled" />
                                    <br /><br />
                                    <p class="text-center"><small>By registering you agree to TrustPay's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a> .</small></p>
                                    
                                    <hr />
                                    <p class="text-center"><router-link to="/login" class="text-info">Already have an account? Log in</router-link></p>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="marketplace">
                                    <br />
                                    <h4><strong><strong> up to TrustPay (Marketplace Admin)</strong></strong></h4>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="ma_contact_first_name"><small>Please Enter Your First Name*</small></label>
                                                <input type="text" name="contact_first_name" id="ma_contact_first_name" class="form-control" required="required">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="ma_contact_last_name"><small>Please Enter Your Last Name*</small></label>
                                                <input type="text" name="contact_last_name" id="ma_contact_last_name" class="form-control" required="required">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="ma_phone_number"><small>Please Enter Your Phone Number*</small></label>
                                                <input type="text" name="phone_number" id="ma_phone_number" class="form-control" required="required" placeholder="+234xxxxxxxxxx" maxlength="14">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="ma_contact_email"><small>Please Enter Your Email*</small></label>
                                                <input type="text" name="contact_email" id="ma_contact_email" class="form-control" required="required">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="ma_password"><small>Please Select A Password*</small></label>

                                                <input type="password" name="password" id="ma_password" class="form-control" required="required" >
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="ma_password_confirmation"><small>Please Confirm Your Password*</small></label>

                                                <input type="password" name="password_confirmation" id="ma_password_confirmation" class="form-control" required="required">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="ma_pin"><small>Please Select A 4 digit Pin*</small></label>

                                                <input type="password" name="pin" id="ma_pin" class="form-control" required="required">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="ma_pin_confirmation"><small>Please Confirm Your Pin*</small></label>

                                                <input type="password" name="pin_confirmation" id="ma_pin_confirmation" class="form-control" required="required">
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <input type="submit" name="button" value="Sign up" class="btn btn-dark-blue form-control">
                                    <br /><br />
                                    <p class="text-center"><small>By registering you agree to TrustPay's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a> .</small></p>
                                    
                                    <hr />
                                    <p class="text-center"><router-link to="/login" class="text-info">Already have an account? Log in</router-link></p>
                                </div>
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
            buyer_email: "",
            buyer_phone: "",
            buyer_password: "",
            buyer_password_confirmation: "",
            buyer_pin: "",
            buyer_pin_confirmation: "",

            seller_first_name: "",
            seller_last_name: "",
            seller_email: "",
            seller_phone: "",
            seller_password: "",
            seller_password_confirmation: "",
            seller_pin: "",
            seller_pin_confirmation: "",

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
                        //this.buyer_password = "";
                        //this.buyer_password_confirmation = "";
                        //this.buyer_pin = "";
                        //this.buyer_pin_confirmation = "";
                    }

                    this.registerMsg = "Sign up";
                    $('#buyer input[type="submit"]').removeAttr('disabled');
                    
                }
            );

        },
        sellerRegister: function(){

            this.registerMsg = "Sending ...";
            $('#buyer input[type="submit"]').attr('disabled', 'disabled');


            var status = this.validateSellerCredentials();
            if(status == "error") {
                this.registerMsg = "Sign up";
                $('#buyer input[type="submit"]').removeAttr('disabled');
                return;
            }

            //attempt to register
            this.$http.post( endpoint +'/seller/register', 
                    {
                        "firstname": this.seller_first_name,
                        "lastname": this.seller_last_name,
                        "phone_number": this.seller_phone,
                        "email": this.seller_email,
                        "password": this.seller_password,
                        "password_confirmation": this.seller_password_confirmation,
                        "PIN": this.seller_pin,
                        "PIN_confirmation": this.seller_pin_confirmation,
                        "ip_address": "192.168.88.46",
                        "device_type": "iPhone",
                        "device_version": "10.4"
                    }
                )
                .then(
                    response => { //success
                        console.log("success"); 
                        return response.json();
                    }, 
                    response => { //error
                        console.log("err");
                        return response.json();
                    }
            ).then(
                data => { 
                    console.log(data); 

                    if(data["status"] == "success" && data["message"] == "seller_created"){
                        //show success message
                        this.showSellerTabSuccessAlert('A verification email has been sent to '+this.seller_email+'. Please confirm your email address to be able to login');
                        
                        //clear fields
                        this.seller_first_name = "";
                        this.seller_last_name = "";
                        this.seller_phone = "";
                        this.seller_email = "";
                        this.seller_password = "";
                        this.seller_password_confirmation = "";
                        this.seller_pin = "";
                        this.seller_pin_confirmation = "";

                    }else{
                        //show error message
                        //this.showSellerTabErrorAlert('Something went wrong. Cannot register at this time');
                        this.showSellerTabErrorAlert(data["message"]);

                        //clear password and pin fields
                        //this.seller_password = "";
                        //this.seller_password_confirmation = "";
                        //this.seller_pin = "";
                        //this.seller_pin_confirmation = "";
                    }

                    this.registerMsg = "Sign up";
                    $('#buyer input[type="submit"]').removeAttr('disabled');
                    
                }
            );

        },
        buyerRecaptchaCallback: function(){
            $('#buyer input[type="submit"]').removeAttr('disabled');
        },
        sellerRecaptchaCallback: function(){
            $('#seller input[type="submit"]').removeAttr('disabled');
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
        showSellerTabErrorAlert: function(message){

            $(".alert").addClass("d-none");
            $(".seller-alert").removeClass("alert-success").addClass("alert-danger");
            $(".seller-alert").removeClass("d-none");
            $(".seller-alert-message-content").text(message);

        },
        showSellerTabSuccessAlert: function(message){

            $(".alert").addClass("d-none");
            $(".seller-alert").removeClass("alert-danger").addClass("alert-success");
            $(".seller-alert").removeClass("d-none");
            $(".seller-alert-message-content").text(message);

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
        
        },
        validateSellerCredentials: function(){
            
            //validate first name on client side
            if( this.seller_first_name.trim() == "" || this.seller_first_name.trim().length < 3){
                this.showSellerTabErrorAlert("The first name must be at least 3 characters");
                return "error";
            }

            //validate last name on client side
            if( this.seller_last_name.trim() == "" || this.seller_last_name.trim().length < 3){
                this.showSellerTabErrorAlert("The last name must be at least 3 characters");
                return "error";
            }

            //validate email address on client side
            if( ! this.validateEmail(this.seller_email.trim()) ) {
                this.showSellerTabErrorAlert("The email must be of the valid format");
                return "error";
            }

            //validate phone number on client side
            if(this.seller_phone.trim() == "" ){
                this.showSellerTabErrorAlert("The phone number is required");
                return "error";
            }

            //validate password on client side
            if(this.seller_password == "" || this.seller_password.length < 6){
                this.showSellerTabErrorAlert("The password should be at least six characters");
                return "error";
            }

            //validate password confirmation on client side
            if(this.seller_password_confirmation != this.seller_password){
                this.showSellerTabErrorAlert("The password confirmation is not the same");
                return "error";
            }

            //validate pin on client side
            if(this.seller_pin.trim() == "" || this.seller_pin.length != 4 || isNaN(this.seller_pin)){
                this.showSellerTabErrorAlert("The pin should be exactly four numbers");
                return "error";
            }

            //validate pin confirmation on client side
            if(this.seller_pin_confirmation != this.seller_pin){
                this.showSellerTabErrorAlert("The pin confirmation is not the same");
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