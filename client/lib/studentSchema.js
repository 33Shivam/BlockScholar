import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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

        let Students = mongoose.models.user || mongoose.model("student", studentSchema);
        export default Students;   