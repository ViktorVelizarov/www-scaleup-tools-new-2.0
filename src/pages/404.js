import DefaultLayout from "@/Layouts/DefaultLayout";
import Link from "next/link";

const CheckoutResult = () => {
  return (
    <DefaultLayout>
      <div className="bg-accent-orange h-[80vh] flex flex-col justify-center px-[10%] md:px-[25%]">
        <h1 className="mt-[20vh] sm:mt-[25vh] text-[2.25rem] sm:text-[3rem] font-extrabold text-white leading-[4rem]">
          Oops, táto stránka neexistuje.
        </h1>
        <div className="my-12 flex flex-wrap gap-5">
          <Link
            className="block px-5 py-3 bg-white font-semibold border-white border-2 text-accent-orange rounded-md text-center text-sm lg:text-[.95rem] w-[15rem] hover:text-white hover:bg-accent-orange"
            href="/"
          >
            Na hlavnú stránku
          </Link>
          <Link
            className="block px-5 py-3 bg-white font-semibold border-white border-2 text-accent-orange rounded-md text-center text-sm lg:text-[.95rem] w-[15rem] hover:text-white hover:bg-accent-orange"
            href="/contact"
          >
            Aktuálne podujatia
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default CheckoutResult;
