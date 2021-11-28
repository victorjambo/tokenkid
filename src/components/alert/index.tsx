import { Transition } from "@headlessui/react";

interface AlertProps {
  show: boolean;
  setShow?: (arg0: boolean) => void;
  className?: string;
  closable?: boolean;
  title?: string;
  variant?: "success" | "primary" | "warning" | "error" | "default" | "info";
}

const colorMap = {
  default: "orange",
  success: "green",
  primary: "blue",
  warning: "yellow",
  error: "red",
  info: "gray"
};

const Alert: React.FC<AlertProps> = ({
  show,
  setShow,
  title,
  children,
  className = "",
  closable = false,
  variant = "default"
}) => {
  const color = colorMap[variant];
  const baseClasses = `
    border-l-4 
    p-4 
    flex 
    whitespace-normal
    items-center 
    justify-between 
    space-x-4
    ${`bg-${color}-100 border-${color}-500 text-${color}-800`}`;
  return (
    <Transition
      show={show}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-200 transform"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`${baseClasses} ${className}`} role="alert">
        <div>
          {title && <p className="font-semibold">{title}</p>}
          {children}
        </div>
        {closable && <button onClick={() => setShow(false)}>&times;</button>}
      </div>
    </Transition>
  );
};

export default Alert;
