import axios from 'axios';

const API_URL = 'http://localhost:8080/api/access/';

class OrderService {
    getOrdersList() {
        return axios.get(API_URL + "orders");
    }

    getUndeliveredOrdersList() {
        return axios.get(API_URL + "orders/delivered/false");
    }

    addOrder(customerName, address, items, deliveryRider) {
        return axios.post(API_URL + "orders", {
            customerName,
            address,
            items,
            deliveryRider
        });
    }

    updateOrder(id, name, smallPrice, veg) {

        let vegan = veg === "veg" ? true : false;

        return axios.put(API_URL + "orders/" + id, {
            name,
            smallPrice,
            vegan
        });
    }

    deleteOrder(id) {
        return axios.delete(API_URL + "orders/" + id);
    }
}

export default new OrderService();