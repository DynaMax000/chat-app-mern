import { StreamChat } from 'stream-chat';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY and STREAM_API_SECRET must be set in the environment variables.");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    // create or update the user in Stream
    await streamClient.upsertUsers([userData]);
    return userData;
  }
  catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    
    // ensure userid is string
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  }
  catch(error) {
    console.error("Error generating Stream token:", error);
  }

};