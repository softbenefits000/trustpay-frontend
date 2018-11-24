<template>
    <div>
        <trustpay-navigation></trustpay-navigation>
        <section>
            <div class="container full-height">
                <div class="row row-margin top-margin-60">
                    <div class="col-sm-2 col-md-2"></div>
                    <div class="col-sm-8 col-md-8 col-12">
                        <div class="card text-center">
                            <p v-if="!verified">Verifying...</p>
                            <p>{{ verifyMsg }}</p>
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

export default {
    data(){
        return{
            verified: false,
            verifyMsg : "You will be redirected in few seconds",
            callbackUrl : ""
        };
    },
    created(){
        this.verifyOrderPayment();
    },
    methods:{
        verifyOrderPayment: function(){
            var reference = this.$route.query.reference;

            this.$http.get(endpoint + "/external/create/" + reference)
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    return response.json();
                }
            )
            .then(response => { 
                console.log("response");
                console.log(response);
                if(response.status == "success" && response.message == "order_created_payment_successful"){
                    this.verified = true;
                    //redirect to callback url
                    window.location.href = response.data.redirect;
                }else if(response.status == "error" && response.message == "payment_already_processed"){
                    this.verified = true;
                    this.verifyMsg = "This payment has already been processed and your order has been created before now. Please check that you have not visited this url before. Thank you";
                }else if(response.status == "success" && response.message == "bvn_payment_successful"){
                    this.verified = true;
                    this.$router.push('/myescrow/verify');
                }else{
                    this.verified = true;
                    this.verifyMsg = "Oops! Something went wrong. Payment was not successful and order was not created. Please try again later.";
                }
                
            });
        }
    },
    beforeCreate: function(){
        if(this.$route.query.reference == null || this.$route.query.reference.trim() == ""){
            this.$router.push('/login');
        }
        if(this.$route.query.trxref == null || this.$route.query.trxref.trim() == ""){
            this.$router.push('/login');
        }
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