import React, { useContext, useEffect, useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, MenuItem, TableHead, TableRow, Paper, Button, IconButton, ButtonGroup, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addDocument, deleteDocument, fetchDocuments, updateDocument } from '../../../services/FirebaseService';
import { ContextProvince } from '../../../context/ProvinceContext';
import { ContextDistrict } from '../../../context/DistrictContext';
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
function Commune(props) {
    const [open, setOpen] = useState(false);
    const provinces = useContext(ContextProvince);
    const districts = useContext(ContextDistrict);
    const [errors, setErrors] = useState({ name: '', province: '' });
    const [dash1, setDash1] = useState([]);
    const [commune, setCommune] = useState({});
    const [update, setUpdate] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Trạng thái mở Modal Delete
    const [idDelete, setIdDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dashData = await fetchDocuments('Commune');
            setDash1(dashData);
        };
        fetchData();
    }, [update]);

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = commune.name ? '' : 'Name is required';
        tempErrors.province = commune.province ? '' : 'province is required';
        setErrors(tempErrors);
        return !tempErrors.name && !tempErrors.province;
    };

    const handleSubmit = async () => {
        if (commune.id) {
            await updateDocument("Commune", commune.id, commune);
        } else {
            await addDocument("Commune", commune);
        }
        setCommune({});
        handleClose();
        setUpdate(!update);
    };

    const handleDelete = async () => {
        if (idDelete) {
            await deleteDocument("Commune", idDelete);
            setUpdate(!update);
            setDeleteModalOpen(false);
        }
    };
    const onEdit = (element) => {
        setCommune(element); // Gán danh mục vào state
        setErrors({});
        setOpen(true); // Mở modal
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

    const getNameProvince = (id) => {
        const province = provinces.find(a => a.id == id);
        return province ? province.name : ""
    }

    const getNameDistrict = (id) => {
        const district = districts.find(a => a.id == id);
        return district ? district.name : ""
    }

    return (
        <div>
            <div className="div">
                <div className="flex justify-between p-6">
                    <h1 className='text-2xl'><b>Commune</b></h1>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Seacrh ..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <Button><i class="fa-solid fa-magnifying-glass"></i></Button>
                        </div>
                    </ButtonGroup>
                    <div className="div">
                        <Button variant="contained" onClick={handleOpen}>Add Commune</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="add-Commune-modal-title"
                            aria-describedby="add-Commune-modal-province"
                        >
                            <Box sx={style}>
                                <Typography id="add-Commune-modal-title" variant="h6" component="h2">
                                    Add New Commune
                                </Typography>
                                <TextField
                                    id="Commune-name"
                                    label="Commune Name"
                                    fullWidth
                                    value={commune && commune.name}
                                    onChange={(e) => setCommune({ ...commune, name: e.target.value })}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    margin="normal"
                                />

                                <TextField
                                    select
                                    label="district"
                                    fullWidth
                                    rows={4}
                                    value={commune.district}
                                    onChange={(e) => setCommune({ ...commune, district: e.target.value })}
                                    margin="normal"
                                >
                                    {districts.length > 0 ? (
                                        districts.map((district) => (
                                            <MenuItem key={district.id} value={district.id}>
                                                {district.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No District Available</MenuItem>
                                    )}
                                </TextField>
                                <TextField
                                    select
                                    label="province"
                                    fullWidth
                                    rows={4}
                                    value={commune.province}
                                    onChange={(e) => setCommune({ ...commune, province: e.target.value })}
                                    margin="normal"
                                >
                                    {provinces.length > 0 ? (
                                        provinces.map((province) => (
                                            <MenuItem key={province.id} value={province.id}>
                                                {province.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No Provinces Available</MenuItem>
                                    )}
                                </TextField>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    sx={{ mt: 2 }}
                                >
                                    Add Commune
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
                                <TableCell align="right">Commune</TableCell>
                                <TableCell align="right">District</TableCell>
                                <TableCell align="right">Province</TableCell>
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
                                    <TableCell align="right">{getNameDistrict(element.district)}</TableCell>
                                    <TableCell align="right">{getNameProvince(element.province)}</TableCell>
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
                aria-describedby="delete-category-modal-province"
            >
                <Box sx={style}>
                    <Typography id="delete-category-modal-title" variant="h6" component="h2">
                        Confirm Delete
                    </Typography>
                    <Typography id="delete-category-modal-province" sx={{ mt: 2 }}>
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

export default Commune;