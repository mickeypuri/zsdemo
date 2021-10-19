import httpService from '../../http';

const getTypes = async () => {
    const { data: types } = await httpService.get('Types');
    return types;
};

export default getTypes;