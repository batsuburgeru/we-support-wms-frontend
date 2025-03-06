import CartItemDropdown from "@/components/CartItemDropdown";
import ClientPopover from "@/components/ClientPopover";
import ProductSearch from "@/components/ProductSearch";

const NewPurchase = () => {
  return (
    <main>
      <div className='flex justify-center px-6 py-4 flex-col gap-4'>
        <h1>New Purchase Requisition</h1>
        <ProductSearch width={'[500px]'} />
      </div>
      <hr className='border-borderLine'/>
      <section className="px-6 pt-4">
        <div className="flex items-center">
          <h2 className="mr-20">Client Name*</h2>
          <ClientPopover />
        </div>

        <div className="flex items-center mt-4">
          <h2 className="mr-11">Purchase Order #</h2>
          <input type="number" placeholder="Order Number" className='border border-borderLine rounded-md px-4 py-1 w-80' />
        </div>

        <div className="flex items-center mt-4">
          <h2 className="mr-[102px]">Request #</h2>
          <input type="number" placeholder="Request Number" className='border border-borderLine rounded-md px-4 py-1 w-80' />
        </div>

        <div className="flex items-center mt-4">
          <h2 className="mr-[147px]">Date</h2>
          <input type="text" placeholder="February 21, 2025" className='border border-borderLine rounded-md px-4 py-1 w-80' />
        </div>
      </section>

      <section className="px-6 mt-8">
        <div className="bg-navBG border border-borderLine rounded-tl-lg rounded-tr-lg px-8 py-2 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Item Table</h2>
        </div>
        <table className="w-full">
          <tbody>
            <tr className="border-b-2 border-borderLine">
              <th className="font-medium border-r">ITEM DETAILS</th>
              <th className="font-medium border-r">QUANTITY</th>
              <th className="font-medium border-r">UNIT</th>
              <th className="font-medium border-r">ESTIMATED COST</th>
              <th className="font-medium">AMOUNT COST</th>
              <th className="font-medium"></th>
            </tr>
            <tr className="border-b border-borderLine">
              <th className="font-normal border-r flex items-center"><img src="./img-box.png" className="w-6 mr-1" />Laptop</th>
              <th className="font-normal border-r"><input type="number" placeholder="1"></input></th>
              <th className="font-normal border-r">Pcs</th>
              <th className="font-normal border-r">₱5.00</th>
              <th className="font-normal">₱50.00</th>
              <th className="font-normal flex justify-end pr-0">
                <CartItemDropdown />
              </th>
            </tr>
            <tr className="border-b border-borderLine">
              <th className="font-normal border-r flex items-center"><img src="./img-box.png" className="w-6 mr-1" />Laptop</th>
              <th className="font-normal border-r"><input type="number" placeholder="1"></input></th>
              <th className="font-normal border-r">Pcs</th>
              <th className="font-normal border-r">₱5.00</th>
              <th className="font-normal">₱50.00</th>
              <th className="font-normal flex justify-end pr-0">
                <CartItemDropdown />
              </th>
            </tr>
            <tr className="border-b border-borderLine">
              <th className="font-normal border-r flex items-center"><img src="./img-box.png" className="w-6 mr-1" />Laptop</th>
              <th className="font-normal border-r"><input type="number" placeholder="1"></input></th>
              <th className="font-normal border-r">Pcs</th>
              <th className="font-normal border-r">₱5.00</th>
              <th className="font-normal">₱50.00</th>
              <th className="font-normal flex justify-end pr-0">
                <CartItemDropdown />
              </th>
            </tr>
            <tr className="border-b border-borderLine">
              <th className="font-normal border-r flex items-center"><img src="./img-box.png" className="w-6 mr-1" />Laptop</th>
              <th className="font-normal border-r"><input type="number" placeholder="1"></input></th>
              <th className="font-normal border-r">Pcs</th>
              <th className="font-normal border-r">₱5.00</th>
              <th className="font-normal">₱50.00</th>
              <th className="font-normal flex justify-end pr-0">
                <CartItemDropdown />
              </th>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="px-6 mt-8 flex justify-between mb-24">
        <div>
          <h2 className="font-medium">Notes</h2>
          <textarea className="border border-borderLine rounded-md px-4 py-2 h-40 w-96 resize-none" />
        </div>
        <div className="bg-navBG flex flex-col justify-between p-6 rounded-md ml-8 w-[500px] min-w-96">
          <div className="flex justify-between">
            <div>
              <p className="font-medium mb-2">Sub Total</p>
              <p className="font-medium text-sm">Total Quantity: 15</p>
            </div>
            <p className="font-medium">
              ₱110.00
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h2 className="font-semibold">Total</h2>
            <h2 className="font-semibold">₱110.00</h2>
          </div>
        </div>
      </section>
      <section className="w-full fixed bottom-0 px-6 bg-white py-3 shadow-[0_-5px_10px_rgba(0,0,0,0.10)] z-50">
        <button className="bg-buttonBG px-4 py-2 rounded-md hover:bg-neutral-200 colorTransition">
          Save as Draft
        </button>
        <button className="ml-4 bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 colorTransition">
          Get Approval
        </button>
        <button className="ml-4 bg-buttonBG px-4 py-2 rounded-md hover:bg-neutral-200 colorTransition">
          Cancel
        </button>
      </section>
    </main>
  )
}

export default NewPurchase