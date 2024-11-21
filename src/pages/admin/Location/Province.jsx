import React, { useContext, useEffect, useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, ButtonGroup, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addDocument, fetchDocuments, updateDocument, deleteDocument } from '../../../services/FirebaseService';
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
function Province(props) {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({ name: '', description: '' });
    const [dash1, setDash1] = useState([]);
    const [province, setProvince] = useState({});
    const [update, setUpdate] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Trạng thái mở Modal Delete
    const [idDelete, setIdDelete] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const dashData = await fetchDocuments('Province');
            setDash1(dashData);
        };
        fetchData();
    }, [update]);

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = province.name ? '' : 'Name is required';
        tempErrors.description = province.description ? '' : 'Description is required';
        setErrors(tempErrors);
        return !tempErrors.name && !tempErrors.description;
    };

    const handleSubmit = async () => {
        if (validate()) {
            if (province.id) {
                await updateDocument("Province", province.id, province);
            } else {
                await addDocument("Province", province);
            }
            setProvince({});
            handleClose();
            setUpdate(!update);
        }
    };

    const handleDelete = async () => {
        if (idDelete) {
            await deleteDocument("Province", idDelete);
            setUpdate(!update);
            setDeleteModalOpen(false);
        }
    };

    const onEdit = (element) => {
        setProvince(element); // Gán danh mục vào state
        setErrors({});
        setOpen(true); // Mở modal
    };

    const onDelete = (element) => {
        setDeleteModalOpen(true);
        setIdDelete(element.id);
    };

    const handleOpen = () => {
        setOpen(true);
        setProvince({});
    };

    const handleClose = () => setOpen(false);
    const handleDeleteModalClose = () => setDeleteModalOpen(false);
    return (
        <div>
            <div className="div">
                <div className="flex justify-between p-6">
                    <h1 className='text-2xl'><b>Province</b></h1>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Seacrh ..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <Button><i class="fa-solid fa-magnifying-glass"></i></Button>
                        </div>
                    </ButtonGroup>
                    <div className="div">
                        <Button variant="contained" onClick={handleOpen}>Add Province</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="add-Province-modal-title"
                            aria-describedby="add-Province-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="add-Province-modal-title" variant="h6" component="h2">
                                    Add New Province
                                </Typography>
                                <TextField
                                    id="Province-name"
                                    label="Province Name"
                                    fullWidth
                                    value={province && province.name}
                                    onChange={(e) => setProvince({ ...province, name: e.target.value })}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    margin="normal"
                                />
                                <TextField
                                    id="Province-description"
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={province && province.description}
                                    onChange={(e) => setProvince({ ...province, description: e.target.value })}
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
                                    Add Province
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
                                            onClick={() => onEdit(element)}
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

export default Province;