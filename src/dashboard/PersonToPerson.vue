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
                                <h1 class="m-0 text-dark">Select the type of transaction</h1>
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
                                <div class="alert alert-info information">
                                    <ul>
                                        <li>Review the transaction types below, and Select the type that fits what you are buying or  selling.</li>
                                        <li>TrustPay may refuse to accept certain payment types, for any reason, at its discretion. </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <br />
                        <!-- /.row -->
                        <div class="row">
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label>Type of Transaction</label>
                                    <select class="form-control" v-model="transactionType">
                                        <option>General Merchandise</option>
                                        <option>Milestone Transactions</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Your Role</label>
                                    <select class="form-control" disabled="disabled">
                                        <option>Buyer</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <router-link v-if="this.transactionType == 'General Merchandise'" to="/myescrow/p2p/stage2" class="btn btn-success">Continue</router-link>
                                    <router-link v-else to="/myescrow/p2p/stage2milestone" class="btn btn-success">Continue</router-link>

                                </div>
                            </div>
                            <div class="col-sm-6 col-12">
                                <div class="callout callout-info">
                                    General Merchandise is used for most tangible goods.
                                </div>
                                <div class="callout callout-info">
                                    Motor Vehicle is used when a motor vehicle is bought or sold. In addition to the escrow service, when both parties are in the USA, you may select the other services including: Title Collection Service and Lien Holder Payoff.
                                </div>
                                <div class="callout callout-info">
                                    Milestone Transactions is used for most services performed and any transaction with milestone disbursements.
                                </div>
                            </div>
                        </div>
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
.callout{border-color: rgb(63,122,238) !important;}
.alert{background: rgb(63,122,238) !important;}
.information{padding-left:0px; padding-right:0px; padding-bottom: 0px; padding-top: 15px; font-family: Arial, Helvetica, sans-serif}
</style>


<script>
const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            stanbic_trustpay_user_role: null,
            status: null,
            fullname: "",
            transactionType: "General Merchandise"
        };
    },
    methods:{
        showTransactionTypeInConsole: function(){
            console.log("Transaction Type ...");
            console.log(this.transactionType);
        }
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
