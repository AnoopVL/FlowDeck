import { SignUp } from "@clerk/nextjs";

export default function CustomSignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp />
    </div>
  );
}
