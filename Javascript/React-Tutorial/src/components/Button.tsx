import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  color?: "primary" | "warning" | "danger" | "secondary" | "success";
  onClick: () => void;
  alertOpen: boolean;
}

const Button = ({ children, color = "warning", onClick, alertOpen }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(false);

  const onclick = () => {
    onClick();
    setSelectedIndex(true);
  };

  return (
    <button
      className={
        selectedIndex === true && alertOpen ? "btn btn-" + color : "btn"
      }
      onClick={onclick}
    >
      {children}
    </button>
  );
};

export default Button;
