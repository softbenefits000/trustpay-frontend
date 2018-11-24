<template>
    <div>
        <div class="wrapper">

            <dashboard-navigation></dashboard-navigation>
            <dashboard-sidebar :myProp="fullname"></dashboard-sidebar>

            <!-- Full Order Modal -->
            <div class="modal" id="fullOrderModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <form>
                        <!-- Modal Header -->
                        <div class="modal-header">
                        <h4 class="modal-title" v-if="stanbic_trustpay_user_role == 'buyer'"><small>{{order.order_code}}</small></h4>
                        <h4 class="modal-title" v-else><small>{{order.id}}</small></h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                        
                        <div class="row">
                                <!--<div class="col-sm-6">
                                    <img src="http://via.placeholder.com/350x150" style="width: 100%; height: auto;" />
                                    <br /><br />
                                </div>-->
                                </div>
                                <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                    <label>Order Number</label>
                                    <br />
                                    <input type="text" readonly="readonly" :value="formatToSixDigits(order.id)" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                    <label>Amount</label>
                                    <br />
                                    <input type="text" readonly="readonly" v-model="order.amount_payed" class="form-control"/>
                                    </div>
                                </div>
                                <!--
                                <div class="col-sm-6">
                                    <div class="form-group">
                                    <label>Transaction Reference</label>
                                    <br />
                                    <input type="text" readonly="readonly" value="TXd3333o0" class="form-control" />
                                    </div>
                                </div>
                                -->
                                </div>
                                <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                    <label>Order Date</label>
                                    <br />
                                    <input type="text" readonly="readonly" v-model="order.transaction_date" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                    <label>Order Status</label>
                                    <br />
                                    <input type="text" readonly="readonly" v-model="order_status.title" class="form-control"/>
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                    <label>Customer Name</label>
                                    <br />
                                    <input type="text" readonly="readonly" v-model="order_seller" class="form-control"/>
                                    </div>
                                </div>
                                <!--<div class="col-sm-6" v-if="stanbic_trustpay_user_role == 'buyer'">
                                    <div class="form-group">
                                    <label>Order Code</label>
                                    <br />
                                    <input type="text" readonly="readonly" v-model="order.order_code" class="form-control"/>
                                    </div>
                                </div>-->
                                </div>
                                <div class="row" v-if="stanbic_trustpay_user_role == 'seller'">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                    <label>Delivery Location</label>
                                    <br />
                                    <input type="text" readonly="readonly" v-model="order.delivery_location" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                    <label>Delivery Date</label>
                                    <br />
                                    <input type="text" readonly="readonly" v-model="order.delivery_date" class="form-control"/>
                                    </div>
                                </div>
                                </div>
                                <br /><br />
                            </div>

                    </form>
                    </div>
                </div>
            </div>

            <!-- Assign Dispatcher Modal -->
            <div class="modal" id="assignDispatcherModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <form>
                        <!-- Modal Header -->
                        <div class="modal-header">
                        <h4 class="modal-title"><small>Assign Dispatcher to Order {{ formatToSixDigits(order.id) }}</small></h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="alert alert-danger assign-danger d-none">
                                        <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                        <strong>Error!</strong> {{assignError}}
                                    </div>
                                    <div class="alert alert-success assign-success d-none">
                                        <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                                        <strong>Success!</strong> Order {{ formatToSixDigits(order.id) }} has been assigned.
                                    </div>
                                    <p v-if="order.delivery_men != null">
                                        This order is already assigned to {{order.delivery_men.firstname}} {{order.delivery_men.lastname}} ({{order.delivery_men.email}})
                                    </p>
                                    <div class="form-group">
                                    <label>Select Dispatcher</label>
                                    <br />
                                    <select class="form-control" v-model="selectedDispatcher">
                                        <option :value="dispatcher.id" v-for="dispatcher in dispatchers" :key="dispatcher.id" >{{dispatcher.firstname}} {{dispatcher.lastname}} - {{dispatcher.email}}</option>
                                    </select>
                                    <br />
                                    <a class="btn btn-primary" v-on:click="assignDispatcherToOrder()">Assign</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                    </div>
                </div>
            </div>


            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-12">
                                <h1 class="m-0 text-dark">All Orders</h1><br />
                                <p v-if="status == 'no_dispatchers'">You cannot assign a dispatcher to an order yet because you have not registered any dispatchers. Click <router-link to="/myescrow/dispatchers/all">here</router-link> to add dispatchers.</p>
                                
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
                        <!--<data-table :data-table="tableData" v-on:showAssignDeliveryManModal(id)="showAssignDeliveryManModal(id)"></data-table>-->
                        <table id="example1" class="table table-bordered table-striped" v-if="stanbic_trustpay_user_role == 'seller'">
                            <thead>
                            <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Order Date</th>
                            <th>Dispatcher</th>
                            <th>Order Status</th>
                            <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="order in orders.data" :key="order.id">
                                <td>
                                    <a style="cursor: pointer;" v-on:click="showSingleOrder(order.id)" >{{formatToSixDigits(order.id)}}</a>
                                </td>
                                <td v-if="order.customers != null">
                                    {{order.customers.firstname}} {{order.customers.lastname}}
                                </td>
                                <td v-else></td>
                                <td>{{order.transaction_date}}</td>
                                <td v-if="order.delivery_men != null">
                                    {{order.delivery_men.firstname}} {{order.delivery_men.lastname}}
                                    <span v-if="order.delivery_men.type == 1">(Independent)</span>
                                    <span v-else-if="order.delivery_men.type == 2">(Seller)</span>
                                    <span v-else-if="order.delivery_men.type == 3">({{order.delivery_men.courier_business.business_name}})</span>
                                </td>
                                <td v-else></td>
                                <td>{{order.status.title}}</td>
                                <td>
                                    <router-link :to="{ name: 'raise-dispute', params: { orderId: order.id }}" class="text-danger" v-if="order.status.title == 'Disputed'">
                                    <small>Raise Dispute</small>
                                    &nbsp;&nbsp;
                                    </router-link>
                                    
                                    <a v-if="status != 'no_dispatchers' && order.delivery_men != null" style="cursor: pointer;" v-on:click="showAssignDeliveryManModal(order.id)" class="text-primary">
                                        <small>Reassign Dispatcher</small>
                                    </a>
                                    <a v-if="status != 'no_dispatchers' && order.delivery_men == null" style="cursor: pointer;" v-on:click="showAssignDeliveryManModal(order.id)" class="text-primary">
                                        <small>Assign Dispatcher</small>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                        <table class="table table-bordered table-striped" v-else>
                            <thead>
                            <tr>
                            <th>Order ID</th>
                            <th>Seller</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                            <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="order in orders.data" :key="order.id">
                                <td>
                                    <a style="cursor: pointer;" v-on:click="showSingleOrder(order.id)" >{{formatToSixDigits(order.id)}}</a>
                                </td>
                                <td>{{order.sellers.business_name}}</td>
                                <td>{{order.transaction_date}}</td>
                                <td>{{order.status.title}}</td>
                                <td>
                                    <router-link :to="{ name: 'raise-dispute', params: { orderId: order.id }}" class="text-danger">
                                    <small>Raise Dispute</small>
                                    </router-link>
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
                <!-- /.content -->
            </div>
            
            <dashboard-footer></dashboard-footer>
            
        </div>
    </div>
