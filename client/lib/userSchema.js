import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        profileId: {
            type: String,
            
        },
        address: {
            type: String,
            
        },
        bio:{
            type: String,
            default: "NO BIO",
        },},
            {timestamps: true}
    );

        let Users = mongoose.models.user || mongoose.model("user", userSchema);
        export default Users;   