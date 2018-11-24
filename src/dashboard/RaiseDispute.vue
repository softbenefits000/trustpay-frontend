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
                        <h1 class="m-0 text-dark">Raise Dispute</h1>
                        <br />
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link to="/myescrow/welcome">Dashboard</router-link></li>
                        <li class="breadcrumb-item active">Raise Dispute</li>
                        </ol>
                    </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

                <!-- Main content -->
                <section class="content">
                <div class="container-fluid">
                    <br />
                    <div class="row">
                    <div class="col-12 col-sm-12 col-md-12">
                        <div class="callout callout-info">
                        <br />
                        <div class="row">
                            <div class="col-sm-6">
                            <div class="form-group">
                                <label for="order_number">Order Number</label>
                                <!--<select name="order_number" id="order_number" class="form-control" >
                                    <option value="OR44467">OR44467</option>
                                    <option value="OR44465">OR44465</option>
                                    <option value="OR44466">OR44466</option>
                                    <option value="OR44464">OR44464</option>
                                </select>-->
                                <input type="text" v-model="order_code" class="form-control" readonly/>
                            </div>
                            </div>
                            <div class="col-sm-6">
                            <div class="form-group">
                                <label for="issue">Issue Type</label>
                                <select name="issue" id="issue" class="form-control" autocomplete="off">
                                <option value="Transaction Issue">Transaction Issue</option>
                                <option value="Integration Issue">Integration Issue</option>
                                <option value="Verification Issue">Verification Issue</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                            <div class="form-group">
                                <label for="dispute_description">Dispute Description</label>
                                <textarea name="dispute_description" id="dispute_description" class="form-control"></textarea>
                            </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                            <div class="form-group">
                                <label for="attachment">Attachment (optional)</label><br />
                                <input type="file" name="attachment" id="attachment" />
                            </div>
                            </div>
                        </div>
                        <a href="#" class="btn btn-info btn-sm no-underline" >Submit</a>
                        <br /><br />
                        </div>
                    </div>
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
            fullname: ""
        };
    },
    created(){

        var user_role = this.$session.get('stanbic_trustpay_user_role');

        var orderDetailEndpoint = endpoint +'/customer/order';

        if(user_role == "seller"){
            orderDetailEndpoint = endpoint +'/seller/order';
        }
        
        this.$http.post(orderDetailEndpoint, 
        {
            "id" : this.$route.params.orderId,
        },
        { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
        .then( 
            response => { //success
                return response.json();
            }, 
            response => { //error
                this.$router.push('/login');
            }
        )
        .then(order => { 
                if(order.status == "success" && order.message == "order_details"){
                    console.log(order);
                    this.order_code = order.data.order_code;

                }else{
                    this.$router.push('/myescrow/orders');
                }
            }
        );
        
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
