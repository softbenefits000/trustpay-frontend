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
			          		<h4><strong>Forgot Password (Buyer)</strong></h4>
                            <div class="alert forgot-password-alert alert-danger d-none">
                                <a href="#" class="close alert-close" aria-label="close" v-on:click="hideAlert">&times;</a>
                                <span class="forgot-password-alert-message-content"></span>
                            </div>
                            <div class="form-group">
                                <label for="buyer_email"><small>Please enter your email address*</small></label>
                                <input type="email" v-model="buyer_email" id="buyer_email" class="form-control" required="required">
                            </div>
                            <div class="form-group">
                                <input type="submit" name="button" value="Send password reset link" class="btn btn-dark-blue form-control btn-customer-forgot-password" v-on:click="sendBuyerPasswordResetLink" />
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="seller">
                            <br />
			          		<h4><strong>Forgot Password (Seller)</strong></h4>
                            <div class="alert seller-forgot-password-alert alert-danger d-none">
                                <a href="#" class="close alert-close" aria-label="close" v-on:click="hideAlert">&times;</a>
                                <span class="seller-forgot-password-alert-message-content"></span>
                            </div>

                            <div class="form-group">
                                <label for="seller_email"><small>Please enter your email address*</small></label>
                                <input type="email" v-model="seller_email" id="seller_email" class="form-control" required="required">
                            </div>

                            <div class="form-group">
                                <input type="submit" name="button" value="Send password reset link" class="btn btn-dark-blue form-control btn-seller-forgot-password" v-on:click="sendSellerPasswordResetLink" >
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="marketplace">
                            <br />
                            <h4><strong>Forgot Password (Marketplace Admin)</strong></h4>
                            <div class="form-group">
                                <label for="email"><small>Please enter your email address*</small></label>
                                <input type="email" v-model="marketplace_email" id="email" class="form-control" required="required">
                            </div>
                            <div class="form-group">
                                <input type="submit" name="button" value="Send password reset link" class="btn btn-dark-blue form-control">
                            </div>
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

export default {
    data(){
        return{
            endpoint : 'http://18.208.164.251/api',
            buyer_email: "",
            seller_email: "",
            marketplace_email: "",
        };
    },
    methods:{
        sendBuyerPasswordResetLink: function(){

            //validate email address on client side
            if( ! this.validateEmail(this.buyer_email.trim()) ) {
                this.showBuyerTabErrorAlert("The email must be of the valid format");
                return;
            }

            this.$http.post( this.endpoint +'/customer/forgot', 
                    {
                        "email": this.buyer_email
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

                    if(data["status"] == "success" && data["message"] == "token_generated"){
                        //show success message
                        this.showBuyerTabSuccessAlert('A password reset token has been generated and sent to your email.');
                        
                        //clear fields
                        this.buyer_email = "";

                    }else{
                        //show error message
                        this.showBuyerTabErrorAlert('Something went wrong. Could not generate a password reset token for this email at this time.');

                    }
                    
                }
            );

        },
        sendSellerPasswordResetLink: function(){

            //validate email address on client side
            if( ! this.validateEmail(this.seller_email.trim()) ) {
                this.showSellerTabErrorAlert("The email must be of the valid format");
                return;
            }

            this.$http.post( this.endpoint +'/seller/forgot', 
                    {
                        "email": this.seller_email
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

                    if(data["status"] == "success" && data["message"] == "token_generated"){
                        //show success message
                        this.showSellerTabSuccessAlert('A password reset token has been generated and sent to your email.');
                        
                        //clear fields
                        this.seller_email = "";

                    }else{
                        //show error message
                        this.showSellerTabErrorAlert('Something went wrong. Could not generate a password reset token for this email at this time.');

                    }
                    
                }
            );


        },
        hideAlert: function(){
            $(".alert").addClass("d-none");
        },
        showBuyerTabErrorAlert: function(message){

            $(".alert").addClass("d-none");
            $(".forgot-password-alert").removeClass("alert-success").addClass("alert-danger");
            $(".forgot-password-alert").removeClass("d-none");
            $(".forgot-password-alert-message-content").text(message);

        },
        showBuyerTabSuccessAlert: function(message){

            $(".alert").addClass("d-none");
            $(".forgot-password-alert").removeClass("alert-danger").addClass("alert-success");
            $(".forgot-password-alert").removeClass("d-none");
            $(".forgot-password-alert-message-content").text(message);

        },
        showSellerTabErrorAlert: function(message){

            $(".alert").addClass("d-none");
            $(".seller-forgot-password-alert").removeClass("alert-success").addClass("alert-danger");
            $(".seller-forgot-password-alert").removeClass("d-none");
            $(".seller-forgot-password-alert-message-content").text(message);

        },
        showSellerTabSuccessAlert: function(message){

            $(".alert").addClass("d-none");
            $(".seller-forgot-password-alert").removeClass("alert-danger").addClass("alert-success");
            $(".seller-forgot-password-alert").removeClass("d-none");
            $(".seller-forgot-password-alert-message-content").text(message);

        },
        validateEmail: function(email){

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        return re.test(String(email).toLowerCase());

        }
    }
}
</script>




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



