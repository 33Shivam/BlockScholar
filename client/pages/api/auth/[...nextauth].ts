import NextAuth from 'next-auth';
import { MoralisNextAuthProvider } from '@moralisweb3/next';
import connectDB from '../../../lib/connectDB';
import Users from '../../../lib/userSchema';
import Staffs from '../../../lib/staffSchema';



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
                const userStudentExist = await Users.findOne({profileId: token.user.profileId});
                console.log(userStudentExist);
                const detection = token.credentials.callbackUrl;
                // console.log(detection=='/student');
                
                if(!userStudentExist && detection=='/student'){
                    const newUser = await Users.create({profileId: token.user.profileId , address: token.user.address ,accountType: 'student'})
                    
                }

                if(userStudentExist && detection=='/student' && userStudentExist.accountType!='student'){   
                    console.log("Not Authorized");
                    return false;

                }
                if(!userStudentExist && detection=='/staff'){
                    const newUser = await Users.create({profileId: token.user.profileId , address: token.user.address,accountType: 'staff'})
                    
                }
                if(userStudentExist && detection=='/staff' && userStudentExist.accountType!='staff'){   
                    console.log("Not Authorized");
                    return false;

                }
                if(!userStudentExist && detection=='/ssDistributor'){
                    const newUser = await Users.create({profileId: token.user.profileId , address: token.user.address,accountType: 'distributor'})
                    
                }   
                if(userStudentExist && detection=='/ssDistributor' && userStudentExist.accountType!='distributor'){   
                    console.log("Not Authorized");
                    return false;

                }               
                // console.log(token);
               
                return true;
            }
            catch(err){
                console.log(err);
                return false;
            }
            

            
        },
    },
});
