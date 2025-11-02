import { megio } from './../../index.ts';
import type { RespNavbar } from '../types';
import { Recipe } from '../../types';

const navbar = async (): Promise<RespNavbar> => {
	return megio.fetch<{ items: Recipe[] }, string[]>(
		`megio/collections/navbar`,
		{ method: 'POST' },
	);
};

export default navbar;
