<template>
    <div>
        <div class="wrapper">

            <dashboard-navigation></dashboard-navigation>
            <dashboard-sidebar :myProp="fullname"></dashboard-sidebar>
        

            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                            <div class="row mb-2">
                                <div class="col-sm-12">
                                    <h1 class="m-0 text-dark">Get Verified</h1>
                                    <br />
                                    <div class="alert alert-info">
                                        This verification is free for the first submission therefore ensure you enter all BVN related information correctly as it appears on your Bank Verification Number (BVN) account. If the first submission fails, subsequent submissions will be charged at &#8358;100 per submission.
                                    </div>
                                </div><!-- /.col -->
                            </div><!-- /.row -->
                            <br />
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12">
            <div class="alert alert-success d-none">
                <strong>Success!</strong> You have been verified. You are being redirected...
            </div>
            <div class="alert alert-error d-none">
                <button type="button" class="close" v-on:click="hideAlert">&times;</button>
                <strong>Error!</strong> <span v-html="verifyError"></span>
            </div>
            <div class="row" v-if="paymentrequired">
                <div class="col-sm-12 text-center">
                    <br />
                    <button class="btn btn-primary" v-on:click="initiatePayment()" :disabled="redirecting">
                        {{paymentText}}
                    </button>
                </div>
            </div>
            <div class="callout callout-info" v-if="!paymentrequired">
              <br />
              <p>* Indicates mandatory fields</p>

              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="contact_first_name">First Name *</label>
                    <input type="text" :readonly="true" class="form-control" autocomplete="off" v-model="firstname" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="contact_last_name">Last Name *</label>
                    <input type="text" :readonly="true" class="form-control" autocomplete="off" v-model="lastname" />
                  </div>
                </div>
              </div>
              <div class="row">
                
                <div class="col-sm-6">
                  <div class="form-group">
                      <label for="contact_phone_number">Phone Number *</label>
                    <input type="text" :readonly="true" class="form-control" autocomplete="off" placeholder="+234xxxxxxxxxx" maxlength="14" v-model="phonenumber" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>BVN (Bank Verification Number) *</label>
                    <input type="number" name="bvn" id="bvn" class="form-control" autocomplete="off" v-model="bvn" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>
                      <input type="checkbox" name="is_a_business" class="checkbox" v-model="checked"/>&nbsp;&nbsp;&nbsp;Are you a business?
                    </label>
                  </div>
                </div>
              </div>
              <div id="business_body" v-if="checked == true">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="business_name">Business Name *</label>
                            <input type="text" v-model="businessname" class="form-control"  />
                            </div>
                        </div>
                    <div class="col-sm-6">
                    <div class="form-group">
                        <label for="business_email">Business Email *</label>
                        <input type="email" v-model="businessemail" class="form-control" autocomplete="off"  />
                    </div>
                    </div>
                        </div>
                <div class="row">
                    <div class="col-sm-6">
                    <div class="form-group">
                        <label for="year">Year of Incorporation *</label>
                        <input type="number" v-model="yearofincorporation" class="form-control" autocomplete="off"  />
                    </div>
                    </div>
                    <div class="col-sm-6">
                    <div class="form-group">
                        <label for="url">Site URL</label>
                        <input type="url" v-model="siteurl" class="form-control" autocomplete="off"  />
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                    <div class="form-group">
                        <label for="cac_certificate">CAC Registration Certificate *</label>
                        <p><small>Please upload a .pdf, .doc or .docx file</small></p>
                        <input type="file" :name="caccertificate" :id="caccertificate" class="form-control" accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"/>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="business_address">Business Address 1 *</label>
                            <input type="text" v-model="businessaddress1" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="business_address">Business Address 2 *</label>
                            <input type="text" v-model="businessaddress2" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label for="business_address">Business City *</label>
                            <input type="text" v-model="businesscity" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label for="business_address">Business State *</label>
                            <select class="form-control" v-model="businessstate">
                                <option v-for="state in states" v-bind:key="state" :value="state">{{state}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label for="business_address">Business Country *</label>
                            <input type="text" value="Nigeria" disabled="disabled" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                    <div class="form-group">
                        <label for="memorandum">Memorandum of Articles *</label>
                        <p><small>Please upload a .pdf, .doc or .docx file</small></p>
                        <input type="file" :name="memorandumofarticles" id="memorandum" class="form-control" accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"/>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                    <div class="form-group">
                        <label for="company_profile">Company Profile *</label>
                        <p><small>Please upload a .pdf, .doc or .docx file</small></p>
                        <input type="file" :name="companyprofile" id="company_profile" class="form-control" accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"/>
                    </div>
                    </div>
                </div>
              </div>
            
              <button class="btn btn-info" v-on:click="startVerification()" :disabled="sending">{{verificationText}}</button>
              <br /><br />
            </div>
          </div>
        </div>
        <br />
                        </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

            </div>

            <dashboard-footer></dashboard-footer>
            
        </div>
    </div>
</template>

<style scoped>
.btn-info{background: rgb(58,122,238) !important; border-color: rgb(58,122,238) !important;}
.alert-info{background: rgb(58,122,238) !important;}
.callout-info{border-color: rgb(58,122,238) !important;}
</style>


<script>
const endpoint = 'http://18.208.164.251/api';

export default {
    data(){
        return{
            stanbic_trustpay_user_role: null,
            status: null,
            fullname: "",
            checked: false,
            verifyError: "",
            is_marketplace: 0,
            marketplace_child: "string",
            paymentrequired: false,
            paymentText: "Pay Now to Continue",
            redirecting: false,

            //seller details
            firstname: "",
            lastname: "",
            phonenumber: "",
            bvn: "",
            businessname: "",
            businessemail: "",
            yearofincorporation: "",
            siteurl: "",
            caccertificate: "caccertificate",
            businessaddress1: "",
            businessaddress2: "",
            businesscity: "",
            businessstate: "Abia",
            businesscountry: "Nigeria",
            memorandumofarticles: "memorandumofarticles",
            companyprofile: "companyprofile",

            states: [ 
                        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
                        "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
                        "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna",
                        "Katsina", "Kano", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
                        "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
                        "Sokoto", "Taraba", "Yobe", "Zamfara"
            ],

            sending: false,
            verificationText: "Start Verification"

        };
    },
    methods: {
        initiatePayment: function(){
            var userDetailsEndpoint = endpoint +'/seller/bvnpayment';
            this.paymentText = "Redirecting...";
            this.redirecting = true;
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
            .then(result => { 
                console.log("BVN Payment details");
                console.log(result);
                if(result.status == "success" && result.message == "payment_url"){
                    this.paymentText = "Pay Now to Continue";
                    this.redirecting = false;
                    window.location.href = result.data.auth.authorization_url;
                }else{
                    alert("Something went wrong. Could not process payment");
                    console.log(result.message);
                }
                
            });    
    
        },
        hideAlert: function(){
            $(".alert-error").addClass("d-none"); 
        },
        validateCredentials: function(){
            if(isNaN(this.bvn) || this.bvn.trim() == "" || this.bvn == null) {
                return "Please enter your bvn";
            }

            if(this.checked){
                if(this.businessname.trim() == "" || this.businessname == null){
                    return "Please enter your business name";
                }
                if(!this.validateEmail(this.businessemail)){
                    return "Please enter a valid business email";
                }
                if(isNaN(this.yearofincorporation) || this.yearofincorporation < 0 || this.yearofincorporation.trim() == "" || this.yearofincorporation == null) {
                    return "Please enter year of incorporation";
                }

                /*if(this.siteurl.trim() != "" && this.siteurl != null){
                    //validate url
                    if(!this.validateEmail(this.siteurl)){
                        return "Please enter a valid site url";
                    }
                }*/

                //check for cac certificate
                if( document.getElementById("caccertificate").files.length == 0 ){
                    return "Please upload your cac certificate";
                }

                if(this.businessaddress1.trim() == "" || this.businessaddress1 == null){
                    return "Please enter your business address (line 1)";
                }

                if(this.businessaddress2.trim() == "" || this.businessaddress2 == null){
                    return "Please enter your business address (line 2)";
                }

                if(this.businessstate.trim() == "" || this.businessstate == null){
                    return "Please enter your business state";
                }
            }

            return null;
        },
        validateUrl: function(str){

        },
        validateEmail: function(email){

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        return re.test(String(email).toLowerCase());

        },
        startVerification: function(){
            this.sending = true;
            this.verificationText = "Verifying...";
            var result = this.validateCredentials();

            //console.log("Res");
            //console.log(result);

            if(result != null){
                this.hideAlert();
                this.verifyError = result;
                $('.alert-error').removeClass('d-none');
                this.sending = false;
                this.verificationText = "Start Verification";
                return;
            }

            var formData = new FormData();

            formData.append("is_marketplace", 0);
            formData.append("marketplace_child", null);
            formData.append("business_name", this.businessname);
            formData.append("business_address", this.businessaddress1);
            formData.append("business_address_2", this.businessaddress2);
            formData.append("business_city", this.businesscity);
            formData.append("business_country", "Nigeria");
            formData.append("business_state", this.businessstate);
            formData.append("business_email", this.businessemail);
            formData.append("siteURL", this.siteurl);
            formData.append("BVN", this.bvn);
            formData.append("year_of_inc", this.yearofincorporation);


            if(this.checked){
                var cac_certificate = document.querySelector('input[name=caccertificate]'),
                cac_certificate_file = cac_certificate.files[0];
                if (cac_certificate_file){ //&& file.type.match(/image.*/)
                    formData.append("cac_certificate", cac_certificate_file);
                }else{formData.append("cac_certificate", null);}


                var memorandum_of_articles = document.querySelector('input[name=memorandumofarticles]'),
                memorandum_of_articles_file = memorandum_of_articles.files[0];
                if (memorandum_of_articles_file){ //&& file.type.match(/image.*/)
                    formData.append("memorandum_of_article", memorandum_of_articles_file);
                }else{formData.append("memorandum_of_article", null);}


                var company_profile = document.querySelector('input[name=companyprofile]'),
                company_profile_file = company_profile.files[0];

                if (company_profile_file){ //&& file.type.match(/image.*/)
                    formData.append("company_profile", company_profile_file);
                }else{formData.append("company_profiles", null);}
            }else{
                formData.append("cac_certificate", null);
                formData.append("memorandum_of_article", null);
                formData.append("company_profiles", null);
            }
            

            
            this.$http.post( endpoint + '/seller/business', formData
                , { headers: {'Authorization': 'Bearer ' + this.$session.get('trustpayauthtoken') }})
            .then( 
                response => { //success
                    return response.json();
                }, 
                response => { //error
                    console.log("Verify Err");
                    return response.json();
                }
            )
            .then(verify => { 
                console.log("Verify details");
                console.log(verify);

                if(verify.status == "success" ){
                    this.sending = false;
                    this.verificationText = "Start Verification";
                    console.log("verified");
                }else if(verify.status == "error" && verify.message == "bvn_verification_failed"){
                    this.hideAlert();
                    this.verifyError = "BVN Verification failed";
                    $('.alert-error').removeClass('d-none');
                    this.sending = false;
                    this.verificationText = "Start Verification";
                }else if(verify.status == "error" && verify.message == "unmatched_bvn_details"){
                    this.hideAlert();
                    this.verifyError = "Your BVN doesn't match your details. Please check and try again.";
                    $('.alert-error').removeClass('d-none');
                    this.sending = false;
                    this.verificationText = "Start Verification";
                }else if(verify.status == "error" && verify.message == "payment_required"){
                    this.paymentrequired = true;
                    this.hideAlert();
                    this.verifyError = "You have used all your tries to verify your BVN. Please pay to continue using the button below";
                    $('.alert-error').removeClass('d-none');
                    this.sending = false;
                    this.verificationText = "Start Verification";
                }else{
                    this.hideAlert();
                    this.verifyError = verify.message.replace(/\\n/g, "<br />");
                    $('.alert-error').removeClass('d-none');
                    this.sending = false;
                    this.verificationText = "Start Verification";
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
                if(user.status == "success" && user.message == "customer_details"){
                    this.$router.push('/myescrow/welcome'); //for sellers  only
                }else if(user.status == "success" && user.message == "seller_details"){
                    //check is seller is verified
                    this.status = "done";
                    this.fullname = user.data.firstname + " " + user.data.lastname;
                    this.firstname = user.data.firstname;
                    this.lastname = user.data.lastname;
                    this.phonenumber = user.data.phone_number;
                    console.log("stats "+this.status);

                    if(user.data.verified == 1){
                        this.$router.push('/myescrow/welcome');
                    }
                    
                }else{
                    this.$session.destroy();
                    this.$router.push('/login');
                }
                
                }
            );    
    }
}
</script>
