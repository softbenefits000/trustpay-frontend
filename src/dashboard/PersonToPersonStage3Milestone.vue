<template>
    <div>
        <div class="wrapper">

            <dashboard-navigation></dashboard-navigation>
            <dashboard-sidebar :myProp="fullname"></dashboard-sidebar>
        

            <div class="content-wrapper">
                <div class="container">
                    <br /><br />
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="alert alert-info">
                                Please Provide the Milestone Details for This Transaction. When you are finished, select the Continue button to review the transaction agreement.
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <tr>
                                        <th>No</th>
                                        <th style="width: 370px;">Milestone</th> 
                                        <th>Inspection period (calendar days)</th>
                                        <th style="width: 200px;">Delivery type</th>
                                        <th>Shipping price (&#8358;)</th>
                                        <th>Unit Price/Installment (&#8358;)</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <input class="form-control" type="text"/>
                                        </td> 
                                        <td class="text-center">
                                            <select class="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                        </td>
                                        <td class="text-right">
                                            <select class="form-control">
                                                <option>No Shipping Needed</option>
                                                <option>Standard Shipping</option>
                                                <option>Cargo Shipping</option>
                                            </select>    
                                        </td> 
                                        <td class="text-right"><input class="form-control" type="text" placeholder="0.00"/></td>
                                        <td class="text-right"><input class="form-control" type="text" placeholder="0.00"/></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <input class="form-control" type="text"/>
                                        </td> 
                                        <td class="text-center">
                                            <select class="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                        </td>
                                        <td class="text-right">
                                            <select class="form-control">
                                                <option>No Shipping Needed</option>
                                                <option>Standard Shipping</option>
                                                <option>Cargo Shipping</option>
                                            </select>    
                                        </td> 
                                        <td class="text-right"><input class="form-control" type="text" placeholder="0.00"/></td>
                                        <td class="text-right"><input class="form-control" type="text" placeholder="0.00"/></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <input class="form-control" type="text"/>
                                        </td> 
                                        <td class="text-center">
                                            <select class="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                        </td>
                                        <td class="text-right">
                                            <select class="form-control">
                                                <option>No Shipping Needed</option>
                                                <option>Standard Shipping</option>
                                                <option>Cargo Shipping</option>
                                            </select>    
                                        </td> 
                                        <td class="text-right"><input class="form-control" type="text" placeholder="0.00"/></td>
                                        <td class="text-right"><input class="form-control" type="text" placeholder="0.00"/></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td> 
                                        <td></td>
                                        <td></td> 
                                        <td class="text-right"><small><strong>Subtotal:</strong></small></td>
                                        <td class="text-right"><input class="form-control" type="text" placeholder="0.00"/></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td> 
                                        <td></td>
                                        <td></td> 
                                        <td class="text-right"><small><strong>Shipping Fee:</strong></small></td>
                                        <td class="text-right"><input class="form-control" type="text" placeholder="0.00"/></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td> 
                                        <td></td>
                                        <td></td> 
                                        <td class="text-right"><small><strong>Total:</strong></small></td>
                                        <td class="text-right"><input class="form-control" type="text" placeholder="0.00"/></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-12">
                            <router-link to="/myescrow/p2p/stage3" class="btn btn-success float-right">Continue</router-link>
                        </div>
                    </div>
                    <br /><br />
                </div>
            </div>

            <dashboard-footer></dashboard-footer>
            
        </div>
    </div>
</template>
<style>
.btn-success{background: rgb(63,122,238) !important; border-color: rgb(63,122,238) !important;}
hr{margin: 20px 0px;}
.callout{margin: 15px 0px; border-color: rgb(63,122,238) !important;}
.alert{background: rgb(63,122,238) !important;}
.btn-default{margin-right: 20px; background: #ccc; color: #000;}
</style>

<script>
const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            stanbic_trustpay_user_role: null,
            status: null,
            fullname: ""
        };
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
                if(user.status == "success" && (user.message == "customer_details" || user.message == "seller_details")){
                    this.status = "done";
                    this.fullname = user.data.firstname + " " + user.data.lastname;
                    console.log("stats "+this.status);
                }else{
                    //this.$session.destroy();
                    //this.$router.push('/login');
                }
                
                }
            );

    
    }
}
</script>
