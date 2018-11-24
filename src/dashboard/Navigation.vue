<template>

    <div>
        <nav class="main-header navbar navbar-expand bg-dark navbar-light border-bottom">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="http://www.trustpayonline.com/help" class="nav-link">Help</a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="http://www.trustpayonline.com/contact" class="nav-link">Contact Us</a>
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/myescrow/profile/update" class="nav-link update-user-nav-link"><i class="fa fa-user"></i></router-link>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" v-on:click="logout"><i class="fa fa-sign-out"></i></a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>

export default {
    methods:{
        logout: function () {
            this.$session.destroy();
            this.$router.push('/');
        }
    }
}
</script>
