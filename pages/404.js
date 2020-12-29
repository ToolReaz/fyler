import { Button, Result } from "antd";
import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />{" "}
    </div>
  );
}
