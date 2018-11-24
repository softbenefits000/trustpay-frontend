<template>
    <div>
        <div class="wrapper">

            <!-- Add Modal -->
            <div class="modal" id="addDispatcherModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Add Dispatcher</h4>
                        <button type="button" class="close"  v-on:click="dismissModal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <p>* Indicates mandatory fields</p>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="alert alert-success d-none">
                                <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                    Dispatcher has been created!
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="alert alert-danger d-none">
                                <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                    {{errorMessage}}
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Type *</label>
                                <select class="form-control" v-model="type">
                                    <option v-for="dispatcherType in dispatcherTypes" v-bind:key="dispatcherType.id" :value="dispatcherType.id">
                                        {{dispatcherType.title}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label>Courier Business*</label>
                                <select class="form-control" v-model="courier_business" :disabled="type != 3">
                                    <option v-for="courierBusiness in courierBusinesses" v-bind:key="courierBusiness.id" :value="courierBusiness.id">
                                        {{courierBusiness.business_name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>First Name *</label>
                                <input type="text" class="form-control" v-model="firstname"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Last Name *</label>
                                <input type="text" class="form-control" v-model="lastname"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Email *</label>
                                <input type="text" class="form-control" v-model="email"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Site Url *</label>
                                <input type="text" class="form-control" v-model="siteURL"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label>Address *</label>
                                <input type="text" class="form-control" v-model="address"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>City *</label>
                                <select class="form-control" v-model="city">
                                    <option v-for="b_city in cities" v-bind:key="b_city.id" :value="b_city.name">{{b_city.name}}</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label>State *</label>
                                <select class="form-control" v-model="state" v-on:change="getLgasFromState(state)">
                                    <option v-for="b_state in states" v-bind:key="b_state.state.id" :value="b_state.state.name">{{b_state.state.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Country *</label>
                                <input type="text" class="form-control" v-model="country" :readonly="true" />
                            </div>
                            <div class="col-sm-6">
                                <label>Phone *</label>
                                <input type="email" class="form-control" v-model="phone"/>
                            </div>
                        </div>
                        
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click="addDispatcher">Submit</button>
                    </div>
                    </div>
                </div>
            </div>

            <!-- View Modal -->
            <div class="modal" id="viewDispatcherModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">View Dispatcher</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row form-group" v-if="dispatcher.type && dispatcher.courier_business">
                            <div class="col-sm-6">
                                <label>Type *</label>
                                <input type="text" class="form-control" v-model="dispatcher.type.title"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Courier Business*</label>
                                <input type="text" class="form-control" v-model="dispatcher.courier_business.business_name"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>First Name *</label>
                                <input type="text" class="form-control" v-model="dispatcher.firstname"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Last Name *</label>
                                <input type="text" class="form-control" v-model="dispatcher.lastname"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Email *</label>
                                <input type="text" class="form-control" v-model="dispatcher.email"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Site Url *</label>
                                <input type="text" class="form-control" v-model="dispatcher.siteURL"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label>Address *</label>
                                <input type="text" class="form-control" v-model="dispatcher.address"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>City *</label>
                                <input type="text" class="form-control" v-model="dispatcher.city"/>
                            </div>
                            <div class="col-sm-6">
                                <label>State *</label>
                                <input type="text" class="form-control" v-model="dispatcher.state"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Country *</label>
                                <input type="text" class="form-control" v-model="dispatcher.country"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Phone *</label>
                                <input type="email" class="form-control" v-model="dispatcher.phone"/>
                            </div>
                        </div>
                        
                    </div>

                    </div>
                </div>
            </div>

            <!-- Edit Modal -->
            <div class="modal" id="editDispatcherModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Dispatcher</h4>
                        <button type="button" class="close"  v-on:click="dismissModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>* Indicates mandatory fields</p>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="alert alert-success d-none">
                                <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                    Dispatcher has been updated!
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="alert alert-danger d-none">
                                <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                    {{errorMessage}}
                                </div>
                            </div>
                        </div>
                        <div class="row form-group" v-if="dispatcher.type && dispatcher.courier_business">
                            <div class="col-sm-6">
                                <label>Type *</label>
                                <select class="form-control" v-model="dispatcher.type.id">
                                    <option v-for="dispatcherType in dispatcherTypes" v-bind:key="dispatcherType.id" :value="dispatcherType.id">
                                        {{dispatcherType.title}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label>Courier Business*</label>
                                <select class="form-control" v-model="dispatcher.courier_business.id" :disabled="type != 3">
                                    <option v-for="courierBusiness in courierBusinesses" v-bind:key="courierBusiness.id" :value="courierBusiness.id">
                                        {{courierBusiness.business_name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>First Name *</label>
                                <input type="text" class="form-control" v-model="dispatcher.firstname"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Last Name *</label>
                                <input type="text" class="form-control" v-model="dispatcher.lastname"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Email *</label>
                                <input type="text" class="form-control" v-model="dispatcher.email"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Site Url *</label>
                                <input type="text" class="form-control" v-model="dispatcher.siteURL"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label>Address *</label>
                                <input type="text" class="form-control" v-model="dispatcher.address"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>City *</label>
                                <!--<input type="text" class="form-control" v-model="dispatcher.city"/>-->
                                <select class="form-control" v-model="dispatcher.city">
                                    <option v-for="b_city in cities" v-bind:key="b_city.id" :value="b_city.name">{{b_city.name}}</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label>State *</label>
                                <!--<input type="text" class="form-control" v-model="dispatcher.state"/>-->
                                <select class="form-control" v-model="dispatcher.state" v-on:change="getLgasFromState(dispatcher.state)">
                                    <option v-for="b_state in states" v-bind:key="b_state.state.id" :value="b_state.state.name">{{b_state.state.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-6">
                                <label>Country *</label>
                                <input type="text" class="form-control" v-model="dispatcher.country"/>
                            </div>
                            <div class="col-sm-6">
                                <label>Phone *</label>
                                <input type="email" class="form-control" v-model="dispatcher.phone"/>
                            </div>
                        </div>
                        
                    </div>
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click="updateDispatcher(dispatcher.id)">Submit</button>
                    </div>
                    </div>
                </div>
            </div>

            <!-- Delete Modal -->
            <div class="modal" id="deleteDispatcherModal">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Delete Dispatcher</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <p>Are you sure you want to delete {{dispatcher.firstname}} {{dispatcher.lastname}} ? This process cannot be reversed.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                        &nbsp;&nbsp;
                        <button type="button" class="btn btn-danger" v-on:click="deleteDispatcher(dispatcher.id)">Delete</button>
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
                                <h1 class="m-0 text-dark">Dispatchers</h1>
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
                            <button class="btn btn-primary" data-toggle="modal" data-target="#addDispatcherModal">Add New Dispatcher</button>
                        </div>
                        <br /><br />
                        <div class="col-12 col-sm-12 col-md-12">
                            <div class="card">
                            <div class="card-body">
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Courier Business</th>
                                <th>Type</th>
                                <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="dispatcher in dispatchers" :key="dispatcher.id">
                                    <td>{{dispatcher.firstname}} {{dispatcher.lastname}}</td>
                                    <td>{{dispatcher.email}}</td>
                                    <td>{{dispatcher.courier_business.business_name}}</td>
                                    <td>{{dispatcher.type.title}}</td>
                                    <td class="action">
                                        <a class="view" v-on:click="launchViewDispatcherModal(dispatcher.id)">View</a>
                                        <a class="edit" v-on:click="launchEditDispatcherModal(dispatcher.id)">Edit</a>
                                        <a class="delete" v-on:click="launchDeleteDispatcherModal(dispatcher.id)">Delete</a>
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
            dispatcherTypes: [],
            courierBusinesses: [],
            checked: false,
            dispatchers: [],
            dispatcher: {},
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

            type: 0,
            courier_business: null,
            firstname: "",
            lastname: "",
            address: "",
            email: "",
            city: "Aba South",
            state: "Abia",
            country: "Nigeria",
            phone: "",
            siteURL: "http://",
            errorMessage: ""


        };
    },
    created: function (){
        this.fetchDispatcherTypes();
        this.fetchCourierBusinesses();
        this.fetchDispatchers();
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
            this.state = "Abia";
            this.city = "Aba South";
        },
        updateDispatcher: function(id){
            //this.validateEditCredentials();
            var result = this.validateEditCredentials();

            if(result != null){
                console.log(result);
                this.errorMessage = result;
                this.hideAlert();
                $(".alert-danger").removeClass("d-none"); 
                return;
            }

            this.$http.put( endpoint + '/deliveryman/update/'+id, 
                {
                    "type" : this.dispatcher.type.id,
                    "courier_business" : this.dispatcher.courier_business.id,
                    "firstname" : this.dispatcher.firstname.trim(),
                    "lastname" : this.dispatcher.lastname.trim(),
                    "city" : this.dispatcher.city.trim(),
                    "state" : this.dispatcher.state.trim(),
                    "country" : "Nigeria",
                    "phone" : this.dispatcher.phone.trim(),
                    "address" : this.dispatcher.address.trim(),
                    "email" : this.dispatcher.email.trim(),
                    "siteURL" : this.dispatcher.siteURL.trim(),
                }, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') }})
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("dispatcher update Err");
                    return response.json();
                }
            )
            .then(dispatcher => { 
                console.log("Dispatcher update details");
                console.log(dispatcher);
                if(dispatcher.status == "success" && dispatcher.message == "updated_successfully"){
                    this.hideAlert();
                    $(".alert-success").removeClass("d-none");
                    this.updateDispatcherInCollection(dispatcher.data.id, dispatcher.data);
                }else if(dispatcher.status == "error" && dispatcher.message == "failed"){
                    this.errorMessage = "Error. Cannot add Dispatcher at this time";
                    this.hideAlert();
                    $(".alert-danger").removeClass("d-none"); 

                }else{
                    this.errorMessage = dispatcher.message.replace(/\\n/g, " ");
                    this.hideAlert();
                    $(".alert-danger").removeClass("d-none");
                    //this.$session.destroy();
                    //this.$router.push('/login');
                    //alert("yoooo");
                }
                
                }
            ); 

        },
        removeSingleDispatcher: function(id){
            for(var i = 0; i < this.dispatchers.length; i++){
                if(this.dispatchers[i].id === id){
                    //return this.couriers[i];
                    this.dispatchers.splice(i, 1);
                }
            }
            return;
        },
        getSingleDispatcher: function(id){
            for(var i = 0; i < this.dispatchers.length; i++){
                if(this.dispatchers[i].id === id){
                    return this.dispatchers[i];
                }
            }
            return null;
        },
        launchViewDispatcherModal: function(id){

            //for each courier modal, return the modal with same id and launch modal
            this.dispatcher = this.getSingleDispatcher(id);

            if(this.dispatcher != null){
                $('#viewDispatcherModal').modal('show');
            }else{
                alert("Sorry. You are not allowed to view this dispatcher.");
            }
            

        },
        launchEditDispatcherModal: function(id){
            this.dispatcher = this.getSingleDispatcher(id);
            console.log(this.dispatcher);
            if(this.dispatcher != null){
                $('#editDispatcherModal').modal('show');
            }else{
                alert("Sorry. You are not allowed to edit this dispatcher.");
            }
        },
        launchDeleteDispatcherModal: function(id){
            this.dispatcher = this.getSingleDispatcher(id);

            if(this.dispatcher != null){
                $('#deleteDispatcherModal').modal('show');
            }else{
                alert("Sorry. You are not allowed to delete this dispatcher.");
            }
            
        },
        updateDispatcherInCollection: function(id, dispatcher){
            for(var i = 0; i < this.dispatchers.length; i++){
                if(this.dispatchers[i].id === id){
                    this.dispatchers[i] = dispatcher;
                    return;
                }
            }
            return;
        },
        hideAlert: function(){
           $(".alert").addClass("d-none"); 
        },
        validateCredentials(){

            if(this.firstname.trim() == "") {
                return "First name is required";
            }

            if(this.lastname.trim() == "") {
                return "Last name is required";
            }

            if(this.city.trim() == "") {
                return "City is required";
            }

            if(this.state.trim() == "") {
                return "State is required";
            }

            if(this.country.trim() == "") {
                return "Country is required";
            }

            if(this.phone.trim() == "") {
                return "Phone is required";
            }

            /*
            if(this.siteURL.trim() == "") {
                return "URL is required";
            }
            */

            return null;
        },
        validateEditCredentials(){

            if(this.dispatcher.firstname.trim() == "") {
                return "First name is required";
            }

            if(this.dispatcher.lastname.trim() == "") {
                return "Last name is required";
            }

            if(this.dispatcher.city.trim() == "") {
                return "City is required";
            }

            if(this.dispatcher.state.trim() == "") {
                return "State is required";
            }

            if(this.dispatcher.country.trim() == "") {
                return "Country is required";
            }

            if(this.dispatcher.phone.trim() == "") {
                return "Phone is required";
            }

            if(this.dispatcher.siteURL.trim() == "") {
                return "URL is required";
            }

            return null;
        },
        clearAllFields: function(){
            this.firstname = "";
            this.lastname = "";
            this.address = "";
            this.email = "";
            this.city = "";
            this.state = "";
            this.country = "Nigeria";
            this.phone = "";
            this.courier_business = null;
            this.siteURL = "http://";
        },
        clearEditFields: function(){
            this.dispatcher.firstname = "";
            this.dispatcher.lastname = "";
            this.dispatcher.address = "";
            this.dispatcher.email = "";
            this.dispatcher.city = "";
            this.dispatcher.state = "";
            this.dispatcher.country = "Nigeria";
            this.dispatcher.phone = "";
            this.dispatcher.siteURL = "http://";
        },
        addDispatcher: function(){

            var result = this.validateCredentials();

            if(result != null){
                console.log(result);
                this.errorMessage = result;
                this.hideAlert();
                $(".alert-danger").removeClass("d-none"); 
                return;
            }

            if(this.type != 3){
                this.courier_business = 0;
            }

            this.$http.post( endpoint + '/deliveryman/create', 
                {
                    "type" : this.type,
                    "courier_business" : this.courier_business,
                    "firstname" : this.firstname.trim(),
                    "lastname" : this.lastname.trim(),
                    "city" : this.city.trim(),
                    "state" : this.state.trim(),
                    "country" : "Nigeria",
                    "phone" : this.phone.trim(),
                    "address" : this.address.trim(),
                    "email" : this.email.trim(),
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
            .then(dispatcher => { 
                console.log("Dispatcher add details");
                console.log(dispatcher);
                if(dispatcher.status == "success" && dispatcher.message == "deliveryman_created"){
                    this.dispatchers.push(dispatcher.data); 
                    this.hideAlert();
                    $(".alert-success").removeClass("d-none");
                    this.clearAllFields();
                }else if(dispatcher.status == "error" && dispatcher.message == "failed"){
                    this.errorMessage = "Error. Cannot add Courier Business at this time";
                    this.hideAlert();
                    $(".alert-danger").removeClass("d-none"); 

                }else{
                    this.errorMessage = dispatcher.message.replace(/\\n/g, " ");
                    this.hideAlert();
                    $(".alert-danger").removeClass("d-none");
                    //this.$session.destroy();
                    //this.$router.push('/login');
                }
                
                }
            ); 

        },
        deleteDispatcher: function(id){
            var deleteEndpoint = endpoint + '/deliveryman/delete/'+id;

            this.$http.delete( deleteEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("dispatcher delete Err");
                    return response.json();
                }
            )
            .then(result => { 
                console.log("delete dispatcher details");
                console.log(result);
                if(result.status == "success" && result.message == "deliveryman_deleted"){
                    
                    this.removeSingleDispatcher(id);
                    $('#deleteDispatcherModal').modal('hide');

                }else if(result.status == "error" && result.message == "failed"){
                    //check is seller is verified

                }else{
                    this.$session.destroy();
                    this.$router.push('/login');
                }
                
                }
            ); 

        },
        fetchCourierBusinesses: function(){
            this.$http.get( endpoint + '/deliveryman/viewcourier', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("couriers fetch Err");
                    return response.json();
                }
            )
            .then(couriers => { 
                console.log("couriers details");
                console.log(couriers);
                if(couriers.status == "success" && couriers.message == "couriers"){
                    this.courierBusinesses = couriers.data;
                    //this.courier_business = couriers.data[0].id;
                }else if(couriers.status == "error" && couriers.message == "failed"){
                    //check is seller is verified
                    alert("Error. Could not fetch couriers");
                }else{
                    this.$session.destroy();
                    this.$router.push('/login');
                }
                
            });  
        },
        fetchDispatcherTypes: function(){
            this.$http.get( endpoint + '/deliverymantype/view', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("types fetch Err");
                    return response.json();
                }
            )
            .then(types => { 
                console.log("dispatchers type details");
                console.log(types);
                if(types.status == "success" && types.message == "delivery_men_types"){
                    this.dispatcherTypes = types.data;
                    this.type = types.data[0].id;
                }else if(types.status == "error" && types.message == "failed"){
                    //check is seller is verified
                    alert("Error. Could not fetch delivery men types");
                }else{
                    this.$session.destroy();
                    this.$router.push('/login');
                }
                
            });    
    
        },
        fetchDispatchers: function(){
            this.$http.get( endpoint + '/deliveryman/view', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("types fetch Err");
                    return response.json();
                }
            )
            .then(dispatchers => { 
                console.log("dispatcher details");
                console.log(dispatchers);
                if(dispatchers.status == "success" && dispatchers.message == "delivery_men"){
                    this.dispatchers = dispatchers.data;
                }else if(dispatchers.status == "error" && dispatchers.message == "failed"){
                    //check is seller is verified
                    alert("Error. Could not fetch delivery men");
                }else{
                    this.$session.destroy();
                    this.$router.push('/login');
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
                console.log("User details");
                console.log(user);
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
