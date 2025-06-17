import { cn } from "@/utils";
import React, {
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { Button } from "./button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";

type PageContentProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
  noPadding?: boolean;
  header?: PageHeaderProps;
};

export function PageContent({
  as: Tag = "div",
  children,
  className,
  header,
  ariaLabel = "Page content",
  noPadding,
}: PageContentProps) {
  return (
    <Tag
      aria-label={ariaLabel}
      className={cn(
        "flex min-h-[calc(100vh-52.5px)] flex-col gap-2 rounded-t-md bg-linear-150 from-[#FFBCA850] via-[#FAFAFA70] to-[#DBD3FF70] inset-shadow-sm md:gap-6",
        !noPadding && "p-2 md:p-6",
        className,
      )}
    >
      {header && <PageHeader {...header} />}
      {children}
    </Tag>
  );
}

type PageHeaderProps = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
  hasBack?: boolean;
  fallbackBackUrl?: string;
  className?: string;
  backLink?: string;
};

export const PageHeader = ({
  title,
  description,
  actions,
  hasBack = true,
  fallbackBackUrl = "/",
  className,
  backLink,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 2);
  }, []);

  const handleBack = () => {
    if (backLink) {
      navigate(backLink);
    } else if (canGoBack) {
      navigate(-1);
    } else {
      navigate(fallbackBackUrl);
    }
  };

  if (!title && !description && !actions) return null;

  return (
    <header
      className={cn(
        "flex flex-wrap items-center justify-between gap-2",
        className,
      )}
    >
      <div>
        {title && hasBack && canGoBack ? (
          <div className="flex items-center gap-2">
            <Button
              className="border-muted-foreground"
              variant="ghost"
              color="default"
              size="icon"
              onClick={handleBack}
              aria-label="Go back"
            >
              <ArrowLeftIcon />
            </Button>
            <h4>{title}</h4>
          </div>
        ) : (
          <h4>{title}</h4>
        )}
        {description && <p>{description}</p>}
      </div>
      {actions}
    </header>
  );
};

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  id?: string;
  ariaLabelledBy?: string;
};

export function Container({
  as: Tag = "div",
  children,
  className,
  noPadding = false,
  id,
  ariaLabelledBy,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "bg-background w-full rounded-md",
        !noPadding && "p-4 md:p-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
