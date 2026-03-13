import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Toast from "./Toast";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [showPass, toggleShowPass] = useState(false);
  const [toast, setToast] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: "",
  });

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return "Please enter valid email address";

    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";

    if (password.length < 8) return "Password needs at least 8 characters";

    return "";
  };

  const validateConfirmPass = (confirmPassword) => {
    if (!confirmPassword) return "Confirm password is required";
    if (formData.password !== confirmPassword) return "Passwords do not match";

    return "";
  };

  const handleShowPass = () => {
    toggleShowPass((showPass) => !showPass);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPassError = validateConfirmPass(formData.confirmPassword);

    if (emailError || passwordError || confirmPassError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPassError,
      });

      return;
    }

    setToast("Success");

    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });

    console.log(formData);

    setTimeout(() => {
      setToast("");
    }, 5000);
  };

  const clearErrors = (fieldName) => {
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const calcPasswordStrength = (password) => {
    if (!password) return "";

    if (password.length < 8) return "Weak";

    let criteriaCount = 0;

    if (/[a-z]/.test(password)) criteriaCount++;
    if (/[A-Z]/.test(password)) criteriaCount++;
    if (/[0-9]/.test(password)) criteriaCount++;
    if (/[!@#$%^&*]/.test(password)) criteriaCount++;

    if (criteriaCount <= 1) return "Weak";
    if (criteriaCount <= 3) return "Medium";

    return "Strong";
  };

  const getStrengthColor = (strength) => {
    if (strength === "Weak") return "text-red-700";
    if (strength === "Medium") return "text-yellow-700";
    if (strength === "Strong") return "text-green-600";

    return "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toast message={toast} />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Create account</h1>

        <form
          className="space-y-4"
          onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter email..."
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
                clearErrors("email");
              }}
            />
            <ErrorMessage error={errors.email} />
          </div>
          <div className="relative">
            <label htmlFor="password">Password</label>
            <div>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  });
                  clearErrors("password");
                }}
              />

              <button
                type="button"
                className="ml-2.5 text-teal"
                onClick={handleShowPass}>
                👀
              </button>
              <ErrorMessage error={errors.password} />
            </div>
            <div className="mt-2 text-sm">
              <span>Strength: </span>
              <span
                className={`font-semibold ${getStrengthColor(calcPasswordStrength(formData.password))}`}>
                {calcPasswordStrength(formData.password) || "Not set"}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                });
                clearErrors("confirmPassword");
              }}
            />
            <ErrorMessage error={errors.confirmPassword} />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rememberMe: e.target.checked,
                })
              }
              className="w-4 h-4"
            />
            <label
              htmlFor="rememberMe"
              className="mb-0!">
              Remember me
            </label>
          </div>
          <button className="w-full">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default App;
