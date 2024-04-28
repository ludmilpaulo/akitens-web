import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { basAPI } from "@/configs/variable";

const ForgotPassword: React.FC = () => {
  // Accept onClose prop to handle dialog close
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  function onDismiss() {
    router.back();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${basAPI}/accounts/forgot-password/`, {
        method: "POST",
        //  mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      console.log("response", response);
      if (response.ok) {
        alert("Password reset link sent successfully!");
        //   onClose(); // Close the dialog after successful submission
      } else {
        setMessage("Failed to send password reset link.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) {
          onDismiss();
        }
      }}
    >
      <DialogContent
        className="bg-white w-full md:w-3/4 lg:w-1/2 xl:w-1/3 h-4/5 max-w-3xl p-4 mx-auto my-auto rounded-lg"
        ref={dialogRef}
      >
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogDescription>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full rounded border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-400"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Send Reset Link
            </button>
          </DialogDescription>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
