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
                                <h1 class="m-0 text-dark">Payout Details</h1>
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
                            <div class="col-sm-10 col-md-8">
                                <br /><br >
                                <p v-if="accountnumber == null" class="text-center">You have not added your payout details. Add your payout details to receive payments whenever a transaction is completed.</p>
                                <br />
                                <div class="form-group">
                                    <label>Bank Name</label>
                                    <select v-model="bankname" class="form-control">
                                        <option v-for="bank in banks" :key="bank.id" >{{bank.name}}</option>
                                    </select>
                                </div>
                                <br />
                                <div class="form-group">
                                    <label>Account Name</label>
                                    <input type="text" v-model="accountname" class="form-control"/>
                                </div>
                                <br />
                                <div class="form-group">
                                    <label>Account Number</label>
                                    <input type="number" v-model="accountnumber" class="form-control"/>
                                </div>
                                <br />
                                <button class="btn btn-primary" v-on:click="saveAccountDetails()">Save</button>
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
            accountnumber: null,
            accountname: null,
            bankname: "Access Bank",
            banks: [
                    { "id": "1", "name": "Access Bank" ,"code":"044" },
                    { "id": "2", "name": "Citibank","code":"023" },
                    { "id": "3", "name": "Diamond Bank","code":"063" },
                    { "id": "4", "name": "Dynamic Standard Bank","code":"" },
                    { "id": "5", "name": "Ecobank Nigeria","code":"050" },
                    { "id": "6", "name": "Fidelity Bank Nigeria","code":"070" },
                    { "id": "7", "name": "First Bank of Nigeria","code":"011" },
                    { "id": "8", "name": "First City Monument Bank","code":"214" },
                    { "id": "9", "name": "Guaranty Trust Bank","code":"058" },
                    { "id": "10", "name": "Heritage Bank Plc","code":"030" },
                    { "id": "11", "name": "Jaiz Bank","code":"301" },
                    { "id": "12", "name": "Keystone Bank Limited","code":"082" },
                    { "id": "13", "name": "Providus Bank Plc","code":"101" },
                    { "id": "14", "name": "Skye Bank","code":"076" },
                    { "id": "15", "name": "Stanbic IBTC Bank Nigeria Limited","code":"221" },
                    { "id": "16", "name": "Standard Chartered Bank","code":"068" },
                    { "id": "17", "name": "Sterling Bank","code":"232" },
                    { "id": "18", "name": "Suntrust Bank Nigeria Limited","code":"100" },
                    { "id": "19", "name": "Union Bank of Nigeria","code":"032" },
                    { "id": "20", "name": "United Bank for Africa","code":"033" },
                    { "id": "21", "name": "Unity Bank Plc","code":"215" },
                    { "id": "22", "name": "Wema Bank","code":"035" },
                    { "id": "23", "name": "Zenith Bank","code":"057" }
                ]
        };
    },
    created(){
        this.getAccountDetails();
    },
    methods:{
        getBankCode: function(name){
            for(var i = 0; i < this.banks.length; i++){
                
                if(this.banks[i].name == name){
                    return this.banks[i].code;
                }

                return "000";
            }
        },
        getAccountDetails: function(){
            this.$http.get(endpoint + '/seller/payout/view', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Account details Get Err");
                    return response.json();
                }
            )
            .then(account => { 
                console.log("account details");
                console.log(account);
                if(account.status == "success" && account.message == "account_details"){
                    //this.publickey = key.data.public_key;

                }else if(account.status == "error" && account.message == "payout_details_not_found"){

                }else{
                    alert("Error. Could not get account details");
                }  
            });    
        },
        saveAccountDetails: function(){
            
            if(this.accountname == null || this.accountname.trim() == ""){
                alert("Account name is important");
                return;
            }

            if(this.accountnumber == null || this.accountnumber.trim() == ""){
                alert("Account number is important");
                return;
            }

            this.$http.post(endpoint + '/seller/payout/create', 
            {
                "bank_name" : this.bankname.trim(),
                "bank_code" : this.getBankCode(this.bankname),
                "bank_account_name" : this.accountname.trim(),
                "bank_account_number" : this.accountnumber.trim()
            },
            { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Account details save Err");
                    return response.json();
                }
            )
            .then(account_created => { 
                console.log("account_created details");
                console.log(account_created);
                if(account_created.status != "success"){
                    alert("Something went wrong");
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
