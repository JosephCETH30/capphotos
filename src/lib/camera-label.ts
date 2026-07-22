import { CAMERA_BRANDS, decodeCustomModelName, getCameraModel } from "@/data/cameras";

export function getCameraLabel(brandId: string, modelId: string): string {
  const customName = decodeCustomModelName(modelId);
  if (customName) {
    const brand = CAMERA_BRANDS.find((b) => b.id === brandId);
    return `${brand?.name ?? brandId} ${customName}`;
  }
  const model = getCameraModel(brandId, modelId);
  return model ? `${model.brandName} ${model.name}` : "Unknown camera";
}
