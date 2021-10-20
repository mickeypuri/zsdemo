import React, {useState, useEffect} from 'react';
import getUsers from './users.service';

const Users = () => {
    const [users, setUsers] = useState([]);

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

    const hasUsers = users?.length > 0;

    console.log(users);
    

    return (
        <div>
            {!hasUsers && (
                <span>Loading...</span>
            )}

            
        </div>
    );
};

export default Users;