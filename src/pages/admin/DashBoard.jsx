import React, { useEffect, useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, ButtonGroup, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addDocument, fetchDocuments, deleteDocument, updateDocument } from "../../services/FirebaseService";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function DashBoard(props) {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({ name: '', description: '' });
    const [dash1, setDash1] = useState([]);
    const [dashboard, setDashboard] = useState({});
    const [update, setUpdate] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Trạng thái mở Modal Delete
    const [idDelete, setIdDelete] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const dashData = await fetchDocuments('DashBoard');
            setDash1(dashData);
        };
        fetchData();
    }, [update]);

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = dashboard.name ? '' : 'Name is required';
        tempErrors.description = dashboard.description ? '' : 'Description is required';
        setErrors(tempErrors);

        return !tempErrors.name && !tempErrors.description;
    };

    const handleSubmit = async () => {
        if (validate()) {
            await addDocument("DashBoard", dashboard);
            setDashboard({});
            handleClose();
            setUpdate(!update);
        }
    };

    const handleDelete = async () => {
        if (idDelete) {
            await deleteDocument("DashBoard", idDelete);
            setUpdate(!update);
            setDeleteModalOpen(false);
        }
    };
    const onEdit = (element) => {

    };

    const onDelete = (element) => {
        setDeleteModalOpen(true);
        setIdDelete(element.id);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => setOpen(false);
    const handleDeleteModalClose = () => setDeleteModalOpen(false);
    return (
        <div>
            <div className="div">
                <div className="flex justify-between p-6">
                    <h1 className='text-2xl'><b>DashBoard</b></h1>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Seacrh ..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <Button><i class="fa-solid fa-magnifying-glass"></i></Button>
                        </div>
                    </ButtonGroup>
                    <div className="div">
                        <Button variant="contained" onClick={handleOpen}>Add DashBoard</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="add-dashboard-modal-title"
                            aria-describedby="add-dashboard-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="add-dashboard-modal-title" variant="h6" component="h2">
                                    Add New DashBoard
                                </Typography>
                                <TextField
                                    id="dashboard-name"
                                    label="DashBoard Name"
                                    fullWidth
                                    value={dashboard && dashboard.name}
                                    onChange={(e) => setDashboard({ ...dashboard, name: e.target.value })}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    margin="normal"
                                />
                                <TextField
                                    id="dashboard-description"
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={dashboard && dashboard.description}
                                    onChange={(e) => setDashboard({ ...dashboard, description: e.target.value })}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    margin="normal"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    sx={{ mt: 2 }}
                                >
                                    Add DashBoard
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>

            <div className='w-11/12 ml-11'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dash1.map((element, index) => (
                                <TableRow
                                    key={element.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="right">{element.name}</TableCell>
                                    <TableCell align="right">{element.description}</TableCell>
                                    <TableCell align="right">
                                        {/* Nút Edit */}
                                        <IconButton
                                            color="primary"
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </IconButton>

                                        {/* Nút Delete */}
                                        <IconButton
                                            color="secondary"
                                            onClick={() => onDelete(element)}
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* Modal xác nhận xóa */}
            <Modal
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
                aria-labelledby="delete-category-modal-title"
                aria-describedby="delete-category-modal-description"
            >
                <Box sx={style}>
                    <Typography id="delete-category-modal-title" variant="h6" component="h2">
                        Confirm Delete
                    </Typography>
                    <Typography id="delete-category-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this category?
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        sx={{ mt: 2, mr: 2 }}
                    >
                        Yes, Delete
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleDeleteModalClose}
                        sx={{ mt: 2 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default DashBoard;