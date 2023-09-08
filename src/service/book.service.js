import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/book";

class BookService {
    saveBook(book) {
        return axios.post(API_URL + "/", book);
    }
    getAllBook() {
        return axios.get(API_URL + "/");
    }

    getAllBookByPag() {
        return axios.get(API_URL + "/");
    }

    getBookById(id) {
        return axios.get(API_URL + "/" + id);
    }

    updateBook(book) {
        return axios.post(API_URL + "/update", book);
    }

    deleteBook(id) {
        return axios.get(API_URL + "/delete/" + id);
    }

    countDetails() {
        return axios.get(API_URL + "/count");
    }

    getAllUser() {
        return axios.get(API_URL+"/getUser");
    }

    updateProfile(user) {
        return axios.post(API_URL + "/updateProfile", user, { headers: AuthHeader() });
    }

    searchBook(ch) {
        return axios.get(API_URL + "/search?ch=" + ch);
    }


}

export default new BookService();