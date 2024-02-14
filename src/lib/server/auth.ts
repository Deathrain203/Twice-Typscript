import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { MONGO_URI } from "$env/static/private";


import mongoose from "mongoose";


await mongoose.connect(MONGO_URI)

export const User = mongoose.model(
	"User",
	new mongoose.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			username:{
				type: String,
				required: true,
				unique: true,
				
			},
			password: {
				type: String,
				required: true,
			},
			pfp:{
				type: String,
				required: true,
				default: "https://f005.backblazeb2.com/file/Twice-Typescript/1ba91456a866afec775a19851b336b46.webp"
				
			},
			firstStan:{
				type: String,
				required: true,
				default: "None",
			},
			
			secondStan:{
				type: String,
				required: true,
				default: "None",

				
			},
			thirdStan:{
				type: String,
				required: true,
				default: "None",
				
				
			},
			dev: {
				type: Boolean,
				required:true,
				default:false

			}
			
		
			
			

		
		} as const,
		{ _id: false }
	)
);




export const Session = mongoose.model(
	"Session",
	new mongoose.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			user_id: {
				type: String,
				required: true
			},
			expires_at: {
				type: Date,
				required: true
			}
		} as const,
		{ _id: false }
	)
);
export const Member = mongoose.model("Member", new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	picture:{
		type: String,
		required: true,

	},
	description:{
		type: String,
		required: true,
	},
	birthday:{
		type: String,
		required: true,
	},
	age:{
		type: Number,
		required: true
		
	},
	lovely:{
		type: String,
		required: true,
	}
}))

const adapter = new MongodbAdapter(
    mongoose.connection.collection('sessions'),
    mongoose.connection.collection("users")

)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev,

        }
    }

  
})

declare module 'lucia'{
    interface Register {
        Lucia: typeof lucia
    }
}