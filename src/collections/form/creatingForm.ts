import { CreateFormParams, RespCreateForm, FormProp } from '../types';
import { Recipe } from '../../types';
import { megio } from '../../index.ts';

const creatingForm = async (
	params: CreateFormParams,
): Promise<RespCreateForm> => {
	return megio.fetch<
		{
			recipe: Recipe;
			form: FormProp[];
		},
		{ errors: string[] }
	>(`megio/collections/form/creating`, {
		method: 'POST',
		body: JSON.stringify(params),
	});
};

export default creatingForm;
