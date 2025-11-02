import { getStorage } from '../index';

const logout = (): void => {
	getStorage().removeItem('megio_user');
};

export default logout;
