import { RespUpdateForm, UpdateFormParams, FormProp, Row } from '../types';
import { Recipe } from '../../types';
import { megio } from '../../index.ts';

const updatingForm = async <T = Row>(
	params: UpdateFormParams<T>,
): Promise<RespUpdateForm> => {
	return megio.fetch<
		{
			recipe: Recipe;
			form: FormProp[];
		},
		{ errors: string[] }
	>(`megio/collections/form/updating`, {
		method: 'POST',
		body: JSON.stringify(params),
	});
};

export default updatingForm;
