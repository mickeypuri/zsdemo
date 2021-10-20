import React, {useState, useEffect} from 'react';
import getFiles from '../files/files.service';
import { useSelector } from 'react-redux';
import { selectTypes } from './types.slice';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './types.module.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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
    const classes = useStyles();    
    const categories = Object.keys(filesByCategory);


    return (
        <div>
            {!hasData && (
                <span>Loading ...</span>
            )}

            {hasData && categories.map(category => (
                <div className={styles.container} key={category}>
                    <Typography variant="h4" gutterBottom align="left">
                        {category}
                    </Typography>

                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="files by category table">
                        <TableHead>
                            <TableRow >
                                <TableCell className={styles.heading} align="left">Filename</TableCell>
                                <TableCell className={styles.heading} align="left">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filesByCategory[category].map(file => (
                                <TableRow key={file.title}>
                                    <TableCell align="left">{file.title}</TableCell>
                                    <TableCell align="left">{file.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            ))}
        </div>
    );
};

export default Types;