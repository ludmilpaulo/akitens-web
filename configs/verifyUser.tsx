import axios from 'axios';
import { local } from './variable';

async function verifyUser(user_id: number, token: string, username: string) {
  try {
    const response = await axios.post(`${local}/api/verify_user/`, {
      user_id,
      token,
      username,
    });

    if (response.status === 200) {
      console.log('User verified successfully');
      return true;
    } else {
      console.error('User verification failed');
      return false;
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return false;
  }
}

export default verifyUser;
