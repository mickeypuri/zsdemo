import React, {useState, useEffect} from 'react';
import getUsers from './users.service';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from './users.module.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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
    const classes = useStyles();    

    return (
        <div className={styles.container}>
            {!hasUsers && (
                <span>Loading...</span>
            )}

            {hasUsers && (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="users table">
                        <TableHead>
                            <TableRow >
                                <TableCell className={styles.heading} align="left">User Id</TableCell>
                                <TableCell className={styles.heading} align="left">First Name</TableCell>
                                <TableCell className={styles.heading} align="left">Surname</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell align="left">{user.id}</TableCell>
                                    <TableCell align="left">{user.givenName}</TableCell>
                                    <TableCell align="left">{user.familyName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
           
        </div>
    );
};

export default Users;