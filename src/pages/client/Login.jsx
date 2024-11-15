import React, { useContext, useEffect, useState ,createContext,  } from 'react';
import { Link } from 'react-router-dom';
import { ContextCustomers } from '../../context/CustomerContext';
import { useNavigate } from 'react-router-dom';
import { addDocument, fetchDocuments } from "../../services/FirebaseService"; // Chỉ import hàm cần thiết
import { CustomersLoginContext } from '../../context/CustomerLoginContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Login(props) {
    const customers = useContext(ContextCustomers);
    console.log(customers);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success', });
    const navigate = useNavigate(); // Dùng để điều hướng sau khi đăng nhập thành công
    const [loginData, setLoginData] = useState({
        id: '',
        pass: '',
    });
    
    const { setIsLoggedIn } = useContext(CustomersLoginContext);

    // Xử lý khi thay đổi giá trị form đăng nhập
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };
    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    // Xử lý đăng nhập
    const handleSubmit = (e) => {
        e.preventDefault();  // Ngăn hành vi mặc định của form
        // Kiểm tra xem thông tin đăng nhập có khớp với dữ liệu trong Firebase không
        const customer = customers.find((cust) =>
            cust.id === loginData.id && cust.pass === loginData.pass
        );
        if (customer) {
            setIsLoggedIn(customer);
            navigate('/Information');
        } else {
            // Nếu thông tin không khớp, hiển thị thông báo lỗi
            alert("Email hoặc mật khẩu không chính xác.");
        }
    };
    
    return (
        <div className='my-10'>
            <form action=" " className='w-[30vw] m-auto' onSubmit={handleSubmit}>
                <div className='text-center mb-3'>
                    <b className='text-lg'>ĐĂNG NHẬP</b>
                </div>

                {/* Email */}
                <div className='form-group mb-6'>
                    <div className='mb-2'>Email*</div>
                    <div className='flex justify-center'>
                        <input
                            name="id"
                            value={loginData.id}
                            onChange={handleChange}
                            type="email"
                            className="form-control"
                            aria-label="Email"
                        />
                    </div>
                </div>

                {/* Mật khẩu */}
                <div className='form-group'>
                    <div className='mb-2'>Mật Khẩu*</div>
                    <div className='flex justify-center'>
                        <input
                            name="pass"
                            value={loginData.pass}
                            onChange={handleChange}
                            type="password"
                            className="form-control"
                            aria-label="Password"
                        />
                    </div>
                </div>

                {/* Nút Đăng Nhập */}
                <div className='my-4'>
                    <button type="submit" className="bg-slate-200 w-[100%] p-2 hover:bg-black hover:text-white">
                        Đăng Nhập
                    </button>
                </div>

                <div className='my-3 relative border border-red-500'>
                    <p className='hoac'>Hoặc</p>
                </div>

                {/* Nút Đăng Ký */}
                <div>
                    <Link to={'/Register'}>
                        <button type="button" className="bg-black w-[100%] p-2 text-white hover:bg-stone-500">
                            Đăng Ký
                        </button>
                    </Link>
                </div>
            </form>
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
    );
}

export default Login;