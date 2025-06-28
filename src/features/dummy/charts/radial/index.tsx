import RadialChart1 from "./RadialChart1";

const RadialChart = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 [&>div]:max-h-[300px] [&>div]:rounded-md [&>div]:border [&>div]:p-5 [&>div]:shadow">
      <RadialChart1 />
    </div>
  );
};

export default RadialChart;
