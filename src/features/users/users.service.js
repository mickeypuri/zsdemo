import httpService from '../../http';

const getUsers = async () => {
    const { data: users } = await httpService.get('Users');
    return users;
};

export default getUsers;