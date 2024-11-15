import React from 'react';

function Footer(props) {
    return (
        <div>
            <footer className="p-14">
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2 end">
                    <div className="lg:col-span-1 md:col-span-2 col-span-1">
                        <b className="text-lg">Mắt Kính HATO</b>
                        <hr className="w-36 border-t-2 border-gray-400 my-2" />
                        <h1 className="text-sm">Địa chỉ: 421/31 Sư Vạn Hạnh, P.12, Q.10 ( gần Vạn Hạnh Mall ). Tp. HCM ( có chỗ đậu xe hơi )</h1>
                        <h1 className="text-sm">Hotline: <b>0902547710</b> ( 9:00 - 21:00 )</h1>
                        <h1 className="text-sm">Mở cửa: 9:00 - 20:00 ( Kể cả T7 và CN )</h1>
                        <h1 className="text-sm">Email: matkinhhato@gmail.com</h1>
                        <h1 className="text-sm">Kiểm tra thị lực miễn phí & cắt kính lấy liền.</h1>
                        <h1 className="text-sm">Hotline Góp Ý, khiếu nại: <b>0938 542 856</b></h1>
                        <h1 className="text-sm">MST: 0315306087</h1>
                        <h1 className="text-sm">CÔNG TY TNHH C3T VIỆT NAM</h1>
                        <h1 className="text-sm">Hỗ trợ trả góp lãi suất 0% thẻ tín dụng</h1>
                        <i className="fa-brands fa-facebook-f text-xl mt-4"></i>
                    </div>
                    <div className="lg:col-span-1 md:col-span-1 col-span-1 mt-4 md:mt-0">
                        <div className='flex '>
                            <div >
                                <b className="text-lg">HỖ TRỢ KHÁCH HÀNG</b>
                                <hr className="border-t-2 border-gray-400 my-2" />
                                <h1 className="text-sm">Hướng dẫn mua hàng online</h1>
                                <h1 className="text-sm">Chính sách thanh toán, giao nhận</h1>
                                <h1 className="text-sm">Chính sách bảo mật</h1>
                                <h1 className="text-sm">Chính sách bảo hành</h1>
                                <h1 className="text-sm">Chính sách đổi trả và hoàn tiền</h1>
                                <h1 className="text-sm">Kiểm tra đơn hàng</h1>
                            </div>
                            <div className=" items-center">
                                <img src="https://theme.hstatic.net/1000269337/1000981122/14/media.jpg?v=292" alt="" className="w-full max-w-xs" />
                            </div>
                        </div>

                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Footer;