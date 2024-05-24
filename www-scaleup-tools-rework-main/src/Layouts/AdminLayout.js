import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { StyledEngineProvider } from "@mui/material";

const AdminLayout = ({ children }) => {
  const { status } = useSession() ;

  if (status === "loading") {
    return (
      <div className="w-[100vw] min-h-[100vh] flex justify-center items-center bg-slate-100">
        <p>Hang on there...</p>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <StyledEngineProvider injectFirst>
        <div className="w-[100vw] min-h-[100vh] px-[5vw] md:px-[25vw] flex justify-center bg-slate-100">
          {children}
        </div>
      </StyledEngineProvider>
    );
  }
  return (
    <StyledEngineProvider injectFirst>
      <div className="w-[100vw] min-h-[100vh] px-[25vw] md:px-[35vw] flex justify-center items-center bg-slate-100">
        <Button
          onClick={() => {
            const user = signIn();
            console.log("returned user is: ");
            console.log(user);
          }}
          className="bg-sky-500 w-[100%] py-4 mb-5 font-semibold text-white hover:bg-sky-700"
        >
          Sign in
        </Button>
      </div>
    </StyledEngineProvider>
  );
};

export default AdminLayout;
