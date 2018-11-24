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
                    <div class="col-sm-12">
                        <h1 class="m-0 text-dark">All Disputes</h1>
                        <br />
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
                        <div class="card">
                        <div class="card-body">
                        <table id="example1" class="table table-bordered table-striped">
                            <thead>
                            <tr>
                            <th>Dispute Number</th>
                            <th>Order Number</th>
                            <th>Issue</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="dispute in disputes.data" :key="dispute.id">
                            <td>
                                <router-link :to="{ name: 'single-dispute', params: { disputeId: dispute.id }}">
                                    {{dispute.id}}
                                </router-link>
                            </td>
                            <td>{{dispute.transactions.order_code}}</td>
                            <td>{{dispute.reason}}</td>
                            <td>{{dispute.created_at}}</td>
                            <td>{{dispute.status}}</td>
                            </tr>
                            
                        </tbody>
                        </table>
                        </div>
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


<script>
const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            stanbic_trustpay_user_role: null,
            status: null,
            fullname: "",
            disputes: []
        };
    },
    created(){
        var user_role = this.$session.get('stanbic_trustpay_user_role');

        var userDisputeEndpoint = endpoint +'/customer/order/disputes';

        if(user_role == "seller"){
            userDisputeEndpoint = endpoint +'/seller/order/disputes';
        }
        
        this.$http.get( userDisputeEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
        .then( 
            response => { //success
                return response.json();
            }, 
            response => { //error
                return response.json();
            }
        )
        .then(disputes => { 
            console.log(disputes);
            if(disputes.status == "success" && (disputes.message == "customer_disputes" || disputes.message == "disputes" || disputes.message == "dipsutes")){
                
                this.disputes = disputes;

            }else{
                alert("Error. Could not fetch orders at this time");
                //this.$router.push('/login');
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
