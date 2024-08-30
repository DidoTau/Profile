import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  date: string;
  children: React.ReactNode;
}

export function InfoCard({ icon: Icon, title, date, children }: InfoCardProps) {
  return (
    <Card placeholder={false} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
      <CardHeader
        className="flex items-center justify-between rounded-none overflow-visible"
        floated={false}
        shadow={false}
        placeholder={false}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <div className="flex flex-col gap-1 w-full">
          <Typography color="blue" className="font-bold text-xs" placeholder={false} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
            {date}
          </Typography>
          <Typography color="blue-gray" variant="h5" className="w-full" placeholder={false} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
            {title}
          </Typography>
        </div>
        <IconButton
          className="flex-shrink-0 pointer-events-none"
          ripple={false}
          placeholder={false}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </IconButton>
      </CardHeader>
      <Typography
        placeholder={false}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className="font-normal !text-gray-500"
      >
        {children}
      </Typography>
    </Card>
  );
}

export default InfoCard;
