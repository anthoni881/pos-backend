import escpos from "escpos";
import USB from "escpos-usb";

escpos.USB = USB;

export const printReceipt = ({ items, total }) => {
  const device = new escpos.USB();
  const printer = new escpos.Printer(device);

  device.open(() => {
    printer
      .align("ct")
      .text("TOKO MAJU JAYA")
      .text("----------------------------")
      .align("lt");

    // items.forEach((i) => {
    //   printer.text(`${i.name.padEnd(12)} x${i.qty} ${i.price}`);
    // });

    printer.align("rt").text(`TOTAL: `).feed(3).cut().close();
  });
};
