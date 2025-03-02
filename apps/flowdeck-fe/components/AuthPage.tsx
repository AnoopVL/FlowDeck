"use client";
export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded-2xl text-black">
          <div className="p-2 m-2">
            <input type="text" placeholder="Email" />
          </div>
          <div className="p-2 m-2">
            {isSignin ? null : <input type="text" placeholder="Username" />}
          </div>
          <div className="p-2 m-2">
            <input type="password" placeholder="Password" />
          </div>
          <div className="p-2 m-2">
            <button className="text-center" onClick={() => {}}>
              {isSignin ? "Sign-in" : "Sign-up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
