"use client";

import { IconButton, Typography } from "@material-tailwind/react";

function Hero() {
  return (
    <div className="relative w-full">
      <div className="grid place-items-center min-h-[92vh] px-8">
        <div className="container mx-auto grid place-items-center h-max text-center">
          <Typography variant="h1" color="blue-gray" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
            My Resume
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-4 mb-12 w-full md:max-w-full lg:max-w-4xl"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Welcome to my professional resume page! Below, you&apos;ll find a
            comprehensive overview of my skills, qualifications, and experience
            in the field of web development.
          </Typography>
          <Typography
            className="mt-12 mb-4 text-blue-gray-900 font-medium uppercase"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Connect me on:
          </Typography>
          <div className="gap-2 lg:flex">
            <a href="https://www.linkedin.com/in/estebanjramirezfuenzalida/" target="_blank" rel="noopener noreferrer">
              <IconButton variant="text" color="gray" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                <i className="fa-brands fa-linkedin text-lg" />
              </IconButton>
            </a>
            <a href="https://github.com/DidoTau" target="_blank" rel="noopener noreferrer">
              <IconButton variant="text" color="gray" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                <i className="fa-brands fa-github text-lg" />
              </IconButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
