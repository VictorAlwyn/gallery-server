import Ajv from "ajv";
import { Router, Request, Response } from "express";
import { Gallery } from "../../model/gallery-model";
import schema from "./schemas";
import uploader from "../../middleware/uploader";

const ajv = new Ajv();

const GalleryRouter = () => {
  const router = Router();

  router.get("/", async (req: Request, res: Response): Promise<Response> => {
    const allGallery: Gallery[] = await Gallery.findAll();
    return res.status(200).json(allGallery);
  });

  router.post("/", async (req: Request, res: Response): Promise<Response> => {
    const body = req.body;

    const validate = ajv.compile(schema.add_gallery);

    if (validate(body)) {
      const gallery: Gallery = await Gallery.create({ ...req.body });
      return res.status(201).json(gallery);
    }

    return res.status(400).json(validate.errors);
  });

  router.post(
    "/upload/:id",
    uploader.single("image"),
    async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;
      const image: any = req.file;

      if (image === undefined) {
        return res.send(`You must select a image.`);
      }

      await Gallery.update({ image: image.location }, { where: { id } });
      const updatedGallery: Gallery | null = await Gallery.findByPk(id);
      return res.status(201).json(updatedGallery);
    }
  );

  router.get("/:id", async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const gallery: Gallery | null = await Gallery.findByPk(id);
    return res.status(200).json(gallery);
  });

  router.put("/:id", async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const body = req.body;

    const validate = ajv.compile(schema.update_gallery);

    if (validate(body)) {
      await Gallery.update({ ...req.body }, { where: { id } });
      const updatedGallery: Gallery | null = await Gallery.findByPk(id);
      return res.status(200).json(updatedGallery);
    }

    return res.status(400).json(validate.errors);
  });

  router.delete(
    "/:id",
    async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;
      const deletedGallery: Gallery | null = await Gallery.findByPk(id);
      await Gallery.destroy({ where: { id } });
      return res.status(200).json(deletedGallery);
    }
  );

  return router;
};

export default GalleryRouter;
