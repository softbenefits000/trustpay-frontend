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
                                <h1 class="m-0 text-dark">Dashboard</h1>
                            </div><!-- /.col -->
                            </div><!-- /.row -->
                        </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

                <!-- Main content -->
                <section class="content">
                    <div class="container-fluid">
                        <!-- Info boxes -->
                        <div class="row">
                        <div class="col-12 col-sm-4 col-md-4">
                            <div class="info-box">
                            <span class="info-box-icon bg-info elevation-1"><i class="fa fa-exchange"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">Transactions</span>
                                <span class="info-box-number">
                                {{total_transactions}}
                                </span>
                            </div>
                            <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                        <div class="col-12 col-sm-4 col-md-4">
                            <div class="info-box mb-3">
                            <span class="info-box-icon bg-danger elevation-1"><i class="fa fa-question-circle"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">Disputes</span>
                                <span class="info-box-number">{{total_disputes}}</span>
                            </div>
                            <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->

                        <!-- fix for small devices only -->
                        <div class="clearfix hidden-md-up"></div>

                        <div class="col-12 col-sm-4 col-md-4">
                            <div class="info-box mb-3">
                            <span class="info-box-icon bg-primary elevation-1"><i class="fa fa-shopping-cart"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">Orders</span>
                                <span class="info-box-number">{{total_orders}}</span>
                            </div>
                            <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                        </div>
                        <!-- /.row -->

                        <div class="row">
                        <div class="col-12 col-sm-8 col-md-8">
                            <div class="card">
                            <div class="card-header border-transparent">
                                <h3 class="card-title">Latest Orders</h3>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                <table class="table m-0">
                                    <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Item</th>
                                        <th>Status</th>
                                        <th>Price (NGN) </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="order in recent_orders" :key="order.id">
                                        <td>
                                            <span>
                                            <!--To single order-->
                                            {{formatToSixDigits(order.id)}}
                                            </span>
                                        </td>
                                        <td>{{order.product_name}}</td>
                                        <td><span class="badge">{{order.status.title}}</span></td>
                                        <td>
                                            {{order.amount_payed}}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                                <!-- /.table-responsive -->
                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer clearfix">
                                <!--<a href="javascript:void(0)" class="btn btn-sm btn-info float-left">Place New Order</a>-->
                                <router-link to="/myescrow/orders" class="btn btn-sm btn-secondary">View All Orders</router-link>
                            </div>
                            <!-- /.card-footer -->
                            </div>
                        </div>

                        <div class="col-md-4 col-12 col-sm-4">
                            <!-- Info Boxes Style 2 -->
                            <div class="info-box mb-3">
                            <span class="info-box-icon"><i class="fa fa-question"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">Disputed Transactions</span>
                                <span class="info-box-number">{{disputed_transactions}}</span>
                            </div>
                            <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                            <div class="info-box mb-3">
                            <span class="info-box-icon"><i class="fa fa-check"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">Completed Transactions</span>
                                <span class="info-box-number">{{completed_transactions}}</span>
                            </div>
                            <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                            <div class="info-box mb-3">
                            <span class="info-box-icon"><i class="fa fa-thumbs-down"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">Rejected Transactions</span>
                                <span class="info-box-number">{{rejected_transactions}}</span>
                            </div>
                            <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                            <div class="info-box mb-3">
                            <span class="info-box-icon"><i class="fa fa-clock-o"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">Pending Transactions</span>
                                <span class="info-box-number">{{pending_transactions}}</span>
                            </div>
                            <!-- /.info-box-content -->
                            </div>
                            <div class="info-box mb-3">
                            <span class="info-box-icon"><i class="fa fa-thumbs-up"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">Accepted Transactions</span>
                                <span class="info-box-number">{{accepted_transactions}}</span>
                            </div>
                            <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        </div>

                        <!-- /.row -->
                    </div><!--/. container-fluid -->
                </section>
                <!-- /.content -->
            </div>

            <dashboard-footer></dashboard-footer>
            
        </div>
    </div>
</template>


<script>
const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            stanbic_trustpay_user_role: null,
            status: null,
            fullname: "",
            total_transactions: null,
            total_orders: null,
            total_disputes: null,

            accepted_transactions: null,
            completed_transactions: null,
            created_transactions: null,
            disputed_transactions: null,
            pending_transactions: null,
            rejected_transactions: null,
            recent_orders: []
        };
    },
    created(){
        this.getDashboardDetails();
    },
    methods:{
        formatToSixDigits: function(number){
            var output = number + '';
            while (output.length < 6) {
                output = '0' + output;
            }
            return output;
        },
        getDashboardDetails: function(){

            var userDetailsEndpoint = endpoint +'/customer/dashboard';

            if(this.$session.get('stanbic_trustpay_user_role') == "seller"){
                userDetailsEndpoint = endpoint +'/seller/dashboard';
            }

            this.$http.get(userDetailsEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Details Err");
                    return response.json();
                }
            )
            .then(user => { 
                console.log(user);
                if(user.status == "success" && user.message == "seller_dashboard"){
                    
                    this.total_transactions = user.data.total_transactions;
                    this.total_disputes = user.data.total_disputes;
                    this.total_orders = user.data.total_orders;

                    this.accepted_transactions = user.data.accepted_transactions;
                    this.completed_transactions = user.data.completed_transactions;
                    this.created_transactions = user.data.created_transactions;
                    this.disputed_transactions = user.data.disputed_transactions;
                    this.pending_transactions = user.data.pending_transactions;
                    this.rejected_transactions = user.data.rejected_transactions;
                    this.recent_orders = user.data.recent_orders;
                }else{
                    alert("Error. Could not fetch user at this time");
                    //this.$router.push('/login');
                }
                
            });    
    

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
