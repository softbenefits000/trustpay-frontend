<template>
    <div>
        <div class="wrapper">

            <dashboard-navigation></dashboard-navigation>
            <dashboard-sidebar :myProp="fullname"></dashboard-sidebar>
        
            <!-- Change Password Modal -->
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title"><small>Update Password</small></h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">

                        <div class="alert update-password-alert alert-danger d-none">
                            <a class="close alert-close pointer" aria-label="close"  v-on:click="hideAlert">&times;</a>
                            <span class="update-password-alert-message-content"></span>
                        </div>
                        
                        <div class="form-group">
                        <label for="cur_pwd"><small>Please enter your current password*</small></label>

                        <input type="password" v-model="cur_pwd" id="cur_pwd" class="form-control" required="required">
                        </div>

                        <div class="form-group">
                        <label for="new_pwd"><small>Please enter your new password*</small></label>

                        <input type="password" v-model="new_pwd" id="new_pwd" class="form-control" required="required">
                        </div>

                        <div class="form-group">
                        <label for="pwd_confirmation"><small>Please confirm your new password*</small></label>

                        <input type="password" v-model="pwd_confirmation" id="pwd_confirmation" class="form-control" required="required">
                        </div>

                        <button class="btn btn-info" v-on:click="updatePassword">Submit</button>

                    </div>


                    </div>
                </div>
            </div>

            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                    <div class="col-sm-12">
                        <h1 class="m-0 text-dark">Update your account</h1>
                    </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

                <!-- Main content -->
                <section class="content">
                <div class="container-fluid">
                
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    <i class="fa fa-lock"></i>&nbsp;&nbsp;&nbsp;Update Password
                    </button>
                    <br /><br />
                    <div class="row">
                    <div class="col-12 col-sm-12 col-md-12">
                        <div class="alert update-alert alert-danger d-none">
                            <a class="close alert-close pointer" aria-label="close" v-on:click="hideAlert">&times;</a>
                            <span class="update-alert-message-content"></span>
                        </div>
                        <div class="callout callout-info">
                        <br />
                        <div class="row">
                            <div class="col-sm-6">
                            <div class="form-group">
                                <label for="customer_first_name">First Name</label>
                                <input type="text" v-model="first_name" id="customer_first_name" class="form-control" autocomplete="off" />
                            </div>
                            </div>
                            <div class="col-sm-6">
                            <div class="form-group">
                                <label for="customer_last_name">Last Name</label>
                                <input type="text" v-model="last_name" id="customer_last_name" class="form-control" autocomplete="off"  />
                            </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="text" v-model="phone" id="phone" class="form-control" autocomplete="off"  />
                            </div>
                            </div>
                            <div class="col-sm-6">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" v-model="email" id="email" class="form-control" autocomplete="off" placeholder="+234xxxxxxxxxx" maxlength="14"/>
                            </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                            <div class="form-group">
                                <input type="submit" value="Update" class="btn btn-sm btn-info" v-on:click="updateProfile"/>
                            </div>
                            </div>
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
            fullname: "",
            first_name: null,
            last_name: null,
            phone: null,
            email: null,
            stanbic_trustpay_user_role: this.$session.get('stanbic_trustpay_user_role'),
            cur_pwd: "",
            new_pwd: "",
            pwd_confirmation: ""
        };
    },
    methods:{
        updateProfile: function(){
            var status = this.validateCredentials();
            if(status == "error") return;

            var updateProfileEndpoint = endpoint +'/customer/update';

            if(this.$session.get('stanbic_trustpay_user_role') == "seller"){
                updateProfileEndpoint = endpoint +'/seller/account/update';
            }

            this.$http.put( updateProfileEndpoint, 
                    {
                        "firstname": this.first_name,
                        "lastname": this.last_name,
                        "phone_number": this.phone,
                        "email": this.email
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

                    if(data.status == "success" && (data.message == "customer_updated" || data.message == "updated_successfully" || data.message == "update_successful")){
                        
                        this.showSuccessAlert('User Updated!');
                        this.first_name = data.data.firstname;
                        this.last_name = data.data.lastname;
                        this.phone = data.data.phone_number;
                        this.email = data.data.email;
                        this.fullname = data.data.firstname + " " + data.data.lastname;

                    }else{

                        //did not update for other reason. Some things we may not have prepared for.
                        this.showAlert('Something went wrong. Could not update user at this time.');

                    }

                    
                }
            );
        
        },
        updatePassword: function(){
            var status = this.validatePassword();
            if(status == "error") return;

            var changePasswordEndpoint = endpoint +'/customer/changePassword';

            if(this.$session.get('stanbic_trustpay_user_role') == "seller"){
                changePasswordEndpoint = endpoint +'/seller/changePassword';
            }


            this.$http.post( changePasswordEndpoint, 
                    {
                        "current_password": this.cur_pwd,
                        "new_password": this.new_pwd,
                        "new_password_confirmation": this.pwd_confirmation,
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

                    if(data.status == "success" && data.message == "password_updated"){
                        
                        this.showPasswordSuccessAlert('Password Updated!');
                        this.cur_pwd = "";
                        this.new_pwd = "";
                        this.pwd_confirmation = "";

                    }else{

                        //did not update for other reason. Some things we may not have prepared for.
                        this.showPasswordAlert('Something went wrong. Could not update password at this time.');

                    }

                    
                }
            );
        
        },
        hideAlert: function(){
            $(".alert").addClass("d-none");
        },
        showAlert: function(message){

            $(".alert").addClass("d-none");
            $(".update-alert").removeClass("alert-success").addClass("alert-danger");
            $(".update-alert").removeClass("d-none");
            $(".update-alert-message-content").text(message);

        },
        showSuccessAlert: function(message){

            $(".alert").addClass("d-none");
            $(".update-alert").removeClass("alert-danger").addClass("alert-success");
            $(".update-alert").removeClass("d-none");
            $(".update-alert-message-content").text(message);

        },
        showPasswordAlert: function(message){

            $(".alert").addClass("d-none");
            $(".update-password-alert").removeClass("alert-success").addClass("alert-danger");
            $(".update-password-alert").removeClass("d-none");
            $(".update-password-alert-message-content").text(message);

        },
        showPasswordSuccessAlert: function(message){

            $(".update-password-alert").removeClass("alert-danger").addClass("alert-success");
            $(".update-password-alert").removeClass("d-none");
            $(".update-password-alert-message-content").text(message);

        },
        validateEmail: function(email){

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        return re.test(String(email).toLowerCase());

        },
        validatePassword: function(email){

            //validate password on client side
            if(this.cur_pwd == ""){
                this.showPasswordAlert("The current password should not be empty");
                return "error";
            }

            //validate password on client side
            if(this.new_pwd == "" || this.new_pwd.length < 6){
                this.showPasswordAlert("The password should be at least six characters");
                return "error";
            }

            //validate password confirmation on client side
            if(this.new_pwd != this.pwd_confirmation){
                this.showPasswordAlert("The password confirmation is not the same");
                return "error";
            }

        },
        validateCredentials: function(){
            //validate first name on client side
            if( this.first_name.trim() == "" || this.first_name.trim().length < 3){
                this.showAlert("The first name must be at least 3 characters");
                return "error";
            }

            //validate last name on client side
            if( this.last_name.trim() == "" || this.last_name.trim().length < 3){
                this.showAlert("The last name must be at least 3 characters");
                return "error";
            }

            //validate email address on client side
            if( ! this.validateEmail(this.email.trim()) ) {
                this.showAlert("The email must be of the valid format");
                return "error";
            }

            //validate phone number on client side
            if(this.phone.trim() == "" ){
                this.showAlert("The phone number is required");
                return "error";
            }

        }
    },
    beforeCreate: function () {

        var userDetailsEndpoint = endpoint +'/customer';

        if(this.$session.get('stanbic_trustpay_user_role') == "seller"){
            userDetailsEndpoint = endpoint +'/seller/account';
        }

        this.$http.get(userDetailsEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                    //console.log(response);
                }, 
                response => { //error
                    //alert("Error. Could not fetch user at this time");
                    this.$router.push('/login');
                }
            )
            .then(user => { 
                console.log(user); 

                if(user.status == "success" && user.message == "customer_details"){
                    this.status = "done";
                    this.fullname = user.data.firstname + " " + user.data.lastname;
                    this.first_name = user.data.firstname;
                    this.last_name = user.data.lastname;
                    this.phone = user.data.phone_number;
                    this.email = user.data.email;
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