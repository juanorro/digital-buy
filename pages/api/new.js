import prisma from 'lib/prisma';
import { upload } from 'lib/upload';
import middleware from 'middleware/middleware';
import { getSession } from 'next-auth/react';
import nextConnect from 'next-connect';

const handler = nextConnect();
handler.use(middleware);

handler.post(async(req, res) => {
  const session = await getSession({ req });

  if(!session) return res.status(401).json({ message: 'Not logged in' });

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if(!user) return res.status(401).json({ message: 'User not found' });

  const product = await prisma.product.create({
    data: {
      title: req.body.title[0],
      free: req.body.free[0] === 'true' ? true : false,
      price: Number(req.body.price[0]) * 100,
      description: req.body.description[0],
      author: {
        connect: { id: user.id },
      },
    },
  });

  console.log('product =>', product.data);

  let image_url = null;
  let product_url = null;

  if(req.files.image) {
    image_url = await upload({
      file: req.files.image[0],
      user_id: user_id,
    });
  };

  if(req.files.product) {
    product_url = await upload({
      file: req.files.product[0],
      user_id: user.id,
    });
  };

  const data = {
    url: product_url,
  };

  if(image_url) {
    data.image = image_url;
  };

  await prisma.product.update({
    where: { id: product.id },
    data,
  });

  res.end();
  return;
});

export const config = {
  api: {
    bodyParse: false,
  },
};

export default handler;