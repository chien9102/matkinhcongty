import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addDocument, fetchDocuments ,addDocumentById} from "../../services/FirebaseService"; // Chỉ import hàm cần thiết
import { useNavigate } from 'react-router-dom';
function Register(props) {
    const [update, setUpdate] = useState(false);
    const [customer, setCustomer] = useState({});
    const navigate = useNavigate(); // Dùng để điều hướng sau khi đăng nhập thành công
    const [customers, setCustomers] = useState([])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: value,
        });
    };
    const handleSubmit = async () => {
        const { mail, ...customerNew} = customer ;
        await addDocumentById("Customer", customer.mail , customerNew);
        alert("Đăng Ký thành công:");
        navigate('/Login'); // Giả sử điều hướng đến trang main
    };
    useEffect(() => {
        const fetchData = async () => {
            const customerData = await fetchDocuments('Customer');
            setCustomers(customerData);
        };
        fetchData();
    }, [update]);
    return (
        <div className='my-10'>
            <form action=" " className='w-[30vw] m-auto'>
                <div className='text-center mb-3'>
                    <b className='text-lg'>ĐĂNG KÝ</b>
                </div>

                {/* Họ */}
                <div className='form-group mb-6'>
                    <div className='mb-2'>Họ Của Bạn*</div>
                    <div>
                        <input
                            name="firstName"
                            value={customer.firstName}
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            aria-label="Username"
                        />
                    </div>
                </div>

                {/* Tên */}
                <div className='form-group mb-6'>
                    <div className='mb-2'>Tên Của Bạn*</div>
                    <div>
                        <input
                            name="lastName"
                            value={customer.lastName}
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            aria-label="Username"
                        />
                    </div>
                </div>

                {/* Số điện thoại */}
                <div className='form-group mb-6'>
                    <div className='mb-2'>Số Điện Thoại*</div>
                    <div>
                        <input
                            name="phone"
                            value={customer.phone}
                            onChange={handleChange}
                            type="number"
                            className="form-control"
                            aria-label="Phone"
                        />
                    </div>
                </div>

                {/* Giới tính */}
                <div className='form-group mb-6'>
                    <label className='mb-2'>Giới Tính*</label>
                    <div className='flex justify-between mt-2'>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="nam"
                                id="flexRadioDefault1"
                                checked={customer.gender === "nam"}
                                onChange={handleChange}  // Cập nhật onChange cho giới tính
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Nam
                            </label>
                        </div>
                        <div className="form-check mr-32">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="nu"
                                id="flexRadioDefault2"
                                checked={customer.gender === "nu"}
                                onChange={handleChange}  // Cập nhật onChange cho giới tính
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Nữ
                            </label>
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className='form-group mb-6'>
                    <div className='mb-2'>Email*</div>
                    <div className='flex justify-center'>
                        <input
                            name="mail"
                            value={customer.mail}
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
                            value={customer.pass}
                            onChange={handleChange}
                            type="password"
                            className="form-control"
                            aria-label="Password"
                        />
                    </div>
                </div>

                {/* Nút Đăng Ký */}
                <div className='my-4'>
                    <button onClick={handleSubmit} type="button" className="bg-slate-200 w-[100%] p-2 hover:bg-black hover:text-white">
                        Đăng Ký
                    </button>
                </div>

                <div className='my-3 relative border border-red-500'>
                    <p className='hoac'>Hoặc</p>
                </div>

                {/* Nút Đăng Nhập */}
                <div>
                    <Link to={'/Login'}>
                        <button type="button" className="bg-black w-[100%] p-2 text-white hover:bg-stone-500">
                            Đăng Nhập
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
