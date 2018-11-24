<template>
    <div>
        <div class="wrapper">
            <!-- Add Modal -->
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Add Courier Service</h4>
                        <button type="button" class="close" v-on:click="dismissModal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="alert alert-success d-none">
                                <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                    Courier Service has been created!
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="alert alert-danger d-none">
                                <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                    {{errorMessage}}
                                </div>
                            </div>
                        </div>
                        <p>* Indicates mandatory fields</p>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Business Name *</label>
                                <input type="text" class="form-control" v-model="business_name"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Business Email *</label>
                                <input type="email" class="form-control" v-model="business_email"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label>Address *</label>
                                <input type="text" class="form-control" v-model="business_address"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>State *</label>
                                <select class="form-control" v-model="business_state" v-on:change="getLgasFromState(business_state)">
                                    <option v-for="state in states" v-bind:key="state.state.id" :value="state.state.name">{{state.state.name}}</option>
                                </select>
                                <!--<input type="text" class="form-control" v-model="business_state"/>-->
                            </div>
                            <div class="col-sm-6">
                                <label>City / LGA *</label>
                                <select class="form-control" v-model="business_city">
                                    <option v-for="city in cities" v-bind:key="city.id" :value="city.name">{{city.name}}</option>
                                </select>
                                <!--<input type="email" class="form-control" v-model="business_city"/>-->
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Country *</label>
                                <input type="text" class="form-control" v-model="business_country" :readonly="true"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Phone *</label>
                                <input type="text" class="form-control" v-model="business_phone"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label>Site Url *</label>
                                <input type="text" class="form-control" v-model="siteURL"/>
                            </div>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click="addCourierService">Submit</button>
                    </div>
                    </div>
                </div>
            </div>

            <!-- View Modal -->
            <div class="modal" id="viewCourierModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">View Courier Service</h4>
                        <button type="button" class="close" v-on:click="dismissModal">&times;</button> <!--data-dismiss="modal"-->
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Business Name *</label>
                                <input type="text" class="form-control" v-model="courier.business_name" readonly="readonly" />
                            </div>
                            <div class="col-sm-6">
                                <label>Business Email *</label>
                                <input type="email" class="form-control" v-model="courier.business_email" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label>Address *</label>
                                <input type="text" class="form-control" v-model="courier.business_address" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>State *</label>
                                <input type="text" class="form-control" v-model="courier.business_state" readonly="readonly"/>
                            </div>
                            <div class="col-sm-6">
                                <label>City *</label>
                                <input type="email" class="form-control" v-model="courier.business_city" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Country *</label>
                                <input type="text" class="form-control" v-model="courier.business_country" readonly="readonly"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Phone *</label>
                                <input type="email" class="form-control" v-model="courier.business_phone" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label>Site Url *</label>
                                <input type="text" class="form-control" v-model="courier.siteURL" readonly="readonly"/>
                            </div>
                        </div>
                        <br />
                    </div>

                    </div>
                </div>
            </div>

            <!-- Edit Modal -->
            <div class="modal" id="editCourierModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Courier Service</h4>
                        <button type="button" class="close" v-on:click="dismissModal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="alert alert-success d-none">
                                <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                    Courier Service has been updated!
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="alert alert-danger d-none">
                                <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                    {{errorMessage}}
                                </div>
                            </div>
                        </div>
                        <p>* Indicates mandatory fields</p>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Business Name *</label>
                                <input type="text" class="form-control" v-model="courier.business_name"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Business Email *</label>
                                <input type="email" class="form-control" v-model="courier.business_email"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label>Address *</label>
                                <input type="text" class="form-control" v-model="courier.business_address"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>State *</label>
                                <select class="form-control" v-model="courier.business_state" v-on:change="getLgasFromState(courier.business_state)">
                                    <option v-for="state in states" v-bind:key="state.state.id" :value="state.state.name">{{state.state.name}}</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label>City *</label>
                                <select class="form-control" v-model="courier.business_city">
                                    <option v-for="city in cities" v-bind:key="city.id" :value="city.name">{{city.name}}</option>
                                </select>
                                <!--<input type="email" class="form-control" v-model="courier.business_city"/>-->
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Country *</label>
                                <input type="text" class="form-control" v-model="courier.business_country" :readonly="true"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Phone *</label>
                                <input type="email" class="form-control" v-model="courier.business_phone"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label>Site Url *</label>
                                <input type="text" class="form-control" v-model="courier.siteURL"/>
                            </div>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click="updateCourierService(courier.id)">Update</button>
                    </div>
                    </div>
                </div>
            </div>

            <!-- Delete Modal -->
            <div class="modal" id="deleteCourierModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Delete Courier Service</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <p>Are you sure you want to delete {{courier.business_name}} ? This process cannot be reversed.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                        &nbsp;&nbsp;
                        <button type="button" class="btn btn-danger" v-on:click="deleteCourierService(courier.id)">Delete</button>
                    </div>
                    </div>
                </div>
            </div>



            <dashboard-navigation></dashboard-navigation>
            <dashboard-sidebar :myProp="fullname"></dashboard-sidebar>
        

            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-12">
                                <h1 class="m-0 text-dark">Courier Services</h1>
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->
                <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <br /><br /><br /><br />
                        <div class="col-12 col-sm-12 col-md-12">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">Add New Courier</button>
                        </div>
                        <br /><br />
                        <div class="col-12 col-sm-12 col-md-12">
                            <div class="card">
                            <div class="card-body table-responsive">
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                <th>Business Name</th>
                                <th>Business Email</th>
                                <th>Business Phone</th>
                                <th>Site Url</th>
                                <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="courier in couriers" :key="courier.id">
                                    <td>{{courier.business_name}}</td>
                                    <td>{{courier.business_email}}</td>
                                    <td>{{courier.business_phone}}</td>
                                    <td>{{courier.siteURL}}</td>
                                    <td class="action">
                                        <a class="view" v-on:click="launchViewCourierModal(courier.id)">View</a>
                                        <a class="edit" v-on:click="launchEditCourierModal(courier.id)">Edit</a>
                                        <a class="delete" v-on:click="launchDeleteCourierModal(courier.id)">Delete</a>
                                    </td>
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

            </div>

            <dashboard-footer></dashboard-footer>
            
        </div>
    </div>
