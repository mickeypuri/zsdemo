import httpService from '../../http';

const getFiles = async () => {
    const { data: files } = await httpService.get('Files');
    return files;
};

export default getFiles;