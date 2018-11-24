<template>
    <div>
        <div class="wrapper">

            <dashboard-navigation></dashboard-navigation>
            <dashboard-sidebar :myProp="fullname"></dashboard-sidebar>
        

            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                            <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">New Milestone Transaction</h1>
                            </div><!-- /.col -->
                            </div><!-- /.row -->
                        </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->
                <br />
                <!-- Main content -->
                <section class="content">
                    <div class="container-fluid">
                        <!-- Info boxes -->
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12">
                                <div class="alert alert-info">
                                    Please Provide the Terms for This Transaction
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Transaction title: *</label>
                                <input class="form-control" type="text" placeholder="Buying Mercedez Benz"/>
                            </div>
                            <div class="col-sm-6">
                                <div class="callout callout-info">
                                    A short description of the item to be purchased. For example, "Buying domain name portfolio".
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Transaction category: *</label>
                                <select class="form-control">
                                    <option>Antiques & Collectibles</option>
                                    <option>Appliances</option>
                                    <option>Alcohol & Wine</option>
                                    <option>Arts & Crafts</option>
                                    <option>Food</option>
                                    <option>Real Estate</option>
                                    <option>Services</option>
                                    <option>Tools & Hardware</option>
                                    <option>Sports & Recreation</option>
                                    <option>Video Games & Consoles</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <div class="callout callout-info">
                                    A short description of the item to be purchased. For example, "Buying domain name portfolio".
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Seller's email address: *</label>
                                <input class="form-control" type="email"/>
                            </div>
                            <div class="col-sm-6">
                                <div class="callout callout-info">
                                    The Seller will use this email address to sign in to TrustPay and view the transaction.
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Seller's phone number (if known):</label>
                                <input class="form-control" type="text"/>
                            </div>
                            <div class="col-sm-6">
                                <div class="callout callout-info">
                                    This number will be used to inform the seller about a new transaction.<br /><br />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Who pays the Escrow fee:</label>
                                <div class="radio">
                                    <input type="radio" name="optradio" checked>&nbsp;&nbsp;Buyer
                                </div>
                                <div class="radio">
                                    <input type="radio" name="optradio">&nbsp;&nbsp;Seller
                                </div>
                                <div class="radio">
                                    <input type="radio" name="optradio">&nbsp;&nbsp;50% Buyer / 50% Seller
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="callout callout-info">
                                    This identifies who is responsible for transaction fees. If the Buyer is selected, the fees are added to the transaction total. If the Seller is selected, the fees are deducted from the proceeds.
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Shipping cost:</label>
                                <input class="form-control" type="number"/>
                            </div>
                            <div class="col-sm-6">
                                <div class="callout callout-info">
                                    This identifies the cost of delivery<br /><br />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Who pays the shipping fee:</label>
                                <div class="radio">
                                    <input type="radio" name="optradio" checked>&nbsp;&nbsp;Buyer
                                </div>
                                <div class="radio">
                                    <input type="radio" name="optradio">&nbsp;&nbsp;Seller
                                </div>
                                <div class="radio">
                                    <input type="radio" name="optradio">&nbsp;&nbsp;50% Buyer / 50% Seller
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="callout callout-info">
                                    This identifies who is responsible for shipping fees. If the Buyer is selected, the fees are added to the transaction total. If the Seller is selected, the fees are deducted from the proceeds.
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Description</label>
                                <textarea class="form-control"></textarea>
                            </div>
                            <div class="col-sm-6">
                                <div class="callout callout-info">
                                    A long description of the item to be purchased.
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-sm-12">
                                <router-link to="/myescrow/p2p/stage1" class="btn btn-default">Go back</router-link>
                                <router-link to="/myescrow/p2p/stage3milestone" class="btn btn-success">Continue</router-link>
                            </div>
                        </div>
                        <br /><br /><br />
                        
                    </div><!--/. container-fluid -->
                </section>
                <!-- /.content -->
            </div>

            <dashboard-footer></dashboard-footer>
            
        </div>
    </div>
</template>
<style>
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
