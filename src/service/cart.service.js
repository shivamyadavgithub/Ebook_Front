import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/cart";

class CartService {

    addCart(cart) {
        return axios.post(API_URL + "/", cart);
    }

    checkCart(cart) {
        return axios.post(API_URL + "/check", cart);
    }

    getCart() {
        return axios.get(API_URL + "/", { headers: AuthHeader() })
    }

    updateCart(id, qu) {
        return axios.post(API_URL + "/updateQuan/" + id + "/" + qu, { headers: AuthHeader() });
    }

    deleteCart(id) {
        return axios.get(API_URL + "/deleteCart/" + id, { headers: AuthHeader() });
    }


}

export default new CartService();