</template>

<style>
.content-wrapper{
    min-height: calc(100vh - 110px) !important;
}
</style>

<script>
const endpoint = 'http://18.208.164.251/api';
export default {

    data(){
        return{
            stanbic_trustpay_user_role: this.$session.get('stanbic_trustpay_user_role'),
            status: null,
            fullname: "",
            orders: [],
            order: [],
            order_status: "",
            order_seller: "",
            dispatchers: [],
            selectedDispatcher: 0,
            assignError: "",
            tableData: {
                options: {
                    //Global sort option
                    sortable: true,
                    //Global edit option
                    editable: true,
                    //How many items will be shown in each page
                    pageCount: 10,
                },
                columns: [
                    {
                        value: 'order_id',
                        text: 'Order ID',
                        sortable: true,
                        editable: false
                    },
                    {
                        value: 'customer',
                        text: 'Customer',
                        sortable: true,
                        editable: false
                    },
                    {
                        value: 'order_date',
                        text: 'Order Date',
                        sortable: true,
                        editable: false
                    },
                    {
                        value: 'dispatcher',
                        text: 'Dispatcher',
                        sortable: true,
                        editable: false
                    },
                    {
                        value: 'order_status',
                        text: 'Order Status',
                        sortable: true,
                        editable: false
                    },
                    {
                        value: 'action',
                        text: 'Action',
                        sortable: false,
                        editable: false
                    }
                ],
                rows: [],

                onPageChanged(page) {
                    console.log('Current page is ' + page);
                }
            }
            /*
            columns: [
                {label: 'Order ID', representedAs: function(row){
                    return formatToSixDigits(orders.data.id);
                }, interpolate: true}, //{{order.customers.firstname}} {{order.customers.lastname}}
                {label: 'Customer', representedAs: function(row){
                    return orders.data.customers.firstname + ' ' + orders.data.customers.lastname ;
                }, interpolate: true},
                {label: 'Order Date', representedAs: function(row){
                    return formatToSixDigits(orders.data.id);
                }, interpolate: true},
                {label: 'Dispatcher', field: 'user.last_name'},
                {label: 'Order Status', field: 'user.email'},
                {label: 'Action', representedAs: function(row){
                    return row.address + '<br />' + row.city + ', ' + row.state;
                }, interpolate: true}
            ]
            */

        };
    },
    methods:{
        populateTableWithData: function(array){
            console.log(array);
            //return;
            var returnedArray = [];
            //array.forEach(function(element)
            for(let i = 0; i < array.length; i++){

                let element = array[i];
                var dispatcher_name = "";
                var customer_name = "";

                if(element.delivery_men != null){
                    dispatcher_name = element.delivery_men.firstname + " " + element.delivery_men.lastname;

                    if(element.delivery_men.type == 1){
                        dispatcher_name += " (Independent)";
                    }else if(element.delivery_men.type == 2){
                        dispatcher_name += " (Seller)";
                    }else if(element.delivery_men.type == 3){
                        dispatcher_name += " (" + element.delivery_men.courier_business.business_name + ")";
                    }
                }

                if(element.customers != null){
                    customer_name = element.customers.firstname + " " + element.customers.lastname;
                }


                //actions string
                let actions_html = ``;
                if(element.status.title == 'Disputed'){
                    actions_html += `<router-link :to="{ name: 'raise-dispute', params: { orderId: `+ element.id + ` }}" class="text-danger">
                                    <small>Raise Dispute</small>
                                    </router-link>&nbsp;&nbsp;`;
                }
                if(this.status != 'no_dispatchers' && element.delivery_men != null){
                   actions_html += `<a style="cursor: pointer;" on-click="showAssignDeliveryManModal(`+element.id+`)" class="text-primary">
                                        <small>Reassign Dispatcher</small>
                                    </a>&nbsp;&nbsp;`; 
                }
                if(this.status != 'no_dispatchers' && element.delivery_men == null){
                   actions_html += `<a style="cursor: pointer;" v-on:click="showAssignDeliveryManModal(order.id)" class="text-primary">
                                        <small>Assign Dispatcher</small>
                                    </a>`; 
                }

                
                               
                let record = {
                    order_id:{
                        row: element.id + "row",
                        unique: element.id + "id",
                        value: this.formatToSixDigits(element.id),
                        editable: false
                    },
                    customer:{
                        unique: element.id + "customer",
                        value: customer_name,
                        editable: false
                    },
                    order_date:{
                        unique: element.id + "date",
                        value: element.transaction_date,
                        editable: false
                    },
                    dispatcher:{
                        unique: element.id + "dispatcher",
                        value: dispatcher_name,
                        editable: false
                    },
                    order_status:{
                        unique: element.id + "status",
                        value: element.status.title,
                        editable: false
                    },
                    action:{
                        unique: element.id + "action",
                        value: element.id,
                        dispatcher_status: this.status,
                        order_status: element.status.title,
                        delivery_men: element.delivery_men,
                        isAction: true,
                        editable: false,
                        isHtml: true
                    }
                };

                returnedArray.push(record);
            }
            //});

            return returnedArray;
            
        },
        hideAlert: function(){
            $(".alert").addClass("d-none");
        },
        formatToSixDigits: function(number){
            var output = number + '';
            while (output.length < 6) {
                output = '0' + output;
            }
            return output;
        },
        getSingleOrderOffline: function(orderId){
            for(var i = 0; i < this.orders.data.length; i++){
                if(this.orders.data[i].id === orderId){
                    return this.orders.data[i];
                }
            }
            return null;
        },
        updateSingleOrderOffline: function(orderId, deliveryManId, deliveryManObject){

            this.order.delivery_man = deliveryManId;
            this.order.delivery_men = deliveryManObject;

            for(var i = 0; i < this.orders.data.length; i++){
                if(this.orders.data[i].id === orderId){
                    this.orders.data[i].delivery_man = deliveryManId;
                    this.orders.data[i].delivery_men = deliveryManObject;
                    return;
                }
            }
        },
        getSellerDispatchers: function(){
            this.$http.get(endpoint +'/seller/deliverymen', { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    this.$router.push('/login');
                }
            )
            .then(dispatcher => { 
                console.log("Dispatchers");
                console.log(dispatcher);
                if(dispatcher.status == "success" && dispatcher.message == "delivery_men" ){
                    this.dispatchers = dispatcher.data
                    this.selectedDispatcher = dispatcher.data[0].id;
                }else{
                    this.status = "no_dispatchers"
                }
                
                }
            );
        },
        showAssignDeliveryManModal: function(orderId){
            this.order = this.getSingleOrderOffline(orderId);
            console.log(this.order);
            $("#assignDispatcherModal").modal('show');
        },
        assignDispatcherToOrder: function(){
            //this.selectedDispatcher;
            //this.order.id;

            this.$http.post( endpoint +'/seller/order/assign', 
                    {
                        "order_id" : this.order.id,
                        "delivery_man_id" : this.selectedDispatcher,
                    }, 
                    { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } }
                )
                .then(
                    response => { //success
                        return response.json();
                    }, 
                    response => { //error
                        return response.json();
                    }
            ).then(
                assign => { 
                    console.log(assign); 

                    //show error message in alert box - user is not logged in
                    if(assign.status == "success" && assign.message == "deliveryman_assigned"){
                        //var updatedOrder = this.getSingleOrderOffline(assign.data.id);
                        this.updateSingleOrderOffline(assign.data.id, assign.data.delivery_man, assign.data.delivery_men);
                        //update delivery_man
                        //update delivery_men
                        //for the particluar order 
                        //print success message
                        $(".alert").addClass("d-none");
                        $(".assign-success").removeClass("d-none");

                    }else{
                        this.assignError = assign.message.replace(/\\n/g, " ");
                        $(".alert").addClass("d-none");
                        $(".assign-danger").removeClass("d-none");
                        //print error message

                    }  
                }
            );
        },
        showSingleOrder: function(orderId){
            console.log("Id is - "+orderId);

            var user_role = this.$session.get('stanbic_trustpay_user_role');

            var orderDetailEndpoint = endpoint +'/customer/order';

            if(user_role == "seller"){
                orderDetailEndpoint = endpoint +'/seller/order';
            }

            this.$http.post( orderDetailEndpoint, 
                    {
                        "id" : orderId,
                    }, 
                    { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } }
                )
                .then(
                    response => { //success
                        return response.json();
                    }, 
                    response => { //error
                        return response.json();
                    }
            ).then(
                order => { 
                    console.log(order); 

                    //show error message in alert box - user is not logged in
                    if(order.status == "success" && order.message == "order_details"){
                        
                        this.order = order.data;
                        this.order_status = order.data.status; //.title;
                        if(user_role == "buyer"){
                            this.order_seller = order.data.user.firstname + " " + order.data.user.lastname;
                        }else{
                            this.order_seller = order.data.customers.firstname + " " + order.data.customers.lastname;
                        }
                        
                        $("#fullOrderModal").modal('show');

                    }else{

                        alert("Could not retrieve order");

                    }  
                }
            );
        },
    },
    created(){
        var user_role = this.$session.get('stanbic_trustpay_user_role');

        var orderDetailsEndpoint = endpoint +'/customer/orders';

        if(user_role == "seller"){
            orderDetailsEndpoint = endpoint +'/seller/orders';
        }
        console.log("Endpoint - " + orderDetailsEndpoint);
        this.$http.get(orderDetailsEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
        .then( 
            response => { //success
                return response.json();
            }, 
            response => { //error
                this.$router.push('/login');
            }
        )
        .then(orders => { 
            console.log("orders");
            console.log(orders);
            if(orders.status == "success" && (orders.message == "customer_orders" || orders.message == "orders" || orders.message == "seller_order")){
                console.log(orders);
                this.orders = orders;
                this.tableData.rows = this.populateTableWithData(orders.data);
                console.log("Got here");
                console.log(this.tableData);

            }else{
                alert("Error. Could not fetch orders at this time");
            }
            
            }
        );
        this.getSellerDispatchers();
        
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
                
                
        });    
    }
}
</script>
