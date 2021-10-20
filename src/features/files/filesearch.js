import React, {useState, useEffect, useMemo, useCallback} from 'react';
import getFiles from './files.service';
import getUsers from '../users/users.service';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import styles from './files.module.css';
//import { debounce } from '../../common/utils';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const getUserNameById = (userList, id) => {
    const user = userList.find(user => user.id === id);
    return user ? `${user.givenName} ${user.familyName}` : '';
};

const FileSearch = () => {
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedFiles, setSearchedFiles] = useState([]);

    //const debounceSetSearchText = debounce(setSearchText, 300);

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
    const classes = useStyles();    

    const filesWithNames = useMemo(() => {
        return hasData ? files.map(file => ({...file, 
            createdByUser: getUserNameById(users, file.createdBy), 
            modifiedByUser: getUserNameById(users, file.modifiedBy)
            })
        ) : [];
    }, [hasData, users, files]);

    useEffect(() => {
        const _searchedFiles = filesWithNames.filter(file => file.title.includes(searchText));
        setSearchedFiles(_searchedFiles);
    }, [filesWithNames, searchText]);

    const onSearchChange = useCallback((e) => {
        const _searchText = e.target.value;
        setSearchText(_searchText);
    }, [setSearchText]);

    return (
        <div className={styles.container}>
            {!hasData && (
                <span>Loading ...</span>
            )}

            {hasData && (
                <>
                    <div className={styles.searchBox}>
                        <TextField 
                            id="search files"
                            label= "Search"
                            variant="outlined"
                            value={searchText || ''}
                            onChange={onSearchChange}
                        />
                    </div>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="files table">
                            <TableHead>
                                <TableRow >
                                    <TableCell className={styles.heading} align="left">Filename</TableCell>
                                    <TableCell className={styles.heading} align="left">Type</TableCell>
                                    <TableCell className={styles.heading} align="left">Status</TableCell>
                                    <TableCell className={styles.heading} align="left">Created By</TableCell>
                                    <TableCell className={styles.heading} align="left">Updated By</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchedFiles.map(file => (
                                    <TableRow key={file.title}>
                                        <TableCell align="left">{file.title}</TableCell>
                                        <TableCell align="left">{file.type}</TableCell>
                                        <TableCell align="left">{file.status}</TableCell>
                                        <TableCell align="left">{file.createdByUser}</TableCell>
                                        <TableCell align="left">{file.modifiedByUser}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>  
            </>
            
            )}
        </div>
    );
};

export default FileSearch;