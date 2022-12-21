# Customer-Portal
## Backend listen on - "https://licensemanagerbackend.azurewebsites.net:443"
### Login Api's: 
#### "login_using_credentials" sign in the user according to user name password and recored on salesforce 
#### "/login_with_microsoft" sign in the user according to recored on sales force but we use microsoft auth to authorized the user.
### General Apis
#### Extract the domains from you are token see ("jwt.io") website.
#### "/subdomains" to get all the subdomains the user has access.
#### "/domain_data" return user list 
#### "/license_number" number of license per account using SF api in our server.
#### "/remove" delete user from our DB
####  "/reset_password" if the user not remmber the password there is an option to reset the password.