</template>

<style scoped>
.action a{cursor: pointer; font-size: 13px; margin: 0 5px;}
.action .view{color: green;}
.action .edit{color: blue;}
.action .delete{color: red;}
.btn-info{background: rgb(58,122,238) !important; border-color: rgb(58,122,238) !important;}
.alert-info{background: rgb(58,122,238) !important;}
.callout-info{border-color: rgb(58,122,238) !important;}
</style>


<script>
const endpoint = 'http://18.208.164.251/api';

import json from '../states.json';

export default {
    data(){
        return{
            stanbic_trustpay_user_role: null,
            status: null,
            fullname: "",
            checked: false,
            couriers: [],
            courier: [],
            states : json,
            cities: json[0].state.locals,
            /*states: [ 
                        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
                        "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
                        "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna",
                        "Katsina", "Kano", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
                        "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
                        "Sokoto", "Taraba", "Yobe", "Zamfara"
            ],*/

            //new courier business details
            business_name: "",
            business_email: "",
            business_address: "",
            business_state: "Abia",
            business_city: "Aba South",
            business_country: "Nigeria",
            business_phone: "",
            siteURL: "http://",
            errorMessage: ""


        };
    },
    created: function (){
        this.fetchCourierServices();
        console.log("JSON");
        console.log(json);
    },
    methods:{
        getLgasFromState: function(state){
            //alert(state);
            for(var i = 0; i < this.states.length; i++){
                if(this.states[i].state.name === state){
                    //return this.couriers[i];
                    this.cities = this.states[i].state.locals;
                    return;
                }
            }
        },
        dismissModal: function(id){
            $('.modal').modal('hide');
            $(".alert").addClass("d-none"); 
            this.cities = this.states[0].state.locals;
            this.business_state = "Abia";
            this.business_city = "Aba South";
        },
        updateCourierService: function(id){
            //this.validateEditCredentials();
            var result = this.validateEditCredentials();

            if(result != null){
                console.log(result);
                this.errorMessage = result;
                this.hideAlert();
                $(".alert-danger").removeClass("d-none"); 
                return;
            }

            this.$http.put( endpoint + '/deliveryman/courier/update/'+id, 
                {
                    "business_name" : this.courier.business_name.trim(),
                    "business_email" : this.courier.business_email.trim(),
                    "business_address" : this.courier.business_address.trim(),
                    "business_state" : this.courier.business_state.trim(),
                    "business_city" : this.courier.business_city.trim(),
                    "business_country" : "Nigeria",
                    "business_phone" : this.courier.business_phone.trim(),
                    "siteURL" : this.courier.siteURL.trim(),
                }, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') }})
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Courier add Err");
                    return response.json();
                }
            )
            .then(courier => { 
                console.log("Courier update details");
                console.log(courier);
                if(courier.status == "success" && courier.message == "updated_successful"){
                    //this.couriers.push(courier.data); 
                    this.hideAlert();
                    $(".alert-success").removeClass("d-none");
                    this.updateCourierInCollection(courier.data.id, courier.data);
                }else//{
                {
                    this.errorMessage = courier.message.replace(/\\n/g, " ");
                    this.hideAlert();
                    $(".alert-danger").removeClass("d-none"); 
                }
                /*else{
                    this.$session.destroy();
                    this.$router.push('/login');
                }*/
                
                }
            ); 

        },
        removeSingleCourier: function(id){
            for(var i = 0; i < this.couriers.length; i++){
                if(this.couriers[i].id === id){
                    //return this.couriers[i];
                    this.couriers.splice(i, 1);
                }
            }
            return;
        },
        updateCourierInCollection: function(id, courier){
            for(var i = 0; i < this.couriers.length; i++){
                if(this.couriers[i].id === id){
                    this.couriers[i] = courier;
                    return;
                }
            }
            return;
        },
        getSingleCourier: function(id){
            for(var i = 0; i < this.couriers.length; i++){
                if(this.couriers[i].id === id){
                    return this.couriers[i];
                }
            }
            return null;
        },
        launchViewCourierModal: function(id){

            //for each courier modal, return the modal with same id and launch modal
            this.courier = this.getSingleCourier(id);

            if(this.courier != null){
                $('#viewCourierModal').modal('show');
            }else{
                alert("Sorry. You are not allowed to view this courier.");
            }
            

        },
        launchEditCourierModal: function(id){
            //for each courier modal, return the modal with same id and launch modal
            this.courier = this.getSingleCourier(id);
            this.getLgasFromState(this.courier.business_state);

            if(this.courier != null){
                $('#editCourierModal').modal('show');
            }else{
                alert("Sorry. You are not allowed to edit this courier.");
            }
        },
        launchDeleteCourierModal: function(id){
            this.courier = this.getSingleCourier(id);

            if(this.courier != null){
                $('#deleteCourierModal').modal('show');
            }else{
                alert("Sorry. You are not allowed to view this courier.");
            }
            
        },
        editCourier: function(){
            
        },
        deleteCourier: function(){
            
        },
        hideAlert: function(){
           $(".alert").addClass("d-none"); 
        },
        validateCredentials(){

            if(this.business_name.trim() == "") {
                return "Business name is required";
            }

            if( ! this.isEmail(this.business_email.trim()) ) {
                return "Business email is required";
            }

            if(this.business_address.trim() == "") {
                return "Address is required";
            }

            if(this.business_state.trim() == "") {
                return "State is required";
            }

            if(this.business_city.trim() == "") {
                return "City is required";
            }

            if(this.business_country.trim() == "") {
                return "Country is required";
            }

            if(this.business_phone.trim() == "") {
                return "Phone is required";
            }

            if(this.siteURL.trim() == "") {
                return "URL is required";
            }

            return null;
        },
        validateEditCredentials(){

            if(this.courier.business_name.trim() == "") {
                return "Business name is required";
            }

            if( ! this.isEmail(this.courier.business_email.trim()) ) {
                return "Business email is required";
            }

            if(this.courier.business_address.trim() == "") {
                return "Address is required";
            }

            if(this.courier.business_state.trim() == "") {
                return "State is required";
            }

            if(this.courier.business_city.trim() == "") {
                return "City is required";
            }

            if(this.courier.business_country.trim() == "") {
                return "Country is required";
            }

            if(this.courier.business_phone.trim() == "") {
                return "Phone is required";
            }

            if(this.courier.siteURL.trim() == "") {
                return "URL is required";
            }

            return null;
        },
        isEmail: function(email){

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        return re.test(String(email).toLowerCase());

        },
        clearAllFields: function(){
            this.business_name = "";
            this.business_email = "";
            this.business_address = "";
            this.business_state = "Lagos";
            this.business_city = "";
            this.business_country = "Nigeria";
            this.business_phone = "";
            this.siteURL = "http://";
        },
        clearEditFields: function(){
            this.courier.business_name = "";
            this.courier.business_email = "";
            this.courier.business_address = "";
            this.courier.business_state = "";
            this.courier.business_city = "";
            this.courier.business_country = "Nigeria";
            this.courier.business_phone = "";
            this.courier.siteURL = "http://";
        },
        addCourierService: function(){

            var result = this.validateCredentials();

            if(result != null){
                console.log(result);
                this.errorMessage = result;
                this.hideAlert();
                $(".alert-danger").removeClass("d-none"); 
                return;
            }

            this.$http.post( endpoint + '/deliveryman/add_courier', 
                {
                    "business_name" : this.business_name.trim(),
                    "business_email" : this.business_email.trim(),
                    "business_address" : this.business_address.trim(),
                    "business_state" : this.business_state.trim(),
                    "business_city" : this.business_city.trim(),
                    "business_country" : "Nigeria",
                    "business_phone" : this.business_phone.trim(),
                    "siteURL" : this.siteURL.trim(),
                }, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') }})
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Courier add Err");
                    return response.json();
                }
            )
            .then(courieradd => { 
                console.log("Courier add details");
                console.log(courieradd);
                if(courieradd.status == "success" && courieradd.message == "courier_business_added"){
                    this.couriers.push(courieradd.data); 
                    this.hideAlert();
                    $(".alert-success").removeClass("d-none");
                    this.clearAllFields();
                }else if(courieradd.status == "error" && courieradd.message == "failed"){
                    this.errorMessage = "Error. Cannot add Courier Business at this time";
                    this.hideAlert();
                    $(".alert-danger").removeClass("d-none"); 

                }else{
                    this.errorMessage = courieradd.message.replace(/\\n/g, " ");
                    this.hideAlert();
                    $(".alert-danger").removeClass("d-none");
                }
                
                }
            ); 

        },
        deleteCourierService: function(id){
            var deleteEndpoint = endpoint + '/deliveryman/courier/delete/'+id;
            console.log("Endpoint - "+deleteEndpoint);
            this.$http.delete( deleteEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Courier fetch Err");
                    return response.json();
                }
            )
            .then(result => { 
                console.log("Courier details");
                console.log(result);
                if(result.status == "success" && result.message == "courier_deleted"){
                    
                    this.removeSingleCourier(result.data.id);
                    $('#deleteCourierModal').modal('hide');

                }else if(result.status == "error" && result.message == "failed"){
                    //check is seller is verified

                }else{
                    //this.$session.destroy();
                    //this.$router.push('/login');
                }
                
                }
            ); 

        },
        fetchCourierServices: function(){
            this.$http.get( endpoint + '/deliveryman/viewcourier', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Courier fetch Err");
                    return response.json();
                }
            )
            .then(courier => { 
                console.log("Courier details");
                console.log(courier);
                if(courier.status == "success" && courier.message == "couriers"){
                    //alert("Yayyy");
                    console.log(courier);
                    console.log("courier");
                    this.couriers = courier.data;
                }else if(courier.status == "error" && courier.message == "failed"){
                    //check is seller is verified

                }else{
                    this.$session.destroy();
                    this.$router.push('/login');
                }
                
                }
            );    
    
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
            console.log("Token - "+this.$session.get('trustpayauthtoken'));
        }

        this.$http.get(userDetailsEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Login Err");
                    return response.json();
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

            });    
    }
}
</script>
