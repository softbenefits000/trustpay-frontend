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
                        <h1 class="m-0 text-dark">Delivery Terms</h1>
                        <br />
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link to="/myescrow/welcome">Dashboard</router-link></li>
                        <li class="breadcrumb-item active">Delivery Terms</li>
                        </ol>
                    </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

                <!-- Main content -->
                <!-- Main content -->
                <section class="content">
                    <div class="container-fluid">
                        <!-- /.row -->
                        <br />
                        <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-12 col-sm-12 col-md-8">
                            <div class="callout callout-info">
                                <br />
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="alert alert-success d-none">
                                        <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                            Delivery Term has been updated!
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="alert alert-danger d-none">
                                        <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                            {{errorMessage}}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label for="cancellation_sla">Cancellation SLA</label>
                                    <p>
                                    <small>Cancellation SLA – refers to the numbers of hours that buyer is allowed to cancel an order after placing a successful order on the website. Cancellation after this hours will lead to logistics fee charged to the buyer’s funds in escrow. Enter only number of hours here. For example, if your SLA is 6 hours, then enter the number "6" only</small>
                                    </p>
                                        <input type="number" v-model="cancellation_sla" id="cancellation_sla" class="form-control" autocomplete="off" max="24" min="0" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="logistics_fee">Logistics Fee</label>
                                            <p>
                                            <small>Logistics Fee – The fee is a percentage of the product sum but up to a maximum of 10% or N5,000.00. Enter only the percentage value. For example, if you wish to charge 5% of the product sum, then enter the number “5“ only</small>
                                            </p>
                                            <input type="number" v-model="logistics_fee" id="logistics_fee" class="form-control" autocomplete="off" max="10" min="0"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="refunds">Settlement at Rejection</label>
                                            <p>
                                            <small>Action to be taken If Buyer Rejects and DeliveryMan Confirms Possession of Product. Note Transaction Charges Still Apply.</small>
                                            </p>
                                            <select v-model="refunds" class="form-control">
                                            <option disabled value="">Please select one</option>
                                                <option value="0">Pay Seller</option>
                                                <option value="1">Refund Buyer</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <button class="btn btn-info" v-on:click="updateDeliveryTerms">Save</button>
                                <br /><br />
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                        </div>
                        <br />

                    </div><!--/. container-fluid -->
                </section>
                <!-- /.content -->
            </div>
            <dashboard-footer></dashboard-footer>
            
        </div>
    </div>
</template>

<style>
.no-underline{
    text-decoration: none !important;
}
</style>


<script>
const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            order_code: "",
            fullname: "",
            cancellation_sla: 0,
            logistics_fee: 0,
            refunds: "",
            errorMessage: "",
            willEdit: false,
            termId: 0,
        };
    },
    created(){

        var user_role = this.$session.get('stanbic_trustpay_user_role');

        var deliveryTermsEndpoint = endpoint +'/seller/terms';

        this.$http.get(deliveryTermsEndpoint,
        { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
        .then( 
            response => { //success
                return response.json();
            }, 
            response => { //error
                this.$router.push('/login');
            }
        )
        .then(terms => { 
                if(terms.status == "success" && terms.message == "seller_terms"){
                    console.log(terms);
                    if(terms.data.length > 0){
                        this.willEdit = true;
                        this.termId = terms.data[0].id;
                        console.log("ID - "+this.termId);

                        this.cancellation_sla = terms.data[0].SLA;
                        this.logistics_fee = terms.data[0].logistics_fee;
                        this.refunds = terms.data[0].refundable_flag;
                        //this.termId = terms.data
                    }
                }else{
                    console.log("error");
                    console.log(terms);
                    //this.$router.push('/myescrow/orders');
                }
            }
        );
        
    },
    methods:{
        hideAlert: function(){
           $(".alert").addClass("d-none"); 
        },
        updateDeliveryTerms: function(){

            var result = this.validateCredentials();
            if(result != null){
                console.log(result);
                this.errorMessage = result;
                this.hideAlert();
                $(".alert-danger").removeClass("d-none"); 
                return;
            }

            console.log("flag");
            console.log(this.refunds);

            var deliveryTermsEndpoint = "/seller/term/create";

            if(this.willEdit == true){
                deliveryTermsEndpoint = "/seller/term/edit/"+this.termId;
                this.$http.put( endpoint + deliveryTermsEndpoint, 
                    {
                        "body" : "Seller Delivery Term",
                        "SLA" : this.cancellation_sla,
                        "logistics_fee" : this.logistics_fee,
                        "refundable_flag" : this.refunds,

                    }, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') }})
                .then( 
                    response => { //success
                        return response.json();
                    }, 
                    response => { //error
                        console.log("term add Err");
                        return response.json();
                    }
                )
                .then(term => { 
                    console.log("term add details");
                    console.log(term);
                    if(term.status == "success" && term.message == "updated_successfully"){
                        this.hideAlert();
                        this.willEdit = true;
                        $(".alert-success").removeClass("d-none");
                    }else{
                        this.errorMessage = "Something went wrong. Cannot update term at this time";
                        this.hideAlert();
                        $(".alert-danger").removeClass("d-none"); 
                        //this.$session.destroy();
                        //this.$router.push('/login');
                    }
                    
                    }
                );
            }else{

                this.$http.post( endpoint + deliveryTermsEndpoint, 
                    {
                        "body" : "Seller Delivery Term",
                        "SLA" : this.cancellation_sla,
                        "logistics_fee" : this.logistics_fee,
                        "refundable_flag" : this.refunds,

                    }, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') }})
                .then( 
                    response => { //success
                        return response.json();
                    }, 
                    response => { //error
                        console.log("term add Err");
                        return response.json();
                    }
                )
                .then(term => { 
                    console.log("term add details");
                    console.log(term);
                    if(term.status == "success" && term.message == "term_added"){
                        this.hideAlert();
                        this.willEdit = true;
                        $(".alert-success").removeClass("d-none");
                    }else{
                        this.$session.destroy();
                        this.$router.push('/login');
                    }
                    
                    }
                ); 
            }
        },
        validateCredentials(){

            if(isNaN(this.cancellation_sla) || this.cancellation_sla < 0 || this.cancellation_sla > 24) {
                return "Please enter a positive number less than 24 hours for cancellation sla";
            }

            if(isNaN(this.logistics_fee) || this.logistics_fee < 0 || this.logistics_fee > 10) {
                return "Please enter a positive percentage less than 10 for logistics fee";
            }

            if(this.refunds == "" || this.refunds == null) {
                return "Please choose a refund action";
            }

            return null;
        },

    },
    beforeCreate: function () {
        console.log(this.$session.get('trustpayauthtoken'));

        var userDetailsEndpoint = endpoint +'/customer';

        if(this.$session.get('stanbic_trustpay_user_role') == "seller"){
            userDetailsEndpoint = endpoint +'/seller/account';
        }

        this.$http.get(userDetailsEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    this.$router.push('/login');
                }
            )
            .then(user => { 
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
