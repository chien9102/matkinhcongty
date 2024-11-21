import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalDelete from '../ModalDelete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { TextField, Box, Modal, Typography, MenuItem, IconButton, Button, ButtonGroup, TablePagination } from '@mui/material';
import { style } from '../../../utils/Constants'; // Import style tùy chỉnh nếu cần
import { addDocument, fetchDocuments, deleteDocument, updateDocument } from "../../../services/FirebaseService";
import logo from "../../../styles/logo1.png";
import { ContextBrands } from '../../../context/BrandsContext';
import { ContextCategories } from '../../../context/CategoriesContext';

function Products(props) {
    const [errors, setErrors] = useState({ name: '', description: '', quantity: '', discount: '', price: '' });
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [open, setOpen] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [update, setUpdate] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Trạng thái mở Modal Delete
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success', });
    const brands = useContext(ContextBrands);
    const categories = useContext(ContextCategories);
    const [previewImg, setPreviewImg] = useState(null);
    const [imgUpload, setImgUpload] = useState(null);
    const [search, setSearch] = useState("");
    const [productsFilter, setProductFiler] = useState([]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const productData = await fetchDocuments('Products');
            setProducts(productData);
            const filteredProducts = search ? productData.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())) : productData;
            setProductFiler(filteredProducts);
        };
        fetchData();
    }, [update, search]);

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = product.name ? '' : 'Name is required';
        tempErrors.price = product.price ? '' : 'Price is required';
        tempErrors.description = product.description ? '' : 'Description is required';
        tempErrors.quantity = product.quantity ? '' : 'Quantity is required';
        tempErrors.discount = product.discount ? '' : 'Discount is required';
        setErrors(tempErrors);
        return !tempErrors.name && !tempErrors.description && !tempErrors.quantity && !tempErrors.discount && !tempErrors.price;
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async () => {
        if (validate()) {
            if (product.id) {
                // Nếu đang chỉnh sửa thì cập nhật danh mục
                await updateDocument("Products", product.id, product, imgUpload);
                setSnackbar({
                    open: true,
                    message: 'Product edited successfully!',
                    severity: 'info',
                });
            } else {
                // Nếu không thì thêm mới danh mục
                await addDocument("Products", product, imgUpload,product.imgUrl);
                setSnackbar({
                    open: true,
                    message: 'Product added successfully!',
                    severity: 'success',
                });
            }
            handleClose();
            setUpdate(!update);
            setPreviewImg(null);
            setImgUpload(null);
        }
        console.log(product);
    };

    const onEdit = (element) => {
        setProduct(element); // Gán danh mục vào state
        setErrors({});
        setPreviewImg(element.imgUrl); // Gán URL của ảnh vào previewImg để hiển thị
        setOpen(true); // Mở modal

    };

    const onDelete = (element) => {
        setDeleteModalOpen(true);
        setIdDelete(element.id);
    };

    const handleDelete = async () => {
        if (idDelete) {
            await deleteDocument("Products", idDelete);
            setUpdate(!update);
            setDeleteModalOpen(false);
            setSnackbar({
                open: true,
                message: 'Product deleted successfully!',
                severity: 'warning',
            });
        }
    };
    const handleOpen = () => {
        setOpen(true);
        setProduct({});
        setPreviewImg(null); // Reset ảnh khi thêm sản phẩm mới
    };
    const handleImgProduct = (e) => {
        const img = e.target.files[0];
        if (img) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(img);
            setImgUpload(img);
        } else {
            setPreviewImg(null);
            setImgUpload(null);
        }
    }
    const handleClose = () => setOpen(false);
    
    const handleDeleteModalClose = () => setDeleteModalOpen(false);

    const getNameBrand = (id) => {
        const brand = brands.find(a => a.id == id);
        return brand ? brand.name : "";

    }
    const getNameCategory = (id) => {
        const category = categories.find(a => a.id == id);
        return category ? category.name : ""
    }

    // State quản lý trang hiện tại và số hàng mỗi trang
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(3); // Số hàng mỗi trang

    // Hàm thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Hàm thay đổi số hàng mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div>
            <div className='flex justify-between px-6 pb-3'>
                <h1 className='text-2xl'><b>Product</b></h1>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <div class="input-group">
                        <input onChange={(e) => setSearch(e.target.value)} type="text" class="form-control" placeholder="Seacrh ..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <Button ><i class="fa-solid fa-magnifying-glass"></i></Button>
                    </div>
                </ButtonGroup>
                <div>
                    <Button onClick={handleOpen} variant="contained">Add Product</Button>
                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="add-product-modal-title"
                            aria-describedby="add-product-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="add-product-modal-title" variant="h6" component="h2">
                                    {product.id ? "Edit" : "Add New"} Product
                                </Typography>
                                <div className='grid md:grid-cols-3 grid-cols-1 gap-2'>
                                    <div>
                                        <TextField
                                            label="Product Name"
                                            name="name"
                                            fullWidth
                                            value={product && product.name}
                                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Quantity"
                                            name="quantity"
                                            type="number"
                                            fullWidth
                                            value={product && product.quantity}
                                            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            margin="normal"
                                        />
                                        <TextField
                                            select
                                            label="Category"
                                            name="category"
                                            fullWidth
                                            value={product.category}
                                            onChange={handleChange}
                                            margin="normal"
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField
                                            select
                                            label="Brand"
                                            name="brand"
                                            fullWidth
                                            value={product.brand}
                                            onChange={handleChange}
                                            margin="normal"
                                        >
                                            {brands.map((brand) => (
                                                <MenuItem key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label="Discount (%)"
                                            name="discount"
                                            type="number"
                                            fullWidth
                                            value={product && product.discount}
                                            onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            margin="normal"
                                        />

                                        <TextField
                                            label="Price"
                                            name="price"
                                            type="number"
                                            fullWidth
                                            value={product && product.price}
                                            onChange={(e) => setProduct({ 
                                                ...product, 
                                                price: parseInt(e.target.value) || 0 // Chuyển đổi chuỗi thành số thập phân, nếu không có giá trị thì đặt là 0
                                            })}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            margin="normal"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            label="Description"
                                            name="description"
                                            fullWidth
                                            multiline
                                            rows={1}
                                            value={product && product.description}
                                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            margin="normal"
                                        />
                                        <div>
                                            {/* Thêm trường Image */}
                                            <input
                                                accept="image/*"
                                                type="file"
                                                name="img"
                                                style={{ marginTop: '16px' }}
                                                onChange={handleImgProduct}
                                            />
                                            <div className='mt-2'>
                                                <img src={previewImg ? previewImg : logo} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                                    {product.id ? "Edit" : "Add"} Product
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>

            <div className='w-11/12 ml-11'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Brand</TableCell>
                                <TableCell align="right">Discont</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element, index) => (
                                <TableRow
                                    key={element.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1 + page * rowsPerPage}
                                    </TableCell>
                                    <TableCell align="right">
                                        <img style={{ width: "50px" }} src={element.imgUrl} alt="" />
                                    </TableCell>
                                    <TableCell align="right">{element.name}</TableCell>
                                    <TableCell align="right">{element.description}</TableCell>
                                    <TableCell align="right">{element.quantity}</TableCell>
                                    <TableCell align="right">{getNameCategory(element.category)}</TableCell>
                                    <TableCell align="right">{getNameBrand(element.brand)}</TableCell>
                                    <TableCell align="right">{element.discount}</TableCell>
                                    <TableCell align="right">{element.price.toLocaleString('vi-VN')}</TableCell>
                                    <TableCell align="right" className='text-nowrap'>
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
                                        <ModalDelete handleDelete={handleDelete} deleteModalOpen={deleteModalOpen} handleDeleteModalClose={handleDeleteModalClose} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* Phân trang */}
                    <TablePagination
                        component="div"
                        count={products.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Rows per page"
                        rowsPerPageOptions={[3, 6, 9]}
                    />
                </TableContainer>

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>


        </div>
    );
}

export default Products;