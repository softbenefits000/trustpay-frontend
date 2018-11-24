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
                        <h1 class="m-0 text-dark">Dispute {{dispute.data[0].id}}</h1>
                        <br />
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link to="/myescrow/welcome">Dashboard</router-link></li>
                        <li class="breadcrumb-item active">Dispute {{dispute.data[0].id}}</li>
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
            fullname: "",
            dispute: []
        };
    },
    created(){

        var user_role = this.$session.get('stanbic_trustpay_user_role');

        var disputeDetailEndpoint = endpoint +'/customer/order/dispute';

        if(user_role == "seller"){
            disputeDetailEndpoint = endpoint +'/seller/order/dispute';
        }
        
        this.$http.post(disputeDetailEndpoint, 
        {
            "dispute_id" : this.$route.params.disputeId,
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
        .then(dispute => { 
                if(dispute.status == "success" && dispute.message == "dispute_details"){
                    console.log(dispute);
                    this.dispute = dispute;
                }else{
                    console.log("error");
                    console.log(dispute);
                    //this.$router.push('/myescrow/disputes/all');
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
