import { Button, Modal } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  const componentRef = useRef();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePrint = useReactToPrint({
    content: ()=> componentRef.current,
  })
  
  return (
    <Modal title="Order Form" open={isModalOpen} footer={false} onCancel={handleCancel} width={800}>
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl bg-white mx-auto px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">MYPOS</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-2 md:gap-10">
                <div className="text-sm text-slate-500">
                  <p className="font-bold text-slate-700">Bill Detail</p>
                  <p>{customer?.customerName}</p>
                  <p className="">Kazım karabekir mah</p>
                  <p className="">76.sok no:9/1</p>
                  <p className="">Bahçelievler/ISTANBUL</p>
                </div>
                <div className="text-sm text-slate-500">
                  <p className="font-bold text-slate-700">Bill</p>
                  <p className="">The Boring Company</p>
                  <p className="">Tesla Street 007</p>
                  <p className="">Teksas</p>
                  <p className="">CA 0000</p>
                </div>
                <div className="text-sm text-slate-500">
                  <div className="">
                    <p className="font-bold text-slate-700">Bill Number:</p>
                    <p className="">{customer?._id}</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-slate-700">Date Of Issue:</p>
                    <p className="">{customer?.createdAt?.substring(0, 10)}</p>
                  </div>
                </div>
                <div className="text-sm text-slate-500 sm:block hidden">
                  <div className="">
                    <p className="font-bold text-slate-700">Terms:</p>
                    <p className="">7 Days</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-slate-700">Due:</p>
                    <p className="">2022-04-19</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th scope="col" className="py-3.5 md:pl-0 text-left text-sm font-normal text-slate-700 sm:table-cell hidden">
                      Image
                    </th>
                    <th scope="col" className="py-3.5 md:pl-0 text-left  text-sm font-normal text-slate-700">
                      Title
                    </th>
                    <th scope="col" className="py-3.5 md:pl-0 text-left text-sm font-normal text-slate-700 sm:table-cell hidden">
                      Unit Price
                    </th>
                    <th scope="col" className="py-3.5 md:pl-0  text-left text-sm font-normal text-slate-700 sm:table-cell hidden">
                      Unit
                    </th>
                    <th scope="col" className="py-3.5 md:pl-0 text-right text-sm font-normal  text-slate-700 sm:table-cell hidden">
                      Total
                    </th>
                    <th scope="col" className="py-3.5 md:pl-0 text-right text-sm font-normal text-slate-700 sm:hidden table-cell" colSpan={4}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems?.map((record) => (
                    <tr className="border-b border-slate-200" key={record._id}>
                      <td className="py-4 text-left  md:pl-0 sm:table-cell hidden">
                        <img className="w-12 h-12 object-cover" src={record.product.img} alt="" />
                      </td>
                      <td className="py-4 text-left md:pl-0 hidden sm:table-cell">
                        <div className="flex flex-col">
                          <span className="font-semibold sm:font-normal">{record.product.title}</span>
                          <div className="sm:hidden inline-block text-xs">Unit Price</div>
                        </div>
                      </td>
                      <td className="py-4 text-left md:pl-0 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-semibold sm:font-normal">{record.product.title}</span>
                          <div className="sm:hidden inline-block text-xs">Unit Price</div>
                        </div>
                      </td>
                      <td className="py-4 text-left sm:pl-3 sm:table-cell hidden">
                        <span>{record.product.price}₺</span>
                      </td>
                      <td className="py-4 text-left sm:pl-3 sm:table-cell hidden">
                        <span>{record.quantity}</span>
                      </td>
                      <td className="py-4 text-right md:pl-0">
                        <span>{(record.product.price * record.quantity).toFixed(2)}₺</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={4} className="text-right pt-6 md:pr-5 xs:pr-3 sm:table-cell hidden">
                      <span className="font-normal text-slate-700">Sub Total</span>
                    </th>
                    <th className="text-left pt-6 md:pr-5 xs:pr-3 sm:hidden" colSpan={4}>
                      <p className="font-normal text-slate-700">Sub Total</p>
                    </th>
                    <th className="text-right pt-6">
                      <span className="font-normal text-slate-700">{(customer?.subTotal).toFixed(2)}₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={4} className="pt-4 text-right md:pr-5 xs:pr-3 sm:table-cell hidden">
                      <span className="font-normal text-slate-700">Tax</span>
                    </th>
                    <th colSpan={4} className="pt-4 text-left md:pr-5 xs:pr-3 sm:hidden">
                      <span className="font-normal text-slate-700">Tax</span>
                    </th>
                    <th className="pt-4 text-right">
                      <span className="font-normal text-red-600">+{((customer?.subTotal * customer?.taxRate) / 100).toFixed(2)}₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={4} className="pt-4 text-right md:pr-5 xs:pr-3 sm:table-cell hidden">
                      <span className="font-bold text-slate-700">Total</span>
                    </th>
                    <th colSpan={4} className="pt-4 text-left md:pr-5 xs:pr-3 sm:hidden">
                      <span className="font-bold text-slate-700">Total</span>
                    </th>
                    <th className="pt-4 text-right">
                      <span className="font-bold text-slate-700">
                        {(customer?.subTotal + (customer?.subTotal * customer?.taxRate) / 100).toFixed(2)}₺
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="py-8">
              <div className="border-t pt-8 border-slate-300">
                <p className="text-sm font-light text-slate-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illo minima delectus eligendi alias aut dolor sapiente
                  consectetur iure. Suscipit laboriosam perferendis sed architecto dicta aut tenetur maxime molestias est itaque laudantium accusamus
                  earum, reprehenderit voluptate fugit nemo consequuntur temporibus ipsam numquam? Quo commodi provident cum libero molestias quidem
                  necessitatibus inventore tempore amet nulla perspiciatis praesentium voluptate maiores esse ad aperiam, sit accusamus fuga
                  consequatur qui ex. Laborum doloremque aperiam quaerat quam quia eum, ipsam eaque, inventore enim veritatis eos!
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
