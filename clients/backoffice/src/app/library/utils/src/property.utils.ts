import { type PropertyI, type UploadedPropertyImageI } from '../../models';

export const IsPropertyUnfinishedU = (property: PropertyI): boolean => {
  const hasPrice = property.price != null && `${property.price}` !== '';
  const hasCity = Boolean(property.location?.city);
  const hasImages = GetPropertyImagesU(property).length > 0;

  return !hasPrice || !hasCity || !hasImages;
};

export const GetPropertyImagesU = (property: PropertyI | null | undefined): UploadedPropertyImageI[] => {
  if (!property?.images?.length) {
    return [];
  }

  return property.images.flatMap((image) => {
    if (typeof image === 'string' && image) {
      return [{ id: image, name: image, url: image }];
    }

    if (image && typeof image === 'object' && image.url) {
      return [
        {
          id: image.id || image.url,
          name: image.name || image.url,
          url: image.url,
        },
      ];
    }

    return [];
  });
};

export const GetPropertyCoverImageU = (property: PropertyI): string | null => {
  return GetPropertyImagesU(property)[0]?.url ?? null;
};
