import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <h4>Hi, Welcome back, Karan Mange 👋</h4>
        <p>
          Your dashboard is ready — explore insights, manage your listings, and
          grow your reach.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-background flex flex-col items-center rounded-lg p-4">
          <h5>Brands</h5>
          <p>Discover top brands from around the world.</p>
          <Button color={"primary"} variant={"link"}>
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
