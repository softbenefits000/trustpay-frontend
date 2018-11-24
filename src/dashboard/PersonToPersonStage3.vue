<template>
    <div>
        <div class="wrapper">

            <dashboard-navigation></dashboard-navigation>
            <dashboard-sidebar :myProp="fullname"></dashboard-sidebar>
        

            <div class="content-wrapper">
                <div class="container">
                    <br /><br />
                    <div class="row">
                        <div class="col-sm-8">
                            <ul>
                                <li>You have provided the terms of this transaction.</li>
                                <li>The Seller must sign in to TrustPay and agree to these terms. An E-Mail reminder was sent to the Seller.</li>
                            </ul>
                            <br />
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="alert alert-info text-center">
                                        Merchandise
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="table-responsive card">
                                        <table class="table">
                                            <tr>
                                                <th>No</th>
                                                <th>Item Description</th> 
                                                <th class="text-center">Quantity</th>
                                                <th class="text-right" style="width: 170px;">Unit Price</th>
                                                <th class="text-right" style="width: 120px;">Total Price</th>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    Antiques & Collections<br />
                                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small>
                                                </td> 
                                                <td class="text-center">1</td>
                                                <td class="text-right">&#8358; 800.00</td> 
                                                <td class="text-right">&#8358; 800.00</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td> 
                                                <td></td>
                                                <td class="text-right">Subtotal</td> 
                                                <td class="text-right">&#8358; 800.00</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td> 
                                                <td></td>
                                                <td class="text-right">Escrow Fee</td> 
                                                <td class="text-right">&#8358; 26.00</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td> 
                                                <td></td>
                                                <td class="text-right">
                                                    Total<br />
                                                    <small>Transaction ID: 4141087</small>
                                                </td> 
                                                <td class="text-right">&#8358; 826.00</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <br /><br /><br />
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="alert alert-info text-center">
                                        Terms
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="row">
                                    <div class="col-6 text-right">
                                        <strong>Transaction #:</strong>
                                    </div>
                                    <div class="col-6">
                                        4141087
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-right">
                                        <strong>Escrow #:</strong>
                                    </div>
                                    <div class="col-6">
                                        0
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-right">
                                        <strong>Transaction Title:</strong>
                                    </div>
                                    <div class="col-6">
                                        Antiques & Collectibles
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-right">
                                        <strong>Buyer:</strong>
                                    </div>
                                    <div class="col-6">
                                        Nenne Nwodo
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-right">
                                        <strong>Seller:</strong>
                                    </div>
                                    <div class="col-6">
                                        custoner@trustpay.com
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-right">
                                        <strong>Escrow Fee to be paid by:</strong>
                                    </div>
                                    <div class="col-6">
                                        Buyer <br />
                                        <small>The buyer is responsible for 100% of the escrow fee in the event 
            the transaction is cancelled or the merchandise is returned.</small>
                                    </div>
                                </div>

                            </div>
                            <br /><br />
                        </div>
                        <div class="col-sm-4">
                            <h4><strong>Status</strong></h4>
                            <p>
                                <small>Select any status for help.</small>
                            </p>
                            <router-link to="/myescrow/help" class="black-text status-link" target="_blank">1. BUYER AND SELLER AGREE TO TERMS</router-link>
                            <router-link to="/myescrow/help" class="status-link">2. BUYER SENDS PAYMENT TO TRUSTPAY</router-link>
                            <router-link to="/myescrow/help" class="status-link">3. SELLER SHIPS MERCHANDISE TO BUYER</router-link>
                            <router-link to="/myescrow/help" class="status-link">4. BUYER RECEIVES MERCHANDISE</router-link>
                            <router-link to="/myescrow/help" class="status-link">5. TRUSTPAY PAYS SELLER</router-link>

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
                if(user.status == "success" && (user.message == "customer_details" || user.message == "seller_details")){
                    this.status = "done";
                    this.fullname = user.data.firstname + " " + user.data.lastname;
                    console.log("stats "+this.status);
                }else{
                    //this.$session.destroy();
                    //this.$router.push('/login');
                }
                
                }
            );

    
    }
}
</script>
