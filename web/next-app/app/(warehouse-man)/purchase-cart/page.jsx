import ClientPopover from "@/components/ClientPopover";
import ProductSearch from "@/components/ProductSearch";
import { PurchaseCartTable } from "@/components/PurchaseCartTable";

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
      </section>

      <section className="px-6 mt-8">
        <PurchaseCartTable />
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