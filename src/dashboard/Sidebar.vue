<template>
    <div>
        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-light-primary elevation-4">
            <!-- Brand Logo -->
            <a href="http://www.trustpayonline.com" class="brand-link">
            
            <span class="brand-text">
                <img src="../assets/images/logo.png" style="width: 140px; height auto; padding-left: 15px;">
            </span>
            </a>

            <!-- Sidebar -->
            <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                <img src="http://via.placeholder.com/160x160" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                <router-link to="/myescrow/profile/update" class="d-block user-profile-name">{{myProp}}</router-link>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" v-if="this.$route.name != 'get-verified'">

                <li class="nav-item">
                    <router-link to="/myescrow/welcome" class="nav-link dashboard-link">
                        <i class="nav-icon fa fa-dashboard"></i>
                        <p>
                            Dashboard
                        </p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/myescrow/p2p/stage1" class="nav-link p2p-link">
                        <i class="nav-icon fa fa-exchange"></i>
                        <p>
                            Create Transaction
                        </p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/myescrow/paymenthistory" class="nav-link transactions-link">
                        <i class="nav-icon fa fa-history"></i>
                        <p>
                            Payment History
                        </p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/myescrow/orders" class="nav-link orders-link">
                        <i class="nav-icon fa fa-shopping-cart"></i>
                        <p>
                            Orders
                        </p>
                    </router-link>
                </li>
                <li class="nav-item" v-if="this.$session.get('stanbic_trustpay_user_role') == 'seller'">
                    <router-link to="/myescrow/api" class="nav-link integrations-link">
                        <i class="nav-icon fa fa-link"></i>
                        <p>
                            Api Key
                        </p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/myescrow/disputes/all" class="nav-link disputes-link">
                        <i class="nav-icon fa fa-question-circle"></i>
                        <p>
                            Disputes
                        </p>
                    </router-link>
                </li>
                <li class="nav-item" v-if="this.$session.get('stanbic_trustpay_user_role') == 'seller'">
                    <router-link to="/myescrow/payout-details" class="nav-link payout-link">
                        <i class="nav-icon fa fa-money"></i>
                        <p>
                            Payout Details
                        </p>
                    </router-link>
                </li>
                <li class="nav-item" v-if="this.$session.get('stanbic_trustpay_user_role') == 'seller'">
                    <router-link to="/myescrow/payout-history" class="nav-link payout-details-link">
                        <i class="nav-icon fa fa-money"></i>
                        <p>
                            Payout History
                        </p>
                    </router-link>
                </li>
                <li class="nav-item" v-if="this.$session.get('stanbic_trustpay_user_role') == 'seller'">
                    <router-link to="/myescrow/courier" class="nav-link courier-services-link">
                        <i class="nav-icon fa fa-truck"></i>
                        <p>
                            Courier Services
                        </p>
                    </router-link>
                </li>
                <li class="nav-item" v-if="this.$session.get('stanbic_trustpay_user_role') == 'seller'">
                    <router-link to="/myescrow/dispatchers/all" class="nav-link dispatchers-link">
                        <i class="nav-icon fa fa-truck"></i>
                        <p>
                            Dispatchers
                        </p>
                    </router-link>
                </li>
                <!--
                <li class="nav-item has-treeview register-dispatchers-tree-view" v-if="this.$session.get('stanbic_trustpay_user_role') == 'seller'">
                    <a href="#" class="nav-link dispatchers-link">
                    <i class="nav-icon fa fa-truck"></i>
                    <p>
                        Dispatchers
                        <i class="right fa fa-angle-left"></i>
                    </p>
                    </a>
                    <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <router-link to="/myescrow/dispatchers/register" class="nav-link register-dispatchers-link">
                            <small>
                                <p>Register</p>
                            </small>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/myescrow/dispatchers/all" class="nav-link all-dispatchers-link">
                            <small>
                                <p>View All</p>
                            </small>
                        </router-link>
                    </li>

                    </ul>
                </li>
                -->
                <!--
                <li class="nav-item has-treeview register-sellers-tree-view" v-if="this.$session.get('stanbic_trustpay_user_role') == 'seller'">
                    <a href="#" class="nav-link dispatchers-link">
                        <i class="nav-icon fa fa-exchange"></i>
                        <p>
                            Sellers
                            <i class="right fa fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <router-link to="/myescrow/sellers/register" class="nav-link register-sellers-link">
                            <small>
                                <p>Register</p>
                            </small>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/myescrow/sellers/all" class="nav-link all-sellers-link">
                            <small>
                                <p>View All</p>
                            </small>
                        </router-link>
                    </li>

                    </ul>
                </li>
                -->
                <li class="nav-item" v-if="this.$session.get('stanbic_trustpay_user_role') == 'seller'">
                    <router-link to="/myescrow/deliveryterms" class="nav-link delivery-terms-link">
                        <i class="nav-icon fa fa-info-circle"></i>
                        <p>
                            Delivery Terms
                        </p>
                    </router-link>
                </li>
                <li class="nav-item has-treeview tickets-tree-view" v-if="this.$session.get('stanbic_trustpay_user_role') != 'seller'">
                    <a href="#" class="nav-link support-link">
                    <i class="nav-icon fa fa-life-ring"></i>
                    <p>
                        Support
                        <i class="right fa fa-angle-left"></i>
                    </p>
                    </a>
                    <ul class="nav nav-treeview">
                    <li class="nav-item">
                        <router-link to="/myescrow/ticket/new" class="nav-link open-ticket-link">
                            <small>
                                <p>Open Ticket</p>
                            </small>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/myescrow/ticket/all" class="nav-link view-ticket-link">
                            <small>
                                <p>View Tickets</p>
                            </small>
                        </router-link>
                    </li>

                    </ul>
                </li>
                </ul>
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" v-else>
                        <li class="nav-item" v-if="this.$session.get('stanbic_trustpay_user_role') == 'seller'">
                            <router-link to="/myescrow/verify" class="nav-link get-verified-link">
                                <i class="nav-icon fa fa-check"></i>
                                <p>
                                    Get Verified
                                </p>
                            </router-link>
                        </li>
                    </ul>
            </nav>
            </div>
        </aside>
    </div>
</template>

<script>
export default {
  props: [
    'myProp'
  ]
}
</script>

<style>
.router-link-active, .router-link-active i{color: rgb(60, 146, 204) !important; border-bottom: none !important;}
aside .nav-item .router-link-active{
    background: #f3f3f3 !important;
}
</style>
