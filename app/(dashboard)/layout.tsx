import { Navbar } from "@/components/navbar1";
import { Sidebar } from "@/components/sidebar1";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full relative flex">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-10 bg-gray-900">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-72">
        <Navbar />
        <main className="p-4 pt-20"> 
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
