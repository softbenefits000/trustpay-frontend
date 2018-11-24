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
                        <h1 class="m-0 text-dark">Create Order</h1>
                        <br />
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link to="/myescrow/welcome">Dashboard</router-link></li>
                        <li class="breadcrumb-item active">Create Order</li>
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
                    <form>
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <label for="delivery_date">Delivery Date:</label>
                                    <input type="text" class="form-control" v-model="delivery_date" id="delivery_date" readonly>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6">
                                <div class="form-group">
                                    <label for="amount_payed">Amount Payed:</label>
                                    <input type="number" class="form-control" v-model="amount_payed" id="amount_payed" readonly>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12">
                                <div class="form-group">
                                    <label for="delivery_location">Delivery Location:</label>
                                    <textarea class="form-control" v-model="delivery_location" id="delivery_location" readonly></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                    <br />
                    <input type="submit" class="btn btn-info" value="Create Order" v-on:click="createOrder"/>
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
            type: 0,
            delivery_date: "19-08-2018",
            amount_payed: 30000,
            customer_id: 0,
            beneficiary_merchant_id: 1,
            delivery_location: "18A, Isale Eko Street, Dolphin Estate, Ikoyi, Lagos",
            fullname: ""
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

        var userDetailsEndpoint = endpoint +'/customer';

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
