import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const Buttons = () => {
  const { data: session } = useSession();
  return (
    <div className="w-[100%] md:w-[50%] flex flex-col items-center">
      {console.log("session:")}
      {console.log(session)}
      <Link
        href="/"
        underline="always"
        className="my-10 text-sky-700 font-semibold text-xl"
      >
        {"Home"}
      </Link>
      <Button
        variant="contained"
        className="bg-sky-500 w-[100%] py-4 mb-5 font-semibold "
        href="/admin/tools"
      >
        Tools
      </Button>
      <Button
        variant="contained"
        className="bg-sky-500 w-[100%] py-4 mb-5 font-semibold "
        href="/admin/tags"
      >
        Tags
      </Button>
      <Button
        variant="contained"
        className="bg-sky-500 w-[100%] py-4 mb-5 font-semibold "
        href="/admin/transactions"
      >
        Transactions
      </Button>
      {/* <Button variant="contained" className="bg-sky-500 w-[100%] py-4 mb-5 font-semibold " href="/admin/jobs" style={{ width: 300 }}>Jobs</Button> */}
      {session.user.role === "admin" ? (
        <Button
          variant="contained"
          className="bg-sky-500 w-[100%] py-4 mb-5 font-semibold "
          href="/admin/users"
        >
          Users
        </Button>
      ) : (
        ""
      )}
      <Button
        onClick={() => signOut()}
        variant="contained"
        className="bg-sky-500 w-[100%] py-4 mb-5 font-semibold "
      >
        Sign out
      </Button>
    </div>
  );
};

export default Buttons;
