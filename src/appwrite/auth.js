import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                console.log("account created")
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            console.log("account is in login")
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
    async createOTPlogin({phone_number}){
      
        try {
          const userAccount=await this.account.createPhoneToken(
                ID.unique(),
                phone_number
            );
            if(userAccount){
               const userId=userAccount.userId;
                console.log(userId);
                return userId;
            }
         
        } catch (error) {
            console.log("is in error");
            throw error
        }
    }
    async OTPlogin({userID,otp}){
        
        console.log("auth LOgin",userID);

        try {
            return await this.account.createSession(userID,otp)
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService


