import Login from './Login.vue';
import Signup from './Signup.vue';
import CompleteSignup from './CompleteSignup.vue';
import ForgotPassword from './ForgotPassword.vue';
import RecoverPassword from './RecoverPassword.vue';
import Confirmation from './Confirmation.vue';
import Dashboard from './dashboard/Dashboard.vue';
import UpdateProfile from './dashboard/UpdateProfile.vue';
import Orders from './dashboard/Orders.vue';
import AllDisputes from './dashboard/AllDisputes.vue';
import RaiseDispute from './dashboard/RaiseDispute.vue';
import SingleDispute from './dashboard/SingleDispute.vue';
import DeliveryTerms from './dashboard/DeliveryTerms.vue';
import CreateOrder from './dashboard/CreateOrder.vue';
import OrderConfirmation from './dashboard/OrderConfirmation.vue';
import PaymentHistory from './dashboard/PaymentHistory.vue';
import PersonToPerson from './dashboard/PersonToPerson.vue';
import PersonToPersonStage2 from './dashboard/PersonToPersonStage2.vue';
import PersonToPersonStage2Milestone from './dashboard/PersonToPersonStage2Milestone.vue';
import PersonToPersonStage3 from './dashboard/PersonToPersonStage3.vue';
import PersonToPersonStage3Milestone from './dashboard/PersonToPersonStage3Milestone.vue';
import TransactionStatusHelp from './dashboard/TransactionStatusHelp.vue';
import GetVerified from './dashboard/GetVerified.vue';
import CourierServices from './dashboard/CourierServices.vue';
import Dispatchers from './dashboard/Dispatchers.vue';
import CreateApiKey from './dashboard/CreateApiKey.vue';
import Payout from './dashboard/Payout.vue';
import PayoutDetails from './dashboard/PayoutDetails.vue';
import PaymentEngine from './PaymentEngine.vue';


export const routes = [
    
    { 
        path: '/', 
        name: 'login',
        component: Login 
    },
    { 
        path: '/login', 
        name: 'login',
        component: Login 
    },
    { 
        path: '/signup',
        name: 'signup', 
        component: Signup 
    },
    { 
        path: '/signup/returning/:email/:phone',
        name: 'complete-signup', 
        component: CompleteSignup 
    },
    { 
        path: '/forgot', 
        name: 'forgot',
        component: ForgotPassword 
    },
    { 
        path: '/:role/confirmation/:token', 
        name: 'confirmation',
        component: Confirmation 
    },
    { 
        path: '/:role/forgot/:token', 
        name: 'recoverpassword',
        component: RecoverPassword 
    },
    { 
        path: '/payment/engine', 
        name: 'payment-engine',
        component: PaymentEngine 
    },


    //end to end routes
    { 
        path: '/order/create', 
        name: 'create-order',
        component: CreateOrder,
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // access to component instance via `vm`
                if(vm.$session.get('trustpayauthtoken') == null){
                    next(false);
                }
                next();
            });
        } 
    },
    { 
        path: '/order/confirmation', 
        name: 'confirm-order',
        component: OrderConfirmation,
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(vm.$session.get('trustpayauthtoken') == null){
                    next(false);
                }
                next();
            });
        } 
    },

    //post authentication routes
    { 
        path: '/myescrow/welcome', 
        name: 'dashboard',
        component: Dashboard 
    },
    {
        path: '/myescrow/p2p/stage1', 
        name: 'p2p',
        component: PersonToPerson 
    },
    {
        path: '/myescrow/p2p/stage2', 
        name: 'p2p-stage2',
        component: PersonToPersonStage2 
    },
    {
        path: '/myescrow/p2p/stage2milestone', 
        name: 'p2p-stage2milestone',
        component: PersonToPersonStage2Milestone 
    },
    {
        path: '/myescrow/p2p/stage3milestone', 
        name: 'p2p-stage3milestone',
        component: PersonToPersonStage3Milestone 
    },
    {
        path: '/myescrow/p2p/stage3', 
        name: 'p2p-stage3',
        component: PersonToPersonStage3 
    },
    {
        path: '/myescrow/profile/update', 
        name: 'profile',
        component: UpdateProfile 
    },
    {
        path: '/myescrow/orders', 
        name: 'orders',
        component: Orders 
    },
    {
        path: '/myescrow/disputes/all', 
        name: 'all-disputes',
        component: AllDisputes 
    },
    {
        path: '/myescrow/dispute/:disputeId', 
        name: 'single-dispute',
        component: SingleDispute 
    },
    {
        path: '/myescrow/disputes/new/:orderId',
        name: 'raise-dispute',
        component: RaiseDispute 
    },
    {
        path: '/myescrow/paymenthistory',
        name: 'payment-history',
        component: PaymentHistory 
    },
    {
        path: '/myescrow/help',
        name: 'transaction-status-help',
        component: TransactionStatusHelp 
    },
    

    //seller
    {
        path: '/myescrow/deliveryterms',
        name: 'delivery-terms',
        component: DeliveryTerms 
    },
    {
        path: '/myescrow/verify',
        name: 'get-verified',
        component: GetVerified 
    },
    {
        path: '/myescrow/courier',
        name: 'courier-services',
        component: CourierServices
    },
    {
        path: '/myescrow/dispatchers/all',
        name: 'all-dispatchers',
        component: Dispatchers
    },
    { 
        path: '/myescrow/api', 
        name: 'create-api-key',
        component: CreateApiKey 
    },
    { 
        path: '/myescrow/payout-history', 
        name: 'payout',
        component: Payout 
    },
    { 
        path: '/myescrow/payout-details', 
        name: 'payout-details',
        component: PayoutDetails 
    },
    { 
        path: '*', 
        component: { template: '<h1>Page Not Found</h1>'} 
    }
];