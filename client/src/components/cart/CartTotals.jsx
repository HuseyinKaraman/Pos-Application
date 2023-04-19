import { Button, message } from "antd";
import { ClearOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, increaseQuantity, decreaseQuantity, reset } from "../../redux/cartSlice";
import {useNavigate} from 'react-router-dom'

const CartTotals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total, tax } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col h-full">
      <h1 className="bg-blue-600 text-center py-4 text-white font-bold">Products in the basket</h1>
      <ul className="cart-items flex flex-col gap-y-3 p-2 overflow-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li className="cart-item flex justify-between" key={item.product._id}>
              <div className="flex">
                <img
                  onClick={() => {
                    dispatch(deleteFromCart(item));
                    message.success("item is removed from Cart");
                  }}
                  className="md:h-16 md:w-16 w-24 h-24 object-cover border-b cursor-pointer"
                  src={item.product.img}
                  alt={item.product.title}
                />
                <div className="flex flex-col ml-2 justify-center">
                  <b>{item.product.title}</b>
                  <span>
                    {item.product.price} X {item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-3 md:gap-x-1">
                <Button
                  onClick={() => dispatch(increaseQuantity(item))}
                  type="primary"
                  size="small"
                  shape="circle"
                  className=" flex justify-center items-center !p-4 md:!p-0"
                  icon={<PlusOutlined className="align-middle" />}
                ></Button>
                <span className="font-bold text-2xl md:text-base w-6 inline-block text-center">{item.quantity}</span>
                <Button
                  onClick={() => {
                    if (item.quantity === 1) {
                      if (window.confirm("Are you sure to delete item?")) {
                        dispatch(decreaseQuantity(item));
                        message.success("item is removed from Cart");
                      }
                    } else {
                      dispatch(decreaseQuantity(item));
                    }
                  }}
                  type="primary"
                  icon={<MinusOutlined />}
                  size="small"
                  shape="circle"
                  className="flex justify-center items-center !p-4 md:!p-0"
                ></Button>
              </div>
            </li>
          )).reverse()
        ) : (
          <h1 className="text-center">Cart Is Empty</h1>
        )}
      </ul>
      <div className="cart-totals mt-auto border-y-2">
        <div className="flex justify-between p-2">
          <b>SubTotal</b>
          <span>{total > 0 ? total.toFixed(2) : 0}₺</span>
        </div>
        <div className="flex justify-between p-2">
          <b>KDV %{tax}</b>
          <span className="text-red-600">{total > 0 ? `+${((total * tax) / 100).toFixed(2)}` : 0}₺</span>
        </div>
      </div>
      <div className="border-b-2 mt-4">
        <div className="flex justify-between p-2">
          <b className="text-xl text-green-600">Total</b>
          <span className="text-xl">{total > 0 ? (total + (total * tax) / 100).toFixed(2) : 0}₺</span>
        </div>
      </div>
      <div className="py-2 px-2">
        <Button type="primary" className="w-full" disabled={cartItems.length === 0} onClick={()=>navigate("/cart")}>
          Order
        </Button>
        <Button
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              dispatch(reset());
              message.success("Cart is successfully reset");
            }
          }}
          disabled={cartItems.length === 0}
          type="primary"
          danger
          className="w-full mt-2 flex justify-center items-center"
          icon={<ClearOutlined />}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default CartTotals;
