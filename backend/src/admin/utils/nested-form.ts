import { get } from "lodash";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Get } from "type-fest";

// Define the nested form type extending UseFormReturn with custom methods
export type NestedForm<TValues extends FieldValues> = UseFormReturn<{
  __nested__: TValues;
}> & {
  path(): `__nested__`;
  path<TPath extends FieldPath<TValues>>(
    p?: TPath
  ): `__nested__.${TPath}`;
  get<TObj>(obj: TObj): Get<TObj, `__nested__`>;
  get<TPath extends FieldPath<TValues>, TObj>(
    obj: TObj,
    p?: TPath
  ): Get<TObj, `__nested__.${TPath}`>;
};

// Create a nested form utility function
export function nestedForm<TValues extends FieldValues>(
  form: UseFormReturn<TValues> | NestedForm<TValues>
): NestedForm<TValues>;

// Define overload for cases with path
export function nestedForm<
  TValues extends FieldValues,
  TPath extends FieldPath<TValues>
>(
  form: UseFormReturn<TValues> | NestedForm<TValues>,
  path: TPath
): NestedForm<Get<TValues, TPath>>;

// Default implementation
export function nestedForm<TValues extends FieldValues>(
  form: UseFormReturn<TValues> | NestedForm<TValues>,
  path?: FieldPath<TValues>
): NestedForm<any> {
  return {
    ...form,
    path(field?: string | number) {
      const fullPath = path && field ? `${path}.${field}` : path || field;
      // Handle cases where the form might already have a path method
      if ("path" in form) {
        return form.path(fullPath as any);
      }
      return (fullPath || "") as any;
    },
    get(obj: any, field?: string | number) {
      const fullPath = path && field ? `${path}.${field}` : path || field;
      // Handle cases where the form might already have a get method
      if ("get" in form) {
        return form.get(obj, path as any);
      }
      return fullPath ? get(obj, fullPath) : obj;
    },
  };
}
