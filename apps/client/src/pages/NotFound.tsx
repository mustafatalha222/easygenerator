import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routeConstant";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center ">
      <div className="px-8 py-4 rounded-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to={ROUTES.HOME}>
          <Button className="mt-2">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
}
