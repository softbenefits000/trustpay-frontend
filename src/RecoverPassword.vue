<template>
    <div>
        <trustpay-navigation></trustpay-navigation>
        <section>
	<div class="container full-height">
		<div class="row row-margin top-margin-60">
			<div class="col-sm-2 col-md-2"></div>
			<div class="col-sm-8 col-md-8 col-12">
				<div class="card">

			  		<br />
	      			<h4><strong>Change Password</strong></h4>
					<br />

					<div class="alert update-password-alert alert-danger fade in d-none">
					    <a href="#" class="close alert-close" aria-label="close">&times;</a>
					    <span class="update-password-alert-message-content"></span>
					</div>
					<div class="form-group">
						<label for="email"><small>Please enter your email*</small></label>

						<input type="email" v-model="email" id="email" class="form-control" required="required">
					</div>
					<div class="form-group">
						<label for="password"><small>Please enter your new password*</small></label>

						<input type="password" v-model="password" id="password" class="form-control" required="required">
					</div>

					<div class="form-group">
						<label for="password_confirmation"><small>Please confirm your new password*</small></label>

						<input type="password" v-model="password_confirmation" id="password_confirmation" class="form-control" required="required">
					</div>
					
					<div class="form-group">
						<input type="submit" name="button" value="Change Password" class="btn btn-dark-blue form-control" v-on:click="resetPassword" />
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
			email: "",
            password: "",
            password_confirmation: "",
        };
    },
    methods:{
		resetPassword: function(){
			
			var status = this.validateCredentials();
			if(status == "error") return;

			var recoverEndpoint = "";

			//switch endpoint based on roles
			if(this.$route.params.role == "customer"){
				recoverEndpoint = this.endpoint +'/customer/forgot/reset';
			}else if(this.$route.params.role == "seller"){
				recoverEndpoint = this.endpoint +'/seller/forgot/reset';
			}

			
			this.$http.post( recoverEndpoint, 
                    {
                        "email": this.email,
						"password": this.password,
						"password_confirmation": this.password_confirmation,
						"token": this.$route.params.token
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

                    if(data["status"] == "success" && data["message"] == "reset_successful"){
                        //show success message
                        this.showSuccessAlert('You have reset your password. You can now login');
                        
                        //clear fields
						this.email = "";
						this.password = "";
						this.password_confirmation = "";

                    }else{
                        //show error message
                        this.showErrorAlert('Something went wrong. Could not generate reset your password at this time.');

                    }
                    
                }
            );
		},
		validateCredentials: function(){
			//validate email address on client side
            if( ! this.validateEmail(this.email.trim()) ) {
                this.showErrorAlert('The email must be of the valid format');
                return;
            }
			//validate password on client side
            if(this.password == "" || this.password.length < 6){
                this.showErrorAlert("The password should be at least six characters");
                return "error";
            }

            //validate password confirmation on client side
            if(this.password_confirmation != this.password){
                this.showErrorAlert("The password confirmation is not the same");
                return "error";
            }
		},
        hideAlert: function(){
            $(".alert").addClass("d-none");
        },
        showErrorAlert: function(message){

            $(".alert").addClass("d-none");
            $(".forgot-password-alert").removeClass("alert-success").addClass("alert-danger");
            $(".forgot-password-alert").removeClass("d-none");
            $(".forgot-password-alert-message-content").text(message);

        },
        showSuccessAlert: function(message){

            $(".alert").addClass("d-none");
            $(".forgot-password-alert").removeClass("alert-danger").addClass("alert-success");
            $(".forgot-password-alert").removeClass("d-none");
            $(".forgot-password-alert-message-content").text(message);

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



