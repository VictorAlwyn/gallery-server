import { Router, Request, Response } from "express";
import { Gallery } from "../../model/gallery-model";
import validator from "../../middleware/validator";
import schema from "./schemas";
import uploader from "../../middleware/uploader";

const GalleryRouter = () => {
  const router = Router();

  router.get("/", async (req: Request, res: Response): Promise<Response> => {
    const allGallery: Gallery[] = await Gallery.findAll();
    return res.status(200).json(allGallery);
  });

  router.post(
    "/",
    validator.validate({ body: schema.add_gallery }),
    async (req: Request, res: Response): Promise<Response> => {
      const gallery: Gallery = await Gallery.create({ ...req.body });
      return res.status(201).json(gallery);
    }
  );

  router.post(
    "/upload/:id",
    uploader.single("image"),
    async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;

      if (req.file == undefined) {
        return res.send(`You must select a image.`);
      }

      const image: any = req.file;

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

  router.put(
    "/:id",
    validator.validate({ body: schema.update_gallery }),
    async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;
      await Gallery.update({ ...req.body }, { where: { id } });
      const updatedGallery: Gallery | null = await Gallery.findByPk(id);
      return res.status(200).json(updatedGallery);
    }
  );

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
