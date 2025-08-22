import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Search className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white/80 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-white/70 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. Let's get you back
            to studying with PrepMind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-emerald-600 dark:bg-emerald-400 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-white dark:text-black">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link to="/practice">
              <Button
                variant="outline"
                className="dark:bg-black dark:border-white/50 dark:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Start Practicing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
