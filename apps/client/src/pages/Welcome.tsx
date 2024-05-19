import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import useApiCall from "@/hooks/useApiCall";
import useAuth from "@/hooks/useAuth";
import { ENDPOINTS } from "@/lib/endpoints";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type IProfile = {
  name: string;
  email: string;
};

const Welcome = () => {
  const { handleLogout } = useAuth();
  const { loading, data, error, apiCall } = useApiCall<IProfile>();

  useEffect(() => {
    (async () => {
      await apiCall(ENDPOINTS.PROFILE, "GET");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to the application.</h2>
      {loading && <Skeleton className="w-full h-[60px]" />}
      {data && (
        <>
          <h4 className="text-xl font-medium">Hi {data.email} 👋</h4>
          <span className="text-sm">Email - {data.email}</span>
        </>
      )}
      <ErrorMessage error={error} />
      <Button variant={"destructive"} className="mt-5" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Welcome;
