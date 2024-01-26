import NextAuth from 'next-auth';
import { MoralisNextAuthProvider } from '@moralisweb3/next';
import connectDB from '../../../lib/connectDB';
import Users from '../../../lib/userSchema';



export default NextAuth({
    providers: [MoralisNextAuthProvider()],
    // adding user info to the user session object
    callbacks: {      
       
       
             async jwt({ token, user }) {
            if (user) {
                token.user = user;                                      
    
            }
            return token;
            
        },
        async session({ session, token }) {
            (session as { user: unknown }).user = token.user;
            return session;
        }, 
        async signIn(token) {           
            try{
                connectDB();
                const userExist = await Users.findOne({profileId: token.user.profileId});  
                if(!userExist){
                    const newUser = await Users.create({profileId: token.user.profileId , address: token.user.address })
                    
                }                  
                console.log(token);
                return true;
            }
            catch(err){
                console.log(err);
                return false;
            }
            

            
        },
    },
});
