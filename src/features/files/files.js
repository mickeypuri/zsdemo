import React, {useState, useEffect} from 'react';
import getFiles from './files.service';
import getUsers from '../users/users.service';

const getUserNameById = (userList, id) => {
    const user = userList.find(user => user.id === id);
    return user ? `${user.givenName} ${user.familyName}` : '';
};

const Files = () => {
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        let dismounted = false;

        const fetchUsers = async () => {
            const _users = await getUsers();
            if (!dismounted) {
                setUsers(_users);
            }
        };
        fetchUsers();

        return () => {
            dismounted = true;
        }
    }, []);

    const hasData = files?.length > 0 && users?.length > 0;

    const filesWithNames = hasData ? files.map(file => ({...file, 
        createdByUser: getUserNameById(users, file.createdBy), 
        modifiedByUser: getUserNameById(users, file.modifiedBy)
        })
    ) : [];

    console.log(filesWithNames);

    return (
        <div>
            {!hasData && (
                <span>Loading ...</span>
            )}

            

        </div>
    );
};





export default Files;