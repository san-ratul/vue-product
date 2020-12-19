import Api from './Api'



export default {
    index() {
        return Api().get("/products");
    },
    store(form) {
        return Api().post("/product/store", form);
    },
    delete(id) {
        return Api().delete("/product/" + id);
    },
    update(id, form) {
        return Api().patch("/product/edit/" + id, form);
    }
}