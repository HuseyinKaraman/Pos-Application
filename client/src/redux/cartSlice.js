import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total:0,
    tax : 8
  },
  reducers: {
    addToCart: (state, action) => {
        const findCartItem = state.cartItems.find(item=> item.product._id === action.payload.product._id)
        if (findCartItem) {
            findCartItem.quantity += 1; 
        } else {
            state.cartItems.push(action.payload);
        }
        state.total += action.payload.product.price;
    },
    deleteFromCart: (state,action)=>{
           state.cartItems =  state.cartItems.filter(item=> item.product._id !== action.payload.product._id)
           state.total -=  action.payload.product.price*action.payload.quantity;
    },
    increaseQuantity: (state,action)=>{
        const cartItem = state.cartItems.find(item=> item.product._id === action.payload.product._id);
        cartItem.quantity += 1;
        state.total += action.payload.product.price;
    },
    decreaseQuantity: (state,action)=>{
        const cartItem = state.cartItems.find(item=> item.product._id === action.payload.product._id);
        if (cartItem.quantity === 1) {
            state.cartItems =  state.cartItems.filter(item=> item.product._id !== action.payload.product._id)
        }else{
            cartItem.quantity -= 1;
        }
        state.total -= action.payload.product.price;
    },
    reset:(state,action)=>{
        state.cartItems = [];
        state.total = 0;
    }
  },
});


export const  { addToCart,deleteFromCart,increaseQuantity,decreaseQuantity,reset} = cartSlice.actions;

export default cartSlice.reducer;
