import { type FC } from "react";
import { cn } from "@/lib/utils"; // utility for conditional class names if available
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon?: LucideIcon;
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
};

const EmptyState: FC<EmptyStateProps> = ({
  icon: Icon,
  title = "Nothing here yet",
  message = "Try adjusting your filters or try again later",
  actionText,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-6 space-y-4 text-muted-foreground w-full",
        className
      )}
    >
      {Icon && <Icon className="w-10 h-10 text-primary" />}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm max-w-md">{message}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
