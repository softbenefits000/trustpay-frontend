<template>
    <div>
        <div class="wrapper">

            <dashboard-navigation></dashboard-navigation>
            <dashboard-sidebar :myProp="fullname"></dashboard-sidebar>
        
            <!-- Full Transaction Modal -->
            <div class="modal" id="fullTransactionModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <form>
                    <!-- Modal Header -->
                    <div class="modal-header">
                    <h4 class="modal-title"><small>Transaction 1135609</small></h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                    
                        <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Transaction Number</label>
                            <br />
                            <input type="text" readonly="readonly" value="1135609" class="form-control" />
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Reference</label>
                            <br />
                            <input type="text" readonly="readonly" value="TXd3333o0" class="form-control" />
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Transaction Date</label>
                            <br />
                            <input type="text" readonly="readonly" value="2018-03-03" class="form-control" />
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Buyer Name</label>
                            <br />
                            <input type="text" readonly="readonly" value="Nenne Nwodo" class="form-control"/>
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Seller Name</label>
                            <br />
                            <input type="text" readonly="readonly" value="Nenne Nwodo" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Marketplace Business Name</label>
                            <br />
                            <input type="text" readonly="readonly" value="Jumia Market" class="form-control" />
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Product Amount</label>
                            <br />
                            <input type="text" readonly="readonly" value="NGN 50,000.00" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Shipping Amount</label>
                            <br />
                            <input type="text" readonly="readonly" value="NGN 500.00" class="form-control"/>
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Escrow Fee Paid</label>
                            <br />
                            <input type="text" readonly="readonly" value="NGN 50,000.00" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Marketplace Commission Value</label>
                            <br />
                            <input type="text" readonly="readonly" value="NGN 500.00" class="form-control"/>
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Escrow Fee Paid By</label>
                            <br />
                            <input type="text" readonly="readonly" value="Seller" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Payment Transaction Fee</label>
                            <br />
                            <input type="text" readonly="readonly" value="NGN 500.00" class="form-control"/>
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Payment Channel</label>
                            <br />
                            <input type="text" readonly="readonly" value="Card" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Payment Status</label>
                            <br />
                            <input type="text" readonly="readonly" value="Refunded" class="form-control"/>
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <!--<div class="col-sm-6">
                            <div class="form-group">
                            <label>Date Range?</label>
                            <br />
                            <input type="text" readonly="readonly" value="" class="form-control"/>
                            </div>
                        </div>-->
                        <div class="col-sm-6">
                            <div class="form-group">
                            <label>Payment Value</label>
                            <br />
                            <input type="text" readonly="readonly" value="Value1" class="form-control"/>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            </div>


            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                    <div class="col-sm-12">
                        <h1 class="m-0 text-dark">Payment History</h1>
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
                        <div class="card-body table-responsive">
                            
                                <!--
                                <vue-ads-table-tree
                                    :columns="columns"
                                    :rows="data"
                                    :items-per-page="12"
                                ></vue-ads-table-tree>
                                -->
                            
                        
                        <table id="example1" class="table table-bordered table-striped">
                            <thead>
                            <tr>
                            <th>Order Number</th>
                            <th>Reference</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Transaction Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="payment in payments" :key="payment.id">
                            <td><a v-on:click="launchFullTransactionModal(4)">{{payment.transaction_number}}</a></td>
                            <td>{{payment.payment_ref}}</td>
                            <td>NGN {{payment.amount}}.00</td>
                            <td>{{payment.gateway_response}}</td>
                            <td>{{payment.payment_date}}</td>
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
            <!-- /.content-wrapper -->

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
            stanbic_trustpay_user_role: this.$session.get('stanbic_trustpay_user_role'),
            payments: [],
            columns: [
                { title: 'Order Number', property: 'transaction_number', sortable: true, filterable: true },
                { title: 'Reference', property: 'payment_ref', sortable: true, filterable: true },
                { title: 'Amount', property: 'amount', sortable: true, filterable: true},
                { title: 'Status', property: 'gateway_response', sortable: true, filterable: true, },
                { title: 'Transaction Date', property: 'payment_date', sortable: true, filterable: true }
            ],
            data: [],
            total: 0,
            query: {},
            pageSizeOptions: [5, 10, 15, 20],
            Pagination: true,
        };
    },
    methods:{
        launchFullTransactionModal: function(id){
           //fetch details from json (or api)
           $('#fullTransactionModal').modal('show');
        },
        async asyncCall (range, filter, sortColumns, parent) {
            await this.sleep(1000);

            let startRows = this.rows;
            if (parent) {
                startRows = this.rows.slice(1, 3);
            }

            let filteredRows = this.filter(startRows, filter);
            let sortedRows = this.sort(filteredRows, sortColumns);

            let rows = parent ? sortedRows : sortedRows.slice(range.start % 10, range.end % 10);

            return {
                total: filteredRows.length,
                rows,
            };
        },
     
    },
    mounted(){
        var user_role = this.$session.get('stanbic_trustpay_user_role');

        var orderDetailsEndpoint = endpoint +'/seller/payments';

        this.$http.get(orderDetailsEndpoint, { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') } })
        .then( 
            response => { //success
                return response.json();
            }, 
            response => { //error
                this.$router.push('/login');
            }
        )
        .then(data => { 
            console.log("payments");
            console.log(data);
            if(data.status == "success" && data.message == "seller_payments"){
                this.data = data.data;
                this.payments = data.data;
                this.total = data.data.length;
            }else{
                alert("Error. Could not fetch payments at this time");
            }
            
            }
        );

        
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