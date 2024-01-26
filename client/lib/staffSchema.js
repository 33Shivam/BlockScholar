import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
    {
        profileId: {
            type: String,
            
        },
        address: {
            type: String,
            
        },
        type: {
            type: String,
            default: "defaultSTAFF",
        },
        bio:{
            type: String,
            default: "NO BIO",
        },},
            {timestamps: true}
    );

        let Staffs = mongoose.models.user || mongoose.model("staff", staffSchema);
        export default Staffs;   