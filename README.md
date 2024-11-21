# 1. Mình tạo reponsitory trên github
# 2. Tạo dự án tại thư mục ( npx create-react-app . )
# 3. Setup thư viện
  - Cài tailwind css
    https://tailwindcss.com/docs/installation

# 4  lấy link font ( https://cdnjs.com/libraries/font-awesome )
# 5  Cai npm i react-router-dom
# 6 cai mull (boost trap) (https://mui.com/material-ui/getting-started/installation/)
# 7 npm install firebase
# 8 npm i uuid : radom số tự nhiên trong link hình ảnh 

<div>
                                            <div className='flex flex-row p-2' key={item.productId}>
                                                <div class="w-1/3">
                                                    <div className='w-28'>
                                                        <img src={getImgDetail(item.productId)} alt="" />
                                                    </div>
                                                </div>
                                                <div class="w-1/2">
                                                    <div>
                                                        <p className=''>{getNameDetail(item.productId)}</p>
                                                        <p>Giá cả :{getPriceDetail(item.productId).toLocaleString('vi-VN')}</p>
                                                        <p> Số lượng :{item.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>