<template>
  <div>
        <nav class="navbar navbar-expand-lg fixed-top navbar-inverse">
            <a class="navbar-brand" href="http://dev.trustpayonline.com">
                <img src = "http://dev.trustpayonline.com/images/footer-logo.png"/>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText" v-if="this.$route.name != 'payment-engine'">
                <ul class="navbar-nav mr-auto">
                </ul>
                <span class="navbar-text float-right">
                    <router-link to="/signup">Sign Up</router-link>
                </span>
                <span class="navbar-text">
                    <router-link to="/login">Login</router-link>
                </span>
            </div>
        </nav>
    </div>
</template>

<style>
.navbar-text a{
    background: none !important;
    color: white;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
    margin-left: 7px !important;
    margin-right: 7px !important;
}
.router-link-active, .navbar-text a:focus, .navbar-text a:hover{
    background: none !important;
    border-bottom: 3px solid #42acec;
    text-decoration: none;
}
.top-margin-60{
    margin-top: 60px;
}
</style>
