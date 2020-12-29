import { Card } from "antd";
import { useRouter } from "next/router";
import dbConnect from "../../db/connection";
import Image from "next/image";
import { readFileSync } from "fs";

export async function getServerSideProps(context) {
  const db = await dbConnect();

  const dataValues = await db.models.Link.findAll({
    where: {
      code: context.params.code,
    },
  });

  const link = dataValues[0];

  if (link.type === "redirect") {
    return {
      redirect: {
        destination: link.target,
        permanent: false,
      },
    };
  }

  if (link.type === "image") {
    /*
    return {
      props: {
        type: "image",
        path: link.target,
      },
    };
    */
    const image = readFileSync(link.target);

    context.res.write(image);
    context.res.end();
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function code(props) {
  if (props.type === "image") {
    return (
      <Card style={{ margin: "0 auto", maxWidth: 400, textAlign: "center" }}>
        <Image src={props.path} alt="Image" layout="fill" />
      </Card>
    );
  }
  return (
    <Card style={{ margin: "0 auto", maxWidth: 400, textAlign: "center" }}>
      <p>Link not found</p>
    </Card>
  );
}
