import React, {useState, useEffect} from 'react';
import getFiles from '../files/files.service';
import { useSelector } from 'react-redux';
import { selectTypes } from './types.slice';

const getFilesByTypeId = (files, types) => {
    const typeIds = types.map(type => type.id);
    const filesByTypeId = {};
    typeIds.forEach(typeId => filesByTypeId[typeId] = []);
    files.forEach(file => filesByTypeId[file.type].push(file));
    return filesByTypeId;
};


const Types = () => {
    const [files, setFiles] = useState([]);
    const types = useSelector(selectTypes);

    useEffect(() => {
        let dismounted = false;

        const fetchFiles = async () => {
            const _files = await getFiles();
            if (!dismounted) {
                setFiles(_files);
            }
        };
        fetchFiles();
        return () => {
            dismounted = true;
        };
    }, []);

    const hasData = files?.length > 0 && types?.length > 0;

    const filesByCategory = hasData ? getFilesByTypeId(files, types) : [];

    console.log(filesByCategory);


    return (
        <div>
            {!hasData && (
                <span>Loading ...</span>
            )}
        </div>
    );
};

export default Types;