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
                                <h1 v-if="publickey == null" class="m-0 text-dark">Create Api Key</h1>
                                <h1 v-else class="m-0 text-dark">Recreate Api Key</h1>
                            </div><!-- /.col -->
                            </div><!-- /.row -->
                        </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->
                <br />
                <!-- Main content -->
                <section class="content">
                    <div class="container-fluid">
                        <div class="card">
                            <div class="row">
                            <div class="col-sm-1 col-md-2"></div>
                            <div class="col-sm-10 col-md-8 text-center">
                                <br /><br >
                                <p v-if="publickey == null" >You do not have an api key. Generate an api key to add the TrustPay plugin to your website. You can view the documentation on how to add it <a href="http://plugins.trustoayonline.com">here</a></p>
                                <br />
                                <div class="form-group">
                                    <label>Public Key</label>
                                    <input type="text" v-model="publickey" :readonly="true" class="form-control text-center"/>
                                </div>
                                <br />
                                <div class="form-group">
                                    <label>Private Key</label>
                                    <input type="text" v-model="privatekey" :readonly="true" class="form-control text-center"/>
                                </div>
                                <br />
                                <button v-if="publickey == null" class="btn btn-primary" v-on:click="generateApiKey()">Generate API Key</button>
                                <button v-else class="btn btn-primary" v-on:click="generateApiKey()">Regenerate API Key</button>
                                <br /><br />
                            </div>
                            <div class="col-sm-1 col-md-2"></div>
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


<script>
const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            stanbic_trustpay_user_role: null,
            status: null,
            fullname: "",
            publickey: null,
            privatekey: null
        };
    },
    created(){
        this.getApiKey();
    },
    methods:{
        generateApiKey: function(){
            this.$http.get(endpoint + '/seller/pluginkey/generate', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Api Key Get Err");
                    return response.json();
                }
            )
            .then(key => { 
                console.log("Key details");
                console.log(key);
                if(key.status == "success" && key.message == "key_generated"){
                    this.publickey = key.data.public_key;
                    this.privatekey = key.data.private_key;
                }else{
                    alert("Error. Could not generate API keys");
                }  
            });    
        },
        getApiKey: function(){
            this.$http.get(endpoint + '/seller/pluginkey', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Api Key Get Err");
                    return response.json();
                }
            )
            .then(key => { 
                console.log("Key details");
                console.log(key);
                if(key.status == "success" && key.message == "api_keys"){
                    this.publickey = key.data.public_key;
                    this.privatekey = key.data.private_key;
                }else{
                    alert("Error. Could not get API keys");
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
