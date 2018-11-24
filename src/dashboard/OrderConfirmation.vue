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
                        <h1 class="m-0 text-dark">&nbsp;</h1>
                        <br />
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link to="/myescrow/welcome">Dashboard</router-link></li>
                        <li class="breadcrumb-item active">Confirm Order</li>
                        </ol>
                    </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

                <!-- Main content -->
                <!-- Main content -->
                <section class="content">
                <div class="container">
                    <!-- /.row -->
                    <br />
                    <div class="row">
                        <div class="col-sm-12">
                            <h4>Transaction Successful</h4>
                            <p>You have paid NGN {{amount}} into escrow for order {{reference}}.</p>
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
.no-underline{
    text-decoration: none !important;
}
</style>


<script>
const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            reference: this.$route.query.reference,
            fullname: "",
            amount: 0,
        };
    },
    methods: {
        createOrder: function(){
            var createOrderEndpoint = endpoint +'/order/create';
            var payForOrderEndpoint = endpoint +'/order/pay';

            this.$http.post( createOrderEndpoint, 
                    {
                        "type": this.type,
                        "delivery_date": this.delivery_date,
                        "amount_payed": this.amount_payed,
                        "customer_id": this.customer_id,
                        "beneficiary_merchant_id": this.beneficiary_merchant_id,
                        "delivery_location": this.delivery_location
                    }
                    , 
                    { 
                        headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } 
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

                    if(data.status == "success" && data.message == "order_created"){
                        
                        console.log("SUCCESS");
                        console.log("Starting Order Pay ...");
                        this.$http.post( payForOrderEndpoint, 
                            {
                                "customer_id": this.customer_id,
                                "order_code": data.data.order_code
                            }
                            , 
                            { 
                                headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } 
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

                                if(data.status == "success" && data.message == "payment_authorization"){
                                    
                                    console.log("PAY SUCCESS");
                                    window.location = data.data.auth.authorization_url;

                                }else{

                                    console.log("PAY ERROR");

                                }

                                
                            }
                        );

                    }else{

                        console.log("ERROR");

                    }

                    
                }
            );
        }
    },
    beforeCreate: function () {
        console.log(this.$session.get('trustpayauthtoken'));
        console.log("Reference is "+this.$route.query.reference);
        if(this.$route.query.reference == null || this.$route.query.reference.trim() == ""){
            this.$router.push('/');
        }else{
            this.reference = this.$route.query.reference;
        }

        var userDetailsEndpoint = endpoint +'/customer';
        var verifyOrderEndpoint = endpoint +'/order/payment/verify';

        this.$http.get(userDetailsEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    //this.$router.push('/login');
                    alert("Error. Could not fetch user at this time");
                }
            )
            .then(user => { 
                if(user.status == "success" && user.message == "customer_details"){
                    
                    this.fullname = user.data.firstname + " " + user.data.lastname;
                    this.$http.post( verifyOrderEndpoint, 
                        {
                            "order_code": this.$route.query.reference
                        }
                        , 
                        { 
                            headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } 
                        }
                    ).then(
                        response => { //success
                            return response.json();
                        }, 
                        response => { //error
                            return response.json();
                        }
                    ).then(
                        data => { 
                            console.log(data); 

                            if(data.status == "success" && data.message == "verification"){
                                
                                this.amount = data.data.verification.amount;
                                alert("yayyyy");

                            }else{

                                console.log("ERROR");

                            }

                            
                        }
                    );
                    
                }else{
                    alert("Error. Could not fetch user at this time");
                    //this.$router.push('/login');
                }
                
                }
            );

    
    }
}
</script>
