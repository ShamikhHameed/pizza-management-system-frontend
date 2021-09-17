import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import moment from 'moment';

const generatePDF = (orders, type) => {
    const doc = new jsPDF();
    const tableColumn = ["Id", "Cashier", "Date", "Time", "Amount"];
    const tableRows = [];

    orders.forEach(order => {
        const orderData = [
        order.id,
        order.cashier,
        moment(order.orderTimestamp).format('DD MMM YYYY'),
        moment(order.orderTimestamp).format('hh:mm:ss A'),
        order.amount + '.00'
        ];
        tableRows.push(orderData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text("Order Report", 14, 15);
    if(type == "save") {
        doc.save(`orderReport_${dateStr}.pdf`);
    } else {
        doc.output('dataurlnewwindow');
    }
};

export default generatePDF;