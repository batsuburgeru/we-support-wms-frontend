import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  
  export function NewClientModal() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-brand-primary hover:bg-orange-600">New Client</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New Client</AlertDialogTitle>
            <AlertDialogDescription>
              <form>
                <div className="grid grid-flow-row grid-cols-3 py-4 px-2 gap-3">
                  <label htmlFor="name" className="py-3 text-black font-medium">Primary Contact</label>
                  <input type="text" placeholder="Full Name" id="name" className="col-span-2 border border-borderLine rounded-md px-4 py-3 text-black" />
                  <label htmlFor="organization" className="py-3 text-black font-medium">Organization</label>
                  <input type="text" placeholder="Organization Name" id="org" className="col-span-2 border border-borderLine rounded-md px-4 py-3 text-black" />
                  <label htmlFor="email" className="py-3 text-black font-medium">Email Address</label>
                  <input type="text" placeholder="Enter email" id="email" className="col-span-2 border border-borderLine rounded-md px-4 py-3 text-black" />
                  <label htmlFor="contactNo" className="py-3 text-black font-medium">Phone</label>
                  <input type="text" placeholder="Enter phone number" id="contactNo" className="col-span-2 border border-borderLine rounded-md px-4 py-3 text-black" />
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-brand-secondary hover:bg-brand-primary">Add</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  