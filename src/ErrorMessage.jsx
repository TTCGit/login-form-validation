const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return <p className="text-sm py-1 text-red-700">{error}</p>;
};

export default ErrorMessage;
