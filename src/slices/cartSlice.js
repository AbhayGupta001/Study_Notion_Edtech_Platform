import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

const initalState = {
    cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
    loading: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initalState,
    reducers:{
        setLoading(state , value){
            state.loading = value.payload
        },
        addCart(state,action){
            let course = action.payload;
            //find course in cart
            let index = state.cart.findIndex(item => item._id === course._id);
            
            //if course already present return
            if(index >= 0){
                toast.error("Course already added to cart");
                return;
            }

            //else update cart total price and total items of cart
            state.cart.push(course);
            state.totalItems = state.cart.length;
            state.total += course?.price;
            
            //now update in local storage also
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            
            toast.success("Course added successfully");
        },
        removeCart(state,action){
            let course = action.payload;
            let index = state.cart.findIndex(item => item._id === course._id);

            //if course present in cart then remove else do nothing
            if(index >= 0){
                //remove one element from the index found in cart
                state.total -= state.cart[index].price;
                // state.totalItems = state.cart.length;
                state.totalItems--;
                state.cart.splice(index , 1);

                //now update in local storage also
                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("total",JSON.stringify(state.total));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
                
                toast.success("Course removed successfully");
            }
        },
        resetCart(state){
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
});

export const { setTotalItems , addCart , removeCart , resetCart } = cartSlice.actions;
export default cartSlice.reducer;