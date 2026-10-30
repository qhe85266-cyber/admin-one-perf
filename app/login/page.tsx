import React from "react";
import CardBox from "../_components/CardBox";
import SectionFullScreen from "../_components/Section/FullScreen";
import { getPageTitle } from "../_lib/config";
import { Metadata } from "next";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: getPageTitle("Login"),
};

const LoginPage = () => {
  return (
    <SectionFullScreen bg="purplePink">
      <CardBox className="w-11/12 shadow-2xl md:w-7/12 lg:w-6/12 xl:w-4/12">
        <p className="mb-6 rounded bg-blue-50 p-3 text-sm text-blue-900">
          Demo mode — no account required. Click Login or Home to enter.
          <br />
          Any credentials work.
        </p>
        <LoginForm />
      </CardBox>
    </SectionFullScreen>
  );
};

export default LoginPage;
