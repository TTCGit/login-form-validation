const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-navy text-white rounded-lg shadow-2xl p-6 flex items-start gap-4 max-w-md mx-4">
        <div className="shrink-0 mt-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="10"
              cy="10"
              r="9"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M6 10L9 13L14 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1 ">
          <h4 className="font-semibold text-lg mb-1 text-white">
            Account created!
          </h4>
          <p className="text-sm opacity-90">
            Welcome! Your account has been successfully created.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
