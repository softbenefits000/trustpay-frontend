<template>
    <div>
        <div class="wrapper">

            <dashboard-navigation></dashboard-navigation>
            <dashboard-sidebar :myProp="fullname"></dashboard-sidebar>
        

            <div class="content-wrapper">
                <div class="container">
                    <br /><br />
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="alert alert-info">
                                        Escrow: Transaction Status Help
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-sm-12">
                                    <h4>
                                        <strong><strong>Step 1: Buyer and Seller Agree to Terms</strong></strong>
                                    </h4>
                                    <p>Both parties agree to terms of the transaction, which includes a description of the merchandise, sale price, number of days for the Buyer's inspection, and any shipping information.</p>
                                    <hr />
                                    <h4>
                                        <strong><strong>Step 2: Buyer Sends Payment to TrustPay</strong></strong>
                                    </h4>
                                    <p>The Buyer submits a payment online. TrustPay verifies the payment.

                                    </p>
                                    <hr />
                                    <h4>
                                        <strong><strong>Step 3: Seller Ships Merchandise to Buyer</strong></strong>
                                    </h4>
                                    <p>Upon payment verification, the Seller is authorized to ship merchandise to the buyer's address listed on TrustPay site and submit tracking information. TrustPay verifies that the Buyer receives the shipment. Delivery times vary by shipping company.</p>
                                    <hr />
                                    <h4>
                                        <strong><strong>Step 4: Buyer Receives Merchandise</strong></strong>
                                    </h4>
                                    <p>The Buyer has a set number of days for inspecting the merchandise and the option to accept or reject.</p>
                                    <hr />
                                    <h4>
                                        <strong><strong>Step 5: TrustPay Pays Seller</strong></strong>
                                    </h4>
                                    <p>TrustPay pays the Seller. The transaction is complete.</p>
                                </div>
                            </div>
                            <br /><br /><br />
                        </div>
                    </div>
                </div>
            </div>

            <dashboard-footer></dashboard-footer>
            
        </div>
    </div>
</template>
<style>
.status-link{text-decoration: none; display: block; font-size: 13px;}
.black-text{color: black;}
.btn-success{background: rgb(63,122,238) !important; border-color: rgb(63,122,238) !important;}
hr{margin: 20px 0px;}
.callout{margin: 15px 0px; border-color: rgb(63,122,238) !important;}
.alert{background: rgb(63,122,238) !important;}
.btn-default{margin-right: 20px; background: #ccc; color: #000;}
</style>

<script>
const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            stanbic_trustpay_user_role: null,
            status: null,
            fullname: ""
        };
    },
    beforeCreate: function () {
        console.log(this.$session.get('trustpayauthtoken'));
        console.log("Role - "+this.$session.get('stanbic_trustpay_user_role'));

        var userDetailsEndpoint = endpoint +'/customer';
        console.log("Endpoint - "+userDetailsEndpoint);

        if(this.$session.get('stanbic_trustpay_user_role') == "seller"){
            userDetailsEndpoint = endpoint +'/seller/account';
            console.log("Endpoint - "+userDetailsEndpoint);
        }

        this.$http.get(userDetailsEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Login Err");
                    return response.json();
                    //this.$session.destroy();
                    //this.$router.push('/login');
                }
            )
            .then(user => { 
                console.log("User details");
                console.log(user);
                if(user.status == "success" && user.message == "customer_details"){
                    this.status = "done";
                    this.fullname = user.data.firstname + " " + user.data.lastname;
                    console.log("stats "+this.status);
                }else if (user.status == "success" && user.message == "seller_details"){
                    
                    this.status = "done";
                    this.fullname = user.data.firstname + " " + user.data.lastname;
                    console.log("stats "+this.status);

                    if(user.data.verified == 0){
                        this.$router.push('/myescrow/verify');
                    }

                }else{
                    alert("Error. Could not fetch user at this time");
                    //this.$router.push('/login');
                }
                
                }
            );

    
    }
}
</script>
