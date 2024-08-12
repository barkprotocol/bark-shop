import clsx from 'clsx';
import { Controller, FieldArrayWithId, useFieldArray } from 'react-hook-form';
import { NestedForm } from './utils/nested-form';
import { FormImage } from './utils/images';
import FileUploadField from './components/file-upload-field';
import { CheckCircleSolid } from '@medusajs/icons';
import { useRef } from 'react';

type ImageType = { selected: boolean } & FormImage;

export type MediaFormType = {
  images: ImageType[];
};

type Props = {
  form: NestedForm<MediaFormType>;
  type: 'thumbnail' | 'media';
};

const CategoriesImagesMediaForm = ({ form, type }: Props) => {
  const { control, path, setValue } = form;
  const singleSelection = type === 'thumbnail';

  // Hook for managing form fields
  const { fields, append } = useFieldArray({
    control,
    name: path('images'),
  });

  // Ref to track previously selected image
  const prevSelectedImage = useRef<number | undefined>(
    fields.findIndex((field) => field.selected)
  );

  // Handles files chosen from the file input
  const handleFilesChosen = (files: File[]) => {
    if (files.length) {
      const toAppend = files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        nativeFile: file,
        selected: false,
      }));

      append(toAppend);
    }
  };

  // Handles image selection and updating the state
  const handleImageSelected = (index: number) => {
    if (prevSelectedImage.current !== undefined && singleSelection) {
      setValue(path(`images.${prevSelectedImage.current}.selected`), false);
    }
    prevSelectedImage.current = index;
  };

  return (
    <div>
      <div>
        <FileUploadField
          onFileChosen={handleFilesChosen}
          placeholder="1200 x 1600 (3:4) recommended, up to 10MB each"
          multiple
          filetypes={['image/gif', 'image/jpeg', 'image/png', 'image/webp']}
          className="py-large"
        />
      </div>

      {fields.length > 0 && (
        <div className="mt-large">
          <div className="mb-small">
            <h2 className="inter-large-semibold mb-2xsmall">Uploads</h2>
            <p className="inter-base-regular text-grey-50 mb-large">
              {type === 'thumbnail' ? (
                <span>Select an image to use as category thumbnail.</span>
              ) : (
                <span>Select images to use as category images.</span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap space-x-4">
            {fields.map((field, index) => (
              <Image
                key={field.id}
                image={field}
                index={index}
                form={form}
                onSelected={handleImageSelected}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type ImageProps = {
  image: FieldArrayWithId<MediaFormType, 'images', 'id'>;
  index: number;
  form: NestedForm<MediaFormType>;
  onSelected: (index: number) => void;
};

const Image = ({ image, index, form, onSelected }: ImageProps) => {
  const { control, path } = form;

  return (
    <Controller
      name={path(`images.${index}.selected`)}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className="relative">
          <button
            className={clsx(
              'hover:bg-grey-5 rounded-rounded group flex items-center justify-between',
              { 'bg-grey-5': value }
            )}
            type="button"
            onClick={() => {
              onChange(!value);
              if (!value) {
                onSelected(index);
              }
            }}
          >
            <div className="gap-x-large flex items-center">
              <div className="flex h-32 w-32 items-center justify-center">
                <img
                  src={image.url}
                  alt={image.name || 'Uploaded image'}
                  className="rounded-rounded max-w-32 max-h-32"
                />
              </div>

              {value && (
                <span className="absolute text-[#CBB5A7] bottom-xsmall right-xsmall">
                  <CheckCircleSolid />
                </span>
              )}
            </div>
          </button>
        </div>
      )}
    />
  );
};

export default CategoriesImagesMediaForm;
