import * as React from "react";

// Components
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
  name: string;
  loading: boolean;
  onClick: () => void;
}

const Button = ({ name, loading, onClick }: ButtonProps) => {
  return (
    <div>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md bg-fig-600 px-4 py-2 text-sm text-white focus:outline-none focus:right-0"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={onClick}
      >
        {loading && (
          <div className="mr-3">
            <LoadingSpinner />
          </div>
        )}
        {name}
      </button>
    </div>
  );
};

export default Button;
