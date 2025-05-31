import React from "react";

function Header() {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen gap-5 bg-neutral-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1040' height='600' preserveAspectRatio='none' viewBox='0 0 1040 600'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1022%26quot%3b)' fill='none'%3e%3crect width='1040' height='600' x='0' y='0' fill='rgba(245%2c 245%2c 245%2c 1)'%3e%3c/rect%3e%3cpath d='M822.96-1.88C720.71 15.05 671.4 262.88 505.69 264.96 339.98 267.04 347.05 189.96 188.42 189.96 29.78 189.96-47.35 264.45-128.85 264.96' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M569.84-96.46C457.44-24.24 521.46 369.31 317.99 374.91 114.53 380.51-52.98 209.11-185.7 206.91' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M612.94-10.69C526.27 14.53 594.48 231.87 373.01 259.13 151.54 286.39 29.13 509.12-106.84 517.13' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M498.59-112.76C399.46-44.15 450.59 315.85 281.09 317.61 111.58 319.37-29.26 79.93-153.92 71.61' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M649.03-77.96C531.69-65.5 495.81 163.33 260 189.32 24.18 215.31-10.56 451.78-129.04 465.32' stroke='rgba(123%2c 205%2c 4%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1022'%3e%3crect width='1040' height='600' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-4xl font-bold text-center md:text-5xl">Welcome</h1>
        <p className="w-3/4 text-center text-md md:text-xl md:w-1/2">
          Welcome{" "}
          <span className="font-bold underline">
            {localStorage.getItem("user")
              ? localStorage.getItem("user")
              : "Guest"}
          </span>{" "}
          to LinkChat! Connect instantly with friends, family, and colleagues.
          Enjoy fast, secure, and easy one-on-one messaging—anytime, anywhere.
        </p>
      </div>
    </>
  );
}

export default Header;